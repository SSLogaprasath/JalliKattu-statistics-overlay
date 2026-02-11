import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import config from "jallikattu-frontend/config/environment";
import { OVERLAY } from "jallikattu-frontend/constants/api-paths";

export default class OverlayViewerController extends Controller {
  queryParams = ["v"];

  @tracked v = "";
  @tracked overlayData = null;
  @tracked isConnected = false;

  // Spot-prize announcement queue
  @tracked currentAnnouncement = null;
  _announcementQueue = [];
  _lastSeenAwardCount = 0;
  _announcementTimer = null;

  // Clock display
  @tracked clockDisplay = "00:00.0";
  @tracked clockRunning = false;
  @tracked clockLabel = "";
  _clockTimer = null;
  _clockElapsedMs = 0;

  // Ticker auto-show/hide (periodic pop-up when dedicated ticker is off)
  @tracked tickerVisible = false;
  _tickerCycleTimer = null;

  _timer = null;

  // YouTube IFrame Player API
  _ytPlayer = null;
  _ytApiLoaded = false;
  _ytPlayerReady = false;
  _currentVideoId = null;
  _playbackTimer = null;

  // HTML5 video element reference
  _html5Video = null;
  _currentHtml5Src = null;

  get apiBase() {
    return `/${config.APP.API_NAMESPACE}`;
  }

  /**
   * Returns true when the videoUrl is a YouTube link.
   */
  get isYouTubeVideo() {
    const raw = this.overlayData?.videoUrl || this.v;
    if (!raw) return false;
    return this._isYouTubeUrl(raw);
  }

  /**
   * Returns true when a non-YouTube videoUrl is set (local file or direct URL).
   */
  get isDirectVideo() {
    const raw = this.overlayData?.videoUrl || this.v;
    if (!raw) return false;
    return !this._isYouTubeUrl(raw);
  }

