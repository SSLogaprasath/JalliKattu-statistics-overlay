import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PUBLIC } from 'jallikattu-frontend/constants/api-paths';

export default class LeaderboardRoute extends Route {
  @service auth;

  async model() {
    const base = this.auth.apiBase;
    try {
      return await fetch(`${base}${PUBLIC.LEADERBOARD()}`).then((r) =>
        r.json()
      );
    } catch {
      return { players: [], bulls: [] };
    }
  }
}
