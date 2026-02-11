package com.jallikattu.servlet;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import com.jallikattu.util.GenericDAO;
import com.jallikattu.util.StatsDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * REST API for role-specific dashboard statistics.
 * GET /api/dashboard — returns data tailored to the logged-in user's role.
 */
@WebServlet("/api/dashboard")
public class DashboardApiServlet extends BaseRestServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("user_id") == null) {
            sendError(resp, "Not authenticated", 401);
            return;
        }

        String userId = (String) session.getAttribute("user_id");
        String role   = (String) session.getAttribute("role");

        try {
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("role", role);

            switch (role) {
                case "player"      -> buildPlayerDashboard(data, userId);
                case "owner"       -> buildOwnerDashboard(data, userId);
                case "scorer"      -> buildScorerDashboard(data);
                case "registrar"   -> buildRegistrarDashboard(data);
                case "admin"       -> buildAdminDashboard(data);
                case "super_admin" -> buildSuperAdminDashboard(data);
                default            -> data.put("message", "Unknown role");
            }

            sendJson(resp, data);
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    /* ────── Player ────── */
    private void buildPlayerDashboard(Map<String, Object> data, String userId) throws Exception {
        Map<String, Object> player = StatsDAO.getPlayerByUserId(userId);
        if (player == null) { data.put("error", "No player profile linked"); return; }
        String pid = String.valueOf(player.get("player_id"));

        data.put("player", player);
        data.put("career", StatsDAO.getPlayerCareerSummary(pid));
        data.put("leaderboardRank", StatsDAO.getPlayerLeaderboardRank(pid));
        data.put("spotPrizesWon", StatsDAO.getPlayerSpotPrizesWon(pid));
        data.put("recentMatches", StatsDAO.getPlayerRecentMatches(pid, 5));
        data.put("matchScores", StatsDAO.getPlayerMatchScores(pid));
    }

    /* ────── Owner ────── */
    private void buildOwnerDashboard(Map<String, Object> data, String userId) throws Exception {
        Map<String, Object> owner = StatsDAO.getOwnerByUserId(userId);
        if (owner == null) { data.put("error", "No owner profile linked"); return; }
        String oid = String.valueOf(owner.get("owner_id"));

        data.put("owner", owner);
        data.put("stats", StatsDAO.getOwnerDashboardStats(oid));
        data.put("bulls", StatsDAO.getBullsByOwner(oid));
        data.put("recentMatches", StatsDAO.getOwnerRecentBullMatches(oid, 6));
    }

    /* ────── Scorer ────── */
    private void buildScorerDashboard(Map<String, Object> data) throws Exception {
        data.put("liveMatches", StatsDAO.getLiveMatches());
        data.put("matchBreakdown", StatsDAO.getMatchStatusBreakdown());
        data.put("topPlayers", StatsDAO.getPlayerLeaderboard(5));
    }

    /* ────── Registrar ────── */
    private void buildRegistrarDashboard(Map<String, Object> data) throws Exception {
        data.put("pendingRegistrations", StatsDAO.getPendingRegistrations());
        data.put("upcomingMatches", StatsDAO.getScheduledMatchesWithCapacity());
        data.put("matchBreakdown", StatsDAO.getMatchStatusBreakdown());
    }

    /* ────── Admin ────── */
    private void buildAdminDashboard(Map<String, Object> data) throws Exception {
        data.put("system", StatsDAO.getOverallStats());
        data.put("matchBreakdown", StatsDAO.getMatchStatusBreakdown());
        data.put("topPlayers", StatsDAO.getPlayerLeaderboard(5));
        data.put("topBulls", StatsDAO.getBullLeaderboard(5));
        data.put("pendingRegistrations", StatsDAO.getPendingRegistrations());
        data.put("liveMatches", StatsDAO.getLiveMatches());
    }

    /* ────── Super Admin ────── */
    private void buildSuperAdminDashboard(Map<String, Object> data) throws Exception {
        buildAdminDashboard(data);
        data.put("userBreakdown", StatsDAO.getUserBreakdownByRole());
        data.put("totalUsers", StatsDAO.getTotalUsers());
        data.put("tableSizes", GenericDAO.getDashboardStats());
    }
}
