package com.jallikattu.servlet;

import java.io.IOException;
import java.util.Map;

import com.jallikattu.util.AuthDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Handles login, logout and user management.
 */
@WebServlet(urlPatterns = {"/login", "/logout", "/admin/users"})
public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getServletPath();

        if ("/logout".equals(path)) {
            HttpSession session = request.getSession(false);
            if (session != null) session.invalidate();
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        if ("/admin/users".equals(path)) {
            // Only admins can manage users
            HttpSession session = request.getSession(false);
            String role = (String) session.getAttribute("role");
            if (!"admin".equals(role)) {
                response.sendRedirect(request.getContextPath() + "/admin/dashboard");
                return;
            }
            String action = request.getParameter("action");
            if ("delete".equals(action)) {
                try {
                    int userId = Integer.parseInt(request.getParameter("user_id"));
                    AuthDAO.deleteUser(userId);
                    response.sendRedirect(request.getContextPath() + "/admin/users?msg=deleted");
                } catch (Exception e) {
                    request.setAttribute("error", e.getMessage());
                    loadUsersPage(request, response);
                }
                return;
            }
            loadUsersPage(request, response);
            return;
        }

        // Login page
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user_id") != null) {
            response.sendRedirect(request.getContextPath() + "/admin/dashboard");
            return;
        }
        request.getRequestDispatcher("/WEB-INF/views/login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getServletPath();

        if ("/admin/users".equals(path)) {
            // Create new user (admin only)
            HttpSession session = request.getSession(false);
            String role = (String) session.getAttribute("role");
            if (!"admin".equals(role)) {
                response.sendRedirect(request.getContextPath() + "/admin/dashboard");
                return;
            }
            try {
                String username = request.getParameter("username");
                String password = request.getParameter("password");
                String fullName = request.getParameter("full_name");
                String newRole = request.getParameter("role");
                AuthDAO.createUser(username, password, fullName, newRole);
                response.sendRedirect(request.getContextPath() + "/admin/users?msg=created");
            } catch (Exception e) {
                request.setAttribute("error", e.getMessage());
                loadUsersPage(request, response);
            }
            return;
        }

        // Login attempt
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        try {
            Map<String, String> user = AuthDAO.authenticate(username, password);
            if (user != null) {
                HttpSession session = request.getSession(true);
                session.setAttribute("user_id", user.get("user_id"));
                session.setAttribute("username", user.get("username"));
                session.setAttribute("full_name", user.get("full_name"));
                session.setAttribute("role", user.get("role"));
                session.setMaxInactiveInterval(30 * 60); // 30 min timeout
                response.sendRedirect(request.getContextPath() + "/admin/dashboard");
            } else {
                request.setAttribute("error", "Invalid username or password");
                request.getRequestDispatcher("/WEB-INF/views/login.jsp").forward(request, response);
            }
        } catch (Exception e) {
            request.setAttribute("error", "Database error: " + e.getMessage());
            request.getRequestDispatcher("/WEB-INF/views/login.jsp").forward(request, response);
        }
    }

    private void loadUsersPage(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            request.setAttribute("users", AuthDAO.getAllUsers());
        } catch (Exception e) {
            request.setAttribute("error", e.getMessage());
        }
        request.getRequestDispatcher("/WEB-INF/views/users.jsp").forward(request, response);
    }
}
