import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { MATCHES, SPOT_PRIZES } from 'jallikattu-frontend/constants/api-paths';

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
      matches = await this.auth.apiGet(MATCHES.LIST);
    } catch {
      // matches stays empty
    }

    // Load spot-prize reference data separately so a failure here
    // does not blank the match dropdown
    let spotPrizeTypes = [];
    let spotPrizes = [];
    try {
      const [typesData, prizesData] = await Promise.all([
        this.auth.apiGet(SPOT_PRIZES.TYPES),
        this.auth.apiGet(SPOT_PRIZES.LIST),
      ]);
      spotPrizeTypes = typesData.rows || [];
      spotPrizes = prizesData.rows || [];
    } catch {
      // spot-prize data stays empty — tab will just show "no prizes"
    }

    return { matches, spotPrizeTypes, spotPrizes };
  }
}
