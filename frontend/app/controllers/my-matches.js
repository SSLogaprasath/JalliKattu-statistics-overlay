import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { PLAYER } from 'jallikattu-frontend/constants/api-paths';

export default class MyMatchesController extends Controller {
  @service auth;
  @service router;

  @tracked message = null;
  @tracked messageType = null;
  @tracked registeringMatchId = null;

  @action
  dismissMessage() {
    this.message = null;
  }

  @action
  async registerForMatch(match) {
    this.registeringMatchId = match.match_id;
    this.message = null;

    try {
      const result = await this.auth.apiPost(PLAYER.REGISTER_MATCH, {
        match_id: match.match_id,
      });
      this.message = result.message || 'Successfully registered! Pending approval.';
      this.messageType = 'success';
      // Refresh the model to update capacity counts
      this.router.refresh('my-matches');
    } catch (e) {
      this.message = e.message || 'Registration failed';
      this.messageType = 'danger';
    } finally {
      this.registeringMatchId = null;
    }
  }
}
