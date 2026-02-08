package com.jallikattu.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import com.jallikattu.util.GenericDAO;
import com.jallikattu.util.ScoringDAO;
import com.jallikattu.util.StatsDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * REST API for match management.
 * GET  /api/matches          - list all matches
 * GET  /api/matches/{id}     - get single match
 * PUT  /api/matches/{id}     - update match (e.g. change status)
 */
@WebServlet("/api/matches/*")
public class MatchApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = getPathSegment(req, 0);
        try {
            if (id == null) {
                sendJson(resp, StatsDAO.getMatchesPublic(null));
            } else {
                Map<String, String> pk = new LinkedHashMap<>();
                pk.put("match_id", id);
                Map<String, Object> match = GenericDAO.getByPK("match", pk);
                if (match != null) {
                    sendJson(resp, match);
                } else {
                    sendError(resp, "Match not found", 404);
                }
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = getPathSegment(req, 0);
        if (id == null) {
            sendError(resp, "Match ID required", 400);
            return;
        }
        try {
            Map<String, Object> body = readBodyMap(req);
            if (body.containsKey("status")) {
                ScoringDAO.updateMatchStatus(id, str(body, "status"));
                sendSuccess(resp, "Match status updated to " + str(body, "status"));
            } else {
                sendError(resp, "No updatable fields provided", 400);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }
}
