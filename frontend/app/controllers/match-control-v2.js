import Controller from "@ember/controller";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { SCORES, MATCHES } from "jallikattu-frontend/constants/api-paths";

export default class MatchControlV2Controller extends Controller {
  @service auth;

  /* ── match state ── */
  @tracked selectedMatchId = null;
  @tracked scoringData = null;
  @tracked isLoading = false;
  @tracked statusMessage = null;
  @tracked statusType = "success";
  @tracked isSaving = false;

  /* ── v2-specific state ── */
  @tracked activeTab = "players"; // players | bulls
  @tracked filterBatch = ""; // pill-tab batch filter
  @tracked filterRound = ""; // pill-tab round filter
  @tracked focusedCardIndex = -1; // keyboard-navigated card
  @tracked flashBullId = null; // player_id for green ripple
  @tracked flashFoulId = null; // player_id for red ripple
  @tracked undoStack = []; // last N actions for undo
  @tracked _dirtyVersion = 0; // bump to trigger hasUnsaved reactivity

  _handleKeyboardBound = null;

  /* ── dirty tracking ── */
  _dirtyPlayerScores = new Map();
  _dirtyBullScores = new Map();
  _originalPlayerScores = new Map();
  _originalBullScores = new Map();

  // ──────────────────────── Computed ────────────────────────

  get matchStatus() {
    if (!this.selectedMatchId || !this.model?.matches) return null;
    const m = this.model.matches.find(
      (m) => String(m.match_id) === String(this.selectedMatchId),
    );
    return m ? m.status : null;
  }

  get selectedMatch() {
    if (!this.selectedMatchId || !this.model?.matches) return null;
    return this.model.matches.find(
      (m) => String(m.match_id) === String(this.selectedMatchId),
    );
  }

  get isLive() {
    return this.matchStatus === "Live";
  }

  get liveMatches() {
    return (this.model?.matches || []).filter((m) => m.status === "Live");
  }

  get scheduledMatches() {
    return (this.model?.matches || []).filter((m) => m.status === "Scheduled");
  }

  get completedMatches() {
    return (this.model?.matches || []).filter((m) => m.status === "Completed");
  }

  // ── batch pill options (unique) ──
  get batchOptions() {
    const scores = this.scoringData?.playerScores || [];
    const seen = new Set();
    return scores.reduce((acc, p) => {
      const key = String(p.batch_id);
      if (!seen.has(key)) {
        seen.add(key);
        acc.push({ id: key, name: p.batch_name });
      }
      return acc;
    }, []);
  }

  // ── round pill options (unique) ──
  get roundOptions() {
    const scores = this.scoringData?.playerScores || [];
    const seen = new Set();
    return scores.reduce((acc, p) => {
      const key = String(p.round_type_id);
      if (!seen.has(key)) {
        seen.add(key);
        acc.push({ id: key, name: p.round_name });
      }
      return acc;
    }, []);
  }

  // ── filtered player cards ──
  get playerCards() {
    let list = this.scoringData?.playerScores || [];
    if (this.filterRound) {
      list = list.filter((p) => String(p.round_type_id) === this.filterRound);
    }
    if (this.filterBatch) {
      list = list.filter((p) => String(p.batch_id) === this.filterBatch);
    }
    return list;
  }

  // ── leading scorer ──
  get leadingPlayerId() {
    const scores = this.scoringData?.playerScores || [];
    const active = scores.filter((p) => p.status !== "disqualified");
    if (!active.length) return null;
    let best = active[0];
    for (const p of active) {
      if (p.net_score > best.net_score) best = p;
    }
    return best.net_score > 0 ? best.player_id : null;
  }

  // ── bull cards ──
  get bullCards() {
    return this.scoringData?.bullScores || [];
  }

  // ── form lookups ──
  get approvedPlayers() {
    return this.scoringData?.approvedPlayers || [];
  }
  get approvedBulls() {
    return this.scoringData?.approvedBulls || [];
  }
  get roundTypes() {
    return this.scoringData?.roundTypes || [];
  }

