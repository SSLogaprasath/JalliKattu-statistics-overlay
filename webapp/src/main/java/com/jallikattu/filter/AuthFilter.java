package com.jallikattu.filter;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import com.jallikattu.util.AuthDAO;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Authentication filter - protects all /api/* routes.
 * Returns 401/403 JSON for unauthenticated/unauthorized API requests.
 */
@WebFilter(urlPatterns = {"/api/*"})
public class AuthFilter implements Filter {

    // API paths scorers can access
    private static final Set<String> SCORER_API = Set.of(
        "/api/dashboard", "/api/scores", "/api/winners", "/api/matches", "/api/tables", "/api/overlay", "/api/ai"
    );

    // API paths registrars can access
    private static final Set<String> REGISTRAR_API = Set.of(
        "/api/dashboard", "/api/registrations", "/api/winners", "/api/tables", "/api/matches", "/api/events",
        "/api/scores", "/api/match-draw", "/api/ai"
    );

    // API paths players can access (self-service)
    private static final Set<String> PLAYER_API = Set.of(
        "/api/player", "/api/dashboard"
    );

    // API paths owners can access (self-service)
    private static final Set<String> OWNER_API = Set.of(
        "/api/owner", "/api/dashboard"
    );

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        // Allow CORS preflight through (OPTIONS requests carry no credentials)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            chain.doFilter(req, res);
            return;
        }

        String path = request.getServletPath();

        // Allow /api/auth (login/logout) without session
        if (path.startsWith("/api/auth")) {
            chain.doFilter(req, res);
            return;
        }

        // Allow /api/public (stats, leaderboard, self-registration) without session
        if (path.startsWith("/api/public")) {
            chain.doFilter(req, res);
            return;
        }

        // Allow /api/overlay/current and /api/overlay/playback without session (viewers poll/report)
        if (path.startsWith("/api/overlay")) {
            String pathInfo = request.getPathInfo();
            if (pathInfo != null && (pathInfo.equals("/current") || pathInfo.equals("/playback"))) {
                chain.doFilter(req, res);
                return;
            }
        }

        // Allow /api/video/stream without session (overlay viewer plays local video files)
        if (path.startsWith("/api/video")) {
            chain.doFilter(req, res);
            return;
        }

        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("user_id") == null) {
            // Fallback: check Authorization Bearer token (survives container restarts)
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7).trim();
                try {
                    Map<String, String> user = AuthDAO.validateToken(token);
                    if (user != null) {
                        // Re-establish server session from token
                        session = request.getSession(true);
                        session.setAttribute("user_id", user.get("user_id"));
                        session.setAttribute("username", user.get("username"));
                        session.setAttribute("full_name", user.get("full_name"));
                        session.setAttribute("role", user.get("role"));
                        session.setMaxInactiveInterval(30 * 60);
                    }
                } catch (Exception ignored) {}
            }
        }

        if (session == null || session.getAttribute("user_id") == null) {
            response.setStatus(401);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Not authenticated\"}");
            return;
        }

        String role = (String) session.getAttribute("role");

        // Super admin & admin can access everything
        if ("super_admin".equals(role) || "admin".equals(role)) {
            chain.doFilter(req, res);
            return;
        }

        // Role-based API access
        String apiBase = getApiBase(path);
        if ("registrar".equals(role) && REGISTRAR_API.contains(apiBase)) {
            chain.doFilter(req, res);
            return;
        }
        if ("scorer".equals(role) && SCORER_API.contains(apiBase)) {
            chain.doFilter(req, res);
            return;
        }
        if ("player".equals(role) && PLAYER_API.contains(apiBase)) {
            chain.doFilter(req, res);
            return;
        }
        if ("owner".equals(role) && OWNER_API.contains(apiBase)) {
            chain.doFilter(req, res);
            return;
        }

        response.setStatus(403);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\":\"Access denied\"}");
    }

    /** Extract the base API path, e.g. /api/scores/123 → /api/scores */
    private String getApiBase(String path) {
        String[] parts = path.split("/");
        if (parts.length >= 3) return "/" + parts[1] + "/" + parts[2];
        return path;
    }
}
