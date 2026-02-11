package com.jallikattu.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.jallikattu.util.MatchDrawDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * REST API for Match Draw operations.
 *
 * GET  /api/match-draw/{matchId}                  - get full draw data
 * POST /api/match-draw/{matchId}/auto-assign       - auto-assign batches
 * POST /api/match-draw/{matchId}/bull-queue         - assign bull queue order
 * POST /api/match-draw/{matchId}/advance            - advance players from round N
 * POST /api/match-draw/{matchId}/record-release     - record a bull release
 * POST /api/match-draw/{matchId}/round-config       - save round configs
 * POST /api/match-draw/{matchId}/foul               - record a foul
 * POST /api/match-draw/{matchId}/delete-foul        - delete a foul
 */
@WebServlet("/api/match-draw/*")
public class MatchDrawServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String matchId = getPathSegment(req, 0);
        if (matchId == null) {
            sendError(resp, "Match ID required. Use /api/match-draw/{matchId}", 400);
            return;
        }
        try {
            Map<String, Object> data = MatchDrawDAO.getMatchDraw(matchId);
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
            sendError(resp, "Use /api/match-draw/{matchId}/{action}", 400);
            return;
        }
        try {
            Map<String, Object> body = readBodyMap(req);
            switch (action) {
                case "auto-assign" -> {
                    int count = MatchDrawDAO.autoAssignBatches(matchId);
                    Map<String, Object> result = new LinkedHashMap<>();
                    result.put("message", "Batches assigned");
                    result.put("playersAssigned", count);
                    sendJson(resp, result);
                }
                case "bull-queue" -> {
                    int count = MatchDrawDAO.assignBullQueue(matchId);
                    Map<String, Object> result = new LinkedHashMap<>();
                    result.put("message", "Bull queue assigned");
                    result.put("bullsQueued", count);
                    sendJson(resp, result);
                }
                case "advance" -> {
                    String fromRound = str(body, "round_type_id");
                    if (fromRound == null) {
                        sendError(resp, "round_type_id required", 400);
                        return;
                    }
                    int count = MatchDrawDAO.advancePlayers(matchId, fromRound);
                    Map<String, Object> result = new LinkedHashMap<>();
                    result.put("message", "Players advanced to next round");
                    result.put("playersAdvanced", count);
                    sendJson(resp, result);
                }
                case "record-release" -> {
                    MatchDrawDAO.recordBullRelease(matchId,
                            str(body, "bull_id"), str(body, "round_type_id"),
                            str(body, "batch_id"), str(body, "player_id"),
                            str(body, "aggression"), str(body, "play_area"),
                            str(body, "difficulty"));
                    sendSuccess(resp, "Bull release recorded");
                }
                case "round-config" -> {
                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> configs = (List<Map<String, Object>>) body.get("configs");
                    if (configs == null || configs.isEmpty()) {
                        sendError(resp, "configs array required", 400);
                        return;
                    }
                    MatchDrawDAO.saveRoundConfigs(matchId, configs);
                    sendSuccess(resp, "Round configs saved");
                }
                case "foul" -> {
                    int foulId = MatchDrawDAO.recordFoul(matchId,
                            str(body, "round_type_id"), str(body, "bull_id"),
                            str(body, "player_id"), str(body, "foul_type"),
                            str(body, "notes"));
                    Map<String, Object> result = new LinkedHashMap<>();
                    result.put("message", "Foul recorded");
                    result.put("foul_id", foulId);
                    sendJson(resp, result);
                }
                case "delete-foul" -> {
                    MatchDrawDAO.deleteFoul(str(body, "foul_id"));
                    sendSuccess(resp, "Foul deleted");
                }
                default -> sendError(resp, "Unknown action: " + action, 400);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }
}
