import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { SCORES, MATCHES, PUBLIC, SPOT_PRIZES } from 'jallikattu-frontend/constants/api-paths';

export default class MatchControlController extends Controller {
  @service auth;

  @tracked selectedMatchId = null;
  @tracked scoringData = null;
  @tracked isLoading = false;
  @tracked statusMessage = null;
  @tracked statusType = 'success';
  @tracked activeTab = 'players'; // players | bulls | interactions | spot-prizes
  @tracked isSaving = false;
  @tracked timerRunning = false;
  @tracked timerDisplay = '0.0';
  @tracked spotAwards = null;
  @tracked newSpotPrizeId = '';
  @tracked newSpotPlayerId = '';
  @tracked newSpotBullId = '';

  // Filters
  @tracked filterRound = '';
  @tracked filterBatch = '';
  @tracked filterPlayer = '';

  _timerStart = null;
  _timerInterval = null;

  get matchStatus() {
    if (!this.selectedMatchId || !this.model?.matches) return null;
    const match = this.model.matches.find(
      (m) => String(m.match_id) === String(this.selectedMatchId),
    );
    return match ? match.status : null;
  }

  get selectedMatch() {
    if (!this.selectedMatchId || !this.model?.matches) return null;
    return this.model.matches.find(
      (m) => String(m.match_id) === String(this.selectedMatchId),
    );
  }

  get isLive() {
    return this.matchStatus === 'Live';
  }

  get liveMatchCount() {
    return (this.model?.matches || []).filter((m) => m.status === 'Live').length;
  }

  get scheduledMatchCount() {
    return (this.model?.matches || []).filter((m) => m.status === 'Scheduled').length;
  }

  get completedMatchCount() {
    return (this.model?.matches || []).filter((m) => m.status === 'Completed').length;
  }

  // === Filter options (unique values from scoring data) ===

  get roundOptions() {
    const scores = this.scoringData?.playerScores || [];
    const seen = new Set();
    return scores.reduce((acc, p) => {
      const key = String(p.round_type_id);
      if (!seen.has(key)) { seen.add(key); acc.push({ id: key, name: p.round_name }); }
      return acc;
    }, []);
  }

  get batchOptions() {
    const scores = this.scoringData?.playerScores || [];
    const seen = new Set();
    return scores.reduce((acc, p) => {
      const key = String(p.batch_id);
      if (!seen.has(key)) { seen.add(key); acc.push({ id: key, name: p.batch_name }); }
      return acc;
    }, []);
  }

  get playerOptions() {
    return this.scoringData?.approvedPlayers || [];
  }

  get bullRoundOptions() {
    const scores = this.scoringData?.bullScores || [];
    const seen = new Set();
    return scores.reduce((acc, b) => {
      const key = String(b.round_type_id);
      if (!seen.has(key)) { seen.add(key); acc.push({ id: key, name: b.round_name }); }
      return acc;
    }, []);
  }

  // === Filtered lists ===

  get filteredPlayerScores() {
    let list = this.scoringData?.playerScores || [];
    if (this.filterRound) list = list.filter(p => String(p.round_type_id) === this.filterRound);
    if (this.filterBatch) list = list.filter(p => String(p.batch_id) === this.filterBatch);
    if (this.filterPlayer) list = list.filter(p => String(p.player_id) === this.filterPlayer);
    return list;
  }

  get filteredBullScores() {
    let list = this.scoringData?.bullScores || [];
    if (this.filterRound) list = list.filter(b => String(b.round_type_id) === this.filterRound);
    return list;
  }

  get filteredInteractions() {
    let list = this.scoringData?.interactions || [];
    if (this.filterRound) list = list.filter(i => String(i.round_type_id) === this.filterRound);
    if (this.filterPlayer) list = list.filter(i => String(i.player_id) === this.filterPlayer);
    return list;
  }

  get activeFilterCount() {
    return (this.filterRound ? 1 : 0) + (this.filterBatch ? 1 : 0) + (this.filterPlayer ? 1 : 0);
  }

  get matchSpotPrizes() {
    if (!this.selectedMatchId) return [];
    return (this.model?.spotPrizes || []).filter(
      (p) => String(p.match_id) === String(this.selectedMatchId)
    );
  }

  get spotPrizeTypes() {
    return this.model?.spotPrizeTypes || [];
  }

  showMessage(text, type = 'success') {
    this.statusMessage = text;
    this.statusType = type;
    setTimeout(() => (this.statusMessage = null), 3000);
  }

  @action
  switchTab(tab) {
    this.activeTab = tab;
  }

