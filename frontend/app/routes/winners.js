import Route from '@ember/routing/route';
import { service } from '@ember/service';

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
      return await this.auth.apiGet('/winners');
    } catch {
      return { completedMatches: [], allMatches: [] };
    }
  }
}
