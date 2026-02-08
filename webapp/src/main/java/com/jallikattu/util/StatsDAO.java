package com.jallikattu.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * DAO for cross-match statistics, career data, leaderboards, and capacity checks.
 */
public class StatsDAO {

    // ───────────── OVERALL SYSTEM STATS ─────────────

    /** System-wide statistics for the public landing page. */
    public static Map<String, Object> getOverallStats() throws SQLException {
        Map<String, Object> stats = new LinkedHashMap<>();
        try (Connection conn = DBConnection.getConnection()) {
            stats.put("totalPlayers", countRows(conn, "player"));
            stats.put("totalBulls", countRows(conn, "bull_table"));
            stats.put("totalOwners", countRows(conn, "owner"));
            stats.put("totalMatches", countRows(conn, "match"));
            stats.put("totalOrganizers", countRows(conn, "organizer"));
            stats.put("totalLocations", countRows(conn, "location"));
            stats.put("totalInteractions", countRows(conn, "bull_player_interaction"));

            // Match status breakdown
            String sql = "SELECT status, COUNT(*) AS cnt FROM `match` GROUP BY status";
            try (Statement st = conn.createStatement(); ResultSet rs = st.executeQuery(sql)) {
                while (rs.next()) {
                    stats.put(rs.getString("status").toLowerCase() + "Matches", rs.getInt("cnt"));
                }
            }
        }
        return stats;
    }

    private static int countRows(Connection conn, String table) throws SQLException {
        try (Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery("SELECT COUNT(*) FROM `" + table + "`")) {
            return rs.next() ? rs.getInt(1) : 0;
        }
    }

    // ───────────── PLAYER CAREER ─────────────

