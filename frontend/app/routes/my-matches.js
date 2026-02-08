import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MyMatchesRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
    }
  }

  async model() {
    try {
      return await this.auth.apiGet('/player/matches');
    } catch (e) {
      return [];
    }
  }
}
