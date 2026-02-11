import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { PUBLIC } from 'jallikattu-frontend/constants/api-paths';

export default class BullProfileRoute extends Route {
  @service auth;

  async model(params) {
    const base = this.auth.apiBase;
    try {
      return await fetch(`${base}${PUBLIC.BULL(params.bull_id)}`).then((r) =>
        r.json()
      );
    } catch {
      return { error: 'Bull not found' };
    }
  }
}
