    package com.jallikattu.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedHashMap;
import java.util.Map;

import com.jallikattu.util.AuthDAO;
import com.jallikattu.util.DBConnection;
import com.jallikattu.util.ScoringDAO;
import com.jallikattu.util.StatsDAO;
import com.jallikattu.util.WinnerDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * PUBLIC API — no authentication required.
 *
 * GET  /api/public/stats                     - overall system statistics
 * GET  /api/public/matches                   - list matches (?status=Live|Scheduled|Completed)
 * GET  /api/public/matches/{id}/scores       - scores for a match
 * GET  /api/public/matches/{id}/winners      - winners for a match
 * GET  /api/public/matches/{id}/spot-prizes  - spot prize awards for a match
 * GET  /api/public/players/{id}              - player career profile + match history
 * GET  /api/public/bulls/{id}                - bull career profile + match history
 * GET  /api/public/leaderboard               - all-time top players and bulls
 * POST /api/public/register/player           - self-register a new player account
 * POST /api/public/register/owner            - self-register a new owner account
 */
@WebServlet("/api/public/*")
public class PublicApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String seg0 = getPathSegment(req, 0);  // stats | matches | players | bulls | leaderboard
        if (seg0 == null) {
            sendError(resp, "Specify: stats, matches, players/{id}, bulls/{id}, leaderboard", 400);
            return;
        }

        try {
            switch (seg0) {
                case "stats" -> sendJson(resp, StatsDAO.getOverallStats());

                case "matches" -> handleMatchesGet(req, resp);

                case "players" -> {
                    String playerId = getPathSegment(req, 1);
                    if (playerId == null) {
                        // list all players basic info
                        sendJson(resp, StatsDAO.getPlayerLeaderboard(100));
                    } else {
                        Map<String, Object> result = new LinkedHashMap<>();
                        result.put("profile", StatsDAO.getPlayerCareerStats(playerId));
                        result.put("matchHistory", StatsDAO.getPlayerMatchHistory(playerId));
                        sendJson(resp, result);
                    }
                }

                case "bulls" -> {
                    String bullId = getPathSegment(req, 1);
                    if (bullId == null) {
                        sendJson(resp, StatsDAO.getBullLeaderboard(100));
                    } else {
                        Map<String, Object> result = new LinkedHashMap<>();
                        result.put("profile", StatsDAO.getBullCareerStats(bullId));
                        result.put("matchHistory", StatsDAO.getBullMatchHistory(bullId));
                        sendJson(resp, result);
                    }
                }

                case "leaderboard" -> {
                    int limit = 20;
                    String limitParam = req.getParameter("limit");
                    if (limitParam != null) {
                        try { limit = Integer.parseInt(limitParam); } catch (NumberFormatException ignored) {}
                    }
                    Map<String, Object> board = new LinkedHashMap<>();
                    board.put("topPlayers", StatsDAO.getPlayerLeaderboard(limit));
                    board.put("topBulls", StatsDAO.getBullLeaderboard(limit));
                    sendJson(resp, board);
                }

                default -> sendError(resp, "Unknown path: " + seg0, 404);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    private void handleMatchesGet(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        String matchId = getPathSegment(req, 1);

        if (matchId == null) {
            // List matches (with optional status filter)
            String status = req.getParameter("status");
            sendJson(resp, StatsDAO.getMatchesPublic(status));
            return;
        }

        // /api/public/matches/{id}/scores or /winners
        String sub = getPathSegment(req, 2);
        if (sub == null) {
            // Single match detail + capacity
            Map<String, Object> result = new LinkedHashMap<>();
            result.put("registrations", StatsDAO.getMatchRegistrations(matchId));
            result.put("capacity", StatsDAO.getMatchCapacity(matchId));
            sendJson(resp, result);
            return;
        }

        switch (sub) {
            case "scores" -> {
                Map<String, Object> scores = new LinkedHashMap<>();
                scores.put("playerScores", ScoringDAO.getPlayerScores(matchId));
                scores.put("bullScores", ScoringDAO.getBullScores(matchId));
                scores.put("interactions", ScoringDAO.getInteractions(matchId));
                scores.put("topPlayers", ScoringDAO.getTopPlayers(matchId));
                scores.put("topBulls", ScoringDAO.getTopBulls(matchId));
                sendJson(resp, scores);
            }
            case "winners" -> {
                Map<String, Object> winners = new LinkedHashMap<>();
                winners.put("roundWinners", WinnerDAO.getRoundWinners(matchId));
                winners.put("bestBullPerRound", WinnerDAO.getBestBullPerRound(matchId));
                winners.put("bestBullOverall", WinnerDAO.getBestBullOverall(matchId));
                winners.put("interactionWinners", WinnerDAO.getInteractionWinners(matchId));
                winners.put("overallWinner", WinnerDAO.getOverallWinner(matchId));
                sendJson(resp, winners);
            }
            case "spot-prizes" -> {
                sendJson(resp, getSpotPrizeAwardsForMatch(matchId));
            }
            default -> sendError(resp, "Unknown sub-path: " + sub, 404);
        }
    }

    // ───────── SPOT PRIZE AWARDS (public) ─────────

    /**
     * Returns spot prize awards for a given match, with joined player/bull/sponsor/type info.
     */
    private java.util.List<Map<String, Object>> getSpotPrizeAwardsForMatch(String matchId) throws Exception {
        String sql = """
            SELECT spa.spot_prize_award_id,
                   p.first_name, p.last_name,
                   sp.prize_title, sp.sponsor_name, sp.quantity,
                   spt.spot_prize_type_name AS prize_type,
                   bt.bull_name,
                   spa.awarded_time
            FROM spot_prize_award spa
            JOIN spot_prize sp   ON spa.spot_prize_id = sp.spot_prize_id
            JOIN player p        ON spa.player_id     = p.player_id
            LEFT JOIN spot_prize_type spt ON sp.spot_type_id = spt.spot_prize_type_id
            LEFT JOIN bull_table bt       ON spa.bull_id     = bt.bull_id
            WHERE sp.match_id = ?
            ORDER BY spa.awarded_time DESC, spa.spot_prize_award_id DESC
            """;
        java.util.List<Map<String, Object>> rows = new java.util.ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            try (ResultSet rs = ps.executeQuery()) {
                var meta = rs.getMetaData();
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

    // ───────── SELF-REGISTRATION ─────────

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String seg0 = getPathSegment(req, 0);  // register
        String seg1 = getPathSegment(req, 1);  // player | owner

        if (!"register".equals(seg0) || seg1 == null) {
            sendError(resp, "Use POST /api/public/register/player or /api/public/register/owner", 400);
            return;
        }

        try {
            Map<String, Object> body = readBodyMap(req);
            switch (seg1) {
                case "player" -> registerPlayer(body, resp);
                case "owner" -> registerOwner(body, resp);
                default -> sendError(resp, "Unknown registration type: " + seg1, 400);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    /**
     * Self-register a player.
     * Body: { username, password, player_name, dob, phone, aadhaar }
     */
    private void registerPlayer(Map<String, Object> body, HttpServletResponse resp) throws Exception {
        String username = str(body, "username");
        String password = str(body, "password");
        String playerName = str(body, "player_name");
        String dob = str(body, "dob");
        String phone = str(body, "phone");
        String aadhaar = str(body, "aadhaar");

        if (username == null || password == null || playerName == null || phone == null || aadhaar == null) {
            sendError(resp, "Required: username, password, player_name, phone, aadhaar", 400);
            return;
        }
        if (password.length() < 6) {
            sendError(resp, "Password must be at least 6 characters", 400);
            return;
        }
        if (aadhaar.length() != 12) {
            sendError(resp, "Aadhaar must be exactly 12 digits", 400);
            return;
        }
        if (phone.length() != 10) {
            sendError(resp, "Phone number must be exactly 10 digits", 400);
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {
            conn.setAutoCommit(false);
            try {
                // 1. Create app_user with role='player'
                String userSql = "INSERT INTO app_user (username, pass_hash, full_name, role) VALUES (?, ?, ?, 'player')";
                int userId;
                try (PreparedStatement ps = conn.prepareStatement(userSql, PreparedStatement.RETURN_GENERATED_KEYS)) {
                    ps.setString(1, username);
                    ps.setString(2, AuthDAO.hashPassword(password));
                    ps.setString(3, playerName);
                    ps.executeUpdate();
                    try (ResultSet keys = ps.getGeneratedKeys()) {
                        keys.next();
                        userId = keys.getInt(1);
                    }
                }

                // 2. Create player record linked to user
                int playerId;
                String nextIdSql = "SELECT COALESCE(MAX(player_id), 0) + 1 FROM player";
                try (PreparedStatement ps = conn.prepareStatement(nextIdSql);
                     ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    playerId = rs.getInt(1);
                }
                String playerSql = "INSERT INTO player (player_id, player_name, DOB, Aadhaar, Phone_number, user_id) VALUES (?, ?, ?, ?, ?, ?)";
                try (PreparedStatement ps = conn.prepareStatement(playerSql)) {
                    ps.setInt(1, playerId);
                    ps.setString(2, playerName);
                    ps.setString(3, dob);
                    ps.setString(4, aadhaar);
                    ps.setString(5, phone);
                    ps.setInt(6, userId);
                    ps.executeUpdate();
                }

                conn.commit();
                Map<String, Object> result = new LinkedHashMap<>();
                result.put("message", "Player registered successfully");
                result.put("player_id", playerId);
                result.put("user_id", userId);
                sendJson(resp, result, 201);

            } catch (Exception e) {
                conn.rollback();
                throw e;
            }
        }
    }

    /**
     * Self-register an owner.
     * Body: { username, password, name, aadhaar }
     */
    private void registerOwner(Map<String, Object> body, HttpServletResponse resp) throws Exception {
        String username = str(body, "username");
        String password = str(body, "password");
        String ownerName = str(body, "name");
        String aadhaar = str(body, "aadhaar");

        if (username == null || password == null || ownerName == null || aadhaar == null) {
            sendError(resp, "Required: username, password, name, aadhaar", 400);
            return;
        }
        if (password.length() < 6) {
            sendError(resp, "Password must be at least 6 characters", 400);
            return;
        }
        if (aadhaar.length() != 12) {
            sendError(resp, "Aadhaar must be exactly 12 digits", 400);
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {
            conn.setAutoCommit(false);
            try {
                // 1. Create app_user with role='owner'
                String userSql = "INSERT INTO app_user (username, pass_hash, full_name, role) VALUES (?, ?, ?, 'owner')";
                int userId;
                try (PreparedStatement ps = conn.prepareStatement(userSql, PreparedStatement.RETURN_GENERATED_KEYS)) {
                    ps.setString(1, username);
                    ps.setString(2, AuthDAO.hashPassword(password));
                    ps.setString(3, ownerName);
                    ps.executeUpdate();
                    try (ResultSet keys = ps.getGeneratedKeys()) {
                        keys.next();
                        userId = keys.getInt(1);
                    }
                }

                // 2. Create owner record linked to user
                int ownerId;
                String nextIdSql = "SELECT COALESCE(MAX(owner_id), 0) + 1 FROM owner";
                try (PreparedStatement ps = conn.prepareStatement(nextIdSql);
                     ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    ownerId = rs.getInt(1);
                }
                String ownerSql = "INSERT INTO owner (owner_id, name, Aadhaar, user_id) VALUES (?, ?, ?, ?)";
                try (PreparedStatement ps = conn.prepareStatement(ownerSql)) {
                    ps.setInt(1, ownerId);
                    ps.setString(2, ownerName);
                    ps.setString(3, aadhaar);
                    ps.setInt(4, userId);
                    ps.executeUpdate();
                }

                conn.commit();
                Map<String, Object> result = new LinkedHashMap<>();
                result.put("message", "Owner registered successfully");
                result.put("owner_id", ownerId);
                result.put("user_id", userId);
                sendJson(resp, result, 201);

            } catch (Exception e) {
                conn.rollback();
                throw e;
            }
        }
    }
}