  @action
  async loadMatch(event) {
    this.selectedMatchId = event.target.value;
    if (!this.selectedMatchId) {
      this.scoringData = null;
      this.spotAwards = null;
      return;
    }
    this.activeTab = 'players';
    this.clearFilters();
    await this.fetchScores();
    this.fetchSpotAwards();
  }

  @action
  async selectMatchDirect(matchId) {
    this.selectedMatchId = String(matchId);
    this.activeTab = 'players';
    this.clearFilters();
    await this.fetchScores();
    this.fetchSpotAwards();
  }

  @action setFilterRound(event) { this.filterRound = event.target.value; }
  @action setFilterBatch(event) { this.filterBatch = event.target.value; }
  @action setFilterPlayer(event) { this.filterPlayer = event.target.value; }
  @action clearFilters() { this.filterRound = ''; this.filterBatch = ''; this.filterPlayer = ''; }

  async fetchScores() {
    if (!this.selectedMatchId) return;
    this.isLoading = true;
    try {
      this.scoringData = await this.auth.apiGet(
        SCORES.GET(this.selectedMatchId),
      );
    } catch (e) {
      this.showMessage('Failed to load scoring data', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

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
      this.selectedMatchId = this.selectedMatchId;
      this.showMessage(`Match is now "${newStatus}"`);
    } catch (e) {
      this.showMessage('Failed to update status', 'danger');
    }
  }

  @action
  async saveAllScores() {
    this.isSaving = true;
    const promises = [];

    // Collect all player score inputs
    if (this.scoringData?.playerScores) {
      for (const p of this.scoringData.playerScores) {
        const bcInput = document.getElementById(`p-bc-${p.player_id}-${p.round_type_id}`);
        const penInput = document.getElementById(`p-pen-${p.player_id}-${p.round_type_id}`);
        if (bcInput && penInput) {
          const newBc = parseInt(bcInput.value, 10) || 0;
          const newPen = parseInt(penInput.value, 10) || 0;
          if (newBc !== p.bull_caught || newPen !== p.penalties) {
            promises.push(
              this.auth.apiPost(SCORES.PLAYER(this.selectedMatchId), {
                player_id: p.player_id,
                round_type_id: p.round_type_id,
                bull_caught: bcInput.value,
                penalties: penInput.value,
              })
            );
          }
        }
      }
    }

    // Collect all bull score inputs
    if (this.scoringData?.bullScores) {
      for (const b of this.scoringData.bullScores) {
        const aggInput = document.getElementById(`b-agg-${b.bull_id}-${b.round_type_id}`);
        const paInput = document.getElementById(`b-pa-${b.bull_id}-${b.round_type_id}`);
        const diffInput = document.getElementById(`b-diff-${b.bull_id}-${b.round_type_id}`);
        if (aggInput && paInput && diffInput) {
          const newAgg = parseInt(aggInput.value, 10) || 0;
          const newPa = parseInt(paInput.value, 10) || 0;
          const newDiff = parseInt(diffInput.value, 10) || 0;
          if (newAgg !== b.aggression || newPa !== b.play_area || newDiff !== b.difficulty) {
            promises.push(
              this.auth.apiPost(SCORES.BULL(this.selectedMatchId), {
                bull_id: b.bull_id,
                round_type_id: b.round_type_id,
                aggression: aggInput.value,
                play_area: paInput.value,
                difficulty: diffInput.value,
              })
            );
          }
        }
      }
    }

    try {
      if (promises.length === 0) {
        this.showMessage('No changes to save', 'info');
      } else {
        await Promise.all(promises);
        this.showMessage(`Saved ${promises.length} score${promises.length > 1 ? 's' : ''} successfully`);
        await this.fetchScores();
      }
    } catch (e) {
      this.showMessage('Some scores failed to save', 'danger');
    } finally {
      this.isSaving = false;
    }
  }

  @action
  startTimer() {
    this._timerStart = performance.now();
    this.timerRunning = true;
    this.timerDisplay = '0.0';
    this._timerInterval = setInterval(() => {
      const elapsed = (performance.now() - this._timerStart) / 1000;
      this.timerDisplay = elapsed.toFixed(1);
    }, 100);
  }

  @action
  stopTimer() {
    if (!this.timerRunning) return;
    clearInterval(this._timerInterval);
    const elapsed = (performance.now() - this._timerStart) / 1000;
    const duration = Math.round(elapsed * 10) / 10;
    this.timerDisplay = duration.toFixed(1);
    this.timerRunning = false;
    // Set the value into the duration input
    const durationInput = document.querySelector('input[name="hold_duration"]');
    if (durationInput) {
      durationInput.value = duration.toFixed(1);
      durationInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  @action
  resetTimer() {
    clearInterval(this._timerInterval);
    this.timerRunning = false;
    this.timerDisplay = '0.0';
    this._timerStart = null;
    const durationInput = document.querySelector('input[name="hold_duration"]');
    if (durationInput) {
      durationInput.value = '';
    }
  }

  @action
  async addInteraction(event) {
    event.preventDefault();
    const form = event.target;
    const payload = {
      player_id: form.player_id.value,
      bull_id: form.bull_id.value,
      round_type_id: form.round_type_id.value,
      hold_sequence: form.hold_sequence.value,
      hold_duration: form.hold_duration.value,
    };
    try {
      await this.auth.apiPost(
        SCORES.INTERACTION(this.selectedMatchId),
        payload,
      );
      form.reset();
      await this.fetchScores();
      this.showMessage('Interaction recorded');
    } catch (e) {
      this.showMessage('Failed to record interaction', 'danger');
    }
  }

  /* ═══════ SPOT PRIZE AWARDS ═══════ */

  async fetchSpotAwards() {
    if (!this.selectedMatchId) { this.spotAwards = null; return; }
    try {
      const base = this.auth.apiBase;
      const resp = await fetch(
        `${base}${PUBLIC.MATCH_SPOTS(this.selectedMatchId)}`
      );
      this.spotAwards = await resp.json();
    } catch {
      this.spotAwards = [];
    }
  }

  @action updateSpotField(field, event) {
    this[field] = event.target.value;
  }

  @action
  async awardSpotPrize(event) {
    event.preventDefault();
    if (!this.newSpotPrizeId || !this.newSpotPlayerId) {
      this.showMessage('Select a player and prize', 'danger');
      return;
    }
    try {
      const body = {
        player_id: this.newSpotPlayerId,
        spot_prize_id: this.newSpotPrizeId,
      };
      if (this.newSpotBullId) body.bull_id = this.newSpotBullId;
      await this.auth.apiPost(SPOT_PRIZES.AWARD_CREATE, body);
      this.showMessage('Spot prize awarded!');
      this.newSpotPrizeId = '';
      this.newSpotPlayerId = '';
      this.newSpotBullId = '';
      await this.fetchSpotAwards();
    } catch (e) {
      this.showMessage(e.message || 'Failed to award spot prize', 'danger');
    }
  }

  @action
  async deleteSpotAward(awardId) {
    if (!confirm('Remove this spot prize award?')) return;
    try {
      await this.auth.apiDelete(SPOT_PRIZES.AWARD_DELETE(awardId));
      this.showMessage('Award removed');
      await this.fetchSpotAwards();
    } catch (e) {
      this.showMessage(e.message || 'Failed to remove award', 'danger');
    }
  }

  /* ═══════ DISQUALIFICATION ═══════ */

  @action
  async disqualifyPlayer(playerId) {
    if (!confirm('Disqualify this player from the entire match? Their scores in all rounds will be excluded from rankings.')) return;
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.selectedMatchId), {
        type: 'player',
        player_id: playerId,
        disqualify: true,
      });
      this.showMessage('Player disqualified from match');
      await this.fetchScores();
    } catch (e) {
      this.showMessage(e.message || 'Failed to disqualify player', 'danger');
    }
  }