  // ── tab counts ──
  get playerCount() {
    return (this.scoringData?.playerScores || []).length;
  }
  get bullCount() {
    return (this.scoringData?.bullScores || []).length;
  }

  get hasUnsaved() {
    this._dirtyVersion; // consume tracked prop for reactivity
    return this._dirtyPlayerScores.size > 0 || this._dirtyBullScores.size > 0;
  }

  get undoAvailable() {
    return this.undoStack.length > 0;
  }

  get lastUndoLabel() {
    if (!this.undoStack.length) return "";
    const last = this.undoStack[this.undoStack.length - 1];
    return last.label;
  }

  // ──────────────────────── Status toast ────────────────────────

  showMessage(text, type = "success") {
    this.statusMessage = text;
    this.statusType = type;
    setTimeout(() => (this.statusMessage = null), 2500);
  }

  // ──────────────────────── Match selection ────────────────────────

  @action
  async loadMatch(event) {
    this.selectedMatchId = event.target.value;
    if (!this.selectedMatchId) {
      this.scoringData = null;
      return;
    }
    this.activeTab = "players";
    this.filterBatch = "";
    this.filterRound = "";
    this.focusedCardIndex = -1;
    this._dirtyPlayerScores = new Map();
    this._dirtyBullScores = new Map();
    this._originalPlayerScores = new Map();
    this._originalBullScores = new Map();
    this._dirtyVersion++;
    this.undoStack = [];
    await this.fetchScores();
  }

  @action
  async selectMatchDirect(matchId) {
    this.selectedMatchId = String(matchId);
    this.activeTab = "players";
    this.filterBatch = "";
    this.filterRound = "";
    this.focusedCardIndex = -1;
    this._dirtyPlayerScores = new Map();
    this._dirtyBullScores = new Map();
    this._originalPlayerScores = new Map();
    this._originalBullScores = new Map();
    this._dirtyVersion++;
    this.undoStack = [];
    await this.fetchScores();
  }

  async fetchScores() {
    if (!this.selectedMatchId) return;
    this.isLoading = true;
    try {
      this.scoringData = await this.auth.apiGet(
        SCORES.GET(this.selectedMatchId),
      );
    } catch {
      this.showMessage("Failed to load scoring data", "danger");
    } finally {
      this.isLoading = false;
    }
  }

  // ──────────────────────── Match status ────────────────────────

  @action
  async updateMatchStatus(newStatus) {
    try {
      await this.auth.apiPut(MATCHES.UPDATE(this.selectedMatchId), {
        status: newStatus,
      });
      const match = this.model.matches.find(
        (m) => String(m.match_id) === String(this.selectedMatchId),
      );
      if (match) match.status = newStatus;
      // trigger reactivity
      this.selectedMatchId = this.selectedMatchId;
      this.showMessage(`Match is now "${newStatus}"`);
    } catch {
      this.showMessage("Failed to update status", "danger");
    }
  }

  // ──────────────────────── Batch pill filter ────────────────────────

  @action
  setBatchFilter(batchId) {
    this.filterBatch = this.filterBatch === batchId ? "" : batchId;
    this.focusedCardIndex = -1;
  }

  @action
  setRoundFilter(roundId) {
    this.filterRound = this.filterRound === roundId ? "" : roundId;
    this.focusedCardIndex = -1;
  }

  // ──────────────────────── Bull catcher ────────────────────────

