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
    try {
      const matches = await this.auth.apiGet('/matches');
      return { matches };
    } catch {
      return { matches: [] };
    }
  }
}
