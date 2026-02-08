import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginController extends Controller {
  @service auth;
  @service router;

  @tracked username = '';
  @tracked password = '';
  @tracked error = '';
  @tracked isLoading = false;

  @action
  async login(event) {
    event.preventDefault();
    this.error = '';
    this.isLoading = true;

    try {
      const result = await this.auth.login(this.username, this.password);
      if (result.success) {
        this.username = '';
        this.password = '';
        this.router.transitionTo('dashboard');
      } else {
        this.error = result.error;
      }
    } catch (e) {
      this.error = 'Connection error. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  @action
  updateField(field, event) {
    this[field] = event.target.value;
  }
}
