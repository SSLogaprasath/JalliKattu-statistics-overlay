import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PLAYER } from 'jallikattu-frontend/constants/api-paths';

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
      const [history, registrations] = await Promise.all([
        this.auth.apiGet(PLAYER.HISTORY),
        this.auth.apiGet(PLAYER.REGISTRATIONS),
      ]);
      return { history, registrations };
    } catch (e) {
      return { history: [], registrations: [], error: e.message };
    }
  }
}
