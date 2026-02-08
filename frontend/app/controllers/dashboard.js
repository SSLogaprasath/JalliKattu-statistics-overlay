import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class DashboardController extends Controller {
  @service auth;
}
