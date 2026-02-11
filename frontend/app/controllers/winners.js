import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { WINNERS } from 'jallikattu-frontend/constants/api-paths';

export default class WinnersController extends Controller {
  @service auth;

  @tracked selectedMatchId = null;
  @tracked winnerData = null;
  @tracked isLoading = false;

  get completedMatches() {
    return this.model?.completedMatches || [];
  }

  @action
  async loadWinners(event) {
    this.selectedMatchId = event.target.value;
    if (!this.selectedMatchId) {
      this.winnerData = null;
      return;
    }
    this.isLoading = true;
    try {
      this.winnerData = await this.auth.apiGet(WINNERS.BY_MATCH(this.selectedMatchId));
    } catch (e) {
      this.winnerData = null;
    } finally {
      this.isLoading = false;
    }
  }
}
