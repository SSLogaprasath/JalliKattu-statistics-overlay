import Route from '@ember/routing/route';
import { service } from '@ember/service';

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
      return await this.auth.apiGet('/dashboard');
    } catch {
      return { stats: {}, totalRecords: 0, totalTables: 0 };
    }
  }
}
