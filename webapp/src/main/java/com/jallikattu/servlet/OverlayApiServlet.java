package com.jallikattu.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.jallikattu.util.DBConnection;
import com.jallikattu.util.ScoringDAO;
import com.jallikattu.util.StatsDAO;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Overlay API — manages live statistics overlay state for broadcasting.
 *
 * PUBLIC (no auth required):
 *   GET  /api/overlay/current      — viewers poll this every 1-2s to get current overlay data
 *
 * ADMIN-ONLY (requires admin/super_admin/scorer session):
 *   GET  /api/overlay/config       — full config + lookup data for admin panel
 *   POST /api/overlay/update       — set what to display (type, entityId, layout, visible)
 *   POST /api/overlay/video        — set the YouTube video URL
 *   POST /api/overlay/hide         — quick hide overlay
 *   POST /api/overlay/show         — quick show overlay
 */
@WebServlet("/api/overlay/*")
public class OverlayApiServlet extends BaseRestServlet {

    // ─── Shared in-memory overlay state ───
    private static volatile String overlayType = "none";    // player, bull, match, none
    private static volatile String entityId = "";
    private static volatile String videoUrl = "";
    private static volatile String layout = "bottom-bar";   // bottom-bar, side-panel, top-bar
    private static volatile boolean visible = false;
    private static volatile long updatedAt = System.currentTimeMillis();

    // Secondary entity (for dual overlay — e.g. player + bull at the same time)
    private static volatile String secondaryType = "none";
    private static volatile String secondaryId = "";

    // Active match ID for ticker/branding (can be set independently of overlay type)
    private static volatile String activeMatchId = "";

    // Bull clock (manually triggered by admin)
    private static volatile String clockState = "stopped";  // stopped, running, paused
    private static volatile long clockStartedAt = 0;          // epoch ms when started
    private static volatile long clockElapsedBeforePause = 0; // accumulated ms before pause
    private static volatile String clockLabel = "";           // optional label e.g. "Bull #3"

    // Active round for round-players panel
    private static volatile String activeRoundId = "";

    // Independent overlay toggles (composable)
    private static volatile boolean showTicker = false;
    private static volatile boolean showScoreboard = false;

    // Performance rating (scorer sets live, 0-5 stars)
    private static volatile int rating = 0;
    private static volatile String ratingLabel = "";
    private static volatile boolean showRating = false;

    // Next bull indicator (scorer picks the upcoming bull)
    private static volatile String nextBullId = "";
    private static volatile String nextBullName = "";
    private static volatile boolean showNextBull = false;

    // Round-players cache (2s TTL)
    private static volatile List<Map<String, Object>> cachedRoundPlayers = null;
    private static volatile long roundPlayersResolvedAt = 0;

    // Scoreboard cache (2s TTL)
    private static volatile List<Map<String, Object>> cachedScoreboard = null;
    private static volatile long scoreboardResolvedAt = 0;

    // Ticker + spot prize caches (2s TTL)
    private static volatile Map<String, Object> cachedTicker = null;
    private static volatile long tickerResolvedAt = 0;
    private static volatile List<Map<String, Object>> cachedSpotAwards = null;
    private static volatile long spotAwardsResolvedAt = 0;
    private static volatile int lastKnownAwardCount = 0;

    // Playback time reported by overlay viewer (for AI service sync)
    private static volatile double playbackTimeSec = -1; // -1 = unknown
    private static volatile boolean isLiveStream = false;
    private static volatile long playbackUpdatedAt = 0;

    // Cache the resolved data to avoid hitting DB every poll
    private static volatile Map<String, Object> cachedData = null;
    private static volatile long dataResolvedAt = 0;
    private static volatile Map<String, Object> cachedSecondaryData = null;
    private static volatile long secondaryDataResolvedAt = 0;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String seg0 = getPathSegment(req, 0);