  @action
  setBullCatcher(bull, event) {
    if (!this.isLive) return;
    const newPlayerId = parseInt(event.target.value, 10) || 0;
    const key = `${bull.bull_id}-${bull.round_type_id}`;
    if (!this._originalBullScores.has(key)) {
      this._originalBullScores.set(key, {
        aggression: bull.aggression,
        play_area: bull.play_area,
        difficulty: bull.difficulty,
        release_order: bull.release_order,
        player_id: bull.player_id,
      });
    }
    const prevPlayerId = bull.player_id;
    const updated = { ...bull, player_id: newPlayerId, _dirty: true };
    // Find the player name for display
    const catcher = this.approvedPlayers.find(
      (p) => p.player_id === newPlayerId,
    );
    updated.player_name = catcher ? catcher.player_name : null;
    this._trackBullDirty(updated);
    this._pushUndo({
      label: `Set catcher for ${bull.bull_name}`,
      undo: () => {
        const current = this.scoringData.bullScores.find(
          (b) =>
            b.bull_id === bull.bull_id &&
            b.round_type_id === bull.round_type_id,
        );
        if (!current) return;
        const orig = this._originalBullScores.get(key);
        const restored = { ...current, player_id: prevPlayerId };
        const prevCatcher = this.approvedPlayers.find(
          (p) => p.player_id === prevPlayerId,
        );
        restored.player_name = prevCatcher ? prevCatcher.player_name : null;
        if (
          orig &&
          restored.aggression === orig.aggression &&
          restored.play_area === orig.play_area &&
          restored.difficulty === orig.difficulty &&
          restored.release_order === orig.release_order &&
          restored.player_id === orig.player_id
        ) {
          this._dirtyBullScores.delete(key);
          this._originalBullScores.delete(key);
          restored._dirty = false;
        } else {
          this._trackBullDirty(restored);
          restored._dirty = true;
        }
        this._dirtyVersion++;
        this._replaceBull(restored);
      },
    });
    this._replaceBull(updated);
  }

  // ──────────────────────── Score steppers ────────────────────────

  /* ── helper: replace a player in the scores array (immutable for Ember reactivity) ── */
  _replacePlayer(updated) {
    const scores = this.scoringData.playerScores;
    const idx = scores.findIndex(
      (p) =>
        p.player_id === updated.player_id &&
        p.round_type_id === updated.round_type_id,
    );
    if (idx === -1) return;
    const newScores = [...scores];
    newScores[idx] = updated;
    this.scoringData = { ...this.scoringData, playerScores: newScores };
  }

  /* ── helper: replace a bull in the scores array (immutable) ── */
  _replaceBull(updated) {
    const scores = this.scoringData.bullScores;
    const idx = scores.findIndex(
      (b) =>
        b.bull_id === updated.bull_id &&
        b.round_type_id === updated.round_type_id,
    );
    if (idx === -1) return;
    const newScores = [...scores];
    newScores[idx] = updated;
    this.scoringData = { ...this.scoringData, bullScores: newScores };
  }

  @action
  incrementBull(player) {
    if (player.status === "disqualified" || !this.isLive) return;
    const key = `${player.player_id}-${player.round_type_id}`;
    if (!this._originalPlayerScores.has(key)) {
      this._originalPlayerScores.set(key, {
        bull_caught: player.bull_caught,
        penalties: player.penalties,
      });
    }
    const prevBc = player.bull_caught;
    const updated = { ...player };
    updated.bull_caught = (updated.bull_caught || 0) + 1;
    updated.net_score = updated.bull_caught - (updated.penalties || 0);
    updated._dirty = true;
    this._trackPlayerDirty(updated);
    this._pushUndo({
      label: `+1 Bull for ${player.player_name}`,
      undo: () => {
        const current = this.scoringData.playerScores.find(
          (p) =>
            p.player_id === player.player_id &&
            p.round_type_id === player.round_type_id,
        );
        if (!current) return;
        const restored = { ...current, bull_caught: prevBc };
        restored.net_score = restored.bull_caught - (restored.penalties || 0);
        const k = `${restored.player_id}-${restored.round_type_id}`;
        const orig = this._originalPlayerScores.get(k);
        if (
          orig &&
          restored.bull_caught === orig.bull_caught &&
          restored.penalties === orig.penalties
        ) {
          this._dirtyPlayerScores.delete(k);
          this._originalPlayerScores.delete(k);
          restored._dirty = false;
        } else {
          this._trackPlayerDirty(restored);
          restored._dirty = true;
        }
        this._dirtyVersion++;
        this._replacePlayer(restored);
      },
    });
    this._flashCard(player.player_id, "bull");
    this._replacePlayer(updated);
  }

