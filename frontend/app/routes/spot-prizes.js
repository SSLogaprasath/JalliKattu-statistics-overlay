import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { SPOT_PRIZES } from 'jallikattu-frontend/constants/api-paths';

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
          this.auth.apiGet(SPOT_PRIZES.TYPES),
          this.auth.apiGet(SPOT_PRIZES.LIST),
          this.auth.apiGet(SPOT_PRIZES.AWARDS),
          this.auth.apiGet(SPOT_PRIZES.MATCHES),
          this.auth.apiGet(SPOT_PRIZES.PLAYERS),
          this.auth.apiGet(SPOT_PRIZES.BULLS),
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
