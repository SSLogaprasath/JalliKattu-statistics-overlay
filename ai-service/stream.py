"""
Background video stream capture thread.

Opens the video source once and continuously grabs frames into a
thread-safe global variable.  This eliminates the 2-5 s connection
delay that would otherwise happen on every detection request.

Supports:
  - Direct RTSP / HTTP streams
  - YouTube URLs (resolved via yt-dlp to a direct stream)
"""

import json
import logging
import os
import re
import sys
import threading
import time
import urllib.request

import cv2
import numpy as np

import config

log = logging.getLogger("ai-service")

# ── Thread-safe shared state ──────────────────────────────────
_lock = threading.Lock()
_latest_frame: np.ndarray | None = None
_stream_healthy: bool = False
_stream_thread: threading.Thread | None = None
_stop_event = threading.Event()
_current_video_url: str = ""  # the video URL currently being captured

# ── YouTube URL detection ─────────────────────────────────────
_YT_PATTERN = re.compile(
    r"(youtube\.com|youtu\.be|youtube\.com/embed|youtube\.com/live)",
    re.IGNORECASE,
)


def _is_youtube_url(url: str) -> bool:
    return bool(_YT_PATTERN.search(url))


def _safe_video_path(path: str) -> str:
    """
    On Windows, OpenCV may fail to open paths containing non-ASCII
    characters.  Convert to the short (8.3) path as a workaround.
    Returns the original path unchanged on non-Windows or if no
    short path is available.
    """
    if sys.platform != "win32" or not os.path.isfile(path):
        return path
    try:
        import ctypes
        buf = ctypes.create_unicode_buffer(300)
        n = ctypes.windll.kernel32.GetShortPathNameW(path, buf, 300)
        if n > 0 and buf.value:
            log.debug("Converted to short path: %s", buf.value)
            return buf.value
    except Exception:
        pass
    return path


def _resolve_youtube_url(url: str) -> str | None:
    """
    Use yt-dlp to extract the best direct video stream URL from
    a YouTube link.  Returns None on failure.
    """
    try:
        import yt_dlp

        ydl_opts = {
            "quiet": True,
            "no_warnings": True,
            # Prefer a moderate-quality stream OpenCV can handle
            "format": "best[height<=720][ext=mp4]/best[height<=720]/best",
        }
        # Use browser cookies to bypass YouTube bot detection
        if config.YT_BROWSER:
            ydl_opts["cookiesfrombrowser"] = (config.YT_BROWSER,)
            log.info("yt-dlp using cookies from '%s'", config.YT_BROWSER)
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            stream_url = info.get("url")
            if stream_url:
                log.info("yt-dlp resolved stream (%.0fp, %s)",
                         info.get("height", 0), info.get("ext", "?"))
                return stream_url
            # For live streams, try manifest_url
            manifest = info.get("manifest_url")
            if manifest:
                log.info("yt-dlp resolved live manifest")
                return manifest
            log.error("yt-dlp could not extract a direct URL")
            return None
    except Exception as e:
        log.error("yt-dlp failed: %s", e)
        return None


def _fetch_overlay_video_url() -> str:
    """
    Poll the Java overlay API to get the current video URL
    set by the admin.  Returns empty string on failure.
    """
    if not config.OVERLAY_API_URL:
        return ""
    try:
        req = urllib.request.Request(config.OVERLAY_API_URL, method="GET")
        req.add_header("Accept", "application/json")
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode())
            raw = (data.get("videoUrl") or "").strip()
            # Strip surrounding quotes (admin input may include them)
            raw = raw.strip('"').strip("'")
            return raw
    except Exception as e:
        log.debug("Could not fetch overlay video URL: %s", e)
        return ""


def _get_video_url() -> str:
    """
    Determine which video URL to use:
      1. If VIDEO_STREAM_URL is set in .env → use that (manual override)
      2. Otherwise → poll the overlay API for the admin's current video
    """
    manual = (config.VIDEO_STREAM_URL or "").strip()
    if manual:
        return manual
    return _fetch_overlay_video_url()