    /** Full career profile for a single player (used by public + player self-service). */
    public static Map<String, Object> getPlayerCareerStats(String playerId) throws SQLException {
        Map<String, Object> stats = new LinkedHashMap<>();
        String sql = """
            SELECT p.player_id, p.player_name, p.DOB, p.Phone_number,
                COUNT(DISTINCT pmh.match_id) AS matches_played,
                COUNT(*) AS rounds_played,
                COALESCE(SUM(pmh.bull_caught), 0) AS total_bulls_caught,
                COALESCE(SUM(pmh.penalties), 0) AS total_penalties,
                COALESCE(SUM(pmh.bull_caught), 0) - COALESCE(SUM(pmh.penalties), 0) AS career_net_score
            FROM player p
            LEFT JOIN player_match_history pmh ON p.player_id = pmh.player_id AND pmh.status = 'approved'
            WHERE p.player_id = ?
            GROUP BY p.player_id
            """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(playerId));
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    stats = rowToMap(rs);
                }
            }
        }
        return stats;
    }

    /** All match records for a single player. */
    public static List<Map<String, Object>> getPlayerMatchHistory(String playerId) throws SQLException {
        String sql = """
            SELECT m.match_id, m.match_name, m.match_date, m.status AS match_status,
                   l.district AS location, o.organizer_name,
                   rt.round_name, b.batch_name,
                   pmh.bull_caught, pmh.penalties,
                   (COALESCE(pmh.bull_caught,0) - COALESCE(pmh.penalties,0)) AS net_score,
                   pmh.status AS registration_status
            FROM player_match_history pmh
            JOIN `match` m ON pmh.match_id = m.match_id
            JOIN location l ON m.location_id = l.location_id
            JOIN organizer o ON m.organizer_id = o.organizer_id
            JOIN round_type rt ON pmh.round_type_id = rt.round_type_id
            JOIN batch b ON pmh.batch_id = b.batch_id
            WHERE pmh.player_id = ?
            ORDER BY m.match_date DESC, rt.round_name
            """;
        return queryList(sql, playerId);
    }

    // ───────────── BULL CAREER ─────────────

    /** Full career profile for a single bull. */
    public static Map<String, Object> getBullCareerStats(String bullId) throws SQLException {
        Map<String, Object> stats = new LinkedHashMap<>();
        String sql = """
            SELECT bt.bull_id, bt.bull_name, bt.age, bt.fitness_certificate,
                   bb.bull_breed_name AS breed,
                   o.name AS owner_name, o.owner_id,
                   COUNT(DISTINCT bmh.match_id) AS matches_played,
                   ROUND(AVG(bmh.aggression), 1) AS avg_aggression,
                   ROUND(AVG(bmh.play_area), 1) AS avg_play_area,
                   ROUND(AVG(bmh.difficulty), 1) AS avg_difficulty,
                   COALESCE(SUM(bmh.release_count), 0) AS total_releases
            FROM bull_table bt
            LEFT JOIN bull_breed bb ON bt.breed_id = bb.bull_breed_id
            LEFT JOIN owner o ON bt.owner_id = o.owner_id
            LEFT JOIN bull_match_history bmh ON bt.bull_id = bmh.bull_id AND bmh.status = 'approved'
            WHERE bt.bull_id = ?
            GROUP BY bt.bull_id
            """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(bullId));
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    stats = rowToMap(rs);
                }
            }
        }
        return stats;
    }

    /** All match records for a single bull. */
    public static List<Map<String, Object>> getBullMatchHistory(String bullId) throws SQLException {
        String sql = """
            SELECT m.match_id, m.match_name, m.match_date, m.status AS match_status,
                   l.district AS location, rt.round_name,
                   bmh.aggression, bmh.play_area, bmh.difficulty,
                   bmh.release_count, bmh.winner,
                   p.player_name AS tamer_name
            FROM bull_match_history bmh
            JOIN `match` m ON bmh.match_id = m.match_id
            JOIN location l ON m.location_id = l.location_id
            JOIN round_type rt ON bmh.round_type_id = rt.round_type_id
            JOIN player p ON bmh.player_id = p.player_id
            WHERE bmh.bull_id = ? AND bmh.status = 'approved'
            ORDER BY m.match_date DESC, rt.round_name
            """;
        return queryList(sql, bullId);
    }

    // ───────────── ALL-TIME LEADERBOARDS ─────────────

    /** Top players ranked by career net score across ALL matches. */
    public static List<Map<String, Object>> getPlayerLeaderboard(int limit) throws SQLException {
        String sql = """
            SELECT p.player_id, p.player_name,
                   COUNT(DISTINCT pmh.match_id) AS matches_played,
                   COALESCE(SUM(pmh.bull_caught), 0) AS total_caught,
                   COALESCE(SUM(pmh.penalties), 0) AS total_penalties,
                   COALESCE(SUM(pmh.bull_caught), 0) - COALESCE(SUM(pmh.penalties), 0) AS net_score
            FROM player p
            JOIN player_match_history pmh ON p.player_id = pmh.player_id AND pmh.status = 'approved'
            GROUP BY p.player_id
            ORDER BY net_score DESC, total_caught DESC
            LIMIT ?
            """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, limit);
            return resultSetToList(ps.executeQuery());
        }
    }

    /** Top bulls ranked by average difficulty across ALL matches. */
    public static List<Map<String, Object>> getBullLeaderboard(int limit) throws SQLException {
        String sql = """
            SELECT bt.bull_id, bt.bull_name,
                   o.name AS owner_name, bb.bull_breed_name AS breed,
                   COUNT(DISTINCT bmh.match_id) AS matches_played,
                   ROUND(AVG(bmh.difficulty), 1) AS avg_difficulty,
                   ROUND(AVG(bmh.aggression), 1) AS avg_aggression,
                   COALESCE(SUM(bmh.release_count), 0) AS total_releases
            FROM bull_table bt
            JOIN bull_match_history bmh ON bt.bull_id = bmh.bull_id AND bmh.status = 'approved'
            LEFT JOIN owner o ON bt.owner_id = o.owner_id
            LEFT JOIN bull_breed bb ON bt.breed_id = bb.bull_breed_id
            GROUP BY bt.bull_id
            ORDER BY avg_difficulty DESC, avg_aggression DESC
            LIMIT ?
            """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, limit);
            return resultSetToList(ps.executeQuery());
        }
    }

    // ───────────── MATCH CAPACITY ─────────────

    /** Get live registration count and capacity for a match. */
    public static Map<String, Object> getMatchCapacity(String matchId) throws SQLException {
        Map<String, Object> cap = new LinkedHashMap<>();
        try (Connection conn = DBConnection.getConnection()) {
            // Limits from match table
            String sql = "SELECT player_limit, bull_limit FROM `match` WHERE match_id = ?";
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setInt(1, Integer.parseInt(matchId));
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        cap.put("playerLimit", rs.getObject("player_limit"));
                        cap.put("bullLimit", rs.getObject("bull_limit"));
                    }
                }
            }
            // Actual counts from history tables
            cap.put("registeredPlayers", countForMatch(conn,
                    "SELECT COUNT(DISTINCT player_id) FROM player_match_history WHERE match_id = ?", matchId));
            cap.put("registeredBulls", countForMatch(conn,
                    "SELECT COUNT(DISTINCT bull_id) FROM bull_match_history WHERE match_id = ?", matchId));

            int pLimit = cap.get("playerLimit") != null ? ((Number) cap.get("playerLimit")).intValue() : Integer.MAX_VALUE;
            int bLimit = cap.get("bullLimit") != null ? ((Number) cap.get("bullLimit")).intValue() : Integer.MAX_VALUE;
            int rp = ((Number) cap.get("registeredPlayers")).intValue();
            int rb = ((Number) cap.get("registeredBulls")).intValue();
            cap.put("playerSlotsRemaining", Math.max(0, pLimit - rp));
            cap.put("bullSlotsRemaining", Math.max(0, bLimit - rb));
        }
        return cap;
    }

    /** Check if a player can still register for a match (under limit). */
    public static boolean canRegisterPlayer(String matchId) throws SQLException {
        Map<String, Object> cap = getMatchCapacity(matchId);
        return ((Number) cap.get("playerSlotsRemaining")).intValue() > 0;
    }

    /** Check if a bull can still register for a match (under limit). */
    public static boolean canRegisterBull(String matchId) throws SQLException {
        Map<String, Object> cap = getMatchCapacity(matchId);
        return ((Number) cap.get("bullSlotsRemaining")).intValue() > 0;
    }

    private static int countForMatch(Connection conn, String sql, String matchId) throws SQLException {
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? rs.getInt(1) : 0;
            }
        }
    }

    // ───────────── BATCH MANAGEMENT ─────────────

    /** Auto-assign batches to registered players for a match (round-robin). */
    public static int autoAssignBatches(String matchId) throws SQLException {
        // Get all batches
        List<Map<String, Object>> batches = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection()) {
            try (Statement st = conn.createStatement();
                 ResultSet rs = st.executeQuery("SELECT batch_id FROM batch ORDER BY batch_id")) {
                while (rs.next()) batches.add(rowToMap(rs));
            }
            if (batches.isEmpty()) return 0;

            // Get registered players without proper batch assignment (or reassign all)
            String sql = "SELECT match_id, round_type_id, player_id FROM player_match_history WHERE match_id = ? ORDER BY player_id";
            List<Map<String, Object>> players = new ArrayList<>();
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setInt(1, Integer.parseInt(matchId));
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) players.add(rowToMap(rs));
                }
            }

            // Round-robin batch assignment
            String updateSql = "UPDATE player_match_history SET batch_id = ? WHERE match_id = ? AND round_type_id = ? AND player_id = ?";
            int count = 0;
            try (PreparedStatement ps = conn.prepareStatement(updateSql)) {
                for (int i = 0; i < players.size(); i++) {
                    int batchId = ((Number) batches.get(i % batches.size()).get("batch_id")).intValue();
                    Map<String, Object> p = players.get(i);
                    ps.setInt(1, batchId);
                    ps.setInt(2, ((Number) p.get("match_id")).intValue());
                    ps.setInt(3, ((Number) p.get("round_type_id")).intValue());
                    ps.setInt(4, ((Number) p.get("player_id")).intValue());
                    ps.addBatch();
                    count++;
                }
                ps.executeBatch();
            }
            return count;
        }
    }

    // ───────────── OWNER/BULL LOOKUPS ─────────────

    /** Get all bulls belonging to an owner. */
    public static List<Map<String, Object>> getBullsByOwner(String ownerId) throws SQLException {
        String sql = """
            SELECT bt.bull_id, bt.bull_name, bt.age, bt.fitness_certificate,
                   bb.bull_breed_name AS breed
            FROM bull_table bt
            LEFT JOIN bull_breed bb ON bt.breed_id = bb.bull_breed_id
            WHERE bt.owner_id = ?
            ORDER BY bt.bull_id
            """;
        return queryList(sql, ownerId);
    }

    /** Find player by linked user_id. */
    public static Map<String, Object> getPlayerByUserId(String userId) throws SQLException {
        String sql = "SELECT * FROM player WHERE user_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(userId));
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rowToMap(rs);
            }
        }
        return null;
    }

    /** Find owner by linked user_id. */
    public static Map<String, Object> getOwnerByUserId(String userId) throws SQLException {
        String sql = "SELECT * FROM owner WHERE user_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(userId));
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rowToMap(rs);
            }
        }
        return null;
    }

    // ───────────── MATCH LISTING (public) ─────────────

    /** All matches with location + organizer details (public read). */
    public static List<Map<String, Object>> getMatchesPublic(String statusFilter) throws SQLException {
        String sql = """
            SELECT m.match_id, m.match_name, m.match_date, m.status,
                   m.player_limit, m.bull_limit,
                   l.district AS location, l.area,
                   o.organizer_name
            FROM `match` m
            JOIN location l ON m.location_id = l.location_id
            JOIN organizer o ON m.organizer_id = o.organizer_id
            """ + (statusFilter != null ? "WHERE m.status = ? " : "") +
            "ORDER BY m.match_date DESC";
        if (statusFilter != null) {
            return queryList(sql, statusFilter);
        }
        try (Connection conn = DBConnection.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            return resultSetToList(rs);
        }
    }

    // ───────────── EVENT REGISTRATIONS DETAIL ─────────────

    /** Detailed registrations for a match (for event manager view). */
    public static Map<String, Object> getMatchRegistrations(String matchId) throws SQLException {
        Map<String, Object> data = new LinkedHashMap<>();

        // Match info
        String matchSql = """
            SELECT m.*, l.district, l.area, o.organizer_name
            FROM `match` m JOIN location l ON m.location_id = l.location_id
            JOIN organizer o ON m.organizer_id = o.organizer_id
            WHERE m.match_id = ?
            """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(matchSql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) data.put("match", rowToMap(rs));
            }
        }

        // Player registrations
        String playerSql = """
            SELECT pmh.*, p.player_name, rt.round_name, b.batch_name
            FROM player_match_history pmh
            JOIN player p ON pmh.player_id = p.player_id
            JOIN round_type rt ON pmh.round_type_id = rt.round_type_id
            JOIN batch b ON pmh.batch_id = b.batch_id
            WHERE pmh.match_id = ?
            ORDER BY pmh.status, p.player_name
            """;
        data.put("playerRegistrations", queryList(playerSql, matchId));

        // Bull registrations
        String bullSql = """
            SELECT bmh.match_id, bmh.bull_id, bmh.round_type_id, bmh.status,
                   bt.bull_name, bt.fitness_certificate, bt.age,
                   rt.round_name, o.name AS owner_name, bb.bull_breed_name AS breed
            FROM bull_match_history bmh
            JOIN bull_table bt ON bmh.bull_id = bt.bull_id
            JOIN round_type rt ON bmh.round_type_id = rt.round_type_id
            LEFT JOIN owner o ON bt.owner_id = o.owner_id
            LEFT JOIN bull_breed bb ON bt.breed_id = bb.bull_breed_id
            WHERE bmh.match_id = ?
            ORDER BY bmh.status, bt.bull_name
            """;
        data.put("bullRegistrations", queryList(bullSql, matchId));

        // Capacity
        data.put("capacity", getMatchCapacity(matchId));

        return data;
    }

    // ───────────── HELPERS ─────────────

    private static List<Map<String, Object>> queryList(String sql, String param) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, param);
            return resultSetToList(ps.executeQuery());
        }
    }

    private static List<Map<String, Object>> resultSetToList(ResultSet rs) throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        ResultSetMetaData md = rs.getMetaData();
        while (rs.next()) {
            Map<String, Object> row = new LinkedHashMap<>();
            for (int i = 1; i <= md.getColumnCount(); i++) {
                row.put(md.getColumnLabel(i), rs.getObject(i));
            }
            rows.add(row);
        }
        return rows;
    }

    private static Map<String, Object> rowToMap(ResultSet rs) throws SQLException {
        Map<String, Object> row = new LinkedHashMap<>();
        ResultSetMetaData md = rs.getMetaData();
        for (int i = 1; i <= md.getColumnCount(); i++) {
            row.put(md.getColumnLabel(i), rs.getObject(i));
        }
        return row;
    }
}
