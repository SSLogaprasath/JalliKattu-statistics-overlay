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
 * Authentication filter - protects all /admin/* routes.
 * Redirects to login if no session exists.
 * Also checks role-based access.
 */
@WebFilter("/admin/*")
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

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // Set encoding
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("user_id") == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        String role = (String) session.getAttribute("role");
        String path = request.getServletPath();

        // Admin can access everything
        if ("admin".equals(role)) {
            chain.doFilter(req, res);
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
}
