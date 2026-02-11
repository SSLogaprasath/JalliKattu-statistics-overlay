"""
Jallikattu AI Service – FastAPI application.

Endpoints
─────────
GET  /health            → service + stream + GPU status
POST /detect-player     → detect from live stream frame
POST /detect-player-image → detect from uploaded image (testing)
"""

import io
import logging
import os
import time
from contextlib import asynccontextmanager

import cv2
import numpy as np
from fastapi import FastAPI, File, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image

import config
from detection import detect_player_ids, _get_yolo
from stream import (
    get_latest_frame,
    grab_frame_at_time,
    is_stream_healthy,
    start_stream,
    stop_stream,
)

# ── Logging ───────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(name)-14s  %(levelname)-7s  %(message)s",
)
log = logging.getLogger("ai-service")


# ── Auth helper ───────────────────────────────────────────────
def _verify_key(x_api_key: str | None) -> None:
    if x_api_key != config.API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")


def _fetch_playback_info() -> dict | None:
    """
    Fetch playback time and isLive flag from the overlay API.
    Returns dict with keys 'playbackTimeSec' and 'isLive', or None on failure.
    """
    import json
    import urllib.request

    if not config.OVERLAY_API_URL:
        return None
    try:
        req = urllib.request.Request(config.OVERLAY_API_URL, method="GET")
        req.add_header("Accept", "application/json")
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode())
            return {
                "playbackTimeSec": data.get("playbackTimeSec", -1),
                "isLive": data.get("isLive", True),
                "playbackUpdatedAt": data.get("playbackUpdatedAt", 0),
            }
    except Exception:
        return None


# ── Lifespan (startup / shutdown) ─────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("══════ Jallikattu AI Service starting ══════")
    # pre-load models so first request isn't slow
    log.info("Pre-loading YOLO model …")
    _get_yolo()
    # Validate OCR.space API key
    if not config.OCRSPACE_API_KEY:
        log.warning("\u26a0\ufe0f  OCRSPACE_API_KEY is not set \u2013 OCR will NOT work!")
    else:
        log.info("OCR.space API configured (Engine %s)", config.OCRSPACE_ENGINE)
    # start live stream thread (will idle if URL is empty)
    start_stream()
    log.info("══════ AI Service ready on %s:%s ══════", config.HOST, config.PORT)
    yield
    log.info("Shutting down …")
    stop_stream()


# ── App ───────────────────────────────────────────────────────
app = FastAPI(
    title="Jallikattu AI – Player ID Detection",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Static mount for saved crop images ────────────────────────
os.makedirs(config.CROP_SAVE_DIR, exist_ok=True)
app.mount("/crops", StaticFiles(directory=config.CROP_SAVE_DIR), name="crops")


# ── GET /health ───────────────────────────────────────────────
@app.get("/health")
async def health():
    """
    Returns service status.  Java backend should poll this to decide
    whether to enable the AI button in the UI.
    """
    import torch
    from stream import _current_video_url

    gpu_available = torch.cuda.is_available()
    gpu_name = torch.cuda.get_device_name(0) if gpu_available else None

    video_source = "manual (.env)" if config.VIDEO_STREAM_URL else "overlay API"

    return {
        "status": "ok",
        "stream_connected": is_stream_healthy(),
        "gpu_available": gpu_available,
        "gpu_name": gpu_name,
        "yolo_model": config.YOLO_MODEL,
        "ocr_engine": f"OCR.space Engine {config.OCRSPACE_ENGINE}",
        "ocr_api_key_set": bool(config.OCRSPACE_API_KEY),
        "video_source": video_source,
        "current_video_url": _current_video_url or None,
    }


# ── POST /detect-player ──────────────────────────────────────
@app.post("/detect-player")
async def detect_player(x_api_key: str = Header(None)):
    """
    Detect player IDs from the video feed.

    For LIVE streams:  grabs the latest frame from the background capture.
    For PRE-RECORDED:  fetches the overlay viewer's current playback time
                       and seeks to that position for an accurate frame.

    Returns:
        {
          "detections": [...],
          "processing_ms": 145,
          "source": "live" | "seek@45.2s"
        }
    """
    _verify_key(x_api_key)

    frame = None
    source = "live"

    # Check if the overlay reports a pre-recorded video with a known playback time
    try:
        playback_info = _fetch_playback_info()
        if playback_info and not playback_info.get("isLive", True):
            playback_time = playback_info.get("playbackTimeSec", -1)
            if playback_time >= 0:
                frame = grab_frame_at_time(playback_time)
                source = f"seek@{playback_time:.1f}s"
    except Exception as e:
        log.debug("Playback info fetch failed, falling back to live: %s", e)

    # Fallback: use the latest frame from the background stream
    if frame is None:
        frame = get_latest_frame()
        source = "live"

    # Dev fallback: use a test image when no stream is connected
    if frame is None and config.TEST_IMAGE_PATH:
        import os
        if os.path.isfile(config.TEST_IMAGE_PATH):
            frame = cv2.imread(config.TEST_IMAGE_PATH)
            source = f"test-image:{os.path.basename(config.TEST_IMAGE_PATH)}"
            log.info("Using test image fallback: %s", config.TEST_IMAGE_PATH)

    if frame is None:
        raise HTTPException(
            status_code=503,
            detail="No frame available – stream may be disconnected.",
        )

    t0 = time.perf_counter()
    detections = detect_player_ids(frame)
    elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

    return {
        "detections": detections,
        "processing_ms": elapsed_ms,
        "source": source,
    }


# ── POST /detect-player-image ────────────────────────────────
@app.post("/detect-player-image")
async def detect_player_image(
    file: UploadFile = File(...),
    x_api_key: str = Header(None),
):
    """
    Detect player IDs from an uploaded image.
    Use this for testing / accuracy tuning without a live stream.

    Accepts: JPEG / PNG image upload (multipart form).
    """
    _verify_key(x_api_key)

    contents = await file.read()
    if not contents:
        raise HTTPException(status_code=400, detail="Empty file")

    # decode image
    nparr = np.frombuffer(contents, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if frame is None:
        raise HTTPException(status_code=400, detail="Could not decode image")

    t0 = time.perf_counter()
    detections = detect_player_ids(frame)
    elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)

    return {
        "detections": detections,
        "processing_ms": elapsed_ms,
    }


# ── Entrypoint ────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=config.HOST,
        port=config.PORT,
        reload=False,
        log_level="info",
    )
