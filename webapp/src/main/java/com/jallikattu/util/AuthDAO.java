package com.jallikattu.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Data Access Object for authentication and user management.
 */
public class AuthDAO {

    /**
     * Hash a password using SHA-256 (matches MySQL SHA2(password, 256)).
     */
    public static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte b : hash) {
                String h = Integer.toHexString(0xff & b);
                if (h.length() == 1) hex.append('0');
                hex.append(h);
            }
            return hex.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 not available", e);
        }
    }

    /**
     * Authenticate a user by username and password.
     * Returns user map (user_id, username, full_name, role) or null if invalid.
     */
    public static Map<String, String> authenticate(String username, String password) throws SQLException {
        String hash = hashPassword(password);
        String sql = "SELECT user_id, username, full_name, role FROM app_user WHERE username = ? AND pass_hash = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, username);
            ps.setString(2, hash);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Map<String, String> user = new LinkedHashMap<>();
                    user.put("user_id", rs.getString("user_id"));
                    user.put("username", rs.getString("username"));
                    user.put("full_name", rs.getString("full_name"));
                    user.put("role", rs.getString("role"));
                    return user;
                }
            }
        }
        return null;
    }

    /**
     * Create a new user.
     */
    public static void createUser(String username, String password, String fullName, String role) throws SQLException {
        String hash = hashPassword(password);
        String sql = "INSERT INTO app_user (username, pass_hash, full_name, role) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, username);
            ps.setString(2, hash);
            ps.setString(3, fullName);
            ps.setString(4, role);
            ps.executeUpdate();
        }
    }

    /**
     * Get all users (without password hash).
     */
    public static List<Map<String, String>> getAllUsers() throws SQLException {
        List<Map<String, String>> users = new ArrayList<>();
        String sql = "SELECT user_id, username, full_name, role, created_time FROM app_user ORDER BY user_id";
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                Map<String, String> user = new LinkedHashMap<>();
                user.put("user_id", rs.getString("user_id"));
                user.put("username", rs.getString("username"));
                user.put("full_name", rs.getString("full_name"));
                user.put("role", rs.getString("role"));
                user.put("created_time", rs.getString("created_time"));
                users.add(user);
            }
        }
        return users;
    }

    /**
     * Delete a user by ID (prevent deleting the last admin).
     */
    public static boolean deleteUser(int userId) throws SQLException {
        // Check if this is the last admin
        String checkSql = "SELECT COUNT(*) FROM app_user WHERE role = 'admin'";
        String roleSql = "SELECT role FROM app_user WHERE user_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            // Get user's role
            String role;
            try (PreparedStatement ps = conn.prepareStatement(roleSql)) {
                ps.setInt(1, userId);
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) return false;
                    role = rs.getString("role");
                }
            }
            // If admin, check count
            if ("admin".equals(role)) {
                try (Statement stmt = conn.createStatement();
                     ResultSet rs = stmt.executeQuery(checkSql)) {
                    rs.next();
                    if (rs.getInt(1) <= 1) {
                        throw new SQLException("Cannot delete the last admin user");
                    }
                }
            }
            // Delete
            try (PreparedStatement ps = conn.prepareStatement("DELETE FROM app_user WHERE user_id = ?")) {
                ps.setInt(1, userId);
                return ps.executeUpdate() > 0;
            }
        }
    }
}