  @action
  async reinstatePlayer(playerId) {
    if (!confirm('Reinstate this player? They will be allowed to participate again in this match.')) return;
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.selectedMatchId), {
        type: 'player',
        player_id: playerId,
        disqualify: false,
      });
      this.showMessage('Player reinstated');
      await this.fetchScores();
    } catch (e) {
      this.showMessage(e.message || 'Failed to reinstate player', 'danger');
    }
  }

  @action
  async disqualifyBull(bullId) {
    if (!confirm('Disqualify this bull from the entire match? Its scores in all rounds will be excluded from rankings.')) return;
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.selectedMatchId), {
        type: 'bull',
        bull_id: bullId,
        disqualify: true,
      });
      this.showMessage('Bull disqualified from match');
      await this.fetchScores();
    } catch (e) {
      this.showMessage(e.message || 'Failed to disqualify bull', 'danger');
    }
  }

  @action
  async reinstateBull(bullId) {
    if (!confirm('Reinstate this bull? It will be allowed to participate again in this match.')) return;
    try {
      await this.auth.apiPost(SCORES.DISQUALIFY(this.selectedMatchId), {
        type: 'bull',
        bull_id: bullId,
        disqualify: false,
      });
      this.showMessage('Bull reinstated');
      await this.fetchScores();
    } catch (e) {
      this.showMessage(e.message || 'Failed to reinstate bull', 'danger');
    }
  }
}
