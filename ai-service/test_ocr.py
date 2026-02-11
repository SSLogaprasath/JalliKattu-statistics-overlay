"""
Quick test: send pictures/ images to OCR.space API and print results.
Also runs the full YOLO → crop → OCR pipeline if YOLO detects persons.
"""

import io
import os
import sys
import glob
import re
import time

import cv2
import numpy as np
import requests

# Ensure we can import from the ai-service folder
sys.path.insert(0, os.path.dirname(__file__))
import config
from preprocessing import preprocess_for_ocr, crop_upper_body

PICTURES_DIR = os.path.join(os.path.dirname(__file__), "..", "pictures")


def ocr_space_file(image: np.ndarray, label: str = "") -> dict:
    """Send an image to OCR.space and return the raw JSON response."""
    ok, png_buf = cv2.imencode(".png", image)
    if not ok:
        print(f"  [ERROR] Could not encode image to PNG")
        return {}

    payload = {
        "apikey": config.OCRSPACE_API_KEY,
        "OCREngine": str(config.OCRSPACE_ENGINE),
        "isTable": "false",
        "scale": "true",
        "filetype": "PNG",
    }

    t0 = time.perf_counter()
    resp = requests.post(
        config.OCRSPACE_URL,
        data=payload,
        files={"file": ("test.png", io.BytesIO(png_buf.tobytes()), "image/png")},
        timeout=15,
    )
    elapsed = (time.perf_counter() - t0) * 1000
    resp.raise_for_status()
    data = resp.json()

    print(f"  [{label}] OCR.space responded in {elapsed:.0f}ms")
    return data


def extract_digits(data: dict) -> list[str]:
    """Pull digit-only strings from OCR.space response."""
    found = []
    for parsed in data.get("ParsedResults", []):
        text = (parsed.get("ParsedText") or "").strip()
        exit_code = parsed.get("FileParseExitCode", -1)
        print(f"    Raw text: {repr(text)}  (exit_code={exit_code})")
        for line in text.splitlines():
            digits = re.sub(r"[^0-9]", "", line)
            if digits:
                found.append(digits)
    return found


def main():
    print(f"OCR.space Engine: {config.OCRSPACE_ENGINE}")
    print(f"API Key set: {'yes' if config.OCRSPACE_API_KEY else 'NO!'}")
    print(f"Pictures dir: {os.path.abspath(PICTURES_DIR)}")
    print()

    images = sorted(glob.glob(os.path.join(PICTURES_DIR, "*.*")))
    if not images:
        print("No images found in pictures/")
        return

    for img_path in images:
        fname = os.path.basename(img_path)
        print(f"═══ {fname} ═══")

        frame = cv2.imread(img_path)
        if frame is None:
            print("  [SKIP] Could not read image")
            continue

        h, w = frame.shape[:2]
        print(f"  Image size: {w}x{h}")

        # ── Test 1: Raw full-image OCR ──
        print("\n  ── Raw full-image OCR ──")
        data = ocr_space_file(frame, label="full-image")
        digits = extract_digits(data)
        print(f"    Digits found: {digits}")

        # ── Test 2: YOLO person+bull detection → proximity filter → crop → OCR ──
        print("\n  ── YOLO → bull proximity → crop → OCR pipeline ──")
        try:
            from detection import detect_persons_and_bulls, extract_number, _sort_persons_by_bull_proximity, _bbox_center
            from preprocessing import preprocess_for_ocr, crop_upper_body

            t0 = time.perf_counter()
            persons, bulls = detect_persons_and_bulls(frame)
            yolo_ms = (time.perf_counter() - t0) * 1000
            print(f"    YOLO found {len(persons)} person(s) + {len(bulls)} bull(s) in {yolo_ms:.0f}ms")

            if bulls:
                b = bulls[0]
                print(f"    Bull: bbox={b['bbox']}, conf={b['confidence']:.2f}")
            else:
                print(f"    No bull detected — will OCR top {config.MAX_OCR_CANDIDATES} by confidence")

            # Sort by proximity
            persons = _sort_persons_by_bull_proximity(persons, bulls)

            # Show ranking
            print(f"\n    Person ranking ({'by bull distance' if bulls else 'by confidence'}):")
            for i, p in enumerate(persons):
                dist = p.get('bull_distance', -1)
                marker = "← OCR" if i < config.MAX_OCR_CANDIDATES else "   skip"
                bbox = p['bbox']
                box_h, box_w = bbox[3]-bbox[1], bbox[2]-bbox[0]
                if box_h < 50 or box_w < 30:
                    marker = "   skip (tiny)"
                print(f"      #{i+1}: bbox={bbox}, conf={p['confidence']:.2f}, dist={dist:.0f}px  {marker}")

            # OCR only the top N candidates
            candidates = []
            for p in persons:
                bbox = p['bbox']
                if (bbox[3]-bbox[1]) < 50 or (bbox[2]-bbox[0]) < 30:
                    continue
                candidates.append(p)
                if len(candidates) >= config.MAX_OCR_CANDIDATES:
                    break

            print(f"\n    OCR-ing {len(candidates)} candidate(s):")
            for i, person in enumerate(candidates):
                bbox = person["bbox"]
                upper = crop_upper_body(bbox, frame)
                if upper.size == 0:
                    print(f"      #{i+1}: empty crop, skipping")
                    continue

                # Save crop
                crop_dir = os.path.join(PICTURES_DIR, "crops")
                os.makedirs(crop_dir, exist_ok=True)
                cv2.imwrite(os.path.join(crop_dir, f"{fname}_candidate{i+1}_raw.png"), upper)

                player_id, ocr_conf = extract_number(upper)
                combined = round(person["confidence"] * ocr_conf, 4) if player_id else 0
                dist = person.get('bull_distance', -1)
                print(f"      #{i+1}: bbox={bbox}, dist={dist:.0f}px → Player ID: {player_id}, OCR conf: {ocr_conf:.2f}, combined: {combined}")

        except Exception as e:
            print(f"    [ERROR] Pipeline failed: {e}")
            import traceback
            traceback.print_exc()

        print()


if __name__ == "__main__":
    main()
