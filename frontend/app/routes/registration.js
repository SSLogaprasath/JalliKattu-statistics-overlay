import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { REGISTRATIONS } from 'jallikattu-frontend/constants/api-paths';

export default class RegistrationRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
      return;
    }
    if (!this.auth.isRegistrar && !this.auth.isAdmin) {
      this.router.transitionTo('dashboard');
    }
  }

  async model() {
    try {
      return await this.auth.apiGet(REGISTRATIONS.LIST);
    } catch {
      return { matches: [], players: [], bulls: [], roundTypes: [] };
    }
  }
}
