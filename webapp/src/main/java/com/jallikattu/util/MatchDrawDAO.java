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
 * Data Access Object for the Match Draw system.
 * Handles batch auto-assignment, bull queue, round advancement, fouls,
 * and round configuration.
 */
public class MatchDrawDAO {

    // ───────────── MATCH DRAW OVERVIEW ─────────────

    /**
     * Get full match draw data for a specific match:
     * match info (with arena_capacity), round configs, player batches,
     * bull queue, and fouls.
     */
    public static Map<String, Object> getMatchDraw(String matchId) throws SQLException {
        Map<String, Object> data = new LinkedHashMap<>();
        try (Connection conn = DBConnection.getConnection()) {
            // Match info with location + arena_capacity
            data.put("match", getMatchInfo(conn, matchId));
            // Round configs for this match
            data.put("roundConfigs", getRoundConfigs(conn, matchId));
            // Players grouped by round + batch with advancement status
            data.put("players", getPlayerDraw(conn, matchId));
            // Bull queue
            data.put("bulls", getBullQueue(conn, matchId));
            // Fouls
            data.put("fouls", getFouls(conn, matchId));
            // Summary counts
            data.put("summary", getDrawSummary(conn, matchId));
        }
        return data;
    }

    private static Map<String, Object> getMatchInfo(Connection conn, String matchId) throws SQLException {
        String sql = """
            SELECT m.*, l.district, l.area, l.arena_capacity, o.organizer_name
            FROM `match` m
            JOIN location l ON m.location_id = l.location_id
            JOIN organizer o ON m.organizer_id = o.organizer_id
            WHERE m.match_id = ?
            """;
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rowToMap(rs);
            }
        }
        return null;
    }

    private static List<Map<String, Object>> getRoundConfigs(Connection conn, String matchId) throws SQLException {
        String sql = """
            SELECT mrc.*, rt.round_name
            FROM match_round_config mrc
            JOIN round_type rt ON mrc.round_type_id = rt.round_type_id
            WHERE mrc.match_id = ?
            ORDER BY mrc.round_type_id
            """;
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            return resultSetToList(ps.executeQuery());
        }
    }

    private static List<Map<String, Object>> getPlayerDraw(Connection conn, String matchId) throws SQLException {
        String sql = """
            SELECT pmh.match_id, pmh.round_type_id, pmh.batch_id, pmh.player_id,
                   pmh.bull_caught, pmh.penalties, pmh.status, pmh.advancement_status,
                   p.player_name, rt.round_name, b.batch_name
            FROM player_match_history pmh
            JOIN player p ON pmh.player_id = p.player_id
            JOIN round_type rt ON pmh.round_type_id = rt.round_type_id
            JOIN batch b ON pmh.batch_id = b.batch_id
            WHERE pmh.match_id = ?
            ORDER BY rt.round_type_id, b.batch_name, p.player_name
            """;
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            return resultSetToList(ps.executeQuery());
        }
    }

    private static List<Map<String, Object>> getBullQueue(Connection conn, String matchId) throws SQLException {
        String sql = """
            SELECT bmh.match_id, bmh.bull_id, bmh.round_type_id, bmh.batch_id,
                   bmh.release_order, bmh.player_id, bmh.aggression, bmh.play_area,
                   bmh.difficulty, bmh.penalties, bmh.winner, bmh.status,
                   bt.bull_name, rt.round_name,
                   o.name AS owner_name, p.player_name
            FROM bull_match_history bmh
            JOIN bull_table bt ON bmh.bull_id = bt.bull_id
            JOIN round_type rt ON bmh.round_type_id = rt.round_type_id
            LEFT JOIN owner o ON bt.owner_id = o.owner_id
            LEFT JOIN player p ON bmh.player_id = p.player_id
            WHERE bmh.match_id = ?
            ORDER BY bmh.release_order, bt.bull_name
            """;
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            return resultSetToList(ps.executeQuery());
        }
    }

    private static List<Map<String, Object>> getFouls(Connection conn, String matchId) throws SQLException {
        String sql = """
            SELECT f.*, bt.bull_name, p.player_name, rt.round_name
            FROM foul f
            JOIN bull_table bt ON f.bull_id = bt.bull_id
            LEFT JOIN player p ON f.player_id = p.player_id
            JOIN round_type rt ON f.round_type_id = rt.round_type_id
            WHERE f.match_id = ?
            ORDER BY f.recorded_time DESC, f.foul_id DESC
            """;
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            return resultSetToList(ps.executeQuery());
        }
    }

    private static Map<String, Object> getDrawSummary(Connection conn, String matchId) throws SQLException {
        Map<String, Object> summary = new LinkedHashMap<>();
        int mid = Integer.parseInt(matchId);

        // Total approved players
        try (PreparedStatement ps = conn.prepareStatement(
                "SELECT COUNT(DISTINCT player_id) FROM player_match_history WHERE match_id = ? AND status = 'approved'")) {
            ps.setInt(1, mid);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); summary.put("approvedPlayers", rs.getInt(1)); }
        }
        // Total approved bulls
        try (PreparedStatement ps = conn.prepareStatement(
                "SELECT COUNT(DISTINCT bull_id) FROM bull_match_history WHERE match_id = ? AND status = 'approved'")) {
            ps.setInt(1, mid);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); summary.put("approvedBulls", rs.getInt(1)); }
        }
        // Bulls with release_order assigned
        try (PreparedStatement ps = conn.prepareStatement(
                "SELECT COUNT(*) FROM bull_match_history WHERE match_id = ? AND release_order IS NOT NULL")) {
            ps.setInt(1, mid);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); summary.put("bullsQueued", rs.getInt(1)); }
        }
        // Qualified players (for advancement tracking)
        try (PreparedStatement ps = conn.prepareStatement(
                "SELECT COUNT(*) FROM player_match_history WHERE match_id = ? AND advancement_status = 'qualified'")) {
            ps.setInt(1, mid);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); summary.put("qualifiedPlayers", rs.getInt(1)); }
        }
        // Foul count
        try (PreparedStatement ps = conn.prepareStatement(
                "SELECT COUNT(*) FROM foul WHERE match_id = ?")) {
            ps.setInt(1, mid);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); summary.put("totalFouls", rs.getInt(1)); }
        }

        return summary;
    }

    // ───────────── AUTO-ASSIGN BATCHES ─────────────

    /**
     * Auto-assign approved players in Round 1 to batches based on arena capacity.
     * Players are distributed evenly across as many batches as needed.
     * Returns the number of players assigned.
     */
    public static int autoAssignBatches(String matchId) throws SQLException {
        try (Connection conn = DBConnection.getConnection()) {
            int mid = Integer.parseInt(matchId);

            // Get arena capacity for this match's location
            int arenaCapacity = getArenaCapacity(conn, mid);
            if (arenaCapacity <= 0) throw new SQLException("Arena capacity not set for this location");

            // Get all approved Round 1 players ordered by player_id
            String sql = "SELECT player_id FROM player_match_history " +
                         "WHERE match_id = ? AND round_type_id = 1 AND status = 'approved' " +
                         "ORDER BY player_id";
            List<Integer> playerIds = new ArrayList<>();
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setInt(1, mid);
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) playerIds.add(rs.getInt("player_id"));
                }
            }

            if (playerIds.isEmpty()) return 0;

            // Calculate number of batches needed
            int batchCount = (int) Math.ceil((double) playerIds.size() / arenaCapacity);

            // Get available batch IDs
            List<Integer> batchIds = new ArrayList<>();
            try (Statement st = conn.createStatement();
                 ResultSet rs = st.executeQuery("SELECT batch_id FROM batch ORDER BY batch_id")) {
                while (rs.next()) batchIds.add(rs.getInt("batch_id"));
            }
            if (batchIds.size() < batchCount) {
                throw new SQLException("Not enough batches defined. Need " + batchCount + " but only " + batchIds.size() + " exist");
            }

            // Round-robin assignment into the needed number of batches
            String updateSql = "UPDATE player_match_history SET batch_id = ? " +
                               "WHERE match_id = ? AND round_type_id = 1 AND player_id = ?";
            int count = 0;
            try (PreparedStatement ps = conn.prepareStatement(updateSql)) {
                for (int i = 0; i < playerIds.size(); i++) {
                    ps.setInt(1, batchIds.get(i % batchCount));
                    ps.setInt(2, mid);
                    ps.setInt(3, playerIds.get(i));
                    ps.addBatch();
                    count++;
                }
                ps.executeBatch();
            }
            return count;
        }
    }

    // ───────────── BULL QUEUE ASSIGNMENT ─────────────

    /**
     * Assign release_order to all approved bulls for a match.
     * Bulls are ordered by bull_id and assigned sequential numbers starting from 1.
     * Returns the number of bulls queued.
     */
    public static int assignBullQueue(String matchId) throws SQLException {
        try (Connection conn = DBConnection.getConnection()) {
            int mid = Integer.parseInt(matchId);

            // Get all approved bulls ordered by bull_id
            List<Integer> bullIds = new ArrayList<>();
            try (PreparedStatement ps = conn.prepareStatement(
                    "SELECT bull_id FROM bull_match_history WHERE match_id = ? AND status = 'approved' ORDER BY bull_id")) {
                ps.setInt(1, mid);
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) bullIds.add(rs.getInt("bull_id"));
                }
            }

            if (bullIds.isEmpty()) return 0;

            // Assign sequential release_order
            String updateSql = "UPDATE bull_match_history SET release_order = ? WHERE match_id = ? AND bull_id = ?";
            try (PreparedStatement ps = conn.prepareStatement(updateSql)) {
                for (int i = 0; i < bullIds.size(); i++) {
                    ps.setInt(1, i + 1);
                    ps.setInt(2, mid);
                    ps.setInt(3, bullIds.get(i));
                    ps.addBatch();
                }
                ps.executeBatch();
            }
            return bullIds.size();
        }
    }

    // ───────────── ROUND ADVANCEMENT ─────────────

    /**
     * Advance top players from a given round to the next round.
     * Uses match_round_config.advance_count to determine how many advance.
     * Players are ranked by (bull_caught - penalties) DESC within each batch.
     * Top N per batch are marked 'qualified', rest 'eliminated'.
     * Qualified players get new player_match_history rows for the next round.
     * Returns number of players advanced.
     */
    public static int advancePlayers(String matchId, String fromRoundId) throws SQLException {
        try (Connection conn = DBConnection.getConnection()) {
            conn.setAutoCommit(false);
            try {
                int mid = Integer.parseInt(matchId);
                int fromRound = Integer.parseInt(fromRoundId);
                int nextRound = fromRound + 1;

                // Get advance_count from match_round_config
                int advanceCount = getAdvanceCount(conn, mid, fromRound);
                if (advanceCount <= 0) {
                    throw new SQLException("No advance_count configured for match " + matchId + " round " + fromRoundId);
                }

                // Get distinct batches for this round
                List<Integer> batchIds = new ArrayList<>();
                try (PreparedStatement ps = conn.prepareStatement(
                        "SELECT DISTINCT batch_id FROM player_match_history " +
                        "WHERE match_id = ? AND round_type_id = ? AND status = 'approved' ORDER BY batch_id")) {
                    ps.setInt(1, mid);
                    ps.setInt(2, fromRound);
                    try (ResultSet rs = ps.executeQuery()) {
                        while (rs.next()) batchIds.add(rs.getInt("batch_id"));
                    }
                }

                int totalAdvanced = 0;

                for (int batchId : batchIds) {
                    // Rank players in this batch by net score DESC
                    String rankSql = "SELECT player_id, " +
                                     "(COALESCE(bull_caught,0) - COALESCE(penalties,0)) AS net_score " +
                                     "FROM player_match_history " +
                                     "WHERE match_id = ? AND round_type_id = ? AND batch_id = ? AND status = 'approved' " +
                                     "ORDER BY net_score DESC, player_id ASC";
                    List<Integer> rankedPlayers = new ArrayList<>();
                    try (PreparedStatement ps = conn.prepareStatement(rankSql)) {
                        ps.setInt(1, mid);
                        ps.setInt(2, fromRound);
                        ps.setInt(3, batchId);
                        try (ResultSet rs = ps.executeQuery()) {
                            while (rs.next()) rankedPlayers.add(rs.getInt("player_id"));
                        }
                    }

                    // Mark top N as qualified, rest as eliminated
                    String updateStatus = "UPDATE player_match_history SET advancement_status = ? " +
                                          "WHERE match_id = ? AND round_type_id = ? AND batch_id = ? AND player_id = ?";
                    try (PreparedStatement ps = conn.prepareStatement(updateStatus)) {
                        for (int i = 0; i < rankedPlayers.size(); i++) {
                            ps.setString(1, i < advanceCount ? "qualified" : "eliminated");
                            ps.setInt(2, mid);
                            ps.setInt(3, fromRound);
                            ps.setInt(4, batchId);
                            ps.setInt(5, rankedPlayers.get(i));
                            ps.addBatch();
                        }
                        ps.executeBatch();
                    }

                    // Create next-round entries for qualified players
                    // They go into the same batch for the next round
                    String insertSql = "INSERT INTO player_match_history " +
                                       "(match_id, round_type_id, batch_id, player_id, bull_caught, penalties, status, advancement_status) " +
                                       "VALUES (?, ?, ?, ?, 0, 0, 'approved', 'pending')";
                    try (PreparedStatement ps = conn.prepareStatement(insertSql)) {
                        int advCount = Math.min(advanceCount, rankedPlayers.size());
                        for (int i = 0; i < advCount; i++) {
                            ps.setInt(1, mid);
                            ps.setInt(2, nextRound);
                            ps.setInt(3, batchId);
                            ps.setInt(4, rankedPlayers.get(i));
                            ps.addBatch();
                            totalAdvanced++;
                        }
                        ps.executeBatch();
                    }
                }

                conn.commit();
                return totalAdvanced;
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }

    // ───────────── RECORD BULL RELEASE ─────────────

    /**
     * Record a bull release (scoring during live match).
     * Updates bull_match_history with round, batch, player, and scores.
     */
    public static void recordBullRelease(String matchId, String bullId, String roundTypeId,
                                          String batchId, String playerId,
                                          String aggression, String playArea, String difficulty)
            throws SQLException {
        String sql = "UPDATE bull_match_history SET round_type_id = ?, batch_id = ?, " +
                     "player_id = ?, aggression = ?, play_area = ?, difficulty = ? " +
                     "WHERE match_id = ? AND bull_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(roundTypeId));
            if (batchId != null && !batchId.isEmpty()) {
                ps.setInt(2, Integer.parseInt(batchId));
            } else {
                ps.setNull(2, java.sql.Types.INTEGER);
            }
            ps.setInt(3, Integer.parseInt(playerId));
            ps.setInt(4, Integer.parseInt(aggression));
            ps.setInt(5, Integer.parseInt(playArea));
            ps.setInt(6, Integer.parseInt(difficulty));
            ps.setInt(7, Integer.parseInt(matchId));
            ps.setInt(8, Integer.parseInt(bullId));
            ps.executeUpdate();
        }
    }

    // ───────────── ROUND CONFIG MANAGEMENT ─────────────

    /**
     * Save or update round configs for a match.
     * Each config has: round_type_id, advance_count, bull_start, bull_end.
     */
    public static void saveRoundConfigs(String matchId, List<Map<String, Object>> configs) throws SQLException {
        String sql = "REPLACE INTO match_round_config (match_id, round_type_id, advance_count, bull_start, bull_end) " +
                     "VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int mid = Integer.parseInt(matchId);
            for (Map<String, Object> cfg : configs) {
                ps.setInt(1, mid);
                ps.setInt(2, toInt(cfg.get("round_type_id")));
                setNullableInt(ps, 3, cfg.get("advance_count"));
                setNullableInt(ps, 4, cfg.get("bull_start"));
                setNullableInt(ps, 5, cfg.get("bull_end"));
                ps.addBatch();
            }
            ps.executeBatch();
        }
    }

    // ───────────── FOUL MANAGEMENT ─────────────

    /**
     * Record a foul for a player or bull.
     * If player_id is null, it's a bull foul.
     */
    public static int recordFoul(String matchId, String roundTypeId, String bullId,
                                  String playerId, String foulType, String notes) throws SQLException {
        String sql = "INSERT INTO foul (match_id, round_type_id, bull_id, player_id, foul_type, notes, recorded_time) " +
                     "VALUES (?, ?, ?, ?, ?, ?, NOW())";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, Integer.parseInt(matchId));
            ps.setInt(2, Integer.parseInt(roundTypeId));
            ps.setInt(3, Integer.parseInt(bullId));
            if (playerId != null && !playerId.isEmpty()) {
                ps.setInt(4, Integer.parseInt(playerId));
            } else {
                ps.setNull(4, java.sql.Types.INTEGER);
            }
            ps.setString(5, foulType);
            ps.setString(6, notes);
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) return keys.getInt(1);
            }
        }
        return -1;
    }

    /**
     * Delete a foul by its ID.
     */
    public static void deleteFoul(String foulId) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement("DELETE FROM foul WHERE foul_id = ?")) {
            ps.setInt(1, Integer.parseInt(foulId));
            ps.executeUpdate();
        }
    }

    // ───────────── HELPERS ─────────────

    private static int getArenaCapacity(Connection conn, int matchId) throws SQLException {
        String sql = "SELECT l.arena_capacity FROM `match` m JOIN location l ON m.location_id = l.location_id WHERE m.match_id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, matchId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getInt("arena_capacity");
            }
        }
        return 0;
    }

    private static int getAdvanceCount(Connection conn, int matchId, int roundTypeId) throws SQLException {
        String sql = "SELECT advance_count FROM match_round_config WHERE match_id = ? AND round_type_id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, matchId);
            ps.setInt(2, roundTypeId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    int val = rs.getInt("advance_count");
                    return rs.wasNull() ? 0 : val;
                }
            }
        }
        return 0;
    }

    private static int toInt(Object val) {
        if (val == null) return 0;
        if (val instanceof Number) return ((Number) val).intValue();
        return Integer.parseInt(val.toString());
    }

    private static void setNullableInt(PreparedStatement ps, int index, Object val) throws SQLException {
        if (val == null || val.toString().isEmpty()) {
            ps.setNull(index, java.sql.Types.INTEGER);
        } else {
            ps.setInt(index, toInt(val));
        }
    }

    private static List<Map<String, Object>> resultSetToList(ResultSet rs) throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        ResultSetMetaData md = rs.getMetaData();
        while (rs.next()) {
            rows.add(rowToMap(rs));
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
