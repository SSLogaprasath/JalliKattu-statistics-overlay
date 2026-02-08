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
import com.jallikattu.util.StatsDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * REST API for player/bull registration and match scheduling.
 * GET  /api/registrations             - get lookup data + pending registrations
 * POST /api/registrations/player      - register player for match
 * POST /api/registrations/bull        - register bull for match
 * POST /api/registrations/match       - schedule a new match
 * POST /api/registrations/approve-player - approve player registration
 * POST /api/registrations/approve-bull   - approve bull registration
 */
@WebServlet("/api/registrations/*")
public class RegistrationApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("matches", GenericDAO.getAll("match"));
            data.put("players", GenericDAO.getAll("player"));
            data.put("bulls", GenericDAO.getAll("bull_table"));
            data.put("owners", GenericDAO.getAll("owner"));
            data.put("breeds", GenericDAO.getAll("bull_breed"));
            data.put("locations", GenericDAO.getAll("location"));
            data.put("organizers", GenericDAO.getAll("organizer"));
            data.put("roundTypes", GenericDAO.getAll("round_type"));
            data.put("batches", GenericDAO.getAll("batch"));
            data.put("users", GenericDAO.getAll("app_user"));
            data.put("scheduledMatches", getMatchesByStatus("Scheduled"));
            data.put("pendingPlayers", getPendingPlayerRegistrations());
            data.put("pendingBulls", getPendingBullRegistrations());
            sendJson(resp, data);
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String action = getPathSegment(req, 0);
        if (action == null) {
            sendError(resp, "Action required: player, bull, match, approve-player, approve-bull", 400);
            return;
        }
        try {
            Map<String, Object> body = readBodyMap(req);
            switch (action) {
                case "player" -> {
                    String mId = str(body, "match_id");
                    if (!StatsDAO.canRegisterPlayer(mId)) {
                        sendError(resp, "Match has reached its player limit", 409);
                        return;
                    }
                    registerPlayerForMatch(mId, str(body, "player_id"),
                            str(body, "round_type_id"), str(body, "batch_id"));
                    sendSuccess(resp, "Player registered");
                }
                case "bull" -> {
                    String mId = str(body, "match_id");
                    if (!StatsDAO.canRegisterBull(mId)) {
                        sendError(resp, "Match has reached its bull limit", 409);
                        return;
                    }
                    registerBullForMatch(mId, str(body, "bull_id"),
                            str(body, "round_type_id"));
                    sendSuccess(resp, "Bull registered");
                }
                case "match" -> {
                    scheduleMatch(str(body, "match_id"), str(body, "match_name"),
                            str(body, "location_id"), str(body, "match_date"),
                            str(body, "player_limit"), str(body, "bull_limit"),
                            str(body, "organizer_id"));
                    sendSuccess(resp, "Match scheduled");
                }
                case "approve-player" -> {
                    approvePlayerRegistration(str(body, "match_id"), str(body, "player_id"),
                            str(body, "round_type_id"));
                    sendSuccess(resp, "Player approved");
                }
                case "approve-bull" -> {
                    approveBullRegistration(str(body, "match_id"), str(body, "bull_id"),
                            str(body, "round_type_id"));
                    sendSuccess(resp, "Bull approved");
                }
                case "create-player" -> {
                    int newId = getNextId("player", "player_id");
                    createPlayer(newId, str(body, "player_name"), str(body, "dob"),
                            str(body, "aadhaar"), str(body, "phone"), str(body, "user_id"));
                    sendSuccess(resp, "Player created (ID " + newId + ")");
                }
                case "create-bull" -> {
                    int newId = getNextId("bull_table", "bull_id");
                    createBull(newId, str(body, "bull_name"), str(body, "age"),
                            str(body, "owner_id"), str(body, "breed_id"), str(body, "fitness_cert"));
                    sendSuccess(resp, "Bull created (ID " + newId + ")");
                }
                case "create-owner" -> {
                    int newId = getNextId("owner", "owner_id");
                    createOwner(newId, str(body, "name"), str(body, "aadhaar"), str(body, "user_id"));
                    sendSuccess(resp, "Owner created (ID " + newId + ")");
                }
                case "create-organizer" -> {
                    int newId = getNextId("organizer", "organizer_id");
                    createOrganizer(newId, str(body, "organizer_name"));
                    sendSuccess(resp, "Organizer created (ID " + newId + ")");
                }
                default -> sendError(resp, "Unknown action: " + action, 400);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
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

    private void scheduleMatch(String matchId, String matchName, String locationId, String matchDate,
                                String playerLimit, String bullLimit, String organizerId) throws SQLException {
        String sql = "INSERT INTO `match` (match_id, match_name, location_id, match_date, player_limit, bull_limit, registered_player_count, registered_bull_count, organizer_id, status) " +
                     "VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, 'Scheduled')";
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
                    for (int i = 1; i <= meta.getColumnCount(); i++)
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
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
                for (int i = 1; i <= meta.getColumnCount(); i++)
                    row.put(meta.getColumnLabel(i), rs.getObject(i));
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
                for (int i = 1; i <= meta.getColumnCount(); i++)
                    row.put(meta.getColumnLabel(i), rs.getObject(i));
                rows.add(row);
            }
        }
        return rows;
    }

    /* ─── Entity creation helpers ─── */

    private int getNextId(String table, String idCol) throws SQLException {
        String sql = "SELECT COALESCE(MAX(" + idCol + "), 0) + 1 FROM `" + table + "`";
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            rs.next();
            return rs.getInt(1);
        }
    }

    private void createPlayer(int id, String name, String dob, String aadhaar, String phone, String userId) throws SQLException {
        String sql = "INSERT INTO player (player_id, player_name, DOB, Aadhaar, Phone_number, user_id) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.setString(2, name);
            ps.setString(3, dob != null && !dob.isEmpty() ? dob : null);
            ps.setString(4, aadhaar);
            ps.setString(5, phone);
            if (userId != null && !userId.isEmpty()) ps.setInt(6, Integer.parseInt(userId));
            else ps.setNull(6, java.sql.Types.INTEGER);
            ps.executeUpdate();
        }
    }

    private void createBull(int id, String name, String age, String ownerId, String breedId, String fitCert) throws SQLException {
        String sql = "INSERT INTO bull_table (bull_id, bull_name, age, owner_id, breed_id, fitness_certificate) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.setString(2, name);
            ps.setInt(3, Integer.parseInt(age));
            ps.setInt(4, Integer.parseInt(ownerId));
            ps.setInt(5, Integer.parseInt(breedId));
            ps.setString(6, fitCert != null && !fitCert.isEmpty() ? fitCert : "Pending");
            ps.executeUpdate();
        }
    }

    private void createOwner(int id, String name, String aadhaar, String userId) throws SQLException {
        String sql = "INSERT INTO owner (owner_id, name, Aadhaar, user_id) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.setString(2, name);
            ps.setString(3, aadhaar);
            if (userId != null && !userId.isEmpty()) ps.setInt(4, Integer.parseInt(userId));
            else ps.setNull(4, java.sql.Types.INTEGER);
            ps.executeUpdate();
        }
    }

    private void createOrganizer(int id, String name) throws SQLException {
        String sql = "INSERT INTO organizer (organizer_id, organizer_name) VALUES (?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.setString(2, name);
            ps.executeUpdate();
        }
    }
}
