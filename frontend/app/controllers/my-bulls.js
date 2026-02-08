import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class MyBullsController extends Controller {
  @service auth;

  @tracked message = null;
  @tracked messageType = null;
  @tracked registeringKey = null; // "bullId-matchId" while registering

  @action
  dismissMessage() {
    this.message = null;
  }

  @action
  async registerBullForMatch(bullId, matchId) {
    const key = `${bullId}-${matchId}`;
    this.registeringKey = key;
    this.message = null;

    try {
      const result = await this.auth.apiPost('/owner/register-match', {
        bull_id: bullId,
        match_id: matchId,
      });
      this.message = result.message || 'Bull registered! Pending approval.';
      this.messageType = 'success';
    } catch (e) {
      this.message = e.message || 'Registration failed';
      this.messageType = 'danger';
    } finally {
      this.registeringKey = null;
    }
  }
}
