package com.jallikattu.servlet;

import com.jallikattu.util.GenericDAO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.Map;

/**
 * Dashboard servlet - shows overview stats.
 */
@WebServlet("/admin/dashboard")
public class DashboardServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            Map<String, Integer> stats = GenericDAO.getDashboardStats();
            int totalRecords = stats.values().stream().mapToInt(Integer::intValue).sum();
            request.setAttribute("stats", stats);
            request.setAttribute("totalRecords", totalRecords);
            request.setAttribute("totalTables", stats.size());
            request.getRequestDispatcher("/WEB-INF/views/dashboard.jsp").forward(request, response);
        } catch (Exception e) {
            request.setAttribute("error", "Database error: " + e.getMessage());
            request.getRequestDispatcher("/WEB-INF/views/dashboard.jsp").forward(request, response);
        }
    }
}
