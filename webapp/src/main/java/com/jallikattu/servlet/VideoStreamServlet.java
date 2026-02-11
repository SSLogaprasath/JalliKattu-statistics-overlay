package com.jallikattu.servlet;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Streams a local video file to the browser with HTTP Range support
 * so HTML5 &lt;video&gt; can seek freely.
 *
 * Usage: GET /api/video/stream?path=C:\path\to\file.mp4
 *
 * No auth required — the overlay viewer page is public.
 */
@WebServlet("/api/video/stream")
public class VideoStreamServlet extends HttpServlet {

    private static final int BUFFER_SIZE = 64 * 1024; // 64 KB

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        String filePath = req.getParameter("path");
        if (filePath == null || filePath.isBlank()) {
            resp.sendError(400, "Missing 'path' parameter");
            return;
        }

        filePath = URLDecoder.decode(filePath, StandardCharsets.UTF_8);
        File file = new File(filePath);

        if (!file.isFile() || !file.canRead()) {
            resp.sendError(404, "File not found or not readable");
            return;
        }

        long fileLength = file.length();
        String contentType = Files.probeContentType(Path.of(filePath));
        if (contentType == null) contentType = "video/mp4";

        // Parse Range header
        String rangeHeader = req.getHeader("Range");
        long start = 0;
        long end = fileLength - 1;

        if (rangeHeader != null && rangeHeader.startsWith("bytes=")) {
            String rangeSpec = rangeHeader.substring(6);
            String[] parts = rangeSpec.split("-", 2);
            try {
                start = Long.parseLong(parts[0]);
                if (parts.length > 1 && !parts[1].isEmpty()) {
                    end = Long.parseLong(parts[1]);
                }
            } catch (NumberFormatException e) {
                resp.sendError(416, "Invalid range");
                return;
            }
        }

        if (start > end || start >= fileLength) {
            resp.setHeader("Content-Range", "bytes */" + fileLength);
            resp.sendError(416, "Range not satisfiable");
            return;
        }
        end = Math.min(end, fileLength - 1);
        long contentLength = end - start + 1;

        // Set response headers
        resp.setContentType(contentType);
        resp.setHeader("Accept-Ranges", "bytes");
        resp.setHeader("Content-Length", String.valueOf(contentLength));
        resp.setHeader("Access-Control-Allow-Origin", "*");

        if (rangeHeader != null) {
            resp.setStatus(HttpServletResponse.SC_PARTIAL_CONTENT);
            resp.setHeader("Content-Range",
                    "bytes " + start + "-" + end + "/" + fileLength);
        } else {
            resp.setStatus(HttpServletResponse.SC_OK);
        }

        // Stream the bytes
        try (RandomAccessFile raf = new RandomAccessFile(file, "r");
             OutputStream out = resp.getOutputStream()) {

            raf.seek(start);
            long remaining = contentLength;
            byte[] buffer = new byte[BUFFER_SIZE];

            while (remaining > 0) {
                int toRead = (int) Math.min(buffer.length, remaining);
                int read = raf.read(buffer, 0, toRead);
                if (read == -1) break;
                out.write(buffer, 0, read);
                remaining -= read;
            }
            out.flush();
        }
    }
}
