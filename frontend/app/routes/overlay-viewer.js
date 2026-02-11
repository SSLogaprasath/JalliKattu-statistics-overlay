import Route from '@ember/routing/route';

export default class OverlayViewerRoute extends Route {
  // No model needed — controller polls /api/overlay/current

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.startPolling();
  }

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.stopPolling();
    }
  }
}
