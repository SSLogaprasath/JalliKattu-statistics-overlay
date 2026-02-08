import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MatchesRoute extends Route {
  @service auth;

  async model() {
    const base = this.auth.apiBase;
    try {
      const matches = await fetch(`${base}/public/matches`).then((r) =>
        r.json()
      );
      return { matches };
    } catch {
      return { matches: [] };
    }
  }
}
