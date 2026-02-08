package com.jallikattu.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Data Access Object for scoring operations.
 * Extracted from ScoringServlet for reuse by REST API.
 */
public class ScoringDAO {

    public static void updateMatchStatus(String matchId, String status) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement("UPDATE `match` SET status = ? WHERE match_id = ?")) {
            ps.setString(1, status);
            ps.setInt(2, Integer.parseInt(matchId));
            ps.executeUpdate();
        }
    }

    public static void updatePlayerScore(String matchId, String playerId, String roundTypeId,
                                          String bullCaught, String penalties) throws SQLException {
        String sql = "UPDATE player_match_history SET bull_caught = ?, penalties = ? WHERE match_id = ? AND player_id = ? AND round_type_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(bullCaught));
            ps.setInt(2, Integer.parseInt(penalties));
            ps.setInt(3, Integer.parseInt(matchId));
            ps.setInt(4, Integer.parseInt(playerId));
            ps.setInt(5, Integer.parseInt(roundTypeId));
            ps.executeUpdate();
        }
    }

    public static void updateBullScore(String matchId, String bullId, String roundTypeId,
                                        String aggression, String playArea, String difficulty,
                                        String releaseCount, String playerId) throws SQLException {
        String sql = "UPDATE bull_match_history SET aggression = ?, play_area = ?, difficulty = ?, release_count = ?, player_id = ? " +
                     "WHERE match_id = ? AND bull_id = ? AND round_type_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(aggression));
            ps.setInt(2, Integer.parseInt(playArea));
            ps.setInt(3, Integer.parseInt(difficulty));
            ps.setInt(4, Integer.parseInt(releaseCount));
            ps.setInt(5, Integer.parseInt(playerId));
            ps.setInt(6, Integer.parseInt(matchId));
            ps.setInt(7, Integer.parseInt(bullId));
            ps.setInt(8, Integer.parseInt(roundTypeId));
            ps.executeUpdate();
        }
    }

    public static void addInteraction(String matchId, String playerId, String bullId,
                                       String holdSeq, String holdDur, String roundTypeId) throws SQLException {
        String sql = "INSERT INTO bull_player_interaction (match_id, round_type_id, player_id, bull_id, hold_sequence, hold_duration) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            ps.setInt(2, Integer.parseInt(roundTypeId));
            ps.setInt(3, Integer.parseInt(playerId));
            ps.setInt(4, Integer.parseInt(bullId));
            ps.setInt(5, Integer.parseInt(holdSeq));
            ps.setInt(6, Integer.parseInt(holdDur));
            ps.executeUpdate();
        }
    }

    public static List<Map<String, Object>> getMatchesByStatus(String status) throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM `match` WHERE status = ? ORDER BY match_date")) {
            ps.setString(1, status);
            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++)
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
                    rows.add(row);
                }
            }
        }
        return rows;
    }

    public static List<Map<String, Object>> getPlayerScores(String matchId) throws SQLException {
        String sql = "SELECT pmh.*, p.player_name, rt.round_name, b.batch_name, " +
                     "(COALESCE(pmh.bull_caught,0) - COALESCE(pmh.penalties,0)) AS net_score " +
                     "FROM player_match_history pmh " +
                     "JOIN player p ON pmh.player_id = p.player_id " +
                     "JOIN round_type rt ON pmh.round_type_id = rt.round_type_id " +
                     "JOIN batch b ON pmh.batch_id = b.batch_id " +
                     "WHERE pmh.match_id = ? AND pmh.status = 'approved' ORDER BY rt.round_type_id, b.batch_name, p.player_name";
        return executeQuery(sql, matchId);
    }

    public static List<Map<String, Object>> getBullScores(String matchId) throws SQLException {
        String sql = "SELECT bmh.*, bt.bull_name, rt.round_name, p.player_name AS tamer_name FROM bull_match_history bmh " +
                     "JOIN bull_table bt ON bmh.bull_id = bt.bull_id " +
                     "JOIN round_type rt ON bmh.round_type_id = rt.round_type_id " +
                     "JOIN player p ON bmh.player_id = p.player_id " +
                     "WHERE bmh.match_id = ? AND bmh.status = 'approved' ORDER BY rt.round_type_id, bt.bull_name";
        return executeQuery(sql, matchId);
    }

    public static List<Map<String, Object>> getInteractions(String matchId) throws SQLException {
        String sql = "SELECT bpi.*, p.player_name, bt.bull_name, rt.round_name FROM bull_player_interaction bpi " +
                     "JOIN player p ON bpi.player_id = p.player_id " +
                     "JOIN bull_table bt ON bpi.bull_id = bt.bull_id " +
                     "LEFT JOIN round_type rt ON bpi.round_type_id = rt.round_type_id " +
                     "WHERE bpi.match_id = ? ORDER BY bpi.bull_id, bpi.hold_sequence";
        return executeQuery(sql, matchId);
    }

    public static List<Map<String, Object>> getApprovedPlayers(String matchId) throws SQLException {
        String sql = "SELECT DISTINCT p.player_id, p.player_name FROM player_match_history pmh " +
                     "JOIN player p ON pmh.player_id = p.player_id WHERE pmh.match_id = ? AND pmh.status = 'approved'";
        return executeQuery(sql, matchId);
    }

    public static List<Map<String, Object>> getApprovedBulls(String matchId) throws SQLException {
        String sql = "SELECT DISTINCT bt.bull_id, bt.bull_name FROM bull_match_history bmh " +
                     "JOIN bull_table bt ON bmh.bull_id = bt.bull_id WHERE bmh.match_id = ? AND bmh.status = 'approved'";
        return executeQuery(sql, matchId);
    }

    public static List<Map<String, Object>> getTopPlayers(String matchId) throws SQLException {
        String sql = "SELECT p.player_id, p.player_name, b.batch_name, " +
                     "SUM(pmh.bull_caught) AS total_caught, SUM(pmh.penalties) AS total_penalties, " +
                     "(SUM(pmh.bull_caught) - SUM(pmh.penalties)) AS net_score, " +
                     "COUNT(DISTINCT pmh.round_type_id) AS rounds_played " +
                     "FROM player_match_history pmh " +
                     "JOIN player p ON pmh.player_id = p.player_id " +
                     "JOIN batch b ON pmh.batch_id = b.batch_id " +
                     "WHERE pmh.match_id = ? AND pmh.status = 'approved' " +
                     "GROUP BY p.player_id, p.player_name, b.batch_name " +
                     "ORDER BY net_score DESC, total_caught DESC LIMIT 10";
        return executeQuery(sql, matchId);
    }

    public static List<Map<String, Object>> getTopBulls(String matchId) throws SQLException {
        String sql = "SELECT bt.bull_id, bt.bull_name, o.name AS owner_name, " +
                     "AVG(bmh.aggression) AS avg_aggression, AVG(bmh.difficulty) AS avg_difficulty, " +
                     "SUM(bmh.release_count) AS total_releases, " +
                     "COUNT(DISTINCT bmh.round_type_id) AS rounds_played " +
                     "FROM bull_match_history bmh " +
                     "JOIN bull_table bt ON bmh.bull_id = bt.bull_id " +
                     "JOIN owner o ON bt.owner_id = o.owner_id " +
                     "WHERE bmh.match_id = ? AND bmh.status = 'approved' " +
                     "GROUP BY bt.bull_id, bt.bull_name, o.name " +
                     "ORDER BY avg_difficulty DESC, total_releases DESC LIMIT 10";
        return executeQuery(sql, matchId);
    }

    private static List<Map<String, Object>> executeQuery(String sql, String matchId) throws SQLException {
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++)
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
                    rows.add(row);
                }
            }
        }
        return rows;
    }
}
