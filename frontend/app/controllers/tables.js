import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TablesController extends Controller {
  @service auth;

  queryParams = ['table'];

  @tracked table = null;
  @tracked selectedTable = null;
  @tracked tableData = null;
  @tracked isLoading = false;
  @tracked editRow = null;
  @tracked showAddForm = false;
  @tracked statusMessage = '';

  /**
   * Called when the route's model or query-params change.
   * If ?table=xxx is in the URL, auto-load that table.
   */
  async handleQueryParam() {
    if (this.table && this.table !== this.selectedTable) {
      await this.loadTable(this.table);
    }
  }

  @action
  async loadTable(tableName) {
    this.selectedTable = tableName;
    this.table = tableName;
    this.editRow = null;
    this.showAddForm = false;
    this.isLoading = true;
    try {
      this.tableData = await this.auth.apiGet(`/tables/${tableName}`);
    } catch (e) {
      this.statusMessage = 'Error loading table';
    } finally {
      this.isLoading = false;
    }
  }

  @action
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.editRow = null;
  }

  @action
  async addRow(event) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    for (const col of this.tableData.columns) {
      const input = form.elements[col.name];
      if (input && input.value) {
        data[col.name] = input.value;
      }
    }
    try {
      await this.auth.apiPost(`/tables/${this.selectedTable}`, data);
      this.statusMessage = 'Row added successfully';
      this.showAddForm = false;
      await this.loadTable(this.selectedTable);
    } catch (e) {
      this.statusMessage = 'Error adding row';
    }
    setTimeout(() => (this.statusMessage = ''), 3000);
  }

  @action
  async deleteRow(row) {
    if (!confirm('Are you sure you want to delete this row?')) return;
    const params = this.tableData.primaryKeys
      .map((pk) => `${pk}=${encodeURIComponent(row[pk])}`)
      .join('&');
    try {
      await this.auth.apiDelete(`/tables/${this.selectedTable}?${params}`);
      this.statusMessage = 'Row deleted';
      await this.loadTable(this.selectedTable);
    } catch (e) {
      this.statusMessage = 'Error deleting row';
    }
    setTimeout(() => (this.statusMessage = ''), 3000);
  }

  @action
  startEdit(row) {
    this.editRow = { ...row };
    this.showAddForm = false;
  }

  @action
  updateEditField(field, event) {
    this.editRow = { ...this.editRow, [field]: event.target.value };
  }

  @action
  async saveEdit() {
    const pkValues = {};
    const values = {};
    for (const pk of this.tableData.primaryKeys) {
      pkValues[pk] = this.editRow[pk];
    }
    for (const col of this.tableData.columns) {
      const colName = col.name;
      if (!this.tableData.primaryKeys.includes(colName)) {
        values[colName] = this.editRow[colName];
      }
    }
    try {
      await this.auth.apiPut(`/tables/${this.selectedTable}`, { pkValues, values });
      this.statusMessage = 'Row updated';
      this.editRow = null;
      await this.loadTable(this.selectedTable);
    } catch (e) {
      this.statusMessage = 'Error updating row';
    }
    setTimeout(() => (this.statusMessage = ''), 3000);
  }

  @action
  cancelEdit() {
    this.editRow = null;
  }
}
