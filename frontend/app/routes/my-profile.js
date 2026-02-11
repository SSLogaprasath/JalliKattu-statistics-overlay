import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PLAYER, OWNER } from 'jallikattu-frontend/constants/api-paths';

export default class MyProfileRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
    }
  }

  async model() {
    const role = this.auth.role;
    try {
      if (role === 'player') {
        return await this.auth.apiGet(PLAYER.PROFILE);
      } else if (role === 'owner') {
        return await this.auth.apiGet(OWNER.PROFILE);
      }
      return { user: this.auth.user };
    } catch (e) {
      return { user: this.auth.user, error: e.message };
    }
  }
}
