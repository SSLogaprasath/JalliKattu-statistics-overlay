import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service auth;

  get liveMatches() {
    return (this.model?.matches || []).filter((m) => m.status === 'Live');
  }

  get upcomingMatches() {
    return (this.model?.matches || []).filter((m) => m.status === 'Scheduled');
  }

  get completedMatches() {
    return (this.model?.matches || [])
      .filter((m) => m.status === 'Completed')
      .slice(0, 3);
  }
}
