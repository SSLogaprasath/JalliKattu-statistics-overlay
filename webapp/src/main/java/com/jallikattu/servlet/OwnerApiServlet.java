package com.jallikattu.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.jallikattu.util.DBConnection;
import com.jallikattu.util.GenericDAO;
import com.jallikattu.util.StatsDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Owner self-service API (requires owner role login).
 *
 * GET  /api/owner/profile            - own profile
 * GET  /api/owner/bulls              - own bulls list
 * GET  /api/owner/bulls/{id}         - single bull detail + match history
 * POST /api/owner/bulls              - register a new bull (with fitness certificate)
 * GET  /api/owner/breeds             - available breeds (for bull registration form)
 */
@WebServlet("/api/owner/*")
public class OwnerApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession(false);
        String userId = (String) session.getAttribute("user_id");
        String seg0 = getPathSegment(req, 0);

        try {
            Map<String, Object> owner = StatsDAO.getOwnerByUserId(userId);
            if (owner == null) {
                sendError(resp, "No owner profile linked to this account", 404);
                return;
            }
            String ownerId = String.valueOf(owner.get("owner_id"));

            switch (seg0 != null ? seg0 : "") {
                case "profile", "" -> sendJson(resp, owner);

                case "bulls" -> {
                    String bullId = getPathSegment(req, 1);
                    if (bullId == null) {
                        // List all owner's bulls
                        sendJson(resp, StatsDAO.getBullsByOwner(ownerId));
                    } else {
                        // Single bull detail + match history
                        Map<String, Object> result = new LinkedHashMap<>();
                        result.put("profile", StatsDAO.getBullCareerStats(bullId));
                        result.put("matchHistory", StatsDAO.getBullMatchHistory(bullId));
                        sendJson(resp, result);
                    }
                }

                case "breeds" -> {
                    // Breeds lookup for the bull registration form
                    sendJson(resp, GenericDAO.getAll("bull_breed"));
                }

                case "matches" -> {
                    // Available scheduled matches with bull capacity
                    List<Map<String, Object>> matches = StatsDAO.getMatchesPublic("Scheduled");
                    for (Map<String, Object> m : matches) {
                        String matchId = String.valueOf(m.get("match_id"));
                        m.put("capacity", StatsDAO.getMatchCapacity(matchId));
                    }
                    sendJson(resp, matches);
                }

                case "registrations" -> sendJson(resp, StatsDAO.getOwnerBullRegistrations(ownerId));

                default -> sendError(resp, "Unknown: " + seg0, 404);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    /**
     * POST /api/owner/bulls — register a new bull.
     * Body: { bull_name, age, breed_id, fitness_certificate }
     *
     * The fitness_certificate field is the medical/veterinary certificate
     * reference number verifying the bull's age, breed, and health.
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession(false);
        String userId = (String) session.getAttribute("user_id");
        String seg0 = getPathSegment(req, 0);

        if (!"bulls".equals(seg0) && !"register-match".equals(seg0)) {
            sendError(resp, "Use POST /api/owner/bulls or /api/owner/register-match", 400);
            return;
        }

        try {
            Map<String, Object> owner = StatsDAO.getOwnerByUserId(userId);
            if (owner == null) {
                sendError(resp, "No owner profile linked to this account", 404);
                return;
            }
            String ownerId = String.valueOf(owner.get("owner_id"));

            if ("register-match".equals(seg0)) {
                registerBullForMatch(req, resp, ownerId);
                return;
            }

            Map<String, Object> body = readBodyMap(req);
            String bullName = str(body, "bull_name");
            String age = str(body, "age");
            String breedId = str(body, "breed_id");
            String fitnessCert = str(body, "fitness_certificate");

            if (bullName == null || age == null || breedId == null || fitnessCert == null) {
                sendError(resp, "Required: bull_name, age, breed_id, fitness_certificate", 400);
                return;
            }

            // Validate age (minimum 3 years per Jallikattu regulations)
            int ageVal = Integer.parseInt(age);
            if (ageVal < 3) {
                sendError(resp, "Bull must be at least 3 years old to participate", 400);
                return;
            }
            if (ageVal > 15) {
                sendError(resp, "Bull age seems unreasonable (max 15 years)", 400);
                return;
            }

            // Generate next bull_id
            int bullId;
            try (Connection conn = DBConnection.getConnection()) {
                String nextIdSql = "SELECT COALESCE(MAX(bull_id), 0) + 1 FROM bull_table";
                try (PreparedStatement ps = conn.prepareStatement(nextIdSql);
                     ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    bullId = rs.getInt(1);
                }

                String sql = "INSERT INTO bull_table (bull_id, bull_name, age, owner_id, breed_id, fitness_certificate) VALUES (?, ?, ?, ?, ?, ?)";
                try (PreparedStatement ps = conn.prepareStatement(sql)) {
                    ps.setInt(1, bullId);
                    ps.setString(2, bullName);
                    ps.setInt(3, ageVal);
                    ps.setInt(4, Integer.parseInt(ownerId));
                    ps.setInt(5, Integer.parseInt(breedId));
                    ps.setString(6, fitnessCert);
                    ps.executeUpdate();
                }
            }

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("message", "Bull registered successfully");
            result.put("bull_id", bullId);
            result.put("bull_name", bullName);
            result.put("fitness_certificate", fitnessCert);
            sendJson(resp, result, 201);

        } catch (NumberFormatException e) {
            sendError(resp, "Invalid number format: " + e.getMessage(), 400);
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    /**
     * Register one of the owner's bulls for a scheduled match.
     * Body: { bull_id, match_id }
     */
    private void registerBullForMatch(HttpServletRequest req, HttpServletResponse resp,
                                       String ownerId) throws IOException {
        try {
            Map<String, Object> body = readBodyMap(req);
            String matchId = str(body, "match_id");
            String bullId = str(body, "bull_id");

            if (matchId == null || bullId == null) {
                sendError(resp, "Required: match_id, bull_id", 400);
                return;
            }

            // Verify the bull belongs to this owner
            List<Map<String, Object>> myBulls = StatsDAO.getBullsByOwner(ownerId);
            boolean ownsBull = myBulls.stream()
                    .anyMatch(b -> String.valueOf(b.get("bull_id")).equals(bullId));
            if (!ownsBull) {
                sendError(resp, "This bull does not belong to you", 403);
                return;
            }

            // Check capacity
            if (!StatsDAO.canRegisterBull(matchId)) {
                sendError(resp, "Match has reached its bull limit", 409);
                return;
            }

            // Simplified: Bull PK is (match_id, bull_id), other fields filled during scoring
            String sql = "INSERT INTO bull_match_history (match_id, bull_id, round_type_id, status) " +
                         "VALUES (?, ?, 1, 'registered')";
            try (Connection conn = DBConnection.getConnection();
                 PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setInt(1, Integer.parseInt(matchId));
                ps.setInt(2, Integer.parseInt(bullId));
                ps.executeUpdate();
            }

            sendSuccess(resp, "Bull registered for match. Pending approval.");
        } catch (Exception e) {
            if (e.getMessage() != null && e.getMessage().contains("Duplicate")) {
                sendError(resp, "This bull is already registered for this match", 409);
            } else {
                sendError(resp, e.getMessage(), 500);
            }
        }
    }
}