  @action
  incrementFoul(player) {
    if (player.status === "disqualified" || !this.isLive) return;
    const key = `${player.player_id}-${player.round_type_id}`;
    if (!this._originalPlayerScores.has(key)) {
      this._originalPlayerScores.set(key, {
        bull_caught: player.bull_caught,
        penalties: player.penalties,
      });
    }
    const prevPen = player.penalties;
    const updated = { ...player };
    updated.penalties = (updated.penalties || 0) + 1;
    updated.net_score = (updated.bull_caught || 0) - updated.penalties;
    updated._dirty = true;
    this._trackPlayerDirty(updated);
    this._pushUndo({
      label: `+1 Foul for ${player.player_name}`,
      undo: () => {
        const current = this.scoringData.playerScores.find(
          (p) =>
            p.player_id === player.player_id &&
            p.round_type_id === player.round_type_id,
        );
        if (!current) return;
        const restored = { ...current, penalties: prevPen };
        restored.net_score = (restored.bull_caught || 0) - restored.penalties;
        const k = `${restored.player_id}-${restored.round_type_id}`;
        const orig = this._originalPlayerScores.get(k);
        if (
          orig &&
          restored.bull_caught === orig.bull_caught &&
          restored.penalties === orig.penalties
        ) {
          this._dirtyPlayerScores.delete(k);
          this._originalPlayerScores.delete(k);
          restored._dirty = false;
        } else {
          this._trackPlayerDirty(restored);
          restored._dirty = true;
        }
        this._dirtyVersion++;
        this._replacePlayer(restored);
      },
    });
    this._flashCard(player.player_id, "foul");
    this._replacePlayer(updated);
  }

  /* ── Bull score steppers (aggression, play_area, difficulty — 0 to 10; release_order — 0 to ∞) ── */
  @action
  incrementBullStat(bull, stat) {
    if (bull.status === "disqualified" || !this.isLive) return;
    const key = `${bull.bull_id}-${bull.round_type_id}`;
    if (!this._originalBullScores.has(key)) {
      this._originalBullScores.set(key, {
        aggression: bull.aggression,
        play_area: bull.play_area,
        difficulty: bull.difficulty,
        release_order: bull.release_order,
        player_id: bull.player_id,
      });
    }
    const maxVal = stat === "release_order" ? 999 : 10;
    const prev = bull[stat];
    const updated = { ...bull };
    updated[stat] = Math.min((updated[stat] || 0) + 1, maxVal);
    if (updated[stat] === prev) return;
    updated._dirty = true;
    this._trackBullDirty(updated);
    this._pushUndo({
      label: `+1 ${stat} for ${bull.bull_name}`,
      undo: () => {
        const current = this.scoringData.bullScores.find(
          (b) =>
            b.bull_id === bull.bull_id &&
            b.round_type_id === bull.round_type_id,
        );
        if (!current) return;
        const restored = { ...current, [stat]: prev };
        const k = `${restored.bull_id}-${restored.round_type_id}`;
        const orig = this._originalBullScores.get(k);
        if (
          orig &&
          restored.aggression === orig.aggression &&
          restored.play_area === orig.play_area &&
          restored.difficulty === orig.difficulty &&
          restored.release_order === orig.release_order &&
          restored.player_id === orig.player_id
        ) {
          this._dirtyBullScores.delete(k);
          this._originalBullScores.delete(k);
          restored._dirty = false;
        } else {
          this._trackBullDirty(restored);
          restored._dirty = true;
        }
        this._dirtyVersion++;
        this._replaceBull(restored);
      },
    });
    this._replaceBull(updated);
  }

