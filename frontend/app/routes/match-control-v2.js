import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { MATCHES } from 'jallikattu-frontend/constants/api-paths';

export default class MatchControlV2Route extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
      return;
    }
    if (!this.auth.isScorer) {
      this.router.transitionTo('dashboard');
    }
  }

  async model() {
    let matches = [];
    try {
      matches = await this.auth.apiGet(MATCHES.LIST);
    } catch {
      // matches stays empty
    }
    return { matches };
  }

  activate() {
    super.activate();
    document.body.classList.add('mcv2-active');
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.setupKeyboard();
  }

  deactivate() {
    document.body.classList.remove('mcv2-active');
    const c = this.controller;
    if (c) {
      c.cleanupKeyboard();
    }
  }
}
