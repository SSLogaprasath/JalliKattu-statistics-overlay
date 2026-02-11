import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { AUTH } from 'jallikattu-frontend/constants/api-paths';

export default class UsersRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
      return;
    }
    if (!this.auth.isSuperAdmin) {
      this.router.transitionTo('dashboard');
    }
  }

  async model() {
    try {
      return await this.auth.apiGet(AUTH.USERS);
    } catch {
      return [];
    }
  }
}
