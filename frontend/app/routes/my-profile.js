import Route from '@ember/routing/route';
import { service } from '@ember/service';

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
        return await this.auth.apiGet('/player/profile');
      } else if (role === 'owner') {
        return await this.auth.apiGet('/owner/profile');
      }
      return { user: this.auth.user };
    } catch (e) {
      return { user: this.auth.user, error: e.message };
    }
  }
}
