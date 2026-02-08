import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MatchControlRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
      return;
    }
    if (!this.auth.isScorer) {
      this.router.transitionTo('dashboard');
    }
  }

  async model() {
    // Load matches first — must always succeed for the page to work
    let matches = [];
    try {
      matches = await this.auth.apiGet('/matches');
    } catch {
      // matches stays empty
    }

    // Load spot-prize reference data separately so a failure here
    // does not blank the match dropdown
    let spotPrizeTypes = [];
    let spotPrizes = [];
    try {
      const [typesData, prizesData] = await Promise.all([
        this.auth.apiGet('/tables/spot_prize_type'),
        this.auth.apiGet('/tables/spot_prize'),
      ]);
      spotPrizeTypes = typesData.rows || [];
      spotPrizes = prizesData.rows || [];
    } catch {
      // spot-prize data stays empty — tab will just show "no prizes"
    }

    return { matches, spotPrizeTypes, spotPrizes };
  }
}