  /**
   * Returns the URL for the HTML5 <video> element.
   * Local file paths are proxied through the backend servlet.
   */
  get directVideoSrc() {
    let raw = this.overlayData?.videoUrl || this.v;
    if (!raw || this._isYouTubeUrl(raw)) return null;
    // Strip surrounding quotes and whitespace
    raw = raw.trim().replace(/^["']+|["']+$/g, "");
    // If it looks like a local path (drive letter or backslash), proxy it
    if (/^[A-Za-z]:[\\/]/.test(raw) || raw.startsWith("\\\\")) {
      return `${this.apiBase}/video/stream?path=${encodeURIComponent(raw)}`;
    }
    // Otherwise use directly (http/https/rtsp URL)
    return raw;
  }

  get youtubeVideoId() {
    const raw = this.overlayData?.videoUrl || this.v;
    if (!raw) return null;
    if (!this._isYouTubeUrl(raw)) return null;
    return this._extractVideoId(raw);
  }

  _isYouTubeUrl(url) {
    if (!url) return false;
    // Bare 11-char video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return true;
    try {
      const u = new URL(url);
      return (
        u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")
      );
    } catch {
      return false;
    }
  }

  // ─── Composable overlay visibility (each section is independent) ───

  get overlayType() {
    return this.overlayData?.type || "none";
  }
  get entity() {
    return this.overlayData?.entity || {};
  }
  get secondaryType() {
    return this.overlayData?.secondaryType || "none";
  }
  get secondaryEntity() {
    return this.overlayData?.secondaryEntity || null;
  }
  get hasSecondary() {
    return this.secondaryType !== "none" && this.secondaryEntity;
  }
  get layout() {
    return this.overlayData?.layout || "bottom-bar";
  }

  // Entity stats overlay (player/bull/match card — not VS)
  get showEntityOverlay() {
    return (
      this.overlayData?.visible &&
      this.overlayType !== "none" &&
      !this.isVsLayout
    );
  }

  // VS matchup (visible + vs layout + has secondary)
  get isVsLayout() {
    return (
      this.layout === "vs" && this.hasSecondary && this.overlayData?.visible
    );
  }

  // Dedicated always-on ticker (independent toggle)
  get showTickerOverlay() {
    return this.overlayData?.showTicker && this.ticker;
  }

  // Round scoreboard overlay (independent toggle)
  get showScoreboardOverlay() {
    return this.overlayData?.showScoreboard && this.scoreboard?.length > 0;
  }

  // Rating overlay (scorer sets star rating live)
  get showRatingOverlay() {
    return this.overlayData?.showRating && this.overlayData?.rating > 0;
  }
  get ratingValue() {
    return this.overlayData?.rating || 0;
  }
  get ratingLabel() {
    return this.overlayData?.ratingLabel || "";
  }
  get ratingStars() {
    const val = this.ratingValue;
    return [1, 2, 3, 4, 5].map((i) => ({ filled: i <= val }));
  }

  // Next bull overlay (scorer selects upcoming bull)
  get showNextBullOverlay() {
    return this.overlayData?.showNextBull && this.overlayData?.nextBullName;
  }
  get nextBullName() {
    return this.overlayData?.nextBullName || "";
  }

  // ─── Ticker data (top 5 players + top 5 bulls, separated) ───

  get ticker() {
    return this.overlayData?.ticker || null;
  }

  get tickerPlayerItems() {
    if (!this.ticker) return [];
    return (this.ticker.topPlayers || [])
      .filter((p) => Number(p.net_score) > 0)
      .slice(0, 5)
      .map((p, i) => ({
        rank: i + 1,
        name: p.player_name,
        stat: `${p.net_score} pts`,
      }));
  }

  get tickerBullItems() {
    if (!this.ticker) return [];
    return (this.ticker.topBulls || [])
      .filter((b) => Number(b.avg_difficulty) > 0)
      .slice(0, 5)
      .map((b, i) => ({
        rank: i + 1,
        name: b.bull_name,
        stat: `diff ${Number(b.avg_difficulty).toFixed(1)}`,
      }));
  }

  // ─── Branding bar ───
  get matchName() {
    return this.ticker?.matchName || "";
  }
  get matchLocation() {
    return this.ticker?.location || "";
  }
  get matchStatus() {
    return this.ticker?.status || "";
  }
  get showBranding() {
    return !!this.matchName;
  }

  // ─── Spot prize awards ───
  get spotAwards() {
    return this.overlayData?.spotAwards || [];
  }

  // ─── Round players (compact right panel) ───
  get roundPlayers() {
    return this.overlayData?.roundPlayers || [];
  }
  get hasRoundPlayers() {
    return this.roundPlayers.length > 0;
  }

  // ─── Scoreboard (full player list + bull assignments) ───
  get scoreboard() {
    return this.overlayData?.scoreboard || [];
  }

  // ─── Clock ───
  get showClock() {
    const c = this.overlayData?.clock;
    return c && c.state !== "stopped";
  }

  // ─── VS mode helpers ───
  get vsMode() {
    // Detect which VS combo: player-vs-bull, player-vs-player, bull-vs-bull
    const t1 = this.overlayType;
    const t2 = this.secondaryType;
    if (t1 === "player" && t2 === "bull") return "player-vs-bull";
    if (t1 === "bull" && t2 === "player") return "bull-vs-player";
    if (t1 === "player" && t2 === "player") return "player-vs-player";
    if (t1 === "bull" && t2 === "bull") return "bull-vs-bull";
    return "player-vs-bull"; // fallback
  }
  get vsLeftIsPlayer() {
    return this.overlayType === "player";
  }
  get vsRightIsPlayer() {
    return this.secondaryType === "player";
  }
  get vsLeftEntity() {
    return this.entity || {};
  }
  get vsRightEntity() {
    return this.secondaryEntity || {};
  }

  // ─── VS mode extra stats ───
  get playerBullsCaught() {
    return this.entity?.total_bulls_caught || this.entity?.bull_caught || 0;
  }
  get playerNetScore() {
    return this.entity?.career_net_score || this.entity?.net_score || 0;
  }
  get bullAvgScore() {
    const e = this.secondaryEntity || {};
    const agg = Number(e.avg_aggression) || 0;
    const diff = Number(e.avg_difficulty) || 0;
    return ((agg + diff) / 2).toFixed(1);
  }

  // Generic VS stat helpers for any entity
  _playerStats(e) {
    return {
      bullsCaught: e?.total_bulls_caught || e?.bull_caught || 0,
      netScore: e?.career_net_score || e?.net_score || 0,
      matches: e?.matches_played || 0,
      penalties: e?.total_penalties || 0,
    };
  }
  _bullStats(e) {
    const agg = Number(e?.avg_aggression) || 0;
    const diff = Number(e?.avg_difficulty) || 0;
    return {
      avgScore: ((agg + diff) / 2).toFixed(1),
      aggression: e?.avg_aggression || 0,
      difficulty: e?.avg_difficulty || 0,
      releases: e?.total_releases || 0,
    };
  }

  // ─── Internals ───

  _extractVideoId(url) {
    if (!url) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.searchParams.has("v")) return u.searchParams.get("v");
    } catch {
      /* not a URL */
    }
    return url;
  }

