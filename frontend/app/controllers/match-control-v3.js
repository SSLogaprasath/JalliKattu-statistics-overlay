import Controller from "@ember/controller";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import {
  SCORES,
  MATCHES,
  MATCH_DRAW,
  AI,
} from "jallikattu-frontend/constants/api-paths";

export default class MatchControlV3Controller extends Controller {
  @service auth;
  @service router;

  queryParams = ["matchId"];

  // ── Match state ──
  @tracked matchId = null;
  @tracked scoringData = null;
  @tracked drawData = null;
  @tracked isLoading = false;
  @tracked statusMessage = null;
  @tracked statusType = "success";
  @tracked isSaving = false;

  // ── Round / batch control ──
  @tracked currentRoundId = "1";
  @tracked roundStatus = "idle"; // idle | running | paused
  @tracked currentBatchIndex = 0;

  // ── Active scoring zone ──
  @tracked activeBullIndex = 0;
  @tracked playerIdInput = "";
  @tracked holdTimerMs = 0;
  @tracked isHolding = false;
  @tracked tagAggressive = false;
  @tracked tagFast = false;
  @tracked tagDefensive = false;

  // ── Match clock ──
  @tracked matchClockSeconds = 0;
  _matchClockInterval = null;

  // ── Spacebar hold timer ──
  _holdInterval = null;
  _holdStartTime = null;

  // ── Keyboard ──
  _keydownBound = null;
  _keyupBound = null;

  // ── SOS state ──
  @tracked sosActivePlayerId = null;
  @tracked sosMessage = null;

  // ── Command mode indicator ──
  @tracked commandMode = true;

  // ── Autocomplete ──
  @tracked showSuggestions = false;
  @tracked suggestionIndex = -1;

  // ── Undo stack ──
  @tracked undoStack = [];

  // ── AI Detection ──
  @tracked aiDetecting = false;
  @tracked aiDetections = [];
  @tracked aiError = null;
  @tracked aiServiceOnline = null;

  // ════════════════════════ COMPUTED ════════════════════════

  get selectedMatch() {
    if (!this.matchId || !this.model?.matches) return null;
    return this.model.matches.find(
      (m) => String(m.match_id) === String(this.matchId),
    );
  }

  get matchStatus() {
    return this.selectedMatch?.status || null;
  }

  get isLive() {
    return this.matchStatus === "Live";
  }

  get roundTypes() {
    return this.scoringData?.roundTypes || [];
  }

  get currentRoundName() {
    const rt = this.roundTypes.find(
      (r) => String(r.round_type_id) === String(this.currentRoundId),
    );
    return rt ? rt.round_name : `Round ${this.currentRoundId}`;
  }

  // ── Players in current batch for current round ──
  get batchPlayers() {
    const players = this.drawData?.players || [];
    const roundId = String(this.currentRoundId);
    const batches = this.batchesForRound;
    const batchId = batches[this.currentBatchIndex];
    if (!batchId) return [];
    return players.filter(
      (p) =>
        String(p.round_type_id) === roundId &&
        String(p.batch_id) === String(batchId) &&
        p.status === "approved",
    );
  }

  get batchesForRound() {
    const players = this.drawData?.players || [];
    const roundId = String(this.currentRoundId);
    const seen = new Set();
    return players
      .filter(
        (p) => String(p.round_type_id) === roundId && p.status === "approved",
      )
      .reduce((acc, p) => {
        const bid = String(p.batch_id);
        if (!seen.has(bid)) {
          seen.add(bid);
          acc.push(bid);
        }
        return acc;
      }, []);
  }

  get currentBatchName() {
    const batches = this.batchesForRound;
    const batchId = batches[this.currentBatchIndex];
    if (!batchId) return "-";
    const player = (this.drawData?.players || []).find(
      (p) => String(p.batch_id) === String(batchId),
    );
    return player?.batch_name || `Batch ${batchId}`;
  }

  get totalBatches() {
    return this.batchesForRound.length;
  }

  // ── Bull queue ──
  get bullQueue() {
    const bulls = this.drawData?.bulls || [];
    return bulls
      .filter((b) => b.status === "approved")
      .sort((a, b) => (a.release_order || 999) - (b.release_order || 999));
  }

  get activeBull() {
    const q = this.bullQueue;
    return q[this.activeBullIndex] || null;
  }

