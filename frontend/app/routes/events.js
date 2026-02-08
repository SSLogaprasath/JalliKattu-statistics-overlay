import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class EventsRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated || !this.auth.isRegistrar) {
      this.router.transitionTo('dashboard');
    }
  }

  async model() {
    try {
      return await this.auth.apiGet('/events');
    } catch {
      return [];
    }
  }
}
