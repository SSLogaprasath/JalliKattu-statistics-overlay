package com.jallikattu.filter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Sliding-window rate limiter. Tracks requests per user (or IP for
 * unauthenticated calls) and returns 429 when the limit is exceeded.
 *
 * Limits are role-based:
 *   super_admin  → exempt
 *   admin        → 60 POST, 200 GET  per minute
 *   scorer       → 60 POST, 200 GET  per minute
 *   registrar    → 60 POST, 200 GET  per minute
 *   player/owner → 20 POST, 120 GET  per minute
 *   unauth       →  5 POST,  30 GET  per minute
 */
public class RateLimitFilter implements Filter {

    // ── Configurable limits ────────────────────────────────────────────
    private static final long WINDOW_MS = 60_000; // 1 minute

    // POST limits per role
    private static final int POST_ADMIN      = 60;
    private static final int POST_SCORER     = 60;
    private static final int POST_REGISTRAR  = 60;
    private static final int POST_USER       = 20;  // player / owner
    private static final int POST_UNAUTH     =  5;

    // GET limits per role
    private static final int GET_ADMIN       = 200;
    private static final int GET_SCORER      = 200;
    private static final int GET_REGISTRAR   = 200;
    private static final int GET_USER        = 120;
    private static final int GET_UNAUTH      =  30;

    // ── Internal state ─────────────────────────────────────────────────
    // key = "userId:POST" or "ip:GET"
    private final ConcurrentHashMap<String, SlidingWindow> windows = new ConcurrentHashMap<>();
    private ScheduledExecutorService cleaner;

    @Override
    public void init(FilterConfig cfg) {
        // Purge stale entries every 5 minutes
        cleaner = Executors.newSingleThreadScheduledExecutor(r -> {
            Thread t = new Thread(r, "rate-limit-cleanup");
            t.setDaemon(true);
            return t;
        });
        cleaner.scheduleAtFixedRate(this::purgeStale, 5, 5, TimeUnit.MINUTES);
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest  request  = (HttpServletRequest)  req;
        HttpServletResponse response = (HttpServletResponse) res;

        String method = request.getMethod().toUpperCase();
        // Only rate-limit GET and POST (OPTIONS, HEAD etc. pass through)
        if (!"GET".equals(method) && !"POST".equals(method) && !"PUT".equals(method) && !"DELETE".equals(method)) {
            chain.doFilter(req, res);
            return;
        }

        // Treat PUT/DELETE same as POST for limit purposes
        String bucket = ("GET".equals(method)) ? "GET" : "POST";

        // Identify caller
        HttpSession session = request.getSession(false);
        String role = null;
        String callerId;

        if (session != null && session.getAttribute("user_id") != null) {
            callerId = "u:" + session.getAttribute("user_id");
            role = (String) session.getAttribute("role");
        } else {
            callerId = "ip:" + getClientIp(request);
        }

        // Super admin is exempt
        if ("super_admin".equals(role)) {
            chain.doFilter(req, res);
            return;
        }

        int limit = getLimit(role, bucket);
        String key = callerId + ":" + bucket;

        SlidingWindow window = windows.computeIfAbsent(key, k -> new SlidingWindow());
        if (!window.allow(limit, WINDOW_MS)) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setHeader("Retry-After", "60");
            response.getWriter().write("{\"error\":\"Too many requests. Please slow down.\"}");
            return;
        }

        chain.doFilter(req, res);
    }

    @Override
    public void destroy() {
        if (cleaner != null) cleaner.shutdownNow();
    }

    // ── Helpers ────────────────────────────────────────────────────────

    private int getLimit(String role, String bucket) {
        boolean isPost = "POST".equals(bucket);
        if (role == null) return isPost ? POST_UNAUTH : GET_UNAUTH;
        return switch (role) {
            case "admin"     -> isPost ? POST_ADMIN     : GET_ADMIN;
            case "scorer"    -> isPost ? POST_SCORER    : GET_SCORER;
            case "registrar" -> isPost ? POST_REGISTRAR : GET_REGISTRAR;
            default          -> isPost ? POST_USER      : GET_USER; // player, owner
        };
    }

    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            return xff.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private void purgeStale() {
        long now = System.currentTimeMillis();
        windows.entrySet().removeIf(e -> now - e.getValue().lastAccess > WINDOW_MS * 2);
    }

    // ── Sliding window counter ─────────────────────────────────────────

    private static class SlidingWindow {
        private final long[] timestamps;
        private int head = 0;
        private int count = 0;
        volatile long lastAccess;

        SlidingWindow() {
            // Max possible limit is 200, so array of 201 is enough
            timestamps = new long[201];
        }

        synchronized boolean allow(int limit, long windowMs) {
            long now = System.currentTimeMillis();
            lastAccess = now;
            long cutoff = now - windowMs;

            // Evict expired entries
            while (count > 0 && timestamps[head] <= cutoff) {
                head = (head + 1) % timestamps.length;
                count--;
            }

            if (count >= limit) {
                return false;
            }

            // Record this request
            int tail = (head + count) % timestamps.length;
            timestamps[tail] = now;
            count++;
            return true;
        }
    }
}
