package com.jallikattu.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.util.Map;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Proxy servlet that forwards AI detection requests to the
 * Python FastAPI micro-service running at AI_SERVICE_URL.
 *
 * Routes:
 *   GET  /api/ai/health          → GET  {AI}/health
 *   POST /api/ai/detect          → POST {AI}/detect-player
 *   POST /api/ai/detect-image    → POST {AI}/detect-player-image  (testing)
 */
@WebServlet("/api/ai/*")
public class AiDetectionServlet extends BaseRestServlet {

    /** Base URL of the Python AI service. */
    private static final String AI_SERVICE_URL =
            System.getenv("AI_SERVICE_URL") != null
                    ? System.getenv("AI_SERVICE_URL")
                    : "http://127.0.0.1:8500";

    /** Shared API key – must match the Python service's .env API_KEY. */
    private static final String API_KEY =
            System.getenv("AI_API_KEY") != null
                    ? System.getenv("AI_API_KEY")
                    : "changeme-jallikattu-2026";

    /** Timeout for connecting to the AI service (ms). */
    private static final int CONNECT_TIMEOUT = 3000;

    /** Timeout for reading a response from the AI service (ms). */
    private static final int READ_TIMEOUT = 15000;

    // ────────────────────────────────────────── GET ───

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String action = getPathSegment(req, 0);

        if ("health".equals(action)) {
            proxyGet(AI_SERVICE_URL + "/health", resp);
        } else {
            sendError(resp, "Unknown AI endpoint", 404);
        }
    }

    // ────────────────────────────────────────── POST ───

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String action = getPathSegment(req, 0);

        if ("detect".equals(action)) {
            proxyPost(AI_SERVICE_URL + "/detect-player", resp);
        } else if ("detect-image".equals(action)) {
            // Forward the raw multipart body (for testing with image upload)
            proxyRaw(AI_SERVICE_URL + "/detect-player-image", req, resp);
        } else {
            sendError(resp, "Unknown AI endpoint", 404);
        }
    }

    // ─────────────────────── proxy helpers ───

    /**
     * Proxy a simple GET request and relay the JSON response.
     */
    private void proxyGet(String url, HttpServletResponse resp) throws IOException {
        HttpURLConnection conn = null;
        try {
            conn = openConnection(url, "GET");
            relayResponse(conn, resp);
        } catch (Exception e) {
            sendError(resp, "AI service unavailable: " + e.getMessage(), 503);
        } finally {
            if (conn != null) conn.disconnect();
        }
    }

    /**
     * Proxy a POST with no body (detect-player reads from the live stream).
     */
    private void proxyPost(String url, HttpServletResponse resp) throws IOException {
        HttpURLConnection conn = null;
        try {
            conn = openConnection(url, "POST");
            conn.setRequestProperty("Content-Length", "0");
            conn.setDoOutput(true);
            relayResponse(conn, resp);
        } catch (Exception e) {
            sendError(resp, "AI service unavailable: " + e.getMessage(), 503);
        } finally {
            if (conn != null) conn.disconnect();
        }
    }

    /**
     * Proxy a POST forwarding the raw request body (multipart image upload).
     */
    private void proxyRaw(String url, HttpServletRequest req,
                          HttpServletResponse resp) throws IOException {
        HttpURLConnection conn = null;
        try {
            conn = openConnection(url, "POST");
            conn.setDoOutput(true);
            // forward content type (multipart/form-data with boundary)
            String ct = req.getContentType();
            if (ct != null) conn.setRequestProperty("Content-Type", ct);

            // stream body through
            try (InputStream in = req.getInputStream();
                 OutputStream out = conn.getOutputStream()) {
                in.transferTo(out);
            }
            relayResponse(conn, resp);
        } catch (Exception e) {
            sendError(resp, "AI service unavailable: " + e.getMessage(), 503);
        } finally {
            if (conn != null) conn.disconnect();
        }
    }

    /**
     * Open an HttpURLConnection with standard headers.
     */
    private HttpURLConnection openConnection(String url, String method) throws IOException {
        HttpURLConnection conn = (HttpURLConnection) URI.create(url).toURL().openConnection();
        conn.setRequestMethod(method);
        conn.setConnectTimeout(CONNECT_TIMEOUT);
        conn.setReadTimeout(READ_TIMEOUT);
        conn.setRequestProperty("X-API-Key", API_KEY);
        conn.setRequestProperty("Accept", "application/json");
        return conn;
    }

    /**
     * Read the upstream response and relay it to the client.
     */
    private void relayResponse(HttpURLConnection conn, HttpServletResponse resp) throws IOException {
        int status = conn.getResponseCode();
        resp.setStatus(status);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        InputStream in = (status >= 400)
                ? conn.getErrorStream()
                : conn.getInputStream();

        if (in != null) {
            try (in; OutputStream out = resp.getOutputStream()) {
                in.transferTo(out);
            }
        }
    }
}
