import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PUBLIC } from 'jallikattu-frontend/constants/api-paths';

export default class MatchesRoute extends Route {
  @service auth;

  async model() {
    const base = this.auth.apiBase;
    try {
      const matches = await fetch(`${base}${PUBLIC.MATCHES}`).then((r) =>
        r.json()
      );
      return { matches };
    } catch {
      return { matches: [] };
    }
  }
}
