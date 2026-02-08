import Route from '@ember/routing/route';
import { service } from '@ember/service';

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
      const [bulls, breeds, matches] = await Promise.all([
        this.auth.apiGet('/owner/bulls'),
        this.auth.apiGet('/owner/breeds'),
        this.auth.apiGet('/owner/matches'),
      ]);
      return { bulls, breeds, matches };
    } catch (e) {
      return { bulls: [], breeds: [], matches: [], error: e.message };
    }
  }
}