  get nextBulls() {
    const q = this.bullQueue;
    const start = this.activeBullIndex + 1;
    return q.slice(start, start + 3);
  }

  get bullsReleased() {
    return this.activeBullIndex;
  }

  get bullsTotal() {
    return this.bullQueue.length;
  }

  get bullsRemaining() {
    return Math.max(0, this.bullsTotal - this.activeBullIndex);
  }

  // ── Progress percentage ──
  get progressPercent() {
    if (this.bullsTotal === 0) return 0;
    return Math.round((this.bullsReleased / this.bullsTotal) * 100);
  }

  // ── Formatted timers ──
  get holdTimerFormatted() {
    const ms = this.holdTimerMs;
    const sec = Math.floor(ms / 1000);
    const frac = Math.floor((ms % 1000) / 10);
    return `${sec}.${String(frac).padStart(2, "0")}`;
  }

  get matchClockFormatted() {
    const total = this.matchClockSeconds;
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  // ── Top 3 leaderboard ──
  get topPlayers() {
    return (this.scoringData?.topPlayers || []).slice(0, 3);
  }

  // ── AI suggestion: pick best detection that matches an approved player ──
  get suggestedPlayer() {
    if (!this.aiDetections.length) {
      // Fallback: fairness-based (fewest catches)
      const batch = this.batchPlayers;
      if (!batch.length) return null;
      const active = batch.filter((p) => p.status !== "disqualified");
      if (!active.length) return null;
      let best = active[0];
      for (const p of active) {
        if ((p.bull_caught || 0) < (best.bull_caught || 0)) best = p;
      }
      return best;
    }
    // Match AI detections against approved players
    const allPlayers = this.drawData?.players || [];
    for (const det of this.aiDetections) {
      const match = allPlayers.find(
        (p) => String(p.player_id) === String(det.player_id),
      );
      if (match) {
        return {
          ...match,
          ai_confidence: det.confidence,
          ai_source: true,
        };
      }
    }
    return null;
  }

  // ── Player autocomplete: match on ID prefix ──
  get playerSuggestions() {
    const q = (this.playerIdInput || "").trim();
    if (!q) return [];
    // All approved players in draw for this match
    const players = this.drawData?.players || [];
    const seen = new Set();
    return players
      .filter((p) => {
        if (p.status === "disqualified") return false;
        const id = String(p.player_id);
        if (seen.has(id)) return false;
        if (!id.startsWith(q)) return false;
        seen.add(id);
        return true;
      })
      .slice(0, 8); // max 8 suggestions
  }

  // ── Disqualified players list ──
  get disqualifiedPlayers() {
    const players = this.drawData?.players || [];
    const seen = new Set();
    return players.filter((p) => {
      const id = String(p.player_id);
      if (seen.has(id)) return false;
      if (p.status !== "disqualified") return false;
      seen.add(id);
      return true;
    });
  }

  // ── Disqualified bulls list ──
  get disqualifiedBulls() {
    const bulls = this.drawData?.bulls || [];
    return bulls.filter((b) => b.status === "disqualified");
  }

  // ── Undo availability ──
  get canUndo() {
    return this.undoStack.length > 0;
  }

  get lastUndoLabel() {
    if (!this.canUndo) return "";
    const last = this.undoStack[this.undoStack.length - 1];
    return last.label || "last action";
  }

  // ════════════════════════ INIT ════════════════════════

  @action
  initFromModel(model) {
    if (model.matchId) {
      this.matchId = model.matchId;
      this.scoringData = model.scoringData;
      this.drawData = model.drawData;
    }
  }

  // ════════════════════════ STATUS ════════════════════════

  showMessage(text, type = "success") {
    this.statusMessage = text;
    this.statusType = type;
    setTimeout(() => (this.statusMessage = null), 3000);
  }

  // ════════════════════════ MATCH SELECTION ════════════════════════

  @action
  async selectMatch(event) {
    const id = event.target.value;
    if (!id) {
      this.matchId = null;
      this.scoringData = null;
      this.drawData = null;
      return;
    }
    this.matchId = id;
    await this.refreshData();
  }

  async refreshData() {
    if (!this.matchId) return;
    this.isLoading = true;
    try {
      const [scoring, draw] = await Promise.all([
        this.auth.apiGet(SCORES.GET(this.matchId)),
        this.auth.apiGet(MATCH_DRAW.GET(this.matchId)),
      ]);
      this.scoringData = scoring;
      this.drawData = draw;
      this.activeBullIndex = 0;
      this.currentBatchIndex = 0;
      this.currentRoundId = "1";
      this.holdTimerMs = 0;
      this.playerIdInput = "";
    } catch {
      this.showMessage("Failed to load match data", "danger");
    } finally {
      this.isLoading = false;
    }
  }

  // ════════════════════════ ROUND CONTROL ════════════════════════

  @action
  setRound(event) {
    this.currentRoundId = event.target.value;
    this.currentBatchIndex = 0;
  }

  @action
  async beginRound() {
    if (this.roundStatus !== "idle") return;
    // Set match to Live if scheduled
    if (this.matchStatus === "Scheduled") {
      try {
        await this.auth.apiPut(MATCHES.UPDATE(this.matchId), {
          status: "Live",
        });
        const m = this.model.matches.find(
          (m) => String(m.match_id) === String(this.matchId),
        );
        if (m) m.status = "Live";
        this.matchId = this.matchId; // trigger reactivity
      } catch {
        this.showMessage("Failed to start match", "danger");
        return;
      }
    }
    this.roundStatus = "running";
    this.startMatchClock();
    this.showMessage(`${this.currentRoundName} started!`);
  }

  @action
  pauseRound() {
    if (this.roundStatus !== "running") return;
    this.roundStatus = "paused";
    this.stopMatchClock();
    this.showMessage("Round paused", "warning");
  }

  @action
  async endRound() {
    if (this.roundStatus === "idle") return;
    this.roundStatus = "idle";
    this.stopMatchClock();
    this.matchClockSeconds = 0;
    this.showMessage(`${this.currentRoundName} ended`);
  }

  // ════════════════════════ MATCH CLOCK ════════════════════════

  startMatchClock() {
    if (this._matchClockInterval) return;
    this._matchClockInterval = setInterval(() => {
      this.matchClockSeconds = this.matchClockSeconds + 1;
    }, 1000);
  }

  stopMatchClock() {
    if (this._matchClockInterval) {
      clearInterval(this._matchClockInterval);
      this._matchClockInterval = null;
    }
  }

  // ════════════════════════ SPACEBAR HOLD TIMER ════════════════════════

  startHoldTimer() {
    if (this._holdInterval) return;
    this.isHolding = true;
    this._holdStartTime = performance.now();
    this.holdTimerMs = 0;
    this._holdInterval = setInterval(() => {
      this.holdTimerMs = Math.floor(performance.now() - this._holdStartTime);
    }, 16); // ~60fps
  }

  stopHoldTimer() {
    if (!this._holdInterval) return;
    this.isHolding = false;
    clearInterval(this._holdInterval);
    this._holdInterval = null;
    // Final precise reading
    if (this._holdStartTime) {
      this.holdTimerMs = Math.floor(performance.now() - this._holdStartTime);
    }
  }

  @action
  newHold() {
    this.holdTimerMs = 0;
    this._holdStartTime = null;
  }

  // ════════════════════════ NEXT BATCH ════════════════════════

  @action
  nextBatch() {
    const max = this.totalBatches - 1;
    if (this.currentBatchIndex < max) {
      this.currentBatchIndex = this.currentBatchIndex + 1;
      this.showMessage(`Batch ${this.currentBatchName} ready`);
    } else {
      this.showMessage("No more batches in this round", "warning");
    }
  }

  // ════════════════════════ BULL NAVIGATION ════════════════════════

  @action
  nextBull() {
    if (this.activeBullIndex < this.bullQueue.length - 1) {
      this.activeBullIndex = this.activeBullIndex + 1;
      this.holdTimerMs = 0;
      this.playerIdInput = "";
      this.tagAggressive = false;
      this.tagFast = false;
      this.tagDefensive = false;
      this.showMessage(`Next: Bull #${this.activeBull?.bull_id}`);
    } else {
      this.showMessage("No more bulls in queue", "warning");
    }
  }

  // ════════════════════════ AI DETECTION ════════════════════════

  @action
  async applySuggestion() {
    // If we already have a suggestion from AI detections, just apply it
    const existing = this.suggestedPlayer;
    if (existing?.ai_source) {
      this.playerIdInput = String(existing.player_id);
      this.showMessage(
        `AI: #${existing.player_id} — ${existing.player_name} (${Math.round(
          existing.ai_confidence * 100,
        )}%)`,
      );
      return;
    }

    // Otherwise trigger live detection
    if (this.aiDetecting) return;
    this.aiDetecting = true;
    this.aiError = null;
    this.aiDetections = [];

    try {
      const resp = await this.auth.apiFetch(AI.DETECT, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
      });
      const data = await resp.json();
      this.aiDetections = data.detections || [];

      if (!this.aiDetections.length) {
        this.showMessage("AI: No player IDs detected", "warning");
        return;
      }

      // Auto-apply best match
      const best = this.suggestedPlayer;
      if (best) {
        this.playerIdInput = String(best.player_id);
        this.showMessage(
          `AI: #${best.player_id} — ${best.player_name} (${Math.round(
            (best.ai_confidence || 0) * 100,
          )}%)`,
        );
      } else {
        // Detected numbers don't match approved players
        const ids = this.aiDetections.map((d) => `#${d.player_id}`).join(", ");
        this.showMessage(`AI detected ${ids} — no match in roster`, "warning");
      }
    } catch (e) {
      this.aiError = e.message;
      this.showMessage(`AI error: ${e.message}`, "danger");
    } finally {
      this.aiDetecting = false;
    }
  }

