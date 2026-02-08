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
 * Data Access Object for winner determination queries.
 * Extracted from WinnerServlet for reuse by REST API.
 */
public class WinnerDAO {

    /** Round winner: player with most bull_caught per round */
    public static List<Map<String, Object>> getRoundWinners(String matchId) throws SQLException {
        String sql = """
            SELECT rt.round_name, p.player_name, pmh.bull_caught, pmh.penalties
            FROM player_match_history pmh
            JOIN player p ON pmh.player_id = p.player_id
            JOIN round_type rt ON pmh.round_type_id = rt.round_type_id
            WHERE pmh.match_id = ? AND pmh.status = 'approved'
            AND pmh.bull_caught = (
                SELECT MAX(pmh2.bull_caught) FROM player_match_history pmh2
                WHERE pmh2.match_id = pmh.match_id AND pmh2.round_type_id = pmh.round_type_id AND pmh2.status = 'approved'
            )
            ORDER BY rt.round_type_id
            """;
        return executeQuery(sql, matchId);
    }

    /** Best bull per round: highest (aggression + difficulty) per round */
    public static List<Map<String, Object>> getBestBullPerRound(String matchId) throws SQLException {
        String sql = """
            SELECT rt.round_name, bt.bull_name, bmh.aggression, bmh.difficulty,
                   (bmh.aggression + bmh.difficulty) AS total_score, o.name AS owner_name
            FROM bull_match_history bmh
            JOIN bull_table bt ON bmh.bull_id = bt.bull_id
            JOIN round_type rt ON bmh.round_type_id = rt.round_type_id
            JOIN owner o ON bt.owner_id = o.owner_id
            WHERE bmh.match_id = ? AND bmh.status = 'approved'
            AND (bmh.aggression + bmh.difficulty) = (
                SELECT MAX(b2.aggression + b2.difficulty) FROM bull_match_history b2
                WHERE b2.match_id = bmh.match_id AND b2.round_type_id = bmh.round_type_id AND b2.status = 'approved'
            )
            ORDER BY rt.round_type_id
            """;
        return executeQuery(sql, matchId);
    }

    /** Best bull overall: highest aggregate (aggression + difficulty) across all rounds */
    public static List<Map<String, Object>> getBestBullOverall(String matchId) throws SQLException {
        String sql = """
            SELECT bt.bull_name, o.name AS owner_name,
                   SUM(bmh.aggression) AS total_aggression,
                   SUM(bmh.difficulty) AS total_difficulty,
                   SUM(bmh.aggression + bmh.difficulty) AS total_score
            FROM bull_match_history bmh
            JOIN bull_table bt ON bmh.bull_id = bt.bull_id
            JOIN owner o ON bt.owner_id = o.owner_id
            WHERE bmh.match_id = ? AND bmh.status = 'approved'
            GROUP BY bmh.bull_id, bt.bull_name, o.name
            ORDER BY total_score DESC
            LIMIT 3
            """;
        return executeQuery(sql, matchId);
    }

    /** Interaction winner: longest total hold_duration per bull */
    public static List<Map<String, Object>> getInteractionWinners(String matchId) throws SQLException {
        String sql = """
            SELECT bt.bull_name, p.player_name,
                   MAX(bpi.hold_duration) AS longest_hold,
                   SUM(bpi.hold_duration) AS total_hold_time,
                   COUNT(*) AS hold_count
            FROM bull_player_interaction bpi
            JOIN bull_table bt ON bpi.bull_id = bt.bull_id
            JOIN player p ON bpi.player_id = p.player_id
            WHERE bpi.match_id = ?
            GROUP BY bpi.bull_id, bpi.player_id, bt.bull_name, p.player_name
            ORDER BY longest_hold DESC
            LIMIT 5
            """;
        return executeQuery(sql, matchId);
    }

    /** Overall match winner: highest aggregate bull_caught across all rounds */
    public static List<Map<String, Object>> getOverallWinner(String matchId) throws SQLException {
        String sql = """
            SELECT p.player_name,
                   SUM(pmh.bull_caught) AS total_bulls_caught,
                   SUM(pmh.penalties) AS total_penalties,
                   SUM(pmh.bull_caught) - SUM(pmh.penalties) AS net_score
            FROM player_match_history pmh
            JOIN player p ON pmh.player_id = p.player_id
            WHERE pmh.match_id = ? AND pmh.status = 'approved'
            GROUP BY pmh.player_id, p.player_name
            ORDER BY net_score DESC
            LIMIT 5
            """;
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