def _capture_loop() -> None:
    """
    Worker that runs in a daemon thread.  Reconnects automatically
    with exponential backoff on stream failures.  Polls the overlay API
    for URL changes every OVERLAY_POLL_INTERVAL seconds.
    """
    global _latest_frame, _stream_healthy, _current_video_url

    backoff = 1.0  # seconds
    max_backoff = 30.0

    while not _stop_event.is_set():
        # ── Get the current video URL ──
        url = _get_video_url()
        if not url:
            log.debug("No video URL configured — waiting …")
            with _lock:
                _stream_healthy = False
            time.sleep(config.OVERLAY_POLL_INTERVAL)
            continue

        # ── Resolve YouTube URLs ──
        stream_url = url
        if _is_youtube_url(url):
            if not config.YT_BROWSER:
                log.warning("YouTube URL detected but YT_BROWSER is not set — "
                            "cannot resolve stream. Set YT_BROWSER in .env or "
                            "use a direct stream URL.")
                _current_video_url = url  # store for reference
                with _lock:
                    _stream_healthy = False
                time.sleep(config.OVERLAY_POLL_INTERVAL)
                continue
            log.info("Detected YouTube URL — resolving via yt-dlp …")
            resolved = _resolve_youtube_url(url)
            if not resolved:
                log.error("Could not resolve YouTube URL. Retrying in %.0fs …", backoff)
                with _lock:
                    _stream_healthy = False
                time.sleep(backoff)
                backoff = min(backoff * 2, max_backoff)
                continue
            stream_url = resolved

        _current_video_url = url
        log.info("Opening video stream: %s", stream_url[:120])
        stream_url = _safe_video_path(stream_url)
        cap = cv2.VideoCapture(stream_url)

        if not cap.isOpened():
            log.error("Failed to open stream. Retrying in %.0fs …", backoff)
            with _lock:
                _stream_healthy = False
            time.sleep(backoff)
            backoff = min(backoff * 2, max_backoff)
            continue

        # connected – reset backoff
        backoff = 1.0
        log.info("Stream connected.")

        with _lock:
            _stream_healthy = True

        # Track when we last checked for URL changes
        last_url_check = time.monotonic()

        while not _stop_event.is_set():
            ok, frame = cap.read()
            if not ok:
                log.warning("Stream read failed – reconnecting …")
                break

            with _lock:
                _latest_frame = frame

            # Periodically check if the admin changed the video URL
            now = time.monotonic()
            if now - last_url_check > config.OVERLAY_POLL_INTERVAL:
                last_url_check = now
                new_url = _get_video_url()
                if new_url and new_url != _current_video_url:
                    log.info("Video URL changed — switching stream …")
                    break  # exit read loop → reconnect with new URL

        cap.release()
        with _lock:
            _stream_healthy = False

    log.info("Stream capture thread stopped.")


# ── Public helpers ────────────────────────────────────────────

def start_stream() -> None:
    """Start the background capture thread (idempotent)."""
    global _stream_thread
    if _stream_thread is not None and _stream_thread.is_alive():
        return
    _stop_event.clear()
    _stream_thread = threading.Thread(target=_capture_loop, daemon=True,
                                      name="stream-capture")
    _stream_thread.start()
    log.info("Stream capture thread started.")


def stop_stream() -> None:
    """Signal the thread to stop."""
    _stop_event.set()
    if _stream_thread is not None:
        _stream_thread.join(timeout=5)
    log.info("Stream capture thread join complete.")


def get_latest_frame() -> np.ndarray | None:
    """Return a copy of the most recent frame, or None."""
    with _lock:
        if _latest_frame is None:
            return None
        return _latest_frame.copy()


def is_stream_healthy() -> bool:
    """Check if the stream is currently connected."""
    with _lock:
        return _stream_healthy


def get_current_video_url() -> str:
    """Return the video URL currently being captured."""
    return _current_video_url


def get_resolved_stream_url() -> str | None:
    """
    Return the direct stream URL (yt-dlp resolved if YouTube).
    Used for on-demand seek-based frame grabs.
    """
    url = _current_video_url
    if not url:
        url = _get_video_url()
    if not url:
        return None
    if _is_youtube_url(url):
        return _resolve_youtube_url(url)
    return url


def grab_frame_at_time(time_sec: float) -> np.ndarray | None:
    """
    Open the video stream and seek to a specific timestamp (seconds).
    Returns a single frame at that position, or None on failure.
    Used for pre-recorded video sync with the overlay viewer.
    """
    stream_url = get_resolved_stream_url()
    if not stream_url:
        log.warning("grab_frame_at_time: no stream URL available")
        return None

    try:
        stream_url = _safe_video_path(stream_url)
        cap = cv2.VideoCapture(stream_url)
        if not cap.isOpened():
            log.warning("grab_frame_at_time: failed to open stream: %s",
                        stream_url[:120])
            return None

        # Seek to the target position
        cap.set(cv2.CAP_PROP_POS_MSEC, time_sec * 1000)

        ok, frame = cap.read()
        cap.release()

        if not ok or frame is None:
            log.warning("grab_frame_at_time: failed to read frame at %.1fs", time_sec)
            return None

        log.info("grab_frame_at_time: grabbed frame at %.1fs", time_sec)
        return frame
    except Exception as e:
        log.error("grab_frame_at_time failed: %s", e)
        return None
