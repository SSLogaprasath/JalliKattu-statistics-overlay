package com.jallikattu.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.jallikattu.util.DBConnection;
import com.jallikattu.util.GenericDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Handles player/bull registration and match scheduling.
 * Accessible by: admin, registrar
 */
@WebServlet("/admin/register")
public class RegistrationServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String type = request.getParameter("type"); // player, bull, match
        if (type == null) type = "player";

        try {
            // Load lookup data for dropdowns
            request.setAttribute("matches", GenericDAO.getAll("match"));
            request.setAttribute("players", GenericDAO.getAll("player"));
            request.setAttribute("bulls", GenericDAO.getAll("bull_table"));
            request.setAttribute("owners", GenericDAO.getAll("owner"));
            request.setAttribute("breeds", GenericDAO.getAll("bull_breed"));
            request.setAttribute("locations", GenericDAO.getAll("location"));
            request.setAttribute("organizers", GenericDAO.getAll("organizer"));
            request.setAttribute("roundTypes", GenericDAO.getAll("round_type"));
            request.setAttribute("batches", GenericDAO.getAll("batch"));

            // Load scheduled matches for registration
            request.setAttribute("scheduledMatches", getMatchesByStatus("Scheduled"));

            // Load pending registrations
            request.setAttribute("pendingPlayers", getPendingPlayerRegistrations());
            request.setAttribute("pendingBulls", getPendingBullRegistrations());

        } catch (Exception e) {
            request.setAttribute("error", "Database error: " + e.getMessage());
        }

        request.setAttribute("type", type);
        request.getRequestDispatcher("/WEB-INF/views/register.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");

        try {
            switch (action) {
                case "register_player" -> {
                    // Register a player for a match
                    String matchId = request.getParameter("match_id");
                    String playerId = request.getParameter("player_id");
                    String roundTypeId = request.getParameter("round_type_id");
                    String batchId = request.getParameter("batch_id");
                    registerPlayerForMatch(matchId, playerId, roundTypeId, batchId);
                    response.sendRedirect(request.getContextPath() + "/admin/register?type=player&msg=player_registered");
                }
                case "register_bull" -> {
                    // Register a bull for a match
                    String matchId = request.getParameter("match_id");
                    String bullId = request.getParameter("bull_id");
                    String roundTypeId = request.getParameter("round_type_id");
                    registerBullForMatch(matchId, bullId, roundTypeId);
                    response.sendRedirect(request.getContextPath() + "/admin/register?type=bull&msg=bull_registered");
                }
                case "schedule_match" -> {
                    // Schedule a new match
                    String matchId = request.getParameter("match_id");
                    String matchName = request.getParameter("match_name");
                    String locationId = request.getParameter("location_id");
                    String matchDate = request.getParameter("match_date");
                    String playerLimit = request.getParameter("player_limit");
                    String bullLimit = request.getParameter("bull_limit");
                    String organizerId = request.getParameter("organizer_id");
                    scheduleMatch(matchId, matchName, locationId, matchDate, playerLimit, bullLimit, organizerId);
                    response.sendRedirect(request.getContextPath() + "/admin/register?type=match&msg=match_scheduled");
                }
                case "approve_player" -> {
                    String matchId = request.getParameter("match_id");
                    String playerId = request.getParameter("player_id");
                    String roundTypeId = request.getParameter("round_type_id");
                    approvePlayerRegistration(matchId, playerId, roundTypeId);
                    response.sendRedirect(request.getContextPath() + "/admin/register?type=player&msg=player_approved");
                }
                case "approve_bull" -> {
                    String matchId = request.getParameter("match_id");
                    String bullId = request.getParameter("bull_id");
                    String roundTypeId = request.getParameter("round_type_id");
                    approveBullRegistration(matchId, bullId, roundTypeId);
                    response.sendRedirect(request.getContextPath() + "/admin/register?type=bull&msg=bull_approved");
                }
                default -> response.sendRedirect(request.getContextPath() + "/admin/register");
            }
        } catch (Exception e) {
            request.setAttribute("error", e.getMessage());
            doGet(request, response);
        }
    }

    private void registerPlayerForMatch(String matchId, String playerId, String roundTypeId, String batchId) throws SQLException {
        String sql = "INSERT INTO player_match_history (match_id, round_type_id, batch_id, player_id, bull_caught, penalties, status) VALUES (?, ?, ?, ?, 0, 0, 'registered')";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            ps.setInt(2, Integer.parseInt(roundTypeId));
            ps.setInt(3, Integer.parseInt(batchId));
            ps.setInt(4, Integer.parseInt(playerId));
            ps.executeUpdate();
        }
    }

    private void registerBullForMatch(String matchId, String bullId, String roundTypeId) throws SQLException {
        // Get bull's player_id as 0 (no tamer yet), minimal defaults
        String sql = "INSERT INTO bull_match_history (match_id, bull_id, round_type_id, player_id, aggression, play_area, difficulty, penalties, release_count, prize_id, winner, status) " +
                     "VALUES (?, ?, ?, (SELECT MIN(player_id) FROM player), 0, 0, 0, 0, 0, (SELECT MIN(prize_id) FROM prize), 0, 'registered')";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            ps.setInt(2, Integer.parseInt(bullId));
            ps.setInt(3, Integer.parseInt(roundTypeId));
            ps.executeUpdate();
        }
    }

    private void scheduleMatch(String matchId, String matchName, String locationId, String matchDate, String playerLimit, String bullLimit, String organizerId) throws SQLException {
        String sql = "INSERT INTO `match` (match_id, match_name, location_id, match_date, player_limit, bull_limit, registered_player_count, registered_bull_count, organizer_id, status) VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, 'Scheduled')";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            ps.setString(2, matchName);
            ps.setInt(3, Integer.parseInt(locationId));
            ps.setString(4, matchDate);
            ps.setInt(5, Integer.parseInt(playerLimit));
            ps.setInt(6, Integer.parseInt(bullLimit));
            ps.setInt(7, Integer.parseInt(organizerId));
            ps.executeUpdate();
        }
    }

    private void approvePlayerRegistration(String matchId, String playerId, String roundTypeId) throws SQLException {
        String sql = "UPDATE player_match_history SET status = 'approved' WHERE match_id = ? AND player_id = ? AND round_type_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            ps.setInt(2, Integer.parseInt(playerId));
            ps.setInt(3, Integer.parseInt(roundTypeId));
            ps.executeUpdate();
        }
    }

    private void approveBullRegistration(String matchId, String bullId, String roundTypeId) throws SQLException {
        String sql = "UPDATE bull_match_history SET status = 'approved' WHERE match_id = ? AND bull_id = ? AND round_type_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            ps.setInt(2, Integer.parseInt(bullId));
            ps.setInt(3, Integer.parseInt(roundTypeId));
            ps.executeUpdate();
        }
    }

    private List<Map<String, Object>> getMatchesByStatus(String status) throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        String sql = "SELECT m.*, l.district, l.area FROM `match` m JOIN location l ON m.location_id = l.location_id WHERE m.status = ? ORDER BY m.match_date";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, status);
            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++) {
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
                    }
                    rows.add(row);
                }
            }
        }
        return rows;
    }

    private List<Map<String, Object>> getPendingPlayerRegistrations() throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        String sql = "SELECT pmh.match_id, pmh.player_id, pmh.round_type_id, pmh.status, " +
                     "p.player_name, m.match_name, rt.round_name " +
                     "FROM player_match_history pmh " +
                     "JOIN player p ON pmh.player_id = p.player_id " +
                     "JOIN `match` m ON pmh.match_id = m.match_id " +
                     "JOIN round_type rt ON pmh.round_type_id = rt.round_type_id " +
                     "ORDER BY pmh.status, m.match_name";
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            ResultSetMetaData meta = rs.getMetaData();
            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                for (int i = 1; i <= meta.getColumnCount(); i++) {
                    row.put(meta.getColumnLabel(i), rs.getObject(i));
                }
                rows.add(row);
            }
        }
        return rows;
    }

    private List<Map<String, Object>> getPendingBullRegistrations() throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        String sql = "SELECT bmh.match_id, bmh.bull_id, bmh.round_type_id, bmh.status, " +
                     "bt.bull_name, m.match_name, rt.round_name " +
                     "FROM bull_match_history bmh " +
                     "JOIN bull_table bt ON bmh.bull_id = bt.bull_id " +
                     "JOIN `match` m ON bmh.match_id = m.match_id " +
                     "JOIN round_type rt ON bmh.round_type_id = rt.round_type_id " +
                     "ORDER BY bmh.status, m.match_name";
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            ResultSetMetaData meta = rs.getMetaData();
            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                for (int i = 1; i <= meta.getColumnCount(); i++) {
                    row.put(meta.getColumnLabel(i), rs.getObject(i));
                }
                rows.add(row);
            }
        }
        return rows;
    }
}
