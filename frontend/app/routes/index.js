import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service auth;

  async model() {
    try {
      const stats = await fetch(
        `${this.auth.apiBase}/public/stats`
      ).then((r) => r.json());

      const matches = await fetch(
        `${this.auth.apiBase}/public/matches`
      ).then((r) => r.json());

      const leaderboard = await fetch(
        `${this.auth.apiBase}/public/leaderboard?limit=5`
      ).then((r) => r.json());

      return { stats, matches, leaderboard };
    } catch {
      return { stats: {}, matches: [], leaderboard: {} };
    }
  }
}