  @action
  async checkAiHealth() {
    try {
      const resp = await this.auth.apiFetch(AI.HEALTH);
      if (resp.ok) {
        const data = await resp.json();
        this.aiServiceOnline = data.status === "ok";
      } else {
        this.aiServiceOnline = false;
      }
    } catch {
      this.aiServiceOnline = false;
    }
  }

  // ════════════════════════ QUALITY TAGS ════════════════════════

  @action
  toggleTag(tag) {
    if (tag === "aggressive") this.tagAggressive = !this.tagAggressive;
    else if (tag === "fast") this.tagFast = !this.tagFast;
    else if (tag === "defensive") this.tagDefensive = !this.tagDefensive;
  }

  // ════════════════════════ SUBMIT SCORE ════════════════════════

  @action
  async submitScore() {
    const bull = this.activeBull;
    if (!bull) {
      this.showMessage("No active bull", "danger");
      return;
    }
    if (!this.playerIdInput) {
      this.showMessage("Enter a Player ID", "danger");
      return;
    }

    const playerId = this.playerIdInput;
    this.isSaving = true;

    try {
      // 1. Save interaction (hold duration)
      if (this.holdTimerMs > 0) {
        await this.auth.apiPost(SCORES.INTERACTION(this.matchId), {
          player_id: playerId,
          bull_id: String(bull.bull_id),
          hold_sequence: String(bull.release_order || 1),
          hold_duration: String(this.holdTimerMs),
          round_type_id: this.currentRoundId,
        });
      }

      // 2. Save bull score
      await this.auth.apiPost(SCORES.BULL(this.matchId), {
        bull_id: String(bull.bull_id),
        round_type_id: this.currentRoundId,
        aggression: String(this.tagAggressive ? 8 : 5),
        play_area: String(this.tagFast ? 8 : 5),
        difficulty: String(this.tagDefensive ? 8 : 5),
        release_order: String(bull.release_order || this.activeBullIndex + 1),
        player_id: playerId,
      });

      // 3. Increment player bull_caught
      const playerScores = this.scoringData?.playerScores || [];
      const pScore = playerScores.find(
        (p) =>
          String(p.player_id) === String(playerId) &&
          String(p.round_type_id) === String(this.currentRoundId),
      );
      if (pScore) {
        await this.auth.apiPost(SCORES.PLAYER(this.matchId), {
          player_id: playerId,
          round_type_id: this.currentRoundId,
          bull_caught: String((pScore.bull_caught || 0) + 1),
          penalties: String(pScore.penalties || 0),
        });
      }

      this.showMessage(
        `Score saved: Bull #${bull.bull_id} → Player #${playerId}`,
      );

      // Reset for next
      this.holdTimerMs = 0;
      this.playerIdInput = "";
      this.tagAggressive = false;
      this.tagFast = false;
      this.tagDefensive = false;

      // Refresh data
      await this.refreshData();
    } catch (e) {
      this.showMessage(e.message || "Failed to save score", "danger");
    } finally {
      this.isSaving = false;
    }
  }

