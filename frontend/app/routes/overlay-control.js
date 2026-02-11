import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { OVERLAY } from 'jallikattu-frontend/constants/api-paths';

export default class OverlayControlRoute extends Route {
  @service auth;

  async model() {
    try {
      const data = await this.auth.apiGet(OVERLAY.CONFIG);
      return data;
    } catch {
      return { error: 'Failed to load overlay config' };
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.initFromModel();
  }

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.cleanup();
    }
  }
}
