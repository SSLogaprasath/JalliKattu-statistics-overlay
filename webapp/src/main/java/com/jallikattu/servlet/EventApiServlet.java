package com.jallikattu.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.jallikattu.util.GenericDAO;
import com.jallikattu.util.StatsDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Event Management API (admin/registrar role).
 * Provides scheduling, capacity, registration detail, and batch management.
 *
 * GET  /api/events                        - all matches with registration stats
 * GET  /api/events/{id}                   - match detail + all registrations + capacity
 * GET  /api/events/{id}/capacity          - remaining capacity only
 * POST /api/events/{id}/auto-batch        - auto-assign batches to registered players
 * GET  /api/events/lookup                 - lookup data for scheduling forms
 */
@WebServlet("/api/events/*")
public class EventApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String seg0 = getPathSegment(req, 0);

        try {
            if (seg0 == null) {
                // List all matches with capacity info
                List<Map<String, Object>> matches = StatsDAO.getMatchesPublic(null);
                for (Map<String, Object> m : matches) {
                    String matchId = String.valueOf(m.get("match_id"));
                    m.put("capacity", StatsDAO.getMatchCapacity(matchId));
                }
                sendJson(resp, matches);
                return;
            }

            if ("lookup".equals(seg0)) {
                // Lookup data for scheduling forms
                Map<String, Object> data = new LinkedHashMap<>();
                data.put("locations", GenericDAO.getAll("location"));
                data.put("organizers", GenericDAO.getAll("organizer"));
                data.put("roundTypes", GenericDAO.getAll("round_type"));
                data.put("batches", GenericDAO.getAll("batch"));
                data.put("prizes", GenericDAO.getAll("prize"));
                sendJson(resp, data);
                return;
            }

            // Segment is a match ID
            String matchId = seg0;
            String sub = getPathSegment(req, 1);

            if (sub == null) {
                // Full match detail with registrations
                sendJson(resp, StatsDAO.getMatchRegistrations(matchId));
            } else if ("capacity".equals(sub)) {
                sendJson(resp, StatsDAO.getMatchCapacity(matchId));
            } else {
                sendError(resp, "Unknown sub-path: " + sub, 404);
            }

        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String matchId = getPathSegment(req, 0);
        String action = getPathSegment(req, 1);

        if (matchId == null || action == null) {
            sendError(resp, "Use POST /api/events/{matchId}/auto-batch", 400);
            return;
        }

        try {
            switch (action) {
                case "auto-batch" -> {
                    int count = StatsDAO.autoAssignBatches(matchId);
                    Map<String, Object> result = new LinkedHashMap<>();
                    result.put("message", "Batches assigned to " + count + " player registrations");
                    result.put("assignedCount", count);
                    sendJson(resp, result);
                }
                default -> sendError(resp, "Unknown action: " + action, 400);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }
}
