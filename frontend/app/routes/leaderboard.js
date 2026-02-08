import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LeaderboardRoute extends Route {
  @service auth;

  async model() {
    const base = this.auth.apiBase;
    try {
      return await fetch(`${base}/public/leaderboard?limit=20`).then((r) =>
        r.json()
      );
    } catch {
      return { players: [], bulls: [] };
    }
  }
}
