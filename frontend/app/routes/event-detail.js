import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { EVENTS } from 'jallikattu-frontend/constants/api-paths';

export default class EventDetailRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated || !this.auth.isRegistrar) {
      this.router.transitionTo('dashboard');
    }
  }

  async model(params) {
    try {
      return await this.auth.apiGet(EVENTS.DETAIL(params.match_id));
    } catch {
      return { error: 'Event not found' };
    }
  }
}
