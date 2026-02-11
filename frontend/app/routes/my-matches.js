import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PLAYER } from 'jallikattu-frontend/constants/api-paths';

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
      return await this.auth.apiGet(PLAYER.MATCHES);
    } catch (e) {
      return [];
    }
  }
}
