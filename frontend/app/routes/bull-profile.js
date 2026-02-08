import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BullProfileRoute extends Route {
  @service auth;

  async model(params) {
    const base = this.auth.apiBase;
    try {
      return await fetch(`${base}/public/bulls/${params.bull_id}`).then((r) =>
        r.json()
      );
    } catch {
      return { error: 'Bull not found' };
    }
  }
}
