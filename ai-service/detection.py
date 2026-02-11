"""
Detection pipeline – YOLO person detection → crop → OCR.space number extraction.

YOLO model is loaded once at import time and kept in memory (GPU).
OCR is handled by the OCR.space cloud API (Engine 2 – fast & accurate).
"""

import io
import logging
import os
import re
import time

import cv2
import numpy as np
import requests
from ultralytics import YOLO

import math

import config
from preprocessing import preprocess_for_ocr, crop_upper_body

log = logging.getLogger("ai-service")

# ── Lazy-loaded singletons ────────────────────────────────────
_yolo_model: YOLO | None = None


def _get_yolo() -> YOLO:
    """Load YOLOv8 model onto GPU once."""
    global _yolo_model
    if _yolo_model is None:
        log.info("Loading YOLO model '%s' on device '%s' …",
                 config.YOLO_MODEL, config.DEVICE)
        _yolo_model = YOLO(config.YOLO_MODEL)
        # warm-up inference (creates CUDA context)
        dummy = np.zeros((640, 640, 3), dtype=np.uint8)
        _yolo_model.predict(dummy, device=config.DEVICE, verbose=False)
        log.info("YOLO model ready.")
    return _yolo_model


# ── OCR.space API ─────────────────────────────────────────────

def _ocr_space(image: np.ndarray) -> list[dict]:
    """
    Send an image to the OCR.space API and return parsed results.

    Uses Engine 2 by default (fast, good with numbers).
    The image is PNG-encoded in memory and sent as a file upload.

    Returns a list of dicts:  [{"text": "123", "confidence": 0.95}, ...]
    Empty list on failure or no text detected.
    """
    if not config.OCRSPACE_API_KEY:
        log.error("OCRSPACE_API_KEY is not set – cannot run OCR")
        return []

    # encode the crop as PNG in memory
    ok, png_buf = cv2.imencode(".png", image)
    if not ok:
        log.warning("Failed to encode image to PNG for OCR.space")
        return []

    payload = {
        "apikey": config.OCRSPACE_API_KEY,
        "OCREngine": str(config.OCRSPACE_ENGINE),
        "isTable": "false",
        "scale": "true",           # let API upscale small images
        "filetype": "PNG",
    }

    try:
        resp = requests.post(
            config.OCRSPACE_URL,
            data=payload,
            files={"file": ("crop.png", io.BytesIO(png_buf.tobytes()), "image/png")},
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()
    except requests.RequestException as exc:
        log.warning("OCR.space request failed: %s", exc)
        return []

    if data.get("IsErroredOnProcessing"):
        msgs = data.get("ErrorMessage") or data.get("ErrorDetails", "unknown")
        log.warning("OCR.space processing error: %s", msgs)
        return []

    results = []
    for parsed in data.get("ParsedResults", []):
        text = (parsed.get("ParsedText") or "").strip()
        # Engine 2 returns "TextOverlay" with word-level confidence;
        # fall back to exit code as a coarse quality signal.
        exit_code = parsed.get("FileParseExitCode", -1)
        # exit_code 1 = success, use 0.90 as a baseline confidence for
        # successfully parsed text (OCR.space doesn't return a per-line
        # confidence in every engine, so we derive it from overlay data).
        word_confs = _extract_word_confidences(parsed)
        if text:
            results.append({
                "text": text,
                "confidence": word_confs if word_confs else (0.90 if exit_code == 1 else 0.50),
                "exit_code": exit_code,
            })

    return results


def _extract_word_confidences(parsed_result: dict) -> float:
    """
    Try to get average word-level confidence from the TextOverlay data
    that OCR.space Engine 2 provides.  Returns 0.0 if unavailable.
    """
    overlay = parsed_result.get("TextOverlay")
    if not overlay:
        return 0.0
    lines = overlay.get("Lines", [])
    confs = []
    for line in lines:
        for word in line.get("Words", []):
            # Engine 2 overlay: WordText, Left, Top, Height, Width
            # Confidence not always present; some engines include it
            c = word.get("Confidence")
            if c is not None:
                confs.append(float(c) / 100.0)  # normalise 0-100 → 0-1
    return sum(confs) / len(confs) if confs else 0.0


# ── Geometry helpers ──────────────────────────────────────────

def _bbox_center(bbox: tuple[int, int, int, int]) -> tuple[float, float]:
    """Return (cx, cy) centre of a bounding box."""
    x1, y1, x2, y2 = bbox
    return (x1 + x2) / 2.0, (y1 + y2) / 2.0


def _distance(a: tuple[float, float], b: tuple[float, float]) -> float:
    """Euclidean distance between two points."""
    return math.hypot(a[0] - b[0], a[1] - b[1])


# ── Public API ────────────────────────────────────────────────

def detect_persons_and_bulls(frame: np.ndarray) -> tuple[list[dict], list[dict]]:
    """
    Run YOLOv8 on a frame detecting persons (class 0) and bulls (class 19 = cow).

    Returns:
        (persons, bulls)
        persons: [{"bbox": (x1,y1,x2,y2), "confidence": float}, ...]
        bulls:   [{"bbox": (x1,y1,x2,y2), "confidence": float}, ...]
    """
    model = _get_yolo()
    # Use the lower threshold so we don't miss the bull
    min_conf = min(config.YOLO_CONFIDENCE, config.BULL_CONFIDENCE)
    results = model.predict(
        frame,
        device=config.DEVICE,
        conf=min_conf,
        classes=[0, 19],   # 0 = person, 19 = cow (bull) in COCO
        verbose=False,
    )

    persons = []
    bulls = []
    for r in results:
        for box in r.boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            entry = {"bbox": (x1, y1, x2, y2), "confidence": conf}
            if cls == 0 and conf >= config.YOLO_CONFIDENCE:
                persons.append(entry)
            elif cls == 19 and conf >= config.BULL_CONFIDENCE:
                bulls.append(entry)

    persons.sort(key=lambda d: d["confidence"], reverse=True)
    bulls.sort(key=lambda d: d["confidence"], reverse=True)
    return persons, bulls


def _sort_persons_by_bull_proximity(
    persons: list[dict], bulls: list[dict]
) -> list[dict]:
    """
    Sort persons by distance to the nearest bull (closest first).
    If no bull is detected, returns persons in original order.
    """
    if not bulls:
        return persons

    # Use the highest-confidence bull as the reference
    bull_center = _bbox_center(bulls[0]["bbox"])

    # Annotate each person with distance to the bull
    for p in persons:
        p["bull_distance"] = _distance(_bbox_center(p["bbox"]), bull_center)

    persons.sort(key=lambda d: d["bull_distance"])
    return persons


def _crop_bull_region(
    bull_bbox: tuple[int, int, int, int],
    frame: np.ndarray,
    padding_ratio: float = 0.15,
) -> np.ndarray:
    """
    Crop the bull bounding box with padding — the player holding the
    bull is usually visible in this region with their jersey number.
    """
    fh, fw = frame.shape[:2]
    x1, y1, x2, y2 = bull_bbox
    bw, bh = x2 - x1, y2 - y1
    pad_x = int(bw * padding_ratio)
    pad_y = int(bh * padding_ratio)
    cx1 = max(0, x1 - pad_x)
    cy1 = max(0, y1 - pad_y)
    cx2 = min(fw, x2 + pad_x)
    cy2 = min(fh, y2 + pad_y)
    return frame[cy1:cy2, cx1:cx2].copy()


def _crop_person_full(
    person_bbox: tuple[int, int, int, int],
    frame: np.ndarray,
) -> np.ndarray:
    """Crop the full person bounding box (not just upper body)."""
    x1, y1, x2, y2 = person_bbox
    fh, fw = frame.shape[:2]
    x1, y1 = max(0, x1), max(0, y1)
    x2, y2 = min(fw, x2), min(fh, y2)
    return frame[y1:y2, x1:x2].copy()


def _bbox_overlap_ratio(
    a: tuple[int, int, int, int],
    b: tuple[int, int, int, int],
) -> float:
    """
    Fraction of bbox 'a' that overlaps with bbox 'b'.
    Returns 0.0–1.0.
    """
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b
    ix1 = max(ax1, bx1)
    iy1 = max(ay1, by1)
    ix2 = min(ax2, bx2)
    iy2 = min(ay2, by2)
    if ix1 >= ix2 or iy1 >= iy2:
        return 0.0
    inter = (ix2 - ix1) * (iy2 - iy1)
    area_a = max(1, (ax2 - ax1) * (ay2 - ay1))
    return inter / area_a


def _persons_on_bull(
    persons: list[dict], bull: dict, min_overlap: float = 0.15
) -> list[dict]:
    """
    Return persons whose bbox significantly overlaps the bull's bbox.
    These are likely players actively engaging / holding the bull.
    Sorted by overlap ratio descending.
    """
    bull_bbox = bull["bbox"]
    overlapping = []
    for p in persons:
        ratio = _bbox_overlap_ratio(p["bbox"], bull_bbox)
        if ratio >= min_overlap:
            overlapping.append((ratio, p))
    overlapping.sort(key=lambda t: t[0], reverse=True)
    return [p for _, p in overlapping]


def extract_number(crop: np.ndarray) -> tuple[str | None, float]:
    """
    Send a preprocessed crop to OCR.space and extract a numeric player ID.

    Returns:
        (player_id, confidence) or (None, 0.0) if nothing found.
    """
    results = _ocr_space(crop)

    if not results:
        log.debug("OCR.space returned no results for crop")
        return None, 0.0

    best_number: str | None = None
    best_conf: float = 0.0

    for item in results:
        raw_text = item["text"]
        conf = item["confidence"]
        log.debug("OCR raw text: %r  conf: %.2f", raw_text, conf)

        # OCR.space may return multi-line text; check each line
        for line in raw_text.splitlines():
            digits = re.sub(r"[^0-9]", "", line)
            if digits and conf > best_conf and conf >= config.OCR_CONFIDENCE:
                best_number = digits
                best_conf = float(conf)

    if best_number:
        log.info("OCR extracted number: %s (conf %.2f)", best_number, best_conf)
    else:
        log.debug("OCR found text but no valid digits above threshold %.2f",
                   config.OCR_CONFIDENCE)

    return best_number, best_conf


def _save_crop(image: np.ndarray, run_dir: str, label: str) -> str | None:
    """Save an image crop to disk and return its filename (relative to crops/)."""
    if not config.CROP_SAVE_ENABLED:
        return None
    try:
        fname = f"{label}.jpg"
        fpath = os.path.join(run_dir, fname)
        cv2.imwrite(fpath, image, [cv2.IMWRITE_JPEG_QUALITY, 90])
        # return path relative to CROP_SAVE_DIR root
        return os.path.relpath(fpath, config.CROP_SAVE_DIR).replace("\\", "/")
    except Exception as e:
        log.debug("Failed to save crop %s: %s", label, e)
        return None


def _create_run_dir() -> str | None:
    """Create a timestamped directory for this detection run's images."""
    if not config.CROP_SAVE_ENABLED:
        return None
    ts = time.strftime("%Y%m%d_%H%M%S")
    run_dir = os.path.join(config.CROP_SAVE_DIR, ts)
    os.makedirs(run_dir, exist_ok=True)
    return run_dir


def _save_annotated_frame(
    frame: np.ndarray, persons: list[dict], bulls: list[dict],
    detections: list[dict], run_dir: str,
) -> str | None:
    """Draw bounding boxes on the frame and save it."""
    if not config.CROP_SAVE_ENABLED or not run_dir:
        return None
    annotated = frame.copy()
    # Draw bull boxes (red)
    for b in bulls:
        x1, y1, x2, y2 = b["bbox"]
        cv2.rectangle(annotated, (x1, y1), (x2, y2), (0, 0, 255), 2)
        cv2.putText(annotated, f"BULL {b['confidence']:.2f}",
                    (x1, y1 - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
    # Draw person boxes (green for detected, gray for others)
    detected_bboxes = {tuple(d["bbox"]) for d in detections}
    for p in persons:
        x1, y1, x2, y2 = p["bbox"]
        is_detected = tuple(p["bbox"]) in detected_bboxes
        color = (0, 255, 0) if is_detected else (128, 128, 128)
        cv2.rectangle(annotated, (x1, y1), (x2, y2), color, 2)
        dist = p.get("bull_distance", -1)
        lbl = f"{dist:.0f}px" if dist >= 0 else f"{p['confidence']:.2f}"
        cv2.putText(annotated, lbl, (x1, y1 - 8),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)
    # Label detected players
    for d in detections:
        x1, y1, x2, y2 = d["bbox"]
        cv2.putText(annotated, f"#{d['player_id']}",
                    (x1, y2 + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
    return _save_crop(annotated, run_dir, "frame_annotated")


def detect_player_ids(frame: np.ndarray) -> list[dict]:
    """
    Full pipeline:
      1. YOLO detects persons + bull in one pass
      2. Persons sorted by proximity to the bull (closest first)
      3. OCR the bull region (bull bbox + padding) — the player holding
         the bull is visible here with their jersey number
      4. OCR the top N closest person upper-body crops
      5. De-duplicate player IDs (bull-region wins on ties)
      6. Save cropped images & annotated frame to disk

    Returns a list of detected players:
        [{"player_id": "7", "confidence": 0.85, "bbox": [x1,y1,x2,y2],
          "bull_distance": 123.4, "crop_path": "...", "source": "bull-region"}, ...]
    Sorted by OCR confidence descending.
    """
    persons, bulls = detect_persons_and_bulls(frame)

    if not persons:
        return []

    bull_found = len(bulls) > 0
    if bull_found:
        log.info("Bull detected at %s (conf %.2f) — filtering by proximity",
                 bulls[0]["bbox"], bulls[0]["confidence"])
    else:
        log.info("No bull detected — OCR-ing top %d persons by YOLO confidence",
                 config.MAX_OCR_CANDIDATES)

    # Sort by proximity to bull (or keep confidence order if no bull)
    persons = _sort_persons_by_bull_proximity(persons, bulls)

    # Create a directory for this detection run's crops
    run_dir = _create_run_dir()

    # Save the raw source frame
    if run_dir:
        _save_crop(frame, run_dir, "frame_source")

    detections = []
    seen_ids: set[str] = set()  # de-duplicate across bull-region + person crops

    # ── Step A: OCR the bull region (bull bbox + padding) ─────
    if bull_found:
        bull_bbox = bulls[0]["bbox"]
        bull_crop = _crop_bull_region(bull_bbox, frame, padding_ratio=0.15)
        if bull_crop.size > 0:
            if run_dir:
                _save_crop(bull_crop, run_dir, "bull_region")
            bull_id, bull_conf = extract_number(bull_crop)
            if bull_id is not None:
                seen_ids.add(bull_id)
                crop_path = None
                if run_dir:
                    crop_path = _save_crop(bull_crop, run_dir,
                                           f"bull_region_id{bull_id}")
                detections.append({
                    "player_id": bull_id,
                    "confidence": round(bull_conf, 4),
                    "bbox": list(bull_bbox),
                    "bull_distance": 0.0,
                    "crop_path": crop_path,
                    "source": "bull-region",
                })
                log.info("Bull-region OCR found player #%s (conf %.2f)",
                         bull_id, bull_conf)

        # Also OCR individual persons overlapping the bull
        for i, person in enumerate(_persons_on_bull(persons, bulls[0])):
            if i >= 2:  # max 2 overlap crops
                break
            person_crop = _crop_person_full(person["bbox"], frame)
            if person_crop.size == 0:
                continue
            label = f"bull_person_{i+1}"
            if run_dir:
                _save_crop(person_crop, run_dir, label)
            pid, pconf = extract_number(person_crop)
            if pid is not None and pid not in seen_ids:
                seen_ids.add(pid)
                crop_path = None
                if run_dir:
                    crop_path = _save_crop(person_crop, run_dir,
                                           f"{label}_id{pid}")
                detections.append({
                    "player_id": pid,
                    "confidence": round(person["confidence"] * pconf, 4),
                    "bbox": list(person["bbox"]),
                    "bull_distance": round(person.get("bull_distance", -1), 1),
                    "crop_path": crop_path,
                    "source": "bull-overlap",
                })
                log.info("Bull-overlap person OCR found player #%s", pid)

    # ── Step B: OCR the top N closest person upper-body crops ─
    candidates = []
    for person in persons:
        bbox = person["bbox"]
        x1, y1, x2, y2 = bbox
        box_h = y2 - y1
        box_w = x2 - x1
        if box_h < 50 or box_w < 30:
            continue
        candidates.append(person)
        if len(candidates) >= config.MAX_OCR_CANDIDATES:
            break

    log.info("OCR-ing %d person candidate(s) out of %d person(s) detected",
             len(candidates), len(persons))

    for i, person in enumerate(candidates):
        bbox = person["bbox"]

        # crop upper body (where bib / number is)
        upper = crop_upper_body(bbox, frame)
        if upper.size == 0:
            continue

        # Save the raw crop sent to OCR
        crop_label = f"crop_{i+1}"
        if run_dir:
            _save_crop(upper, run_dir, crop_label)

        # Send raw crop to OCR.space (it does its own scaling/enhancement)
        player_id, ocr_conf = extract_number(upper)

        if player_id is not None and player_id not in seen_ids:
            seen_ids.add(player_id)
            combined = round(person["confidence"] * ocr_conf, 4)
            det_crop_label = f"crop_{i+1}_id{player_id}"
            crop_path = None
            if run_dir:
                crop_path = _save_crop(upper, run_dir, det_crop_label)
            detections.append({
                "player_id": player_id,
                "confidence": combined,
                "bbox": list(bbox),
                "bull_distance": round(person.get("bull_distance", -1), 1),
                "crop_path": crop_path,
                "source": "person-crop",
            })

    detections.sort(key=lambda d: d["confidence"], reverse=True)

    # Save annotated frame with all bounding boxes
    if run_dir:
        ann_path = _save_annotated_frame(frame, persons, bulls, detections, run_dir)
        if ann_path:
            log.info("Saved annotated frame + %d crops to %s",
                     len(detections), run_dir)

    return detections
