import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const PUBLIC_ROUTES = [
  'index',
  'scoreboard',
  'matches',
  'match-detail',
  'leaderboard',
  'player-profile',
  'bull-profile',
  'signup',
];

export default class ApplicationController extends Controller {
  @service auth;
  @service router;
  @tracked sidebarOpen = false;

  get isPublicRoute() {
    return PUBLIC_ROUTES.includes(this.router.currentRouteName);
  }

  get pageTitle() {
    const map = {
      dashboard: 'Dashboard',
      'match-control': 'Match Control',
      winners: 'Winners',
      registration: 'Registration',
      events: 'Event Manager',
      'event-detail': 'Event Detail',
      tables: 'Data Tables',
      users: 'User Management',
      'my-profile': 'My Profile',
      'my-history': 'Match History',
      'my-matches': 'Register for Match',
      'my-bulls': 'My Bulls',
      scoreboard: 'Live Scoreboard',
    };
    return map[this.router.currentRouteName] || 'Jallikattu';
  }

  @action
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  @action
  async logout() {
    await this.auth.logout();
    this.sidebarOpen = false;
    this.router.transitionTo('login');
  }
}
