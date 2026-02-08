import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class PlayerProfileRoute extends Route {
  @service auth;

  async model(params) {
    const base = this.auth.apiBase;
    try {
      return await fetch(`${base}/public/players/${params.player_id}`).then(
        (r) => r.json()
      );
    } catch {
      return { error: 'Player not found' };
    }
  }
}
