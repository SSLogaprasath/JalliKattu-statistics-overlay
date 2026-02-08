import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SpotPrizesRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
      return;
    }
    if (!this.auth.isAdmin) {
      this.router.transitionTo('dashboard');
    }
  }

  async model() {
    try {
      const [typesData, prizesData, awardsData, matchesData, playersData, bullsData] =
        await Promise.all([
          this.auth.apiGet('/tables/spot_prize_type'),
          this.auth.apiGet('/tables/spot_prize'),
          this.auth.apiGet('/tables/spot_prize_award'),
          this.auth.apiGet('/tables/match'),
          this.auth.apiGet('/tables/player'),
          this.auth.apiGet('/tables/bull_table'),
        ]);
      return {
        types: typesData.rows || [],
        prizes: prizesData.rows || [],
        awards: awardsData.rows || [],
        matches: matchesData.rows || [],
        players: playersData.rows || [],
        bulls: bullsData.rows || [],
      };
    } catch {
      return { types: [], prizes: [], awards: [], matches: [], players: [], bulls: [] };
    }
  }
}
