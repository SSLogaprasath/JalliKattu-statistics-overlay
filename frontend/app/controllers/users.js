import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { AUTH } from 'jallikattu-frontend/constants/api-paths';

export default class UsersController extends Controller {
  @service auth;

  @tracked showAddForm = false;
  @tracked statusMessage = '';
  @tracked statusType = 'success';
  @tracked roleFilter = '';
  @tracked selectedRole = '';

  get filteredUsers() {
    if (!this.roleFilter) return this.model || [];
    return (this.model || []).filter((u) => u.role === this.roleFilter);
  }

  @action
  filterByRole(role) {
    this.roleFilter = role;
  }

  @action
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.selectedRole = '';
  }

  @action
  onRoleChange(event) {
    this.selectedRole = event.target.value;
  }

  @action
  async createUser(event) {
    event.preventDefault();
    const form = event.target;
    const role = form.role.value;
    const payload = {
      username: form.username.value,
      password: form.password.value,
      full_name: form.full_name.value,
      role,
    };
    // Add role-specific fields
    if (role === 'player') {
      payload.dob = form.dob?.value || '';
      payload.aadhaar = form.aadhaar?.value || '';
      payload.phone = form.phone?.value || '';
    } else if (role === 'owner') {
      payload.aadhaar = form.aadhaar?.value || '';
    }
    try {
      const result = await this.auth.apiPost(AUTH.USERS, payload);
      if (result.error) {
        this.statusMessage = result.error;
        this.statusType = 'danger';
      } else {
        this.statusMessage = 'User created successfully';
        this.statusType = 'success';
        this.showAddForm = false;
        this.selectedRole = '';
        form.reset();
        const users = await this.auth.apiGet(AUTH.USERS);
        this.set('model', users);
      }
    } catch (e) {
      this.statusMessage = 'Error creating user';
      this.statusType = 'danger';
    }
    setTimeout(() => (this.statusMessage = ''), 4000);
  }

  @action
  async deleteUser(userId) {
    if (!confirm('Delete this user?')) return;
    try {
      const result = await this.auth.apiDelete(AUTH.USER(userId));
      if (result.error) {
        this.statusMessage = result.error;
        this.statusType = 'danger';
      } else {
        this.statusMessage = 'User deleted';
        this.statusType = 'success';
        const users = await this.auth.apiGet(AUTH.USERS);
        this.set('model', users);
      }
    } catch (e) {
      this.statusMessage = 'Error deleting user';
      this.statusType = 'danger';
    }
    setTimeout(() => (this.statusMessage = ''), 4000);
  }

  @action
  async changeRole(userId, event) {
    const newRole = event.target.value;
    if (!newRole) return;
    try {
      const result = await this.auth.apiPut(AUTH.USER(userId), { role: newRole });
      if (result.error) {
        this.statusMessage = result.error;
        this.statusType = 'danger';
      } else {
        this.statusMessage = `Role updated to ${newRole}`;
        this.statusType = 'success';
        const users = await this.auth.apiGet(AUTH.USERS);
        this.set('model', users);
      }
    } catch (e) {
      this.statusMessage = 'Error updating role';
      this.statusType = 'danger';
    }
    // reset dropdown to placeholder
    event.target.selectedIndex = 0;
    setTimeout(() => (this.statusMessage = ''), 4000);
  }
}
