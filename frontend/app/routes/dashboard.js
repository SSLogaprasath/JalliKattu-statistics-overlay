import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { DASHBOARD } from 'jallikattu-frontend/constants/api-paths';

export default class DashboardRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
    }
  }

  async model() {
    try {
      return await this.auth.apiGet(DASHBOARD);
    } catch {
      return { role: this.auth.role };
    }
  }
}
