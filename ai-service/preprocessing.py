"""
Frame preprocessing utilities.

Applies a pipeline of image transformations to improve OCR accuracy
on noisy, motion-blurred Jallikattu video frames.
"""

import cv2
import numpy as np


def preprocess_for_ocr(crop: np.ndarray) -> np.ndarray:
    """
    Full preprocessing pipeline for a cropped bib / jersey region.

    Steps:
        1. Resize to a minimum width (256px) so small digits become readable.
        2. Convert to grayscale.
        3. CLAHE contrast enhancement — makes faded / dusty numbers pop.
        4. Bilateral filter — smooths noise while keeping edges (digits) sharp.
        5. Adaptive threshold — binarises the image for clean OCR input.

    Args:
        crop: BGR numpy array of the cropped region.

    Returns:
        Processed BGR (3-channel) image ready for OCR.
    """
    h, w = crop.shape[:2]

    # 1. Upscale small crops so OCR can read the digits
    min_width = 256
    if w < min_width:
        scale = min_width / w
        crop = cv2.resize(crop, None, fx=scale, fy=scale,
                          interpolation=cv2.INTER_CUBIC)

    # 2. Grayscale
    gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)

    # 3. CLAHE (Contrast Limited Adaptive Histogram Equalisation)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)

    # 4. Bilateral filter — keeps edges, removes noise
    smoothed = cv2.bilateralFilter(enhanced, d=9,
                                   sigmaColor=75, sigmaSpace=75)

    # 5. Adaptive threshold for binarisation
    binary = cv2.adaptiveThreshold(
        smoothed, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        blockSize=11,
        C=2,
    )

    # Convert back to 3-channel for OCR libraries that expect BGR
    result = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)
    return result


def sharpen(image: np.ndarray) -> np.ndarray:
    """Optional extra sharpening pass using an unsharp-mask kernel."""
    kernel = np.array([
        [0, -1, 0],
        [-1,  5, -1],
        [0, -1, 0],
    ], dtype=np.float32)
    return cv2.filter2D(image, -1, kernel)


def crop_upper_body(bbox: tuple[int, int, int, int],
                    frame: np.ndarray) -> np.ndarray:
    """
    Given a full person bounding box, crop only the upper ~40%
    where the bib / jersey number is most likely located.

    Args:
        bbox: (x1, y1, x2, y2) pixel coordinates.
        frame: Full video frame (BGR).

    Returns:
        Cropped BGR image of the upper body region.
    """
    x1, y1, x2, y2 = bbox
    h = y2 - y1
    # take the top 40 % of the person bounding box
    upper_y2 = y1 + int(h * 0.40)
    return frame[y1:upper_y2, x1:x2].copy()
