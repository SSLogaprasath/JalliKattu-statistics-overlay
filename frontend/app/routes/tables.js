import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { TABLES } from 'jallikattu-frontend/constants/api-paths';

export default class TablesRoute extends Route {
  @service auth;
  @service router;

  queryParams = {
    table: { refreshModel: false },
  };

  beforeModel() {
    if (!this.auth.isAuthenticated) {
      this.router.transitionTo('login');
      return;
    }
    if (!this.auth.isAdmin) {
      this.router.transitionTo('dashboard');
    }
  }

  async model() {
    try {
      return await this.auth.apiGet(TABLES.LIST);
    } catch {
      return [];
    }
  }

  async setupController(controller, model) {
    super.setupController(controller, model);
    if (controller.table) {
      try {
        await controller.loadTable(controller.table);
      } catch { /* ignore */ }
    }
  }
}
