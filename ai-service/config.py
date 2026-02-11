"""
Configuration – loaded from .env at startup.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Always load .env from the same directory as this config file,
# regardless of the CWD when the service was started.
_env_file = Path(__file__).resolve().parent / ".env"
load_dotenv(_env_file)

# ── Video Stream ──────────────────────────────────────────────
VIDEO_STREAM_URL: str = os.getenv("VIDEO_STREAM_URL", "")
YT_BROWSER: str = os.getenv("YT_BROWSER", "")  # browser to extract cookies from (chrome, edge, firefox)

# Fallback test image when stream is not connected (for dev/test)
TEST_IMAGE_PATH: str = os.getenv("TEST_IMAGE_PATH", "")

# ── Overlay API (auto-fetch video URL) ────────────────────────
OVERLAY_API_URL: str = os.getenv(
    "OVERLAY_API_URL",
    "http://localhost:8080/jallikattu-admin/api/overlay/current",
)
OVERLAY_POLL_INTERVAL: int = int(os.getenv("OVERLAY_POLL_INTERVAL", "5"))

# ── Detection ─────────────────────────────────────────────────
YOLO_CONFIDENCE: float = float(os.getenv("YOLO_CONFIDENCE", "0.45"))
BULL_CONFIDENCE: float = float(os.getenv("BULL_CONFIDENCE", "0.30"))
OCR_CONFIDENCE: float = float(os.getenv("OCR_CONFIDENCE", "0.50"))
MAX_OCR_CANDIDATES: int = int(os.getenv("MAX_OCR_CANDIDATES", "3"))
YOLO_MODEL: str = os.getenv("YOLO_MODEL", "yolov8n.pt")
DEVICE: str = os.getenv("DEVICE", "0")

# ── OCR.space API ─────────────────────────────────────────────
OCRSPACE_API_KEY: str = os.getenv("OCRSPACE_API_KEY", "K86958463088957")
OCRSPACE_ENGINE: int = int(os.getenv("OCRSPACE_ENGINE", "2"))
OCRSPACE_URL: str = os.getenv(
    "OCRSPACE_URL",
    "https://api.ocr.space/parse/image",
)

# ── Crop Storage ──────────────────────────────────────────────
CROP_SAVE_DIR: str = os.getenv("CROP_SAVE_DIR", "crops")
CROP_SAVE_ENABLED: bool = os.getenv("CROP_SAVE_ENABLED", "true").lower() in ("1", "true", "yes")

# ── Server ────────────────────────────────────────────────────
HOST: str = os.getenv("HOST", "127.0.0.1")
PORT: int = int(os.getenv("PORT", "8500"))

# ── Security ──────────────────────────────────────────────────
API_KEY: str = os.getenv("API_KEY", "changeme-jallikattu-2026")
