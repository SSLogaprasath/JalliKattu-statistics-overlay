import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class MatchDetailRoute extends Route {
  @service auth;

  async model(params) {
    const base = this.auth.apiBase;
    try {
      const [scores, winners, spotPrizes] = await Promise.all([
        fetch(`${base}/public/matches/${params.match_id}/scores`).then((r) =>
          r.json()
        ),
        fetch(`${base}/public/matches/${params.match_id}/winners`).then((r) =>
          r.json()
        ),
        fetch(`${base}/public/matches/${params.match_id}/spot-prizes`).then((r) =>
          r.json()
        ),
      ]);
      return { match_id: params.match_id, scores, winners, spotPrizes };
    } catch {
      return { match_id: params.match_id, scores: {}, winners: {}, spotPrizes: [] };
    }
  }
}
