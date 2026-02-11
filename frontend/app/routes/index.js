import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PUBLIC } from 'jallikattu-frontend/constants/api-paths';

export default class IndexRoute extends Route {
  @service auth;

  async model() {
    try {
      const [stats, matches, leaderboard] = await Promise.all([
        fetch(`${this.auth.apiBase}${PUBLIC.STATS}`).then((r) => r.json()),
        fetch(`${this.auth.apiBase}${PUBLIC.MATCHES}`).then((r) => r.json()),
        fetch(`${this.auth.apiBase}${PUBLIC.LEADERBOARD(5)}`).then((r) => r.json()),
      ]);
      return { stats, matches, leaderboard };
    } catch {
      return { stats: {}, matches: [], leaderboard: {} };
    }
  }
}