  @action
  startPolling() {
    this._poll();
    this._timer = setInterval(() => this._poll(), 1500);
    this._startClockTick();
    this._startTickerCycle();
    this._initVideoPlayer();
    this._startPlaybackReporter();
  }

  @action
  stopPolling() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    if (this._clockTimer) {
      clearInterval(this._clockTimer);
      this._clockTimer = null;
    }
    if (this._announcementTimer) {
      clearTimeout(this._announcementTimer);
      this._announcementTimer = null;
    }
    if (this._tickerCycleTimer) {
      clearTimeout(this._tickerCycleTimer);
      this._tickerCycleTimer = null;
    }
    if (this._playbackTimer) {
      clearInterval(this._playbackTimer);
      this._playbackTimer = null;
    }
    if (this._ytPlayer) {
      try {
        this._ytPlayer.destroy();
      } catch {
        /* ignore */
      }
      this._ytPlayer = null;
    }
    this._ytPlayerReady = false;
    this._currentVideoId = null;
    this._html5Video = null;
    this._currentHtml5Src = null;
  }

  async _poll() {
    try {
      const res = await fetch(`${this.apiBase}${OVERLAY.CURRENT}`);
      if (res.ok) {
        const data = await res.json();
        this.overlayData = data;
        this.isConnected = true;

        // Sync clock from server
        if (data.clock) {
          this._clockElapsedMs = data.clock.elapsedMs || 0;
          this.clockRunning = data.clock.state === "running";
          this.clockLabel = data.clock.label || "";
          if (!this.clockRunning) {
            this._updateClockDisplay(this._clockElapsedMs);
          }
        }

        // Detect new spot prize awards
        const awardCount = data.spotAwardCount || 0;
        if (
          awardCount > this._lastSeenAwardCount &&
          this._lastSeenAwardCount > 0
        ) {
          const newCount = awardCount - this._lastSeenAwardCount;
          const awards = data.spotAwards || [];
          awards
            .slice(0, newCount)
            .forEach((a) => this._announcementQueue.push(a));
          this._processAnnouncementQueue();
        }
        this._lastSeenAwardCount = awardCount;
      }
    } catch {
      this.isConnected = false;
    }
  }

  _processAnnouncementQueue() {
    if (this.currentAnnouncement || this._announcementQueue.length === 0)
      return;
    this.currentAnnouncement = this._announcementQueue.shift();
    this._announcementTimer = setTimeout(() => {
      this.currentAnnouncement = null;
      setTimeout(() => this._processAnnouncementQueue(), 500);
    }, 5000);
  }

  // Clock: tick every 100ms when running for smooth display
  _startClockTick() {
    let lastTick = Date.now();
    this._clockTimer = setInterval(() => {
      if (this.clockRunning) {
        const now = Date.now();
        this._clockElapsedMs += now - lastTick;
        lastTick = now;
        this._updateClockDisplay(this._clockElapsedMs);
      } else {
        lastTick = Date.now();
      }
    }, 100);
  }

  _updateClockDisplay(ms) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    const tenths = Math.floor((ms % 1000) / 100);
    this.clockDisplay = `${String(min).padStart(2, "0")}:${String(sec).padStart(
      2,
      "0",
    )}.${tenths}`;
  }

  // Auto-ticker pop-up cycle (only when dedicated ticker is OFF)
  _startTickerCycle() {
    const cycle = () => {
      this.tickerVisible = true;
      this._tickerCycleTimer = setTimeout(() => {
        this.tickerVisible = false;
        this._tickerCycleTimer = setTimeout(cycle, 15000);
      }, 8000);
    };
    this._tickerCycleTimer = setTimeout(cycle, 10000);
  }

  // ─── Video Player Management ─────────────────────────────────

  _initVideoPlayer() {
    if (this.isYouTubeVideo) {
      this._loadYouTubeApi();
    } else if (this.isDirectVideo) {
      this._initOrUpdateHtml5Player();
    }
  }

  _loadYouTubeApi() {
    if (this._ytApiLoaded || window.YT?.Player) {
      this._ytApiLoaded = true;
      this._initOrUpdatePlayer();
      return;
    }
    // Set the global callback before loading the script
    window.onYouTubeIframeAPIReady = () => {
      this._ytApiLoaded = true;
      this._initOrUpdatePlayer();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  _initOrUpdatePlayer() {
    const vid = this.youtubeVideoId;
    if (!vid) return;
    // If video changed, destroy old player and recreate
    if (this._ytPlayer && this._currentVideoId !== vid) {
      try {
        this._ytPlayer.destroy();
      } catch {
        /* ignore */
      }
      this._ytPlayer = null;
      this._ytPlayerReady = false;
    }
    if (this._ytPlayer) return; // already set up for this video
    this._currentVideoId = vid;

    const container = document.getElementById("yt-player-container");
    if (!container || !window.YT?.Player) return;

    this._ytPlayer = new window.YT.Player("yt-player-container", {
      videoId: vid,
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        controls: 1,
        enablejsapi: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          this._ytPlayerReady = true;
        },
      },
    });
  }

  // ─── HTML5 Video Player ──────────────────────────────────

  _initOrUpdateHtml5Player() {
    const src = this.directVideoSrc;
    if (!src) return;

    // Already set up with this source
    if (this._html5Video && this._currentHtml5Src === src) return;

    // Wait for the DOM element to appear
    const el = document.getElementById("html5-video-player");
    if (!el) {
      // Retry after short delay (template may not have rendered yet)
      setTimeout(() => this._initOrUpdateHtml5Player(), 300);
      return;
    }

    this._html5Video = el;

    // If source changed, update and reload
    if (this._currentHtml5Src !== src) {
      this._currentHtml5Src = src;
      if (el.src !== src) {
        el.src = src;
        el.load();
      }
      el.play().catch(() => {
        /* autoplay blocked, user must click */
      });
    }

    // Unmute after user interaction (autoplay policy)
    el.addEventListener(
      "click",
      () => {
        el.muted = false;
      },
      { once: true },
    );
  }

  _startPlaybackReporter() {
    // Report playback time to backend every 1.5s
    this._playbackTimer = setInterval(() => {
      this._reportPlaybackTime();
      // Re-check video source changes
      this._initVideoPlayer();
    }, 1500);
  }

  async _reportPlaybackTime() {
    // YouTube player
    if (this._ytPlayerReady && this._ytPlayer) {
      try {
        const currentTime = this._ytPlayer.getCurrentTime() || 0;
        const duration = this._ytPlayer.getDuration() || 0;
        const playerData = this._ytPlayer.getVideoData?.() || {};
        const isLive = playerData.isLive === true || duration === 0;

        await fetch(`${this.apiBase}${OVERLAY.PLAYBACK}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ time: currentTime, isLive }),
        });
      } catch {
        // Silently ignore
      }
      return;
    }

    // HTML5 video player
    if (this._html5Video) {
      try {
        const currentTime = this._html5Video.currentTime || 0;
        const duration = this._html5Video.duration || 0;
        const isLive = !isFinite(duration) || duration === 0;

        await fetch(`${this.apiBase}${OVERLAY.PLAYBACK}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ time: currentTime, isLive }),
        });
      } catch {
        // Silently ignore
      }
    }
  }

  willDestroy() {
    super.willDestroy();
    this.stopPolling();
  }
}
