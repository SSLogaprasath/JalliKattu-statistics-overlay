package com.jallikattu.servlet;

import java.io.IOException;
import java.util.Map;

import com.jallikattu.util.GenericDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * REST API for dashboard statistics.
 * GET /api/dashboard - returns table row counts
 */
@WebServlet("/api/dashboard")
public class DashboardApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Map<String, Integer> stats = GenericDAO.getDashboardStats();
            int totalRecords = stats.values().stream().mapToInt(Integer::intValue).sum();
            sendJson(resp, Map.of(
                "stats", stats,
                "totalRecords", totalRecords,
                "totalTables", stats.size()
            ));
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }
}