        try {
            switch (seg0 != null ? seg0 : "") {
                case "current" -> handleGetCurrent(resp);
                case "config" -> handleGetConfig(resp);
                default -> sendError(resp, "Unknown overlay endpoint", 404);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String seg0 = getPathSegment(req, 0);

        try {
            switch (seg0 != null ? seg0 : "") {
                case "update" -> handleUpdate(req, resp);
                case "video" -> handleSetVideo(req, resp);
                case "hide" -> { visible = false; updatedAt = System.currentTimeMillis(); sendSuccess(resp, "Overlay hidden"); }
                case "show" -> { visible = true; updatedAt = System.currentTimeMillis(); sendSuccess(resp, "Overlay shown"); }
                case "clock" -> handleClock(req, resp);
                case "playback" -> handlePlayback(req, resp);
                default -> sendError(resp, "Unknown overlay endpoint", 404);
            }
        } catch (Exception e) {
            sendError(resp, e.getMessage(), 500);
        }
    }

    // ═══════════ PUBLIC: GET /api/overlay/current ═══════════

    private void handleGetCurrent(HttpServletResponse resp) throws Exception {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("visible", visible);
        result.put("type", overlayType);
        result.put("entityId", entityId);
        result.put("layout", layout);
        result.put("videoUrl", videoUrl);
        result.put("updatedAt", updatedAt);

        // Playback position (reported by overlay viewer, used by AI service)
        result.put("playbackTimeSec", playbackTimeSec);
        result.put("isLive", isLiveStream);
        result.put("playbackUpdatedAt", playbackUpdatedAt);

        // Resolve primary entity data (with 1s cache to avoid DB hammering from many viewers)
        if (!"none".equals(overlayType) && entityId != null && !entityId.isEmpty()) {
            long now = System.currentTimeMillis();
            if (cachedData == null || (now - dataResolvedAt) > 1000) {
                cachedData = resolveEntityData(overlayType, entityId);
                dataResolvedAt = now;
            }
            result.put("entity", cachedData);
        } else {
            result.put("entity", null);
        }

        // Resolve secondary entity data (dual overlay)
        result.put("secondaryType", secondaryType);
        result.put("secondaryId", secondaryId);
        if (!"none".equals(secondaryType) && secondaryId != null && !secondaryId.isEmpty()) {
            long now = System.currentTimeMillis();
            if (cachedSecondaryData == null || (now - secondaryDataResolvedAt) > 1000) {
                cachedSecondaryData = resolveEntityData(secondaryType, secondaryId);
                secondaryDataResolvedAt = now;
            }
            result.put("secondaryEntity", cachedSecondaryData);
        } else {
            result.put("secondaryEntity", null);
        }

        // Clock state
        Map<String, Object> clock = new LinkedHashMap<>();
        clock.put("state", clockState);
        clock.put("label", clockLabel);
        if ("running".equals(clockState)) {
            clock.put("elapsedMs", clockElapsedBeforePause + (System.currentTimeMillis() - clockStartedAt));
        } else {
            clock.put("elapsedMs", clockElapsedBeforePause);
        }
        result.put("clock", clock);

        // Round players — players in the active round
        result.put("activeRoundId", activeRoundId);
        if (activeMatchId != null && !activeMatchId.isEmpty()) {
            long now2 = System.currentTimeMillis();
            if (cachedRoundPlayers == null || (now2 - roundPlayersResolvedAt) > 2000) {
                try {
                    cachedRoundPlayers = getRoundPlayers(activeMatchId, activeRoundId);
                    roundPlayersResolvedAt = now2;
                } catch (Exception e) { /* keep old cache */ }
            }
            result.put("roundPlayers", cachedRoundPlayers);
        }

        // Overlay toggles
        result.put("showTicker", showTicker);
        result.put("showScoreboard", showScoreboard);

        // Rating overlay
        result.put("showRating", showRating);
        result.put("rating", rating);
        result.put("ratingLabel", ratingLabel);

        // Next bull overlay
        result.put("showNextBull", showNextBull);
        result.put("nextBullId", nextBullId);
        result.put("nextBullName", nextBullName);

        // Live scoreboard (players + bull assignments)
        if (showScoreboard && activeMatchId != null && !activeMatchId.isEmpty()) {
            long now3 = System.currentTimeMillis();
            if (cachedScoreboard == null || (now3 - scoreboardResolvedAt) > 2000) {
                try {
                    cachedScoreboard = getLiveScoreboard(activeMatchId, activeRoundId);
                    scoreboardResolvedAt = now3;
                } catch (Exception e) { /* keep old cache */ }
            }
            result.put("scoreboard", cachedScoreboard);
        }

        // Ticker / branding / spot prizes — available when a match is active
        result.put("activeMatchId", activeMatchId);
        if (activeMatchId != null && !activeMatchId.isEmpty()) {
            long now = System.currentTimeMillis();
            // Ticker data (top 5 players + top 5 bulls) — 2s cache
            if (cachedTicker == null || (now - tickerResolvedAt) > 2000) {
                try {
                    Map<String, Object> ticker = new LinkedHashMap<>();
                    ticker.put("topPlayers", ScoringDAO.getTopPlayers(activeMatchId));
                    ticker.put("topBulls", ScoringDAO.getTopBulls(activeMatchId));
                    // Match info for branding bar
                    List<Map<String, Object>> matches = StatsDAO.getMatchesPublic(null);
                    for (Map<String, Object> m : matches) {
                        if (String.valueOf(m.get("match_id")).equals(activeMatchId)) {
                            ticker.put("matchName", m.get("match_name"));
                            ticker.put("location", m.get("location_name"));
                            ticker.put("matchDate", m.get("match_date"));
                            ticker.put("status", m.get("status"));
                            break;
                        }
                    }
                    cachedTicker = ticker;
                    tickerResolvedAt = now;
                } catch (Exception e) { /* keep old cache */ }
            }
            result.put("ticker", cachedTicker);

            // Spot prize awards — 2s cache, track count for new-award detection
            if (cachedSpotAwards == null || (now - spotAwardsResolvedAt) > 2000) {
                try {
                    cachedSpotAwards = getSpotPrizeAwards(activeMatchId);
                    spotAwardsResolvedAt = now;
                } catch (Exception e) { /* keep old cache */ }
            }
            result.put("spotAwards", cachedSpotAwards);
            result.put("spotAwardCount", cachedSpotAwards != null ? cachedSpotAwards.size() : 0);
        }

        sendJson(resp, result);
    }

    // ═══════════ ADMIN: GET /api/overlay/config ═══════════

    private void handleGetConfig(HttpServletResponse resp) throws Exception {
        Map<String, Object> config = new LinkedHashMap<>();

        // Current state
        Map<String, Object> state = new LinkedHashMap<>();
        state.put("type", overlayType);
        state.put("entityId", entityId);
        state.put("videoUrl", videoUrl);
        state.put("layout", layout);
        state.put("visible", visible);
        state.put("secondaryType", secondaryType);
        state.put("secondaryId", secondaryId);
        state.put("activeMatchId", activeMatchId);
        state.put("activeRoundId", activeRoundId);
        state.put("clockState", clockState);
        state.put("clockLabel", clockLabel);
        state.put("showTicker", showTicker);
        state.put("showScoreboard", showScoreboard);
        state.put("showRating", showRating);
        state.put("rating", rating);
        state.put("ratingLabel", ratingLabel);
        state.put("showNextBull", showNextBull);
        state.put("nextBullId", nextBullId);
        state.put("nextBullName", nextBullName);
        state.put("updatedAt", updatedAt);
        config.put("state", state);

        // Round types for dropdown
        config.put("roundTypes", getRoundTypes());

        // Lookup data for dropdowns
        config.put("players", StatsDAO.getPlayerLeaderboard(100));
        config.put("bulls", StatsDAO.getBullLeaderboard(100));
        config.put("matches", StatsDAO.getMatchesPublic(null));

        sendJson(resp, config);
    }

    // ═══════════ ADMIN: POST /api/overlay/update ═══════════

    private void handleUpdate(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        Map<String, Object> body = readBodyMap(req);

        String newType = str(body, "type");
        String newId = str(body, "entityId");
        String newLayout = str(body, "layout");
        String visStr = str(body, "visible");
        String newSecType = str(body, "secondaryType");
        String newSecId = str(body, "secondaryEntityId");

        String newMatchId = str(body, "activeMatchId");
        String newRoundId = str(body, "activeRoundId");
        String showTickerStr = str(body, "showTicker");
        String showScoreboardStr = str(body, "showScoreboard");
        String showRatingStr = str(body, "showRating");
        String ratingStr = str(body, "rating");
        String newRatingLabel = str(body, "ratingLabel");
        String showNextBullStr = str(body, "showNextBull");
        String newNextBullId = str(body, "nextBullId");
        String newNextBullName = str(body, "nextBullName");

        if (newType != null) overlayType = newType;
        if (newId != null) entityId = newId;
        if (newLayout != null) layout = newLayout;
        if (visStr != null) visible = "true".equals(visStr);
        if (newSecType != null) secondaryType = newSecType;
        if (newSecId != null) secondaryId = newSecId;
        if (newMatchId != null) activeMatchId = newMatchId;
        if (newRoundId != null) { activeRoundId = newRoundId; cachedRoundPlayers = null; roundPlayersResolvedAt = 0; }
        if (showTickerStr != null) showTicker = "true".equals(showTickerStr);
        if (showScoreboardStr != null) showScoreboard = "true".equals(showScoreboardStr);
        if (showRatingStr != null) showRating = "true".equals(showRatingStr);
        if (ratingStr != null) { try { rating = Integer.parseInt(ratingStr); } catch (NumberFormatException e) { /* ignore */ } }
        if (newRatingLabel != null) ratingLabel = newRatingLabel;
        if (showNextBullStr != null) showNextBull = "true".equals(showNextBullStr);
        if (newNextBullId != null) nextBullId = newNextBullId;
        if (newNextBullName != null) nextBullName = newNextBullName;

        // Invalidate caches so next poll fetches fresh data
        cachedData = null;
        dataResolvedAt = 0;
        cachedSecondaryData = null;
        secondaryDataResolvedAt = 0;
        cachedTicker = null;
        tickerResolvedAt = 0;
        cachedSpotAwards = null;
        spotAwardsResolvedAt = 0;
        cachedRoundPlayers = null;
        roundPlayersResolvedAt = 0;
        cachedScoreboard = null;
        scoreboardResolvedAt = 0;
        updatedAt = System.currentTimeMillis();

        // Return resolved data immediately for admin preview
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("type", overlayType);
        result.put("entityId", entityId);
        result.put("layout", layout);
        result.put("visible", visible);
        result.put("secondaryType", secondaryType);
        result.put("secondaryId", secondaryId);
        result.put("activeMatchId", activeMatchId);
        result.put("activeRoundId", activeRoundId);
        result.put("showTicker", showTicker);
        result.put("showScoreboard", showScoreboard);
        result.put("showRating", showRating);
        result.put("rating", rating);
        result.put("ratingLabel", ratingLabel);
        result.put("showNextBull", showNextBull);
        result.put("nextBullId", nextBullId);
        result.put("nextBullName", nextBullName);
        result.put("updatedAt", updatedAt);

        if (!"none".equals(overlayType) && entityId != null && !entityId.isEmpty()) {
            Map<String, Object> data = resolveEntityData(overlayType, entityId);
            cachedData = data;
            dataResolvedAt = System.currentTimeMillis();
            result.put("entity", data);
        }

        if (!"none".equals(secondaryType) && secondaryId != null && !secondaryId.isEmpty()) {
            Map<String, Object> data = resolveEntityData(secondaryType, secondaryId);
            cachedSecondaryData = data;
            secondaryDataResolvedAt = System.currentTimeMillis();
            result.put("secondaryEntity", data);
        }

        sendJson(resp, result);
    }

    // ═══════════ PUBLIC: POST /api/overlay/playback ═══════════

    private void handlePlayback(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        Map<String, Object> body = readBodyMap(req);
        Object timeObj = body.get("time");
        Object liveObj = body.get("isLive");
        if (timeObj != null) {
            playbackTimeSec = ((Number) timeObj).doubleValue();
        }
        if (liveObj != null) {
            isLiveStream = Boolean.TRUE.equals(liveObj);
        }
        playbackUpdatedAt = System.currentTimeMillis();
        sendJson(resp, Map.of("playbackTimeSec", playbackTimeSec, "isLive", isLiveStream));
    }

    // ═══════════ ADMIN: POST /api/overlay/video ═══════════

    private void handleSetVideo(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        Map<String, Object> body = readBodyMap(req);
        String url = str(body, "videoUrl");
        if (url != null) {
            videoUrl = url;
            updatedAt = System.currentTimeMillis();
        }
        sendJson(resp, Map.of("videoUrl", videoUrl, "updatedAt", updatedAt));
    }

    // ═══════════ ADMIN: POST /api/overlay/clock ═══════════

    private void handleClock(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        Map<String, Object> body = readBodyMap(req);
        String action = str(body, "action");   // start, stop, reset, pause
        String label = str(body, "label");

        if (label != null) clockLabel = label;

        switch (action != null ? action : "") {
            case "start" -> {
                if ("paused".equals(clockState)) {
                    // Resume from pause
                    clockStartedAt = System.currentTimeMillis();
                } else {
                    // Fresh start
                    clockElapsedBeforePause = 0;
                    clockStartedAt = System.currentTimeMillis();
                }
                clockState = "running";
            }
            case "pause" -> {
                if ("running".equals(clockState)) {
                    clockElapsedBeforePause += System.currentTimeMillis() - clockStartedAt;
                    clockState = "paused";
                }
            }
            case "stop", "reset" -> {
                clockElapsedBeforePause = 0;
                clockStartedAt = 0;
                clockState = "stopped";
            }
            default -> { sendError(resp, "Unknown clock action: " + action, 400); return; }
        }
        updatedAt = System.currentTimeMillis();

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("clockState", clockState);
        result.put("clockLabel", clockLabel);
        long elapsed = "running".equals(clockState) ?
            clockElapsedBeforePause + (System.currentTimeMillis() - clockStartedAt) :
            clockElapsedBeforePause;
        result.put("elapsedMs", elapsed);
        sendJson(resp, result);
    }

    // ═══════════ Round players for right-side panel ═══════════

    private List<Map<String, Object>> getRoundPlayers(String matchId, String roundId) throws Exception {
        String sql;
        if (roundId != null && !roundId.isEmpty()) {
            sql = "SELECT pmh.player_id, p.player_name, b.batch_name, " +
                  "pmh.bull_caught, pmh.penalties, " +
                  "(COALESCE(pmh.bull_caught,0) - COALESCE(pmh.penalties,0)) AS net_score " +
                  "FROM player_match_history pmh " +
                  "JOIN player p ON pmh.player_id = p.player_id " +
                  "JOIN batch b ON pmh.batch_id = b.batch_id " +
                  "WHERE pmh.match_id = ? AND pmh.round_type_id = ? AND pmh.status = 'approved' " +
                  "ORDER BY net_score DESC, pmh.bull_caught DESC";
        } else {
            // All rounds aggregated
            sql = "SELECT pmh.player_id, p.player_name, b.batch_name, " +
                  "SUM(pmh.bull_caught) AS bull_caught, SUM(pmh.penalties) AS penalties, " +
                  "(SUM(COALESCE(pmh.bull_caught,0)) - SUM(COALESCE(pmh.penalties,0))) AS net_score " +
                  "FROM player_match_history pmh " +
                  "JOIN player p ON pmh.player_id = p.player_id " +
                  "JOIN batch b ON pmh.batch_id = b.batch_id " +
                  "WHERE pmh.match_id = ? AND pmh.status = 'approved' " +
                  "GROUP BY pmh.player_id, p.player_name, b.batch_name " +
                  "ORDER BY net_score DESC, bull_caught DESC";
        }
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            if (roundId != null && !roundId.isEmpty()) {
                ps.setInt(2, Integer.parseInt(roundId));
            }
            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++) {
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
                    }
                    rows.add(row);
                }
            }
        }
        return rows;
    }

    // ═══════════ Round types lookup ═══════════

    private List<Map<String, Object>> getRoundTypes() {
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement("SELECT round_type_id, round_name FROM round_type ORDER BY round_type_id")) {
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("round_type_id", rs.getInt("round_type_id"));
                    row.put("round_name", rs.getString("round_name"));
                    rows.add(row);
                }
            }
        } catch (Exception e) { /* ignore */ }
        return rows;
    }

    // ═══════════ Live Scoreboard (players + bull assignments) ═══════════

    private List<Map<String, Object>> getLiveScoreboard(String matchId, String roundId) throws Exception {
        String sql;
        if (roundId != null && !roundId.isEmpty()) {
            sql = "SELECT pmh.player_id, p.player_name, b.batch_name, " +
                  "pmh.bull_caught, pmh.penalties, " +
                  "(COALESCE(pmh.bull_caught,0) - COALESCE(pmh.penalties,0)) AS net_score, " +
                  "GROUP_CONCAT(DISTINCT bt.bull_name ORDER BY bt.bull_name SEPARATOR ', ') AS bull_names " +
                  "FROM player_match_history pmh " +
                  "JOIN player p ON pmh.player_id = p.player_id " +
                  "JOIN batch b ON pmh.batch_id = b.batch_id " +
                  "LEFT JOIN bull_match_history bmh ON bmh.match_id = pmh.match_id " +
                  "  AND bmh.round_type_id = pmh.round_type_id AND bmh.player_id = pmh.player_id " +
                  "  AND bmh.status = 'approved' " +
                  "LEFT JOIN bull_table bt ON bmh.bull_id = bt.bull_id " +
                  "WHERE pmh.match_id = ? AND pmh.round_type_id = ? AND pmh.status = 'approved' " +
                  "GROUP BY pmh.player_id, p.player_name, b.batch_name, pmh.bull_caught, pmh.penalties " +
                  "ORDER BY net_score DESC, pmh.bull_caught DESC";
        } else {
            sql = "SELECT pmh.player_id, p.player_name, " +
                  "MAX(b.batch_name) AS batch_name, " +
                  "SUM(pmh.bull_caught) AS bull_caught, SUM(pmh.penalties) AS penalties, " +
                  "(SUM(COALESCE(pmh.bull_caught,0)) - SUM(COALESCE(pmh.penalties,0))) AS net_score, " +
                  "GROUP_CONCAT(DISTINCT bt.bull_name ORDER BY bt.bull_name SEPARATOR ', ') AS bull_names " +
                  "FROM player_match_history pmh " +
                  "JOIN player p ON pmh.player_id = p.player_id " +
                  "JOIN batch b ON pmh.batch_id = b.batch_id " +
                  "LEFT JOIN bull_match_history bmh ON bmh.match_id = pmh.match_id " +
                  "  AND bmh.round_type_id = pmh.round_type_id AND bmh.player_id = pmh.player_id " +
                  "  AND bmh.status = 'approved' " +
                  "LEFT JOIN bull_table bt ON bmh.bull_id = bt.bull_id " +
                  "WHERE pmh.match_id = ? AND pmh.status = 'approved' " +
                  "GROUP BY pmh.player_id, p.player_name " +
                  "ORDER BY net_score DESC, bull_caught DESC";
        }
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            if (roundId != null && !roundId.isEmpty()) {
                ps.setInt(2, Integer.parseInt(roundId));
            }
            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++) {
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
                    }
                    rows.add(row);
                }
            }
        }
        return rows;
    }

    // ═══════════ Spot Prize Awards ═══════════

    private List<Map<String, Object>> getSpotPrizeAwards(String matchId) throws Exception {
        String sql = "SELECT spa.spot_prize_award_id, " +
            "p.player_name, " +
            "sp.prize_title, sp.sponsor_name, " +
            "spt.spot_prize_type_name AS prize_type, " +
            "bt.bull_name, " +
            "spa.awarded_time " +
            "FROM spot_prize_award spa " +
            "JOIN spot_prize sp ON spa.spot_prize_id = sp.spot_prize_id " +
            "JOIN player p ON spa.player_id = p.player_id " +
            "LEFT JOIN spot_prize_type spt ON sp.spot_type_id = spt.spot_prize_type_id " +
            "LEFT JOIN bull_table bt ON spa.bull_id = bt.bull_id " +
            "WHERE sp.match_id = ? " +
            "ORDER BY spa.awarded_time DESC, spa.spot_prize_award_id DESC";
        List<Map<String, Object>> rows = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, Integer.parseInt(matchId));
            try (ResultSet rs = ps.executeQuery()) {
                ResultSetMetaData meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++) {
                        row.put(meta.getColumnLabel(i), rs.getObject(i));
                    }
                    rows.add(row);
                }
            }
        }
        return rows;
    }

    // ═══════════ Data resolver ═══════════

    private Map<String, Object> resolveEntityData(String type, String id) throws Exception {
        return switch (type) {
            case "player" -> {
                Map<String, Object> profile = StatsDAO.getPlayerCareerStats(id);
                yield profile != null ? profile : Map.of();
            }
            case "bull" -> {
                Map<String, Object> profile = StatsDAO.getBullCareerStats(id);
                yield profile != null ? profile : Map.of();
            }
            case "match" -> {
                Map<String, Object> data = new LinkedHashMap<>();
                // Get match basic info
                List<Map<String, Object>> matches = StatsDAO.getMatchesPublic(null);
                for (Map<String, Object> m : matches) {
                    if (String.valueOf(m.get("match_id")).equals(id)) {
                        data.putAll(m);
                        break;
                    }
                }
                data.put("playerScores", ScoringDAO.getPlayerScores(id));
                data.put("bullScores", ScoringDAO.getBullScores(id));
                yield data;
            }
            default -> Map.of();
        };
    }
}
