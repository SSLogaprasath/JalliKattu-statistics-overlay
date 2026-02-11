import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { PUBLIC } from 'jallikattu-frontend/constants/api-paths';

export default class ScoreboardController extends Controller {
  @service auth;
  @tracked selectedMatchId = null;
  @tracked scores = null;
  @tracked spotPrizes = null;
  @tracked isLoading = false;
  @tracked autoRefresh = true;
  _timer = null;

  get liveMatches() {
    return (this.model?.matches || []).filter((m) => m.status === 'live');
  }

  get allMatches() {
    return this.model?.matches || [];
  }

  get topPlayers() {
    return this.scores?.topPlayers?.slice(0, 10) || [];
  }

  get topBulls() {
    return this.scores?.topBulls?.slice(0, 10) || [];
  }

  @action
  async selectMatch(matchId) {
    this.selectedMatchId = matchId;
    await this.fetchScores();
    this._startAutoRefresh();
  }

  @action
  async fetchScores() {
    if (!this.selectedMatchId) return;
    this.isLoading = true;
    try {
      const base = this.auth.apiBase;
      const [scoresResp, spotResp] = await Promise.all([
        fetch(`${base}${PUBLIC.MATCH_SCORES(this.selectedMatchId)}`),
        fetch(`${base}${PUBLIC.MATCH_SPOTS(this.selectedMatchId)}`),
      ]);
      this.scores = await scoresResp.json();
      this.spotPrizes = await spotResp.json();
    } catch {
      this.scores = null;
      this.spotPrizes = null;
    }
    this.isLoading = false;
  }

  @action
  toggleAutoRefresh() {
    this.autoRefresh = !this.autoRefresh;
    if (this.autoRefresh) {
      this._startAutoRefresh();
    } else {
      this._stopAutoRefresh();
    }
  }

  _startAutoRefresh() {
    this._stopAutoRefresh();
    if (this.autoRefresh && this.selectedMatchId) {
      this._timer = setInterval(() => this.fetchScores(), 8000);
    }
  }

  _stopAutoRefresh() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  willDestroy() {
    super.willDestroy();
    this._stopAutoRefresh();
  }
}