  // ════════════════════════ DISQUALIFY ════════════════════════

  @action
  async disqualifyPlayer(playerId) {
    if (!confirm("Disqualify this player from the match?")) return;
    try {
      this._pushUndo(
        "dq-player",
        { player_id: playerId },
        `DQ Player #${playerId}`,
      );
      await this.auth.apiPost(SCORES.DISQUALIFY(this.matchId), {
        type: "player",
        player_id: playerId,
        disqualify: true,
      });
      this.showMessage("Player disqualified");
      await this.refreshData();
    } catch (e) {
      this.undoStack = this.undoStack.slice(0, -1);
      this.showMessage(e.message || "Failed", "danger");
    }
  }

  // ════════════════════════ SOS ════════════════════════

  @action
  async triggerSOS(playerId, playerName) {
    this.sosActivePlayerId = playerId;
    this.sosMessage = `🚨 MEDICAL ALERT: ${playerName} (ID: ${playerId}) needs assistance!`;

    // Auto-disqualify injured player
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.matchId), {
        type: "player",
        player_id: String(playerId),
        disqualify: true,
      });
      this.showMessage(
        `SOS: ${playerName} flagged — medical team alerted. Player auto-disqualified.`,
        "danger",
      );
      await this.refreshData();
    } catch (e) {
      this.showMessage(e.message || "SOS failed", "danger");
    }

    // Clear SOS banner after 10s
    setTimeout(() => {
      this.sosActivePlayerId = null;
      this.sosMessage = null;
    }, 10000);
  }

  @action
  dismissSOS() {
    this.sosActivePlayerId = null;
    this.sosMessage = null;
  }

  // ════════════════════════ PLAYER INPUT + AUTOCOMPLETE ════════════════════════

  @action
  setPlayerInput(event) {
    this.playerIdInput = event.target.value;
    this.showSuggestions = this.playerIdInput.trim().length > 0;
    this.suggestionIndex = -1;
  }

  @action
  selectSuggestion(player) {
    this.playerIdInput = String(player.player_id);
    this.showSuggestions = false;
    this.suggestionIndex = -1;
  }

  @action
  onPlayerInputFocus() {
    this.commandMode = false;
    if (this.playerIdInput.trim().length > 0) {
      this.showSuggestions = true;
    }
  }

  @action
  onPlayerInputBlur() {
    // Small delay so click on suggestion fires first
    setTimeout(() => {
      this.showSuggestions = false;
      this.commandMode = true;
    }, 150);
  }

  @action
  onPlayerInputKeydown(event) {
    const suggestions = this.playerSuggestions;
    if (!this.showSuggestions || !suggestions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.suggestionIndex = Math.min(
        this.suggestionIndex + 1,
        suggestions.length - 1,
      );
      this._scrollSuggestionIntoView();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.suggestionIndex = Math.max(this.suggestionIndex - 1, -1);
      this._scrollSuggestionIntoView();
    } else if (event.key === "Enter" && this.suggestionIndex >= 0) {
      event.preventDefault();
      event.stopPropagation();
      this.selectSuggestion(suggestions[this.suggestionIndex]);
    } else if (event.key === "Escape") {
      this.showSuggestions = false;
    }
  }

  _scrollSuggestionIntoView() {
    // Use requestAnimationFrame so Ember's DOM update has flushed
    requestAnimationFrame(() => {
      const active = document.querySelector(".mcv3-suggestion-active");
      if (active) {
        active.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }

  // ════════════════════════ DISQUALIFY BULL ════════════════════════

  @action
  async disqualifyBull(bullId) {
    if (!confirm("Disqualify this bull from the match?")) return;
    try {
      this._pushUndo("dq-bull", { bull_id: bullId }, `DQ Bull #${bullId}`);
      await this.auth.apiPost(SCORES.DISQUALIFY(this.matchId), {
        type: "bull",
        bull_id: String(bullId),
        disqualify: true,
      });
      this.showMessage(`Bull #${bullId} disqualified`);
      await this.refreshData();
    } catch (e) {
      this.undoStack = this.undoStack.slice(0, -1); // remove failed undo entry
      this.showMessage(e.message || "Failed", "danger");
    }
  }

  // ════════════════════════ REINSTATE ════════════════════════

  @action
  async reinstatePlayer(playerId) {
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.matchId), {
        type: "player",
        player_id: String(playerId),
        disqualify: false,
      });
      this.showMessage(`Player #${playerId} reinstated`);
      await this.refreshData();
    } catch (e) {
      this.showMessage(e.message || "Failed to reinstate", "danger");
    }
  }

  @action
  async reinstateBull(bullId) {
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.matchId), {
        type: "bull",
        bull_id: String(bullId),
        disqualify: false,
      });
      this.showMessage(`Bull #${bullId} reinstated`);
      await this.refreshData();
    } catch (e) {
      this.showMessage(e.message || "Failed to reinstate", "danger");
    }
  }

  // ════════════════════════ UNDO ════════════════════════

  _pushUndo(type, data, label) {
    const stack = [...this.undoStack, { type, data, label }];
    // Keep max 20 entries
    this.undoStack = stack.length > 20 ? stack.slice(-20) : stack;
  }

  @action
  async undo() {
    if (!this.canUndo) return;
    const entry = this.undoStack[this.undoStack.length - 1];
    this.undoStack = this.undoStack.slice(0, -1);
    try {
      if (entry.type === "dq-player") {
        await this.auth.apiPost(SCORES.DISQUALIFY(this.matchId), {
          type: "player",
          player_id: String(entry.data.player_id),
          disqualify: false,
        });
      } else if (entry.type === "dq-bull") {
        await this.auth.apiPost(SCORES.DISQUALIFY(this.matchId), {
          type: "bull",
          bull_id: String(entry.data.bull_id),
          disqualify: false,
        });
      }
      this.showMessage(`Undone: ${entry.label}`);
      await this.refreshData();
    } catch (e) {
      this.showMessage(e.message || "Undo failed", "danger");
    }
  }

  // ════════════════════════ KEYBOARD SHORTCUTS ════════════════════════

  setupKeyboard() {
    if (this._keydownBound) return;
    this._keydownBound = (e) => this._onKeyDown(e);
    this._keyupBound = (e) => this._onKeyUp(e);
    document.addEventListener("keydown", this._keydownBound);
    document.addEventListener("keyup", this._keyupBound);
  }

  cleanupKeyboard() {
    if (this._keydownBound) {
      document.removeEventListener("keydown", this._keydownBound);
      document.removeEventListener("keyup", this._keyupBound);
      this._keydownBound = null;
      this._keyupBound = null;
    }
    this.stopHoldTimer();
  }

  _isInputFocused() {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    return (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      el.isContentEditable
    );
  }

  _onKeyDown(e) {
    // Ctrl+S save anywhere
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this.submitScore();
      return;
    }

    // Ctrl+Z undo anywhere
    if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this._flashButton("mcv3-btn-undo");
      this.undo();
      return;
    }

    // All other shortcuts only work outside input fields
    if (this._isInputFocused()) return;

    // SPACEBAR hold
    if (e.code === "Space" && !e.repeat) {
      e.preventDefault();
      this.startHoldTimer();
      return;
    }
    // Prevent spacebar scrolling on repeat
    if (e.code === "Space" && e.repeat) {
      e.preventDefault();
      return;
    }

    // ENTER → submit score
    if (e.key === "Enter") {
      e.preventDefault();
      this._flashButton("mcv3-btn-submit");
      this.submitScore();
      return;
    }

    // RIGHT ARROW → next bull
    if (e.key === "ArrowRight") {
      e.preventDefault();
      this._flashButton("mcv3-btn-next");
      this.nextBull();
      return;
    }

    // A → apply AI suggestion
    if (e.key === "a" || e.key === "A") {
      e.preventDefault();
      this._flashButton("mcv3-btn-ai");
      this.applySuggestion();
      return;
    }

    // D → disqualify focused/first player
    if (e.key === "d" || e.key === "D") {
      e.preventDefault();
      const players = this.batchPlayers;
      if (players.length > 0) {
        this.disqualifyPlayer(players[0].player_id);
      }
      return;
    }
  }

  _onKeyUp(e) {
    // SPACEBAR release → stop hold timer
    if (e.code === "Space") {
      e.preventDefault();
      this.stopHoldTimer();
    }
  }

  _flashButton(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("mcv3-key-flash");
    setTimeout(() => el.classList.remove("mcv3-key-flash"), 200);
  }
}
