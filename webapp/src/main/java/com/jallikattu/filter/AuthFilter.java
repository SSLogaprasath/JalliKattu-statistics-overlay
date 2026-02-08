package com.jallikattu.filter;

import java.io.IOException;
import java.util.Set;

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
 * Authentication filter - protects all /admin/* and /api/* routes.
 * Returns 401 JSON for API requests, redirects for page requests.
 */
@WebFilter(urlPatterns = {"/admin/*", "/api/*"})
public class AuthFilter implements Filter {

    // Scorer can only access these paths
    private static final Set<String> SCORER_ALLOWED = Set.of(
        "/admin/dashboard", "/admin/scoring", "/admin/winners"
    );

    // Registrar can access these paths
    private static final Set<String> REGISTRAR_ALLOWED = Set.of(
        "/admin/dashboard", "/admin/register", "/admin/winners",
        "/admin/table" // read-only viewing
    );

    // API paths scorers can access
    private static final Set<String> SCORER_API = Set.of(
        "/api/dashboard", "/api/scores", "/api/winners", "/api/matches", "/api/tables"
    );

    // API paths registrars can access
    private static final Set<String> REGISTRAR_API = Set.of(
        "/api/dashboard", "/api/registrations", "/api/winners", "/api/tables", "/api/matches", "/api/events"
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

        String path = request.getServletPath();
        boolean isApi = path.startsWith("/api/");

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

        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("user_id") == null) {
            if (isApi) {
                response.setStatus(401);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\":\"Not authenticated\"}");
            } else {
                response.sendRedirect(request.getContextPath() + "/login");
            }
            return;
        }

        String role = (String) session.getAttribute("role");

        // Super admin can access everything — no restrictions
        if ("super_admin".equals(role)) {
            chain.doFilter(req, res);
            return;
        }

        // Admin can access everything
        if ("admin".equals(role)) {
            chain.doFilter(req, res);
            return;
        }

        // --- API role checks ---
        if (isApi) {
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
            return;
        }

        // Registrar access check
        if ("registrar".equals(role)) {
            if (REGISTRAR_ALLOWED.contains(path)) {
                // For /admin/table, registrar can only view (no add/edit/delete)
                if ("/admin/table".equals(path)) {
                    String action = request.getParameter("action");
                    if (action != null && !"".equals(action)) {
                        request.setAttribute("error", "Registrars can only view table data");
                        response.sendRedirect(request.getContextPath() + "/admin/dashboard");
                        return;
                    }
                }
                chain.doFilter(req, res);
                return;
            }
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
            return;
        }

        // Scorer access check
        if ("scorer".equals(role)) {
            if (SCORER_ALLOWED.contains(path)) {
                chain.doFilter(req, res);
                return;
            }
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
            return;
        }

        response.sendRedirect(request.getContextPath() + "/login");
    }

    /** Extract the base API path, e.g. /api/scores/123 → /api/scores */
    private String getApiBase(String path) {
        // path = /api/scores/123 → parts = ["", "api", "scores", "123"]
        String[] parts = path.split("/");
        if (parts.length >= 3) return "/" + parts[1] + "/" + parts[2];
        return path;
    }
}
