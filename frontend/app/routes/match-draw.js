import Route from "@ember/routing/route";
import { service } from "@ember/service";
import { MATCH_DRAW } from "jallikattu-frontend/constants/api-paths";

export default class MatchDrawRoute extends Route {
  @service auth;
  @service router;

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo("login");
      return;
    }
    if (!this.auth.isRegistrar && !this.auth.isAdmin && !this.auth.isScorer) {
      this.router.transitionTo("dashboard");
    }
  }

  async model(params) {
    try {
      return await this.auth.apiGet(MATCH_DRAW.GET(params.match_id));
    } catch {
      return {
        match: null,
        roundConfigs: [],
        players: [],
        bulls: [],
        fouls: [],
        summary: {},
      };
    }
  }
}
