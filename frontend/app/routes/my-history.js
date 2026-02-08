import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MyHistoryRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
    }
  }

  async model() {
    try {
      return await this.auth.apiGet('/player/history');
    } catch (e) {
      return { error: e.message, matches: [] };
    }
  }
}
