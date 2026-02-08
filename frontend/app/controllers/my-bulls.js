import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class MyBullsController extends Controller {
  @service auth;
  @service router;

  @tracked message = null;
  @tracked messageType = null;
  @tracked registeringKey = null; // "bullId-matchId" while registering

  // Add-bull form state
  @tracked showAddForm = false;
  @tracked newBullName = '';
  @tracked newBullAge = '';
  @tracked newBreedId = '';
  @tracked newFitnessCert = '';
  @tracked isAddingBull = false;

  @action
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.newBullName = '';
    this.newBullAge = '';
    this.newBreedId = '';
    this.newFitnessCert = '';
  }

  @action
  updateField(field, event) {
    this[field] = event.target.value;
  }

  @action
  async addBull(event) {
    event.preventDefault();
    this.message = null;
    this.isAddingBull = true;
    try {
      const result = await this.auth.apiPost('/owner/bulls', {
        bull_name: this.newBullName.trim(),
        age: this.newBullAge,
        breed_id: this.newBreedId,
        fitness_certificate: this.newFitnessCert.trim(),
      });
      this.message = result.message || 'Bull added successfully!';
      this.messageType = 'success';
      this.showAddForm = false;
      this.newBullName = '';
      this.newBullAge = '';
      this.newBreedId = '';
      this.newFitnessCert = '';
      this.router.refresh();
    } catch (e) {
      this.message = e.message || 'Failed to add bull';
      this.messageType = 'danger';
    } finally {
      this.isAddingBull = false;
    }
  }

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
