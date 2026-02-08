package com.jallikattu.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import com.jallikattu.util.GenericDAO;
import com.jallikattu.util.ScoringDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * REST API for live scoring.
 * GET  /api/scores/{matchId}           - get all scoring data for a match
 * POST /api/scores/{matchId}/player    - update player score
 * POST /api/scores/{matchId}/bull      - update bull score
 * POST /api/scores/{matchId}/interaction - add interaction
 */
@WebServlet("/api/scores/*")
public class ScoreApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String matchId = getPathSegment(req, 0);
        if (matchId == null) {
            sendError(resp, "Match ID required. Use /api/scores/{matchId}", 400);
            return;
        }
        try {
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("playerScores", ScoringDAO.getPlayerScores(matchId));
            data.put("bullScores", ScoringDAO.getBullScores(matchId));
            data.put("interactions", ScoringDAO.getInteractions(matchId));
            data.put("approvedPlayers", ScoringDAO.getApprovedPlayers(matchId));
            data.put("approvedBulls", ScoringDAO.getApprovedBulls(matchId));
            data.put("topPlayers", ScoringDAO.getTopPlayers(matchId));
            data.put("topBulls", ScoringDAO.getTopBulls(matchId));
            data.put("roundTypes", GenericDAO.getAll("round_type"));
            sendJson(resp, data);
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String matchId = getPathSegment(req, 0);
        String action = getPathSegment(req, 1);
        if (matchId == null || action == null) {
            sendError(resp, "Use /api/scores/{matchId}/{player|bull|interaction}", 400);
            return;
        }
        try {
            Map<String, Object> body = readBodyMap(req);
            switch (action) {
                case "player" -> {
                    ScoringDAO.updatePlayerScore(matchId, str(body, "player_id"),
                            str(body, "round_type_id"), str(body, "bull_caught"), str(body, "penalties"));
                    sendSuccess(resp, "Player score updated");
                }
                case "bull" -> {
                    ScoringDAO.updateBullScore(matchId, str(body, "bull_id"),
                            str(body, "round_type_id"), str(body, "aggression"), str(body, "play_area"),
                            str(body, "difficulty"), str(body, "release_count"), str(body, "player_id"));
                    sendSuccess(resp, "Bull score updated");
                }
                case "interaction" -> {
                    ScoringDAO.addInteraction(matchId, str(body, "player_id"), str(body, "bull_id"),
                            str(body, "hold_sequence"), str(body, "hold_duration"), str(body, "round_type_id"));
                    sendSuccess(resp, "Interaction recorded");
                }
                default -> sendError(resp, "Unknown action: " + action, 400);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }
}