  @action
  decrementBullStat(bull, stat) {
    if (bull.status === "disqualified" || !this.isLive) return;
    const key = `${bull.bull_id}-${bull.round_type_id}`;
    if (!this._originalBullScores.has(key)) {
      this._originalBullScores.set(key, {
        aggression: bull.aggression,
        play_area: bull.play_area,
        difficulty: bull.difficulty,
        release_order: bull.release_order,
        player_id: bull.player_id,
      });
    }
    const prev = bull[stat];
    const updated = { ...bull };
    updated[stat] = Math.max((updated[stat] || 0) - 1, 0);
    if (updated[stat] === prev) return;
    updated._dirty = true;
    this._trackBullDirty(updated);
    this._pushUndo({
      label: `-1 ${stat} for ${bull.bull_name}`,
      undo: () => {
        const current = this.scoringData.bullScores.find(
          (b) =>
            b.bull_id === bull.bull_id &&
            b.round_type_id === bull.round_type_id,
        );
        if (!current) return;
        const restored = { ...current, [stat]: prev };
        const k = `${restored.bull_id}-${restored.round_type_id}`;
        const orig = this._originalBullScores.get(k);
        if (
          orig &&
          restored.aggression === orig.aggression &&
          restored.play_area === orig.play_area &&
          restored.difficulty === orig.difficulty &&
          restored.release_order === orig.release_order &&
          restored.player_id === orig.player_id
        ) {
          this._dirtyBullScores.delete(k);
          this._originalBullScores.delete(k);
          restored._dirty = false;
        } else {
          this._trackBullDirty(restored);
          restored._dirty = true;
        }
        this._dirtyVersion++;
        this._replaceBull(restored);
      },
    });
    this._replaceBull(updated);
  }

  /* ── track dirty player score ── */
  _trackPlayerDirty(player) {
    const key = `${player.player_id}-${player.round_type_id}`;
    this._dirtyPlayerScores.set(key, {
      player_id: player.player_id,
      round_type_id: player.round_type_id,
      bull_caught: player.bull_caught || 0,
      penalties: player.penalties || 0,
    });
    this._dirtyVersion++;
  }

  /* ── track dirty bull score ── */
  _trackBullDirty(bull) {
    const key = `${bull.bull_id}-${bull.round_type_id}`;
    this._dirtyBullScores.set(key, {
      bull_id: bull.bull_id,
      round_type_id: bull.round_type_id,
      aggression: bull.aggression || 0,
      play_area: bull.play_area || 0,
      difficulty: bull.difficulty || 0,
      release_order: bull.release_order || 0,
      player_id: bull.player_id || 0,
    });
    this._dirtyVersion++;
  }

  /* ── flash feedback ── */
  _flashCard(playerId, type) {
    if (type === "bull") {
      this.flashBullId = playerId;
      setTimeout(() => (this.flashBullId = null), 400);
    } else {
      this.flashFoulId = playerId;
      setTimeout(() => (this.flashFoulId = null), 400);
    }
  }

  /* ── undo stack ── */
  _pushUndo(entry) {
    const stack = [...this.undoStack, entry];
    if (stack.length > 20) stack.shift();
    this.undoStack = stack;
  }

  @action
  undoLast() {
    if (!this.undoStack.length) return;
    const stack = [...this.undoStack];
    const entry = stack.pop();
    this.undoStack = stack;
    entry.undo();
    this.showMessage(`Undone: ${entry.label}`, "info");
  }

  // ──────────────────────── Save all dirty ────────────────────────

  @action
  async saveAllScores() {
    const totalDirty =
      this._dirtyPlayerScores.size + this._dirtyBullScores.size;
    if (totalDirty === 0) {
      this.showMessage("No changes to save", "info");
      return;
    }
    this.isSaving = true;
    const promises = [];
    for (const score of this._dirtyPlayerScores.values()) {
      promises.push(
        this.auth.apiPost(SCORES.PLAYER(this.selectedMatchId), score),
      );
    }
    for (const score of this._dirtyBullScores.values()) {
      promises.push(
        this.auth.apiPost(SCORES.BULL(this.selectedMatchId), score),
      );
    }
    try {
      await Promise.all(promises);
      this.showMessage(
        `Saved ${promises.length} score${promises.length > 1 ? "s" : ""}`,
      );
      this._dirtyPlayerScores = new Map();
      this._dirtyBullScores = new Map();
      this._originalPlayerScores = new Map();
      this._originalBullScores = new Map();
      this._dirtyVersion++;
      this.undoStack = [];
      await this.fetchScores();
    } catch {
      this.showMessage("Some scores failed to save", "danger");
    } finally {
      this.isSaving = false;
    }
  }

