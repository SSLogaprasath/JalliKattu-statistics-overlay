import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class PrizesController extends Controller {
  @service auth;
  @service router;

  @tracked editingId = null;
  @tracked editName = '';
  @tracked editProvider = '';
  @tracked isAdding = false;
  @tracked newName = '';
  @tracked newProvider = '';
  @tracked error = null;
  @tracked success = null;
  @tracked isLoading = false;

  @action
  startAdd() {
    this.isAdding = true;
    this.newName = '';
    this.newProvider = '';
    this.editingId = null;
    this.error = null;
    this.success = null;
  }

  @action
  cancelAdd() {
    this.isAdding = false;
  }

  @action
  startEdit(prize) {
    this.editingId = prize.prize_id;
    this.editName = prize.prize;
    this.editProvider = prize.prize_provided_by || '';
    this.isAdding = false;
    this.error = null;
    this.success = null;
  }

  @action
  cancelEdit() {
    this.editingId = null;
  }

  @action
  async addPrize(event) {
    event.preventDefault();
    if (!this.newName.trim()) {
      this.error = 'Prize name is required';
      return;
    }
    this.isLoading = true;
    this.error = null;
    try {
      // Get next ID
      const rows = this.model;
      const maxId = rows.reduce((max, p) => Math.max(max, p.prize_id || 0), 0);
      await this.auth.apiPost('/tables/prize', {
        prize_id: maxId + 1,
        prize: this.newName.trim(),
        prize_provided_by: this.newProvider.trim() || null,
      });
      this.success = 'Prize added successfully';
      this.isAdding = false;
      this.router.refresh();
    } catch (e) {
      this.error = e.message || 'Failed to add prize';
    }
    this.isLoading = false;
  }

  @action
  async savePrize(prizeId, event) {
    event.preventDefault();
    if (!this.editName.trim()) {
      this.error = 'Prize name is required';
      return;
    }
    this.isLoading = true;
    this.error = null;
    try {
      await this.auth.apiPut('/tables/prize', {
        prize_id: prizeId,
        prize: this.editName.trim(),
        prize_provided_by: this.editProvider.trim() || null,
      });
      this.success = 'Prize updated successfully';
      this.editingId = null;
      this.router.refresh();
    } catch (e) {
      this.error = e.message || 'Failed to update prize';
    }
    this.isLoading = false;
  }

  @action
  async deletePrize(prizeId) {
    if (!confirm('Delete this prize? This may affect match history records that reference it.')) {
      return;
    }
    this.isLoading = true;
    this.error = null;
    try {
      await this.auth.apiDelete(`/tables/prize?prize_id=${prizeId}`);
      this.success = 'Prize deleted successfully';
      this.router.refresh();
    } catch (e) {
      this.error = e.message || 'Failed to delete prize';
    }
    this.isLoading = false;
  }

  @action
  updateField(field, event) {
    this[field] = event.target.value;
  }
}
