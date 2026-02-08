package com.jallikattu.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.jallikattu.util.DBConnection;
import com.jallikattu.util.StatsDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Player self-service API (requires player role login).
 *
 * GET  /api/player/profile           - own profile + career stats
 * PUT  /api/player/profile           - update own profile (phone, name)
 * GET  /api/player/history           - own match history
 * GET  /api/player/matches           - available matches to register for
 * POST /api/player/register-match    - register self for a match
 */
@WebServlet("/api/player/*")
public class PlayerApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession(false);
        String userId = (String) session.getAttribute("user_id");
        String seg = getPathSegment(req, 0);

        try {
            // Look up player linked to this user
            Map<String, Object> player = StatsDAO.getPlayerByUserId(userId);
            if (player == null) {
                sendError(resp, "No player profile linked to this account", 404);
                return;
            }
            String playerId = String.valueOf(player.get("player_id"));

            switch (seg != null ? seg : "") {
                case "profile", "" -> {
                    Map<String, Object> result = new LinkedHashMap<>();
                    result.put("player", player);
                    result.put("career", StatsDAO.getPlayerCareerStats(playerId));
                    sendJson(resp, result);
                }
                case "history" -> sendJson(resp, StatsDAO.getPlayerMatchHistory(playerId));
                case "matches" -> {
                    // Available scheduled matches with capacity
                    List<Map<String, Object>> matches = StatsDAO.getMatchesPublic("Scheduled");
                    // Enrich with capacity info
                    for (Map<String, Object> m : matches) {
                        String matchId = String.valueOf(m.get("match_id"));
                        m.put("capacity", StatsDAO.getMatchCapacity(matchId));
                    }
                    sendJson(resp, matches);
                }
                default -> sendError(resp, "Unknown: " + seg, 404);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession(false);
        String userId = (String) session.getAttribute("user_id");

        try {
            Map<String, Object> player = StatsDAO.getPlayerByUserId(userId);
            if (player == null) {
                sendError(resp, "No player profile linked to this account", 404);
                return;
            }
            String playerId = String.valueOf(player.get("player_id"));

            Map<String, Object> body = readBodyMap(req);
            String newName = str(body, "player_name");
            String newPhone = str(body, "phone");

            String sql = "UPDATE player SET player_name = COALESCE(?, player_name), Phone_number = COALESCE(?, Phone_number) WHERE player_id = ?";
            try (Connection conn = DBConnection.getConnection();
                 PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setString(1, newName);
                ps.setString(2, newPhone);
                ps.setInt(3, Integer.parseInt(playerId));
                ps.executeUpdate();
            }
            sendSuccess(resp, "Profile updated");
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession(false);
        String userId = (String) session.getAttribute("user_id");
        String seg = getPathSegment(req, 0);

        if (!"register-match".equals(seg)) {
            sendError(resp, "Use POST /api/player/register-match", 400);
            return;
        }

        try {
            Map<String, Object> player = StatsDAO.getPlayerByUserId(userId);
            if (player == null) {
                sendError(resp, "No player profile linked to this account", 404);
                return;
            }
            String playerId = String.valueOf(player.get("player_id"));

            Map<String, Object> body = readBodyMap(req);
            String matchId = str(body, "match_id");

            if (matchId == null) {
                sendError(resp, "Required: match_id", 400);
                return;
            }

            // Default round to 1 (Qualifying) and batch to 1
            String roundTypeId = str(body, "round_type_id");
            if (roundTypeId == null) roundTypeId = "1";
            String batchId = str(body, "batch_id");
            if (batchId == null) batchId = "1";

            // Check capacity
            if (!StatsDAO.canRegisterPlayer(matchId)) {
                sendError(resp, "Match has reached its player limit", 409);
                return;
            }

            // Insert registration with status=registered (pending approval)
            String sql = "INSERT INTO player_match_history (match_id, round_type_id, batch_id, player_id, bull_caught, penalties, status) VALUES (?, ?, ?, ?, 0, 0, 'registered')";
            try (Connection conn = DBConnection.getConnection();
                 PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setInt(1, Integer.parseInt(matchId));
                ps.setInt(2, Integer.parseInt(roundTypeId));
                ps.setInt(3, Integer.parseInt(batchId));
                ps.setInt(4, Integer.parseInt(playerId));
                ps.executeUpdate();
            }

            sendSuccess(resp, "Registered for match. Pending approval.");
        } catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().contains("Duplicate")) {
                sendError(resp, "Already registered for this match/round", 409);
            } else {
                sendError(resp, e.getMessage(), 500);
            }
        }
    }
}
