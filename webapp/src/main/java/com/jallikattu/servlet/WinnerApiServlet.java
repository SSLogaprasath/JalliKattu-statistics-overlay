package com.jallikattu.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import com.jallikattu.util.GenericDAO;
import com.jallikattu.util.WinnerDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * REST API for winner determination.
 * GET /api/winners              - list completed matches
 * GET /api/winners/{matchId}    - get all winner data for a match
 */
@WebServlet("/api/winners/*")
public class WinnerApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String matchId = getPathSegment(req, 0);

        try {
            if (matchId == null) {
                // Return completed matches + all matches
                Map<String, Object> data = new LinkedHashMap<>();
                data.put("completedMatches",
                    com.jallikattu.util.ScoringDAO.getMatchesByStatus("Completed"));
                data.put("allMatches", GenericDAO.getAll("match"));
                sendJson(resp, data);
            } else {
                // Return all winner data for this match
                Map<String, Object> data = new LinkedHashMap<>();
                data.put("roundWinners", WinnerDAO.getRoundWinners(matchId));
                data.put("bestBullPerRound", WinnerDAO.getBestBullPerRound(matchId));
                data.put("bestBullOverall", WinnerDAO.getBestBullOverall(matchId));
                data.put("interactionWinners", WinnerDAO.getInteractionWinners(matchId));
                data.put("overallWinner", WinnerDAO.getOverallWinner(matchId));
                sendJson(resp, data);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }
}
