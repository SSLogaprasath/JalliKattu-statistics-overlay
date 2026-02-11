import Route from "@ember/routing/route";
import { service } from "@ember/service";
import {
  SCORES,
  MATCHES,
  MATCH_DRAW,
} from "jallikattu-frontend/constants/api-paths";

export default class MatchControlV3Route extends Route {
  @service auth;
  @service router;

  queryParams = {
    matchId: { refreshModel: true },
  };

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo("login");
      return;
    }
    if (!this.auth.isScorer && !this.auth.isRegistrar) {
      this.router.transitionTo("dashboard");
    }
  }

  async model(params) {
    let matches = [];
    try {
      matches = await this.auth.apiGet(MATCHES.LIST);
    } catch {
      /* empty */
    }

    let scoringData = null;
    let drawData = null;
    const matchId = params.matchId;
    if (matchId) {
      try {
        [scoringData, drawData] = await Promise.all([
          this.auth.apiGet(SCORES.GET(matchId)),
          this.auth.apiGet(MATCH_DRAW.GET(matchId)),
        ]);
      } catch {
        /* empty */
      }
    }

    return { matches, scoringData, drawData, matchId };
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.initFromModel(model);
    controller.setupKeyboard();
    controller.checkAiHealth();
  }

  deactivate() {
    const c = this.controller;
    if (c) {
      c.cleanupKeyboard();
      c.stopMatchClock();
    }
  }
}
