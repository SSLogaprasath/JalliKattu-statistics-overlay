package com.jallikattu.servlet;

import java.io.IOException;
import java.util.Map;

import com.jallikattu.util.AuthDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * REST API for authentication.
 * POST /api/auth/login   - login
 * POST /api/auth/logout  - logout
 * GET  /api/auth/session  - get current session info
 * GET  /api/auth/users    - list users (admin only)
 * POST /api/auth/users    - create user (admin only)
 * DELETE /api/auth/users/{id} - delete user (admin only)
 */
@WebServlet("/api/auth/*")
public class AuthApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String seg = getPathSegment(req, 0);

        if ("session".equals(seg)) {
            HttpSession session = req.getSession(false);
            if (session != null && session.getAttribute("user_id") != null) {
                sendJson(resp, Map.of(
                    "user_id", session.getAttribute("user_id"),
                    "username", session.getAttribute("username"),
                    "full_name", session.getAttribute("full_name"),
                    "role", session.getAttribute("role")
                ));
            } else {
                sendError(resp, "Not authenticated", 401);
            }
            return;
        }

        if ("users".equals(seg)) {
            HttpSession session = req.getSession(false);
            String role = session != null ? (String) session.getAttribute("role") : null;
            if (!"admin".equals(role) && !"super_admin".equals(role)) {
                sendError(resp, "Admin access required", 403);
                return;
            }
            try {
                sendJson(resp, AuthDAO.getAllUsers());
            } catch (Exception e) {
                sendError(resp, e.getMessage(), 500);
            }
            return;
        }

        sendError(resp, "Unknown endpoint", 404);
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String seg = getPathSegment(req, 0);

        if ("login".equals(seg)) {
            Map<String, String> body = readBody(req, Map.class);
            String username = body.get("username");
            String password = body.get("password");
            if (username == null || password == null) {
                sendError(resp, "Username and password required", 400);
                return;
            }
            try {
                Map<String, String> user = AuthDAO.authenticate(username, password);
                if (user != null) {
                    HttpSession session = req.getSession(true);
                    session.setAttribute("user_id", user.get("user_id"));
                    session.setAttribute("username", user.get("username"));
                    session.setAttribute("full_name", user.get("full_name"));
                    session.setAttribute("role", user.get("role"));
                    session.setMaxInactiveInterval(30 * 60);
                    sendJson(resp, user);
                } else {
                    sendError(resp, "Invalid username or password", 401);
                }
            } catch (Exception e) {
                sendError(resp, "Database error: " + e.getMessage(), 500);
            }
            return;
        }

        if ("logout".equals(seg)) {
            HttpSession session = req.getSession(false);
            if (session != null) session.invalidate();
            sendSuccess(resp, "Logged out");
            return;
        }

        if ("users".equals(seg)) {
            HttpSession session = req.getSession(false);
            String role = session != null ? (String) session.getAttribute("role") : null;
            if (!"admin".equals(role) && !"super_admin".equals(role)) {
                sendError(resp, "Admin access required", 403);
                return;
            }
            try {
                Map<String, String> body = readBody(req, Map.class);
                AuthDAO.createUser(body.get("username"), body.get("password"),
                                   body.get("full_name"), body.get("role"));
                sendSuccess(resp, "User created");
            } catch (Exception e) {
                sendError(resp, e.getMessage(), 500);
            }
            return;
        }

        sendError(resp, "Unknown endpoint", 404);
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // PUT /api/auth/users/{id} - update user role
        String seg1 = getPathSegment(req, 0);
        String seg2 = getPathSegment(req, 1);

        if ("users".equals(seg1) && seg2 != null) {
            HttpSession session = req.getSession(false);
            String role = session != null ? (String) session.getAttribute("role") : null;
            if (!"super_admin".equals(role)) {
                sendError(resp, "Super Admin access required", 403);
                return;
            }
            try {
                Map<String, String> body = readBody(req, Map.class);
                String newRole = body.get("role");
                if (newRole == null || newRole.isEmpty()) {
                    sendError(resp, "Role is required", 400);
                    return;
                }
                boolean ok = AuthDAO.updateUserRole(Integer.parseInt(seg2), newRole);
                if (ok) sendSuccess(resp, "Role updated");
                else sendError(resp, "User not found", 404);
            } catch (Exception e) {
                sendError(resp, e.getMessage(), 500);
            }
            return;
        }
        sendError(resp, "Unknown endpoint", 404);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // DELETE /api/auth/users/{id}
        String seg1 = getPathSegment(req, 0);
        String seg2 = getPathSegment(req, 1);

        if ("users".equals(seg1) && seg2 != null) {
            HttpSession session = req.getSession(false);
            String role = session != null ? (String) session.getAttribute("role") : null;
            if (!"admin".equals(role) && !"super_admin".equals(role)) {
                sendError(resp, "Admin access required", 403);
                return;
            }
            try {
                AuthDAO.deleteUser(Integer.parseInt(seg2));
                sendSuccess(resp, "User deleted");
            } catch (Exception e) {
                sendError(resp, e.getMessage(), 500);
            }
            return;
        }

        sendError(resp, "Unknown endpoint", 404);
    }
}
