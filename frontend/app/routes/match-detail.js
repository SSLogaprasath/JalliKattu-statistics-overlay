import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PUBLIC } from 'jallikattu-frontend/constants/api-paths';

export default class MatchDetailRoute extends Route {
  @service auth;

  async model(params) {
    const base = this.auth.apiBase;
    try {
      const [scores, winners, spotPrizes] = await Promise.all([
        fetch(`${base}${PUBLIC.MATCH_SCORES(params.match_id)}`).then((r) =>
          r.json()
        ),
        fetch(`${base}${PUBLIC.MATCH_WINNERS(params.match_id)}`).then((r) =>
          r.json()
        ),
        fetch(`${base}${PUBLIC.MATCH_SPOTS(params.match_id)}`).then((r) =>
          r.json()
        ),
      ]);
      return { match_id: params.match_id, scores, winners, spotPrizes };
    } catch {
      return { match_id: params.match_id, scores: {}, winners: {}, spotPrizes: [] };
    }
  }
}
