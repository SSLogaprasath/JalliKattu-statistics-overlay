import EmberRouter from '@ember/routing/router';
import config from 'jallikattu-frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // Public pages (no auth required)
  this.route('login');
  this.route('signup');
  this.route('scoreboard');
  this.route('matches');
  this.route('match-detail', { path: '/matches/:match_id' });
  this.route('leaderboard');
  this.route('player-profile', { path: '/players/:player_id' });
  this.route('bull-profile', { path: '/bulls/:bull_id' });

  // Auth required — role-aware dashboard
  this.route('dashboard');

  // Admin / Super Admin
  this.route('users');
  this.route('tables');
  this.route('prizes');

  // Scorer / Admin
  this.route('match-control');
  this.route('winners');

  // Registrar / Admin
  this.route('registration');
  this.route('events');
  this.route('event-detail', { path: '/events/:match_id' });

  // Player self-service
  this.route('my-profile');
  this.route('my-history');
  this.route('my-matches');

  // Owner self-service
  this.route('my-bulls');
});