  // ──────────────────────── DQ / Reinstate ────────────────────────

  @action
  async disqualifyPlayer(playerId) {
    if (
      !confirm(
        "Disqualify this player from the entire match? Their scores in all rounds will be excluded.",
      )
    )
      return;
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.selectedMatchId), {
        type: "player",
        player_id: playerId,
        disqualify: true,
      });
      this.showMessage("Player disqualified");
      await this.fetchScores();
    } catch (e) {
      this.showMessage(e.message || "Failed to disqualify", "danger");
    }
  }

  @action
  async reinstatePlayer(playerId) {
    if (!confirm("Reinstate this player?")) return;
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.selectedMatchId), {
        type: "player",
        player_id: playerId,
        disqualify: false,
      });
      this.showMessage("Player reinstated");
      await this.fetchScores();
    } catch (e) {
      this.showMessage(e.message || "Failed to reinstate", "danger");
    }
  }

  // ──────────────────────── Bull DQ ────────────────────────

  @action
  async disqualifyBull(bullId) {
    if (!confirm("Disqualify this bull from the match?")) return;
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.selectedMatchId), {
        type: "bull",
        bull_id: bullId,
        disqualify: true,
      });
      this.showMessage("Bull disqualified");
      await this.fetchScores();
    } catch (e) {
      this.showMessage(e.message || "Failed to disqualify", "danger");
    }
  }

  @action
  async reinstateBull(bullId) {
    if (!confirm("Reinstate this bull?")) return;
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.selectedMatchId), {
        type: "bull",
        bull_id: bullId,
        disqualify: false,
      });
      this.showMessage("Bull reinstated");
      await this.fetchScores();
    } catch (e) {
      this.showMessage(e.message || "Failed to reinstate", "danger");
    }
  }

  // ──────────────────────── Tab switching ────────────────────────

  @action
  switchTab(tab) {
    this.activeTab = tab;
    this.focusedCardIndex = -1;
  }

  /* ── Document-level keyboard shortcuts ── */
  setupKeyboard() {
    if (this._handleKeyboardBound) return;
    this._handleKeyboardBound = (e) => this.handleKeyboard(e);
    document.addEventListener("keydown", this._handleKeyboardBound);
  }

  cleanupKeyboard() {
    if (this._handleKeyboardBound) {
      document.removeEventListener("keydown", this._handleKeyboardBound);
      this._handleKeyboardBound = null;
    }
  }

  // ──────────────────────── Keyboard navigation ────────────────────────

  @action
  handleKeyboard(event) {
    if (!this.isLive) return;
    const key = event.key;

    // Global shortcuts: Ctrl+Z undo, Ctrl+S save
    if (key === "z" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.undoLast();
      return;
    }
    if (key === "s" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.saveAllScores();
      return;
    }
    if (key === "Escape") {
      this.focusedCardIndex = -1;
      return;
    }

    // Player-tab-only shortcuts
    if (this.activeTab !== "players") return;
    const cards = this.playerCards;
    if (!cards.length) return;

    if (key === "ArrowRight") {
      event.preventDefault();
      this.focusedCardIndex = Math.min(
        this.focusedCardIndex + 1,
        cards.length - 1,
      );
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      this.focusedCardIndex = Math.max(this.focusedCardIndex - 1, 0);
    } else if (key === "ArrowUp" && this.focusedCardIndex >= 0) {
      event.preventDefault();
      this.incrementBull(cards[this.focusedCardIndex]);
    } else if (key === "ArrowDown" && this.focusedCardIndex >= 0) {
      event.preventDefault();
      this.incrementFoul(cards[this.focusedCardIndex]);
    } else if ((key === "x" || key === "X") && this.focusedCardIndex >= 0) {
      event.preventDefault();
      const card = cards[this.focusedCardIndex];
      if (card.status === "disqualified") {
        this.reinstatePlayer(card.player_id);
      } else {
        this.disqualifyPlayer(card.player_id);
      }
    }
  }

  @action
  focusCard(index) {
    this.focusedCardIndex = index;
  }
}
