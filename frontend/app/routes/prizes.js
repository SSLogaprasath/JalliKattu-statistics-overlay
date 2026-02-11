import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PRIZES } from 'jallikattu-frontend/constants/api-paths';

export default class PrizesRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
      return;
    }
    if (!this.auth.isAdmin) {
      this.router.transitionTo('dashboard');
    }
  }

  async model() {
    try {
      const data = await this.auth.apiGet(PRIZES.LIST);
      return data.rows || [];
    } catch {
      return [];
    }
  }
}
