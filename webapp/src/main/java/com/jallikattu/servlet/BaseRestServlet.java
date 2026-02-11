package com.jallikattu.servlet;

import java.io.BufferedReader;
import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Base class for all REST API servlets.
 * Provides JSON helpers: sendJson, sendError, readBody.
 */
public abstract class BaseRestServlet extends HttpServlet {

    protected static final Gson gson = new GsonBuilder()
            .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
            .serializeNulls()
            .registerTypeAdapter(java.time.LocalDateTime.class, new TypeAdapter<java.time.LocalDateTime>() {
                @Override
                public void write(JsonWriter out, java.time.LocalDateTime value) throws IOException {
                    if (value == null) { out.nullValue(); return; }
                    out.value(value.toString()); // ISO-8601: 2026-02-10T14:30:00
                }
                @Override
                public java.time.LocalDateTime read(JsonReader in) throws IOException {
                    if (in.peek() == JsonToken.NULL) { in.nextNull(); return null; }
                    return java.time.LocalDateTime.parse(in.nextString());
                }
            })
            .registerTypeAdapter(java.time.LocalDate.class, new TypeAdapter<java.time.LocalDate>() {
                @Override
                public void write(JsonWriter out, java.time.LocalDate value) throws IOException {
                    if (value == null) { out.nullValue(); return; }
                    out.value(value.toString()); // ISO-8601: 2026-02-10
                }
                @Override
                public java.time.LocalDate read(JsonReader in) throws IOException {
                    if (in.peek() == JsonToken.NULL) { in.nextNull(); return null; }
                    return java.time.LocalDate.parse(in.nextString());
                }
            })
            .create();

    /**
     * Send an object as JSON response with 200 OK.
     */
    protected void sendJson(HttpServletResponse resp, Object data) throws IOException {
        sendJson(resp, data, 200);
    }

    /**
     * Send an object as JSON response with a specific status code.
     */
    protected void sendJson(HttpServletResponse resp, Object data, int status) throws IOException {
        resp.setStatus(status);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(gson.toJson(data));
    }

    /**
     * Send a JSON error response.
     */
    protected void sendError(HttpServletResponse resp, String message, int status) throws IOException {
        resp.setStatus(status);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(gson.toJson(java.util.Map.of("error", message)));
    }

    /**
     * Send a JSON success message.
     */
    protected void sendSuccess(HttpServletResponse resp, String message) throws IOException {
        sendJson(resp, java.util.Map.of("message", message));
    }

    /**
     * Read JSON request body and parse into a class.
     */
    protected <T> T readBody(HttpServletRequest req, Class<T> clazz) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }
        return gson.fromJson(sb.toString(), clazz);
    }

    /**
     * Safely read a JSON body as a Map&lt;String, Object&gt; and provide
     * a helper to get values as Strings (handles Gson deserialising
     * JSON numbers as Double).
     */
    @SuppressWarnings("unchecked")
    protected java.util.Map<String, Object> readBodyMap(HttpServletRequest req) throws IOException {
        return readBody(req, java.util.Map.class);
    }

    /**
     * Get a String value from a map, handling Double/Integer/Long etc.
     */
    protected static String str(java.util.Map<String, ?> map, String key) {
        Object val = map.get(key);
        if (val == null) return null;
        if (val instanceof Number) {
            long l = ((Number) val).longValue();
            return String.valueOf(l);
        }
        return val.toString();
    }

    /**
     * Extract a path segment from pathInfo.
     * e.g. /123 → "123", /player → "player"
     */
    protected String getPathSegment(HttpServletRequest req, int index) {
        String pathInfo = req.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) return null;
        String[] parts = pathInfo.split("/");
        // parts[0] is empty string before leading /
        if (parts.length > index + 1) return parts[index + 1];
        return null;
    }
}
