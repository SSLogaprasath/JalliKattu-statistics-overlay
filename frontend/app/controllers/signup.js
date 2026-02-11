import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { PUBLIC } from 'jallikattu-frontend/constants/api-paths';

export default class SignupController extends Controller {
  @service auth;
  @service router;

  @tracked activeTab = 'player';
  @tracked error = null;
  @tracked success = null;
  @tracked isLoading = false;

  // Player fields
  @tracked pUsername = '';
  @tracked pPassword = '';
  @tracked pName = '';
  @tracked pDOB = '';
  @tracked pPhone = '';
  @tracked pAadhaar = '';

  // Owner fields
  @tracked oUsername = '';
  @tracked oPassword = '';
  @tracked oName = '';
  @tracked oAadhaar = '';

  @action
  setTab(tab) {
    this.activeTab = tab;
    this.error = null;
    this.success = null;
  }

  @action
  updateField(field, event) {
    this[field] = event.target.value;
  }

  @action
  async registerPlayer(event) {
    event.preventDefault();
    this.error = null;
    this.success = null;
    this.isLoading = true;
    try {
      const base = this.auth.apiBase;
      const resp = await fetch(`${base}${PUBLIC.REGISTER_PLAYER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.pUsername,
          password: this.pPassword,
          player_name: this.pName,
          dob: this.pDOB,
          phone: this.pPhone,
          aadhaar: this.pAadhaar,
        }),
      });
      const data = await resp.json();
      if (resp.ok) {
        this.success =
          'Registration successful! You can now login with your credentials.';
        this.pUsername = this.pPassword = this.pName = this.pDOB = this.pPhone = this.pAadhaar = '';
      } else {
        this.error = data.error || 'Registration failed';
      }
    } catch (e) {
      this.error = e.message;
    }
    this.isLoading = false;
  }

  @action
  async registerOwner(event) {
    event.preventDefault();
    this.error = null;
    this.success = null;
    this.isLoading = true;
    try {
      const base = this.auth.apiBase;
      const resp = await fetch(`${base}${PUBLIC.REGISTER_OWNER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.oUsername,
          password: this.oPassword,
          name: this.oName,
          aadhaar: this.oAadhaar,
        }),
      });
      const data = await resp.json();
      if (resp.ok) {
        this.success =
          'Registration successful! You can now login with your credentials.';
        this.oUsername = this.oPassword = this.oName = this.oAadhaar = '';
      } else {
        this.error = data.error || 'Registration failed';
      }
    } catch (e) {
      this.error = e.message;
    }
    this.isLoading = false;
  }
}
