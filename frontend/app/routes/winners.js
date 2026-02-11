import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { WINNERS } from 'jallikattu-frontend/constants/api-paths';

export default class WinnersRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
    }
  }

  async model() {
    try {
      return await this.auth.apiGet(WINNERS.LIST);
    } catch {
      return { completedMatches: [], allMatches: [] };
    }
  }
}
