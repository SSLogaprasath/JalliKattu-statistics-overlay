import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { OWNER } from 'jallikattu-frontend/constants/api-paths';

export default class MyBullsRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
    }
  }

  async model() {
    try {
      const [bulls, breeds, matches, registrations] = await Promise.all([
        this.auth.apiGet(OWNER.BULLS),
        this.auth.apiGet(OWNER.BREEDS),
        this.auth.apiGet(OWNER.MATCHES),
        this.auth.apiGet(OWNER.REGISTRATIONS),
      ]);
      return { bulls, breeds, matches, registrations };
    } catch (e) {
      return { bulls: [], breeds: [], matches: [], registrations: [], error: e.message };
    }
  }
}
