'use strict';



;define("jallikattu-frontend/app", ["exports", "@ember/application", "ember-resolver", "ember-load-initializers", "jallikattu-frontend/config/environment"], function (_exports, _application, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"ember-resolver",0,"ember-load-initializers",0,"jallikattu-frontend/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class App extends _application.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);
      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);
      _defineProperty(this, "Resolver", _emberResolver.default);
    }
  }
  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("jallikattu-frontend/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component/-private/ember-component-manager"eaimeta@70e063a35619d71f
});
;define("jallikattu-frontend/container-debug-adapter", ["exports", "ember-resolver/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _containerDebugAdapter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-resolver/container-debug-adapter"eaimeta@70e063a35619d71f
});
;define("jallikattu-frontend/controllers/application", ["exports", "@ember/controller", "@ember/service", "@ember/object", "@glimmer/tracking"], function (_exports, _controller, _service, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@ember/object",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  const PUBLIC_ROUTES = ['index', 'scoreboard', 'matches', 'match-detail', 'leaderboard', 'player-profile', 'bull-profile', 'signup'];
  let ApplicationController = _exports.default = (_class = class ApplicationController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _initializerDefineProperty(this, "sidebarOpen", _descriptor3, this);
    }
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
        scoreboard: 'Live Scoreboard'
      };
      return map[this.router.currentRouteName] || 'Jallikattu';
    }
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
    async logout() {
      await this.auth.logout();
      this.sidebarOpen = false;
      this.router.transitionTo('login');
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "sidebarOpen", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "toggleSidebar", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleSidebar"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "logout", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "logout"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/dashboard", ["exports", "@ember/controller", "@ember/service"], function (_exports, _controller, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let DashboardController = _exports.default = (_class = class DashboardController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/controllers/index", ["exports", "@ember/controller", "@ember/service"], function (_exports, _controller, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let IndexController = _exports.default = (_class = class IndexController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
    get liveMatches() {
      return (this.model?.matches || []).filter(m => m.status === 'Live');
    }
    get upcomingMatches() {
      return (this.model?.matches || []).filter(m => m.status === 'Scheduled');
    }
    get completedMatches() {
      return (this.model?.matches || []).filter(m => m.status === 'Completed').slice(0, 3);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/controllers/login", ["exports", "@ember/controller", "@ember/service", "@glimmer/tracking", "@ember/object"], function (_exports, _controller, _service, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@glimmer/tracking",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let LoginController = _exports.default = (_class = class LoginController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _initializerDefineProperty(this, "username", _descriptor3, this);
      _initializerDefineProperty(this, "password", _descriptor4, this);
      _initializerDefineProperty(this, "error", _descriptor5, this);
      _initializerDefineProperty(this, "isLoading", _descriptor6, this);
    }
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
    updateField(field, event) {
      this[field] = event.target.value;
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "username", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "password", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "login", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "login"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateField", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateField"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/match-control", ["exports", "@ember/controller", "@ember/service", "@glimmer/tracking", "@ember/object"], function (_exports, _controller, _service, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@glimmer/tracking",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MatchControlController = _exports.default = (_class = class MatchControlController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "selectedMatchId", _descriptor2, this);
      _initializerDefineProperty(this, "scoringData", _descriptor3, this);
      _initializerDefineProperty(this, "isLoading", _descriptor4, this);
      _initializerDefineProperty(this, "statusMessage", _descriptor5, this);
      _initializerDefineProperty(this, "statusType", _descriptor6, this);
      _initializerDefineProperty(this, "activeTab", _descriptor7, this);
      // players | bulls | interactions
      _initializerDefineProperty(this, "isSaving", _descriptor8, this);
      _initializerDefineProperty(this, "timerRunning", _descriptor9, this);
      _initializerDefineProperty(this, "timerDisplay", _descriptor0, this);
      _defineProperty(this, "_timerStart", null);
      _defineProperty(this, "_timerInterval", null);
    }
    get matchStatus() {
      if (!this.selectedMatchId || !this.model?.matches) return null;
      const match = this.model.matches.find(m => String(m.match_id) === String(this.selectedMatchId));
      return match ? match.status : null;
    }
    get selectedMatch() {
      if (!this.selectedMatchId || !this.model?.matches) return null;
      return this.model.matches.find(m => String(m.match_id) === String(this.selectedMatchId));
    }
    get isLive() {
      return this.matchStatus === 'Live';
    }
    get liveMatchCount() {
      return (this.model?.matches || []).filter(m => m.status === 'Live').length;
    }
    get scheduledMatchCount() {
      return (this.model?.matches || []).filter(m => m.status === 'Scheduled').length;
    }
    showMessage(text, type = 'success') {
      this.statusMessage = text;
      this.statusType = type;
      setTimeout(() => this.statusMessage = null, 3000);
    }
    switchTab(tab) {
      this.activeTab = tab;
    }
    async loadMatch(event) {
      this.selectedMatchId = event.target.value;
      if (!this.selectedMatchId) {
        this.scoringData = null;
        return;
      }
      this.activeTab = 'players';
      await this.fetchScores();
    }
    async selectMatchDirect(matchId) {
      this.selectedMatchId = String(matchId);
      this.activeTab = 'players';
      await this.fetchScores();
    }
    async fetchScores() {
      if (!this.selectedMatchId) return;
      this.isLoading = true;
      try {
        this.scoringData = await this.auth.apiGet(`/scores/${this.selectedMatchId}`);
      } catch (e) {
        this.showMessage('Failed to load scoring data', 'danger');
      } finally {
        this.isLoading = false;
      }
    }
    async updateMatchStatus(newStatus) {
      try {
        await this.auth.apiPut(`/matches/${this.selectedMatchId}`, {
          status: newStatus
        });
        const match = this.model.matches.find(m => String(m.match_id) === String(this.selectedMatchId));
        if (match) match.status = newStatus;
        this.selectedMatchId = this.selectedMatchId;
        this.showMessage(`Match is now "${newStatus}"`);
      } catch (e) {
        this.showMessage('Failed to update status', 'danger');
      }
    }
    async saveAllScores() {
      this.isSaving = true;
      const promises = [];

      // Collect all player score inputs
      if (this.scoringData?.playerScores) {
        for (const p of this.scoringData.playerScores) {
          const bcInput = document.getElementById(`p-bc-${p.player_id}-${p.round_type_id}`);
          const penInput = document.getElementById(`p-pen-${p.player_id}-${p.round_type_id}`);
          if (bcInput && penInput) {
            const newBc = parseInt(bcInput.value, 10) || 0;
            const newPen = parseInt(penInput.value, 10) || 0;
            if (newBc !== p.bull_caught || newPen !== p.penalties) {
              promises.push(this.auth.apiPost(`/scores/${this.selectedMatchId}/player`, {
                player_id: p.player_id,
                round_type_id: p.round_type_id,
                bull_caught: bcInput.value,
                penalties: penInput.value
              }));
            }
          }
        }
      }

      // Collect all bull score inputs
      if (this.scoringData?.bullScores) {
        for (const b of this.scoringData.bullScores) {
          const aggInput = document.getElementById(`b-agg-${b.bull_id}-${b.round_type_id}`);
          const paInput = document.getElementById(`b-pa-${b.bull_id}-${b.round_type_id}`);
          const diffInput = document.getElementById(`b-diff-${b.bull_id}-${b.round_type_id}`);
          if (aggInput && paInput && diffInput) {
            const newAgg = parseInt(aggInput.value, 10) || 0;
            const newPa = parseInt(paInput.value, 10) || 0;
            const newDiff = parseInt(diffInput.value, 10) || 0;
            if (newAgg !== b.aggression || newPa !== b.play_area || newDiff !== b.difficulty) {
              promises.push(this.auth.apiPost(`/scores/${this.selectedMatchId}/bull`, {
                bull_id: b.bull_id,
                round_type_id: b.round_type_id,
                aggression: aggInput.value,
                play_area: paInput.value,
                difficulty: diffInput.value
              }));
            }
          }
        }
      }
      try {
        if (promises.length === 0) {
          this.showMessage('No changes to save', 'info');
        } else {
          await Promise.all(promises);
          this.showMessage(`Saved ${promises.length} score${promises.length > 1 ? 's' : ''} successfully`);
          await this.fetchScores();
        }
      } catch (e) {
        this.showMessage('Some scores failed to save', 'danger');
      } finally {
        this.isSaving = false;
      }
    }
    startTimer() {
      this._timerStart = performance.now();
      this.timerRunning = true;
      this.timerDisplay = '0.0';
      this._timerInterval = setInterval(() => {
        const elapsed = (performance.now() - this._timerStart) / 1000;
        this.timerDisplay = elapsed.toFixed(1);
      }, 100);
    }
    stopTimer() {
      if (!this.timerRunning) return;
      clearInterval(this._timerInterval);
      const elapsed = (performance.now() - this._timerStart) / 1000;
      const duration = Math.round(elapsed * 10) / 10;
      this.timerDisplay = duration.toFixed(1);
      this.timerRunning = false;
      // Set the value into the duration input
      const durationInput = document.querySelector('input[name="hold_duration"]');
      if (durationInput) {
        durationInput.value = duration.toFixed(1);
        durationInput.dispatchEvent(new Event('input', {
          bubbles: true
        }));
      }
    }
    resetTimer() {
      clearInterval(this._timerInterval);
      this.timerRunning = false;
      this.timerDisplay = '0.0';
      this._timerStart = null;
      const durationInput = document.querySelector('input[name="hold_duration"]');
      if (durationInput) {
        durationInput.value = '';
      }
    }
    async addInteraction(event) {
      event.preventDefault();
      const form = event.target;
      const payload = {
        player_id: form.player_id.value,
        bull_id: form.bull_id.value,
        round_type_id: form.round_type_id.value,
        hold_sequence: form.hold_sequence.value,
        hold_duration: form.hold_duration.value
      };
      try {
        await this.auth.apiPost(`/scores/${this.selectedMatchId}/interaction`, payload);
        form.reset();
        await this.fetchScores();
        this.showMessage('Interaction recorded');
      } catch (e) {
        this.showMessage('Failed to record interaction', 'danger');
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "selectedMatchId", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "scoringData", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "statusMessage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "statusType", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'success';
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "activeTab", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'players';
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "isSaving", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "timerRunning", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor0 = _applyDecoratedDescriptor(_class.prototype, "timerDisplay", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '0.0';
    }
  }), _applyDecoratedDescriptor(_class.prototype, "switchTab", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "switchTab"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadMatch", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadMatch"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "selectMatchDirect", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "selectMatchDirect"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateMatchStatus", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateMatchStatus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "saveAllScores", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "saveAllScores"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "startTimer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "startTimer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stopTimer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "stopTimer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetTimer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "resetTimer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addInteraction", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addInteraction"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/my-bulls", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object", "@ember/service"], function (_exports, _controller, _tracking, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MyBullsController = _exports.default = (_class = class MyBullsController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "message", _descriptor2, this);
      _initializerDefineProperty(this, "messageType", _descriptor3, this);
      _initializerDefineProperty(this, "registeringKey", _descriptor4, this);
    }
    // "bullId-matchId" while registering

    dismissMessage() {
      this.message = null;
    }
    async registerBullForMatch(bullId, matchId) {
      const key = `${bullId}-${matchId}`;
      this.registeringKey = key;
      this.message = null;
      try {
        const result = await this.auth.apiPost('/owner/register-match', {
          bull_id: bullId,
          match_id: matchId
        });
        this.message = result.message || 'Bull registered! Pending approval.';
        this.messageType = 'success';
      } catch (e) {
        this.message = e.message || 'Registration failed';
        this.messageType = 'danger';
      } finally {
        this.registeringKey = null;
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "message", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "messageType", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "registeringKey", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "dismissMessage", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "dismissMessage"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerBullForMatch", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "registerBullForMatch"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/my-matches", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object", "@ember/service"], function (_exports, _controller, _tracking, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MyMatchesController = _exports.default = (_class = class MyMatchesController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _initializerDefineProperty(this, "message", _descriptor3, this);
      _initializerDefineProperty(this, "messageType", _descriptor4, this);
      _initializerDefineProperty(this, "registeringMatchId", _descriptor5, this);
    }
    dismissMessage() {
      this.message = null;
    }
    async registerForMatch(match) {
      this.registeringMatchId = match.match_id;
      this.message = null;
      try {
        const result = await this.auth.apiPost('/player/register-match', {
          match_id: match.match_id
        });
        this.message = result.message || 'Successfully registered! Pending approval.';
        this.messageType = 'success';
        // Refresh the model to update capacity counts
        this.router.refresh('my-matches');
      } catch (e) {
        this.message = e.message || 'Registration failed';
        this.messageType = 'danger';
      } finally {
        this.registeringMatchId = null;
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "message", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "messageType", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "registeringMatchId", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "dismissMessage", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "dismissMessage"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerForMatch", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "registerForMatch"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/prizes", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object", "@ember/service"], function (_exports, _controller, _tracking, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let PrizesController = _exports.default = (_class = class PrizesController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _initializerDefineProperty(this, "editingId", _descriptor3, this);
      _initializerDefineProperty(this, "editName", _descriptor4, this);
      _initializerDefineProperty(this, "editProvider", _descriptor5, this);
      _initializerDefineProperty(this, "isAdding", _descriptor6, this);
      _initializerDefineProperty(this, "newName", _descriptor7, this);
      _initializerDefineProperty(this, "newProvider", _descriptor8, this);
      _initializerDefineProperty(this, "error", _descriptor9, this);
      _initializerDefineProperty(this, "success", _descriptor0, this);
      _initializerDefineProperty(this, "isLoading", _descriptor1, this);
    }
    startAdd() {
      this.isAdding = true;
      this.newName = '';
      this.newProvider = '';
      this.editingId = null;
      this.error = null;
      this.success = null;
    }
    cancelAdd() {
      this.isAdding = false;
    }
    startEdit(prize) {
      this.editingId = prize.prize_id;
      this.editName = prize.prize;
      this.editProvider = prize.prize_provided_by || '';
      this.isAdding = false;
      this.error = null;
      this.success = null;
    }
    cancelEdit() {
      this.editingId = null;
    }
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
          prize_provided_by: this.newProvider.trim() || null
        });
        this.success = 'Prize added successfully';
        this.isAdding = false;
        this.router.refresh();
      } catch (e) {
        this.error = e.message || 'Failed to add prize';
      }
      this.isLoading = false;
    }
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
          prize_provided_by: this.editProvider.trim() || null
        });
        this.success = 'Prize updated successfully';
        this.editingId = null;
        this.router.refresh();
      } catch (e) {
        this.error = e.message || 'Failed to update prize';
      }
      this.isLoading = false;
    }
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
    updateField(field, event) {
      this[field] = event.target.value;
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "editingId", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "editName", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "editProvider", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "isAdding", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "newName", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "newProvider", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor0 = _applyDecoratedDescriptor(_class.prototype, "success", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor1 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "startAdd", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "startAdd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancelAdd", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "cancelAdd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "startEdit", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "startEdit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancelEdit", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "cancelEdit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addPrize", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addPrize"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "savePrize", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "savePrize"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deletePrize", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "deletePrize"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateField", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateField"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/registration", ["exports", "@ember/controller", "@ember/service", "@glimmer/tracking", "@ember/object"], function (_exports, _controller, _service, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@glimmer/tracking",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let RegistrationController = _exports.default = (_class = class RegistrationController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "activeTab", _descriptor2, this);
      _initializerDefineProperty(this, "statusMessage", _descriptor3, this);
      _initializerDefineProperty(this, "statusType", _descriptor4, this);
    }
    async refreshData() {
      const data = await this.auth.apiGet('/registrations');
      this.set('model', data);
    }
    showStatus(msg, type = 'success') {
      this.statusMessage = msg;
      this.statusType = type;
      setTimeout(() => this.statusMessage = '', 4000);
    }
    setTab(tab) {
      this.activeTab = tab;
    }

    /* ─── Create entities ─── */

    async createPlayer(event) {
      event.preventDefault();
      const f = event.target;
      try {
        await this.auth.apiPost('/registrations/create-player', {
          player_name: f.player_name.value,
          dob: f.dob.value,
          aadhaar: f.aadhaar.value,
          phone: f.phone.value,
          user_id: f.user_id.value
        });
        this.showStatus('Player created successfully');
        f.reset();
        await this.refreshData();
      } catch (e) {
        this.showStatus(e.message || 'Error creating player', 'danger');
      }
    }
    async createBull(event) {
      event.preventDefault();
      const f = event.target;
      try {
        await this.auth.apiPost('/registrations/create-bull', {
          bull_name: f.bull_name.value,
          age: f.age.value,
          owner_id: f.owner_id.value,
          breed_id: f.breed_id.value,
          fitness_cert: f.fitness_cert.value
        });
        this.showStatus('Bull created successfully');
        f.reset();
        await this.refreshData();
      } catch (e) {
        this.showStatus(e.message || 'Error creating bull', 'danger');
      }
    }
    async createOwner(event) {
      event.preventDefault();
      const f = event.target;
      try {
        await this.auth.apiPost('/registrations/create-owner', {
          name: f.name.value,
          aadhaar: f.aadhaar.value,
          user_id: f.user_id.value
        });
        this.showStatus('Owner created successfully');
        f.reset();
        await this.refreshData();
      } catch (e) {
        this.showStatus(e.message || 'Error creating owner', 'danger');
      }
    }
    async createOrganizer(event) {
      event.preventDefault();
      const f = event.target;
      try {
        await this.auth.apiPost('/registrations/create-organizer', {
          organizer_name: f.organizer_name.value
        });
        this.showStatus('Organizer created successfully');
        f.reset();
        await this.refreshData();
      } catch (e) {
        this.showStatus(e.message || 'Error creating organizer', 'danger');
      }
    }

    /* ─── Register for match ─── */

    async registerPlayer(event) {
      event.preventDefault();
      const form = event.target;
      try {
        await this.auth.apiPost('/registrations/player', {
          match_id: form.match_id.value,
          player_id: form.player_id.value,
          round_type_id: form.round_type_id.value,
          batch_id: form.batch_id.value
        });
        this.showStatus('Player registered successfully');
        form.reset();
        await this.refreshData();
      } catch (e) {
        this.showStatus(e.message || 'Error registering player', 'danger');
      }
    }
    async registerBull(event) {
      event.preventDefault();
      const form = event.target;
      try {
        await this.auth.apiPost('/registrations/bull', {
          match_id: form.match_id.value,
          bull_id: form.bull_id.value,
          round_type_id: form.round_type_id.value
        });
        this.showStatus('Bull registered successfully');
        form.reset();
        await this.refreshData();
      } catch (e) {
        this.showStatus(e.message || 'Error registering bull', 'danger');
      }
    }
    async scheduleMatch(event) {
      event.preventDefault();
      const form = event.target;
      try {
        await this.auth.apiPost('/registrations/match', {
          match_id: form.match_id.value,
          match_name: form.match_name.value,
          location_id: form.location_id.value,
          match_date: form.match_date.value,
          player_limit: form.player_limit.value,
          bull_limit: form.bull_limit.value,
          organizer_id: form.organizer_id.value
        });
        this.showStatus('Match scheduled successfully');
        form.reset();
        await this.refreshData();
      } catch (e) {
        this.showStatus(e.message || 'Error scheduling match', 'danger');
      }
    }
    async approvePlayer(matchId, playerId, roundTypeId) {
      try {
        await this.auth.apiPost('/registrations/approve-player', {
          match_id: matchId,
          player_id: playerId,
          round_type_id: roundTypeId
        });
        this.showStatus('Player approved');
        await this.refreshData();
      } catch (e) {
        this.showStatus(e.message || 'Error approving player', 'danger');
      }
    }
    async approveBull(matchId, bullId, roundTypeId) {
      try {
        await this.auth.apiPost('/registrations/approve-bull', {
          match_id: matchId,
          bull_id: bullId,
          round_type_id: roundTypeId
        });
        this.showStatus('Bull approved');
        await this.refreshData();
      } catch (e) {
        this.showStatus(e.message || 'Error approving bull', 'danger');
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "activeTab", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'player';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "statusMessage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "statusType", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'success';
    }
  }), _applyDecoratedDescriptor(_class.prototype, "setTab", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "setTab"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "createPlayer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "createPlayer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "createBull", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "createBull"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "createOwner", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "createOwner"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "createOrganizer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "createOrganizer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerPlayer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "registerPlayer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerBull", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "registerBull"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "scheduleMatch", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "scheduleMatch"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "approvePlayer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "approvePlayer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "approveBull", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "approveBull"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/scoreboard", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object", "@ember/service"], function (_exports, _controller, _tracking, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ScoreboardController = _exports.default = (_class = class ScoreboardController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "selectedMatchId", _descriptor2, this);
      _initializerDefineProperty(this, "scores", _descriptor3, this);
      _initializerDefineProperty(this, "isLoading", _descriptor4, this);
      _initializerDefineProperty(this, "autoRefresh", _descriptor5, this);
      _defineProperty(this, "_timer", null);
    }
    get liveMatches() {
      return (this.model?.matches || []).filter(m => m.status === 'live');
    }
    get allMatches() {
      return this.model?.matches || [];
    }
    get topPlayers() {
      return this.scores?.topPlayers?.slice(0, 10) || [];
    }
    get topBulls() {
      return this.scores?.topBulls?.slice(0, 10) || [];
    }
    async selectMatch(matchId) {
      this.selectedMatchId = matchId;
      await this.fetchScores();
      this._startAutoRefresh();
    }
    async fetchScores() {
      if (!this.selectedMatchId) return;
      this.isLoading = true;
      try {
        const base = this.auth.apiBase;
        const resp = await fetch(`${base}/public/matches/${this.selectedMatchId}/scores`);
        this.scores = await resp.json();
      } catch {
        this.scores = null;
      }
      this.isLoading = false;
    }
    toggleAutoRefresh() {
      this.autoRefresh = !this.autoRefresh;
      if (this.autoRefresh) {
        this._startAutoRefresh();
      } else {
        this._stopAutoRefresh();
      }
    }
    _startAutoRefresh() {
      this._stopAutoRefresh();
      if (this.autoRefresh && this.selectedMatchId) {
        this._timer = setInterval(() => this.fetchScores(), 8000);
      }
    }
    _stopAutoRefresh() {
      if (this._timer) {
        clearInterval(this._timer);
        this._timer = null;
      }
    }
    willDestroy() {
      super.willDestroy();
      this._stopAutoRefresh();
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "selectedMatchId", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "scores", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "autoRefresh", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "selectMatch", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "selectMatch"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "fetchScores", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "fetchScores"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleAutoRefresh", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleAutoRefresh"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/signup", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object", "@ember/service"], function (_exports, _controller, _tracking, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let SignupController = _exports.default = (_class = class SignupController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _initializerDefineProperty(this, "activeTab", _descriptor3, this);
      _initializerDefineProperty(this, "error", _descriptor4, this);
      _initializerDefineProperty(this, "success", _descriptor5, this);
      _initializerDefineProperty(this, "isLoading", _descriptor6, this);
      // Player fields
      _initializerDefineProperty(this, "pUsername", _descriptor7, this);
      _initializerDefineProperty(this, "pPassword", _descriptor8, this);
      _initializerDefineProperty(this, "pName", _descriptor9, this);
      _initializerDefineProperty(this, "pDOB", _descriptor0, this);
      _initializerDefineProperty(this, "pPhone", _descriptor1, this);
      _initializerDefineProperty(this, "pAadhaar", _descriptor10, this);
      // Owner fields
      _initializerDefineProperty(this, "oUsername", _descriptor11, this);
      _initializerDefineProperty(this, "oPassword", _descriptor12, this);
      _initializerDefineProperty(this, "oName", _descriptor13, this);
      _initializerDefineProperty(this, "oPhone", _descriptor14, this);
    }
    setTab(tab) {
      this.activeTab = tab;
      this.error = null;
      this.success = null;
    }
    updateField(field, event) {
      this[field] = event.target.value;
    }
    async registerPlayer(event) {
      event.preventDefault();
      this.error = null;
      this.success = null;
      this.isLoading = true;
      try {
        const base = this.auth.apiBase;
        const resp = await fetch(`${base}/public/register/player`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.pUsername,
            password: this.pPassword,
            player_name: this.pName,
            dob: this.pDOB,
            phone: this.pPhone,
            aadhaar: this.pAadhaar
          })
        });
        const data = await resp.json();
        if (resp.ok) {
          this.success = 'Registration successful! You can now login with your credentials.';
          this.pUsername = this.pPassword = this.pName = this.pDOB = this.pPhone = this.pAadhaar = '';
        } else {
          this.error = data.error || 'Registration failed';
        }
      } catch (e) {
        this.error = e.message;
      }
      this.isLoading = false;
    }
    async registerOwner(event) {
      event.preventDefault();
      this.error = null;
      this.success = null;
      this.isLoading = true;
      try {
        const base = this.auth.apiBase;
        const resp = await fetch(`${base}/public/register/owner`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.oUsername,
            password: this.oPassword,
            owner_name: this.oName,
            phone: this.oPhone
          })
        });
        const data = await resp.json();
        if (resp.ok) {
          this.success = 'Registration successful! You can now login with your credentials.';
          this.oUsername = this.oPassword = this.oName = this.oPhone = '';
        } else {
          this.error = data.error || 'Registration failed';
        }
      } catch (e) {
        this.error = e.message;
      }
      this.isLoading = false;
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "activeTab", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'player';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "success", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "pUsername", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "pPassword", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "pName", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor0 = _applyDecoratedDescriptor(_class.prototype, "pDOB", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor1 = _applyDecoratedDescriptor(_class.prototype, "pPhone", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "pAadhaar", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "oUsername", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "oPassword", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "oName", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "oPhone", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _applyDecoratedDescriptor(_class.prototype, "setTab", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "setTab"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateField", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateField"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerPlayer", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "registerPlayer"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerOwner", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "registerOwner"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/tables", ["exports", "@ember/controller", "@ember/service", "@glimmer/tracking", "@ember/object"], function (_exports, _controller, _service, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@glimmer/tracking",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let TablesController = _exports.default = (_class = class TablesController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _defineProperty(this, "queryParams", ['table']);
      _initializerDefineProperty(this, "table", _descriptor2, this);
      _initializerDefineProperty(this, "selectedTable", _descriptor3, this);
      _initializerDefineProperty(this, "tableData", _descriptor4, this);
      _initializerDefineProperty(this, "isLoading", _descriptor5, this);
      _initializerDefineProperty(this, "editRow", _descriptor6, this);
      _initializerDefineProperty(this, "showAddForm", _descriptor7, this);
      _initializerDefineProperty(this, "statusMessage", _descriptor8, this);
    }
    /**
     * Called when the route's model or query-params change.
     * If ?table=xxx is in the URL, auto-load that table.
     */
    async handleQueryParam() {
      if (this.table && this.table !== this.selectedTable) {
        await this.loadTable(this.table);
      }
    }
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
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
      this.editRow = null;
    }
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
      setTimeout(() => this.statusMessage = '', 3000);
    }
    async deleteRow(row) {
      if (!confirm('Are you sure you want to delete this row?')) return;
      const params = this.tableData.primaryKeys.map(pk => `${pk}=${encodeURIComponent(row[pk])}`).join('&');
      try {
        await this.auth.apiDelete(`/tables/${this.selectedTable}?${params}`);
        this.statusMessage = 'Row deleted';
        await this.loadTable(this.selectedTable);
      } catch (e) {
        this.statusMessage = 'Error deleting row';
      }
      setTimeout(() => this.statusMessage = '', 3000);
    }
    startEdit(row) {
      this.editRow = {
        ...row
      };
      this.showAddForm = false;
    }
    updateEditField(field, event) {
      this.editRow = {
        ...this.editRow,
        [field]: event.target.value
      };
    }
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
        await this.auth.apiPut(`/tables/${this.selectedTable}`, {
          pkValues,
          values
        });
        this.statusMessage = 'Row updated';
        this.editRow = null;
        await this.loadTable(this.selectedTable);
      } catch (e) {
        this.statusMessage = 'Error updating row';
      }
      setTimeout(() => this.statusMessage = '', 3000);
    }
    cancelEdit() {
      this.editRow = null;
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "table", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "selectedTable", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "tableData", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "editRow", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "showAddForm", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "statusMessage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _applyDecoratedDescriptor(_class.prototype, "loadTable", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadTable"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleAddForm", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleAddForm"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addRow", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addRow"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deleteRow", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "deleteRow"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "startEdit", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "startEdit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateEditField", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateEditField"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "saveEdit", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "saveEdit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cancelEdit", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "cancelEdit"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/users", ["exports", "@ember/controller", "@ember/service", "@glimmer/tracking", "@ember/object"], function (_exports, _controller, _service, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@glimmer/tracking",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let UsersController = _exports.default = (_class = class UsersController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "showAddForm", _descriptor2, this);
      _initializerDefineProperty(this, "statusMessage", _descriptor3, this);
      _initializerDefineProperty(this, "statusType", _descriptor4, this);
      _initializerDefineProperty(this, "roleFilter", _descriptor5, this);
    }
    get filteredUsers() {
      if (!this.roleFilter) return this.model || [];
      return (this.model || []).filter(u => u.role === this.roleFilter);
    }
    filterByRole(role) {
      this.roleFilter = role;
    }
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    }
    async createUser(event) {
      event.preventDefault();
      const form = event.target;
      try {
        const result = await this.auth.apiPost('/auth/users', {
          username: form.username.value,
          password: form.password.value,
          full_name: form.full_name.value,
          role: form.role.value
        });
        if (result.error) {
          this.statusMessage = result.error;
          this.statusType = 'danger';
        } else {
          this.statusMessage = 'User created successfully';
          this.statusType = 'success';
          this.showAddForm = false;
          form.reset();
          const users = await this.auth.apiGet('/auth/users');
          this.set('model', users);
        }
      } catch (e) {
        this.statusMessage = 'Error creating user';
        this.statusType = 'danger';
      }
      setTimeout(() => this.statusMessage = '', 4000);
    }
    async deleteUser(userId) {
      if (!confirm('Delete this user?')) return;
      try {
        const result = await this.auth.apiDelete(`/auth/users/${userId}`);
        if (result.error) {
          this.statusMessage = result.error;
          this.statusType = 'danger';
        } else {
          this.statusMessage = 'User deleted';
          this.statusType = 'success';
          const users = await this.auth.apiGet('/auth/users');
          this.set('model', users);
        }
      } catch (e) {
        this.statusMessage = 'Error deleting user';
        this.statusType = 'danger';
      }
      setTimeout(() => this.statusMessage = '', 4000);
    }
    async changeRole(userId, event) {
      const newRole = event.target.value;
      if (!newRole) return;
      try {
        const result = await this.auth.apiPut(`/auth/users/${userId}`, {
          role: newRole
        });
        if (result.error) {
          this.statusMessage = result.error;
          this.statusType = 'danger';
        } else {
          this.statusMessage = `Role updated to ${newRole}`;
          this.statusType = 'success';
          const users = await this.auth.apiGet('/auth/users');
          this.set('model', users);
        }
      } catch (e) {
        this.statusMessage = 'Error updating role';
        this.statusType = 'danger';
      }
      // reset dropdown to placeholder
      event.target.selectedIndex = 0;
      setTimeout(() => this.statusMessage = '', 4000);
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "showAddForm", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "statusMessage", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "statusType", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'success';
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "roleFilter", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return '';
    }
  }), _applyDecoratedDescriptor(_class.prototype, "filterByRole", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "filterByRole"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleAddForm", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleAddForm"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "createUser", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "createUser"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deleteUser", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "deleteUser"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "changeRole", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "changeRole"), _class.prototype), _class);
});
;define("jallikattu-frontend/controllers/winners", ["exports", "@ember/controller", "@ember/service", "@glimmer/tracking", "@ember/object"], function (_exports, _controller, _service, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@glimmer/tracking",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let WinnersController = _exports.default = (_class = class WinnersController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "selectedMatchId", _descriptor2, this);
      _initializerDefineProperty(this, "winnerData", _descriptor3, this);
      _initializerDefineProperty(this, "isLoading", _descriptor4, this);
    }
    get completedMatches() {
      return this.model?.completedMatches || [];
    }
    async loadWinners(event) {
      this.selectedMatchId = event.target.value;
      if (!this.selectedMatchId) {
        this.winnerData = null;
        return;
      }
      this.isLoading = true;
      try {
        this.winnerData = await this.auth.apiGet(`/winners/${this.selectedMatchId}`);
      } catch (e) {
        this.winnerData = null;
      } finally {
        this.isLoading = false;
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "selectedMatchId", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "winnerData", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "isLoading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "loadWinners", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadWinners"), _class.prototype), _class);
});
;define("jallikattu-frontend/data-adapter", ["exports", "@ember-data/debug/data-adapter"], function (_exports, _dataAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dataAdapter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug/data-adapter"eaimeta@70e063a35619d71f
});
;define("jallikattu-frontend/helpers/add", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  class AddHelper extends _helper.default {
    compute([a, b]) {
      return (Number(a) || 0) + (Number(b) || 0);
    }
  }
  _exports.default = AddHelper;
});
;define("jallikattu-frontend/helpers/app-version", ["exports", "@ember/component/helper", "jallikattu-frontend/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _helper, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"jallikattu-frontend/config/environment",0,"ember-cli-app-version/utils/regexp"eaimeta@70e063a35619d71f
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;
    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }
    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }
    return match ? match[0] : version;
  }
  var _default = _exports.default = (0, _helper.helper)(appVersion);
});
;define("jallikattu-frontend/helpers/div", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _helper.helper)(function div([a, b]) {
    if (!b || Number(b) === 0) return 0;
    return Number(a) / Number(b);
  });
});
;define("jallikattu-frontend/helpers/eq", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  class EqHelper extends _helper.default {
    compute([a, b]) {
      return a === b;
    }
  }
  _exports.default = EqHelper;
});
;define("jallikattu-frontend/helpers/gt", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _helper.helper)(function gt([a, b]) {
    return Number(a) > Number(b);
  });
});
;define("jallikattu-frontend/helpers/includes", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _helper.helper)(function includes([array, value]) {
    if (!Array.isArray(array)) return false;
    return array.includes(value);
  });
});
;define("jallikattu-frontend/helpers/mult", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _helper.helper)(function mult([a, b]) {
    return (Number(a) || 0) * (Number(b) || 0);
  });
});
;define("jallikattu-frontend/helpers/not-eq", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  class NotEqHelper extends _helper.default {
    compute([a, b]) {
      return a !== b;
    }
  }
  _exports.default = NotEqHelper;
});
;define("jallikattu-frontend/helpers/not", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _helper.helper)(function not([value]) {
    return !value;
  });
});
;define("jallikattu-frontend/helpers/or", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  class OrHelper extends _helper.default {
    compute(params) {
      return params.some(Boolean);
    }
  }
  _exports.default = OrHelper;
});
;define("jallikattu-frontend/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/helpers/page-title"eaimeta@70e063a35619d71f
});
;define("jallikattu-frontend/helpers/to-string", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  class ToStringHelper extends _helper.default {
    compute([value]) {
      return String(value ?? '');
    }
  }
  _exports.default = ToStringHelper;
});
;define("jallikattu-frontend/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "jallikattu-frontend/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-app-version/initializer-factory",0,"jallikattu-frontend/config/environment"eaimeta@70e063a35619d71f
  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }
  var _default = _exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define("jallikattu-frontend/initializers/ember-data", ["exports", "@ember-data/request-utils/deprecation-support"], function (_exports, _deprecationSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember-data/request-utils/deprecation-support"eaimeta@70e063a35619d71f
  /*
    This code initializes EmberData in an Ember application.
  */
  var _default = _exports.default = {
    name: 'ember-data',
    initialize(application) {
      application.registerOptionsForType('serializer', {
        singleton: false
      });
      application.registerOptionsForType('adapter', {
        singleton: false
      });
    }
  };
});
;define("jallikattu-frontend/router", ["exports", "@ember/routing/router", "jallikattu-frontend/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/router",0,"jallikattu-frontend/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class Router extends _router.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "location", _environment.default.locationType);
      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }
  }
  _exports.default = Router;
  Router.map(function () {
    // Public pages (no auth required)
    this.route('login');
    this.route('signup');
    this.route('scoreboard');
    this.route('matches');
    this.route('match-detail', {
      path: '/matches/:match_id'
    });
    this.route('leaderboard');
    this.route('player-profile', {
      path: '/players/:player_id'
    });
    this.route('bull-profile', {
      path: '/bulls/:bull_id'
    });

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
    this.route('event-detail', {
      path: '/events/:match_id'
    });

    // Player self-service
    this.route('my-profile');
    this.route('my-history');
    this.route('my-matches');

    // Owner self-service
    this.route('my-bulls');
  });
});
;define("jallikattu-frontend/routes/application", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ApplicationRoute = _exports.default = (_class = class ApplicationRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
    async beforeModel() {
      await this.auth.checkSession();
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/bull-profile", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let BullProfileRoute = _exports.default = (_class = class BullProfileRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
    async model(params) {
      const base = this.auth.apiBase;
      try {
        return await fetch(`${base}/public/bulls/${params.bull_id}`).then(r => r.json());
      } catch {
        return {
          error: 'Bull not found'
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/dashboard", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let DashboardRoute = _exports.default = (_class = class DashboardRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated) {
        this.router.transitionTo('login');
      }
    }
    async model() {
      try {
        return await this.auth.apiGet('/dashboard');
      } catch {
        return {
          stats: {},
          totalRecords: 0,
          totalTables: 0
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/event-detail", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let EventDetailRoute = _exports.default = (_class = class EventDetailRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated || !this.auth.isRegistrar) {
        this.router.transitionTo('dashboard');
      }
    }
    async model(params) {
      try {
        return await this.auth.apiGet(`/events/${params.match_id}`);
      } catch {
        return {
          error: 'Event not found'
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/events", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let EventsRoute = _exports.default = (_class = class EventsRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated || !this.auth.isRegistrar) {
        this.router.transitionTo('dashboard');
      }
    }
    async model() {
      try {
        return await this.auth.apiGet('/events');
      } catch {
        return [];
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/index", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let IndexRoute = _exports.default = (_class = class IndexRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
    async model() {
      try {
        const stats = await fetch(`${this.auth.apiBase}/public/stats`).then(r => r.json());
        const matches = await fetch(`${this.auth.apiBase}/public/matches`).then(r => r.json());
        const leaderboard = await fetch(`${this.auth.apiBase}/public/leaderboard?limit=5`).then(r => r.json());
        return {
          stats,
          matches,
          leaderboard
        };
      } catch {
        return {
          stats: {},
          matches: [],
          leaderboard: {}
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/leaderboard", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let LeaderboardRoute = _exports.default = (_class = class LeaderboardRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
    async model() {
      const base = this.auth.apiBase;
      try {
        return await fetch(`${base}/public/leaderboard?limit=20`).then(r => r.json());
      } catch {
        return {
          players: [],
          bulls: []
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/login", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let LoginRoute = _exports.default = (_class = class LoginRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (this.auth.isAuthenticated) {
        this.router.transitionTo('dashboard');
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/match-control", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MatchControlRoute = _exports.default = (_class = class MatchControlRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated) {
        this.router.transitionTo('login');
        return;
      }
      if (!this.auth.isScorer) {
        this.router.transitionTo('dashboard');
      }
    }
    async model() {
      try {
        const matches = await this.auth.apiGet('/matches');
        return {
          matches
        };
      } catch {
        return {
          matches: []
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/match-detail", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MatchDetailRoute = _exports.default = (_class = class MatchDetailRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
    async model(params) {
      const base = this.auth.apiBase;
      try {
        const [scores, winners] = await Promise.all([fetch(`${base}/public/matches/${params.match_id}/scores`).then(r => r.json()), fetch(`${base}/public/matches/${params.match_id}/winners`).then(r => r.json())]);
        return {
          match_id: params.match_id,
          scores,
          winners
        };
      } catch {
        return {
          match_id: params.match_id,
          scores: {},
          winners: {}
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/matches", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MatchesRoute = _exports.default = (_class = class MatchesRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
    async model() {
      const base = this.auth.apiBase;
      try {
        const matches = await fetch(`${base}/public/matches`).then(r => r.json());
        return {
          matches
        };
      } catch {
        return {
          matches: []
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/my-bulls", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MyBullsRoute = _exports.default = (_class = class MyBullsRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated) {
        this.router.transitionTo('login');
      }
    }
    async model() {
      try {
        const [bulls, breeds, matches] = await Promise.all([this.auth.apiGet('/owner/bulls'), this.auth.apiGet('/owner/breeds'), this.auth.apiGet('/owner/matches')]);
        return {
          bulls,
          breeds,
          matches
        };
      } catch (e) {
        return {
          bulls: [],
          breeds: [],
          matches: [],
          error: e.message
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/my-history", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MyHistoryRoute = _exports.default = (_class = class MyHistoryRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated) {
        this.router.transitionTo('login');
      }
    }
    async model() {
      try {
        return await this.auth.apiGet('/player/history');
      } catch (e) {
        return {
          error: e.message,
          matches: []
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/my-matches", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MyMatchesRoute = _exports.default = (_class = class MyMatchesRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated) {
        this.router.transitionTo('login');
      }
    }
    async model() {
      try {
        return await this.auth.apiGet('/player/matches');
      } catch (e) {
        return [];
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/my-profile", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let MyProfileRoute = _exports.default = (_class = class MyProfileRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated) {
        this.router.transitionTo('login');
      }
    }
    async model() {
      const role = this.auth.role;
      try {
        if (role === 'player') {
          return await this.auth.apiGet('/player/profile');
        } else if (role === 'owner') {
          return await this.auth.apiGet('/owner/profile');
        }
        return {
          user: this.auth.user
        };
      } catch (e) {
        return {
          user: this.auth.user,
          error: e.message
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/player-profile", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let PlayerProfileRoute = _exports.default = (_class = class PlayerProfileRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
    async model(params) {
      const base = this.auth.apiBase;
      try {
        return await fetch(`${base}/public/players/${params.player_id}`).then(r => r.json());
      } catch {
        return {
          error: 'Player not found'
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/prizes", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let PrizesRoute = _exports.default = (_class = class PrizesRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
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
        const data = await this.auth.apiGet('/tables/prize');
        return data.rows || [];
      } catch {
        return [];
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/registration", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let RegistrationRoute = _exports.default = (_class = class RegistrationRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated) {
        this.router.transitionTo('login');
        return;
      }
      if (!this.auth.isRegistrar && !this.auth.isAdmin) {
        this.router.transitionTo('dashboard');
      }
    }
    async model() {
      try {
        return await this.auth.apiGet('/registrations');
      } catch {
        return {
          matches: [],
          players: [],
          bulls: [],
          roundTypes: []
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/scoreboard", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let ScoreboardRoute = _exports.default = (_class = class ScoreboardRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
    }
    async model() {
      const base = this.auth.apiBase;
      try {
        const matches = await fetch(`${base}/public/matches`).then(r => r.json());
        return {
          matches
        };
      } catch {
        return {
          matches: []
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/signup", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f
  class SignupRoute extends _route.default {}
  _exports.default = SignupRoute;
});
;define("jallikattu-frontend/routes/tables", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let TablesRoute = _exports.default = (_class = class TablesRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _defineProperty(this, "queryParams", {
        table: {
          refreshModel: false
        }
      });
    }
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
        return await this.auth.apiGet('/tables');
      } catch {
        return [];
      }
    }
    async setupController(controller, model) {
      super.setupController(controller, model);
      if (controller.table) {
        try {
          await controller.loadTable(controller.table);
        } catch {/* ignore */}
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/users", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let UsersRoute = _exports.default = (_class = class UsersRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated) {
        this.router.transitionTo('login');
        return;
      }
      if (!this.auth.isSuperAdmin) {
        this.router.transitionTo('dashboard');
      }
    }
    async model() {
      try {
        return await this.auth.apiGet('/auth/users');
      } catch {
        return [];
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/routes/winners", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let WinnersRoute = _exports.default = (_class = class WinnersRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "auth", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
    }
    beforeModel() {
      if (!this.auth.isAuthenticated) {
        this.router.transitionTo('login');
      }
    }
    async model() {
      try {
        return await this.auth.apiGet('/winners');
      } catch {
        return {
          completedMatches: [],
          allMatches: []
        };
      }
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "auth", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.service], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _class);
});
;define("jallikattu-frontend/services/auth", ["exports", "@ember/service", "@glimmer/tracking", "jallikattu-frontend/config/environment"], function (_exports, _service, _tracking, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking",0,"jallikattu-frontend/config/environment"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
  function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
  let AuthService = _exports.default = (_class = class AuthService extends _service.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "user", _descriptor, this);
      _initializerDefineProperty(this, "isAuthenticated", _descriptor2, this);
    }
    get apiBase() {
      return `/${_environment.default.APP.API_NAMESPACE}`;
    }
    get role() {
      return this.user?.role || null;
    }
    get isAdmin() {
      return ['admin', 'super_admin'].includes(this.role);
    }
    get isSuperAdmin() {
      return this.role === 'super_admin';
    }
    get isScorer() {
      return this.role === 'scorer' || this.isAdmin;
    }
    get isRegistrar() {
      return this.role === 'registrar' || this.isAdmin;
    }
    get isPlayer() {
      return this.role === 'player' || this.isAdmin;
    }
    get isOwner() {
      return this.role === 'owner' || this.isAdmin;
    }
    get initials() {
      if (!this.user?.full_name) return '?';
      return this.user.full_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    }
    async checkSession() {
      try {
        const resp = await fetch(`${this.apiBase}/auth/session`, {
          credentials: 'include'
        });
        if (!resp.ok) {
          this.user = null;
          this.isAuthenticated = false;
          return;
        }
        const data = await resp.json();
        if (data.user_id) {
          this.user = data;
          this.isAuthenticated = true;
        } else {
          this.user = null;
          this.isAuthenticated = false;
        }
      } catch {
        this.user = null;
        this.isAuthenticated = false;
      }
    }
    async login(username, password) {
      const resp = await fetch(`${this.apiBase}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const data = await resp.json();
      if (resp.ok) {
        this.user = data;
        this.isAuthenticated = true;
        return {
          success: true
        };
      } else {
        return {
          success: false,
          error: data.error || 'Login failed'
        };
      }
    }
    async logout() {
      await fetch(`${this.apiBase}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      this.user = null;
      this.isAuthenticated = false;
    }
    async apiFetch(path, options = {}) {
      const url = `${this.apiBase}${path}`;
      const resp = await fetch(url, {
        credentials: 'include',
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });
      if (resp.status === 401) {
        this.user = null;
        this.isAuthenticated = false;
        throw new Error('Not authenticated');
      }
      if (!resp.ok) {
        let msg = `Request failed (${resp.status})`;
        try {
          const errData = await resp.json();
          if (errData.error) msg = errData.error;
        } catch {
          /* ignore parse errors */
        }
        throw new Error(msg);
      }
      return resp;
    }
    async apiGet(path) {
      const resp = await this.apiFetch(path);
      return resp.json();
    }
    async apiPost(path, body) {
      const resp = await this.apiFetch(path, {
        method: 'POST',
        body: JSON.stringify(body)
      });
      return resp.json();
    }
    async apiPut(path, body) {
      const resp = await this.apiFetch(path, {
        method: 'PUT',
        body: JSON.stringify(body)
      });
      return resp.json();
    }
    async apiDelete(path) {
      const resp = await this.apiFetch(path, {
        method: 'DELETE'
      });
      return resp.json();
    }
  }, _descriptor = _applyDecoratedDescriptor(_class.prototype, "user", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "isAuthenticated", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _class);
});
;define("jallikattu-frontend/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/services/page-title"eaimeta@70e063a35619d71f
});
;define("jallikattu-frontend/services/store", ["exports", "@ember/debug", "ember-data/store"], function (_exports, _debug, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"ember-data/store"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the store service. Use `export { default } from 'ember-data/store';` in app/services/store.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("jallikattu-frontend/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Jallikattu Statistics"}}
  
  {{!-- Toast notifications --}}
  <div class="toast-container" id="toast-container"></div>
  
  {{#if this.auth.isAuthenticated}}
    {{!-- ===== AUTHENTICATED LAYOUT ===== --}}
    <div class="app-wrapper">
      {{!-- Sidebar overlay (mobile) --}}
      <div class="sidebar-overlay {{if this.sidebarOpen 'show'}}" {{on "click" this.toggleSidebar}} role="button"></div>
  
      {{!-- Sidebar --}}
      <aside class="sidebar {{if this.sidebarOpen 'show'}}">
        <div class="sidebar-brand">
          <div class="sidebar-brand-icon"><i class="bi bi-trophy-fill"></i></div>
          <div>
            <h5>Jallikattu</h5>
            <small>Statistics Overlay</small>
          </div>
        </div>
  
        <ul class="sidebar-nav">
          {{!-- Main --}}
          <li class="sidebar-section">Main</li>
          <li class="nav-item">
            <LinkTo @route="dashboard"><i class="bi bi-grid-1x2-fill"></i> Dashboard</LinkTo>
          </li>
  
          {{!-- Public --}}
          <li class="sidebar-section">Public</li>
          <li class="nav-item">
            <LinkTo @route="index"><i class="bi bi-house-fill"></i> Home</LinkTo>
          </li>
          <li class="nav-item">
            <LinkTo @route="scoreboard"><i class="bi bi-broadcast"></i> Live Scoreboard</LinkTo>
          </li>
          <li class="nav-item">
            <LinkTo @route="matches"><i class="bi bi-calendar-event"></i> Matches</LinkTo>
          </li>
          <li class="nav-item">
            <LinkTo @route="leaderboard"><i class="bi bi-bar-chart-fill"></i> Leaderboard</LinkTo>
          </li>
  
          {{!-- Scorer --}}
          {{#if this.auth.isScorer}}
            <li class="sidebar-section">Scoring</li>
            <li class="nav-item">
              <LinkTo @route="match-control"><i class="bi bi-sliders2"></i> Match Control</LinkTo>
            </li>
            <li class="nav-item">
              <LinkTo @route="winners"><i class="bi bi-award-fill"></i> Winners</LinkTo>
            </li>
          {{/if}}
  
          {{!-- Registrar / Events --}}
          {{#if this.auth.isRegistrar}}
            <li class="sidebar-section">Events</li>
            <li class="nav-item">
              <LinkTo @route="events"><i class="bi bi-calendar-check"></i> Event Manager</LinkTo>
            </li>
            <li class="nav-item">
              <LinkTo @route="registration"><i class="bi bi-person-plus-fill"></i> Registration</LinkTo>
            </li>
          {{/if}}
  
          {{!-- Player --}}
          {{#if this.auth.isPlayer}}
            <li class="sidebar-section">My Account</li>
            <li class="nav-item">
              <LinkTo @route="my-profile"><i class="bi bi-person-circle"></i> My Profile</LinkTo>
            </li>
            <li class="nav-item">
              <LinkTo @route="my-history"><i class="bi bi-clock-history"></i> Match History</LinkTo>
            </li>
            <li class="nav-item">
              <LinkTo @route="my-matches"><i class="bi bi-flag-fill"></i> Register for Match</LinkTo>
            </li>
          {{/if}}
  
          {{!-- Owner --}}
          {{#if this.auth.isOwner}}
            <li class="sidebar-section">Bull Management</li>
            <li class="nav-item">
              <LinkTo @route="my-bulls"><i class="bi bi-shield-fill"></i> My Bulls</LinkTo>
            </li>
          {{/if}}
  
          {{!-- Admin --}}
          {{#if this.auth.isAdmin}}
            <li class="sidebar-section">Administration</li>
            <li class="nav-item">
              <LinkTo @route="prizes"><i class="bi bi-trophy-fill"></i> Prize Management</LinkTo>
            </li>
            <li class="nav-item">
              <LinkTo @route="tables"><i class="bi bi-database-fill"></i> Data Tables</LinkTo>
            </li>
            {{#if this.auth.isSuperAdmin}}
              <li class="nav-item">
                <LinkTo @route="users"><i class="bi bi-shield-fill-check"></i> User Management</LinkTo>
              </li>
            {{/if}}
          {{/if}}
        </ul>
      </aside>
  
      {{!-- Main content area --}}
      <div class="main-content">
        <header class="topbar">
          <div class="topbar-left">
            <button class="sidebar-toggle" type="button" {{on "click" this.toggleSidebar}}>
              <i class="bi bi-list"></i>
            </button>
            <span class="topbar-title">{{this.pageTitle}}</span>
          </div>
          <div class="topbar-right">
            <span class="role-tag {{this.auth.role}}">{{this.auth.role}}</span>
            <div class="user-badge">
              <div class="user-avatar">{{this.auth.initials}}</div>
              <span class="d-none d-md-inline">{{this.auth.user.full_name}}</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary" type="button" title="Logout" {{on "click" this.logout}}>
              <i class="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </header>
  
        <main class="page-content">
          {{outlet}}
        </main>
      </div>
    </div>
  
  {{else if this.isPublicRoute}}
    {{!-- ===== PUBLIC LAYOUT (no sidebar) ===== --}}
    <nav class="navbar navbar-expand-lg public-navbar sticky-top">
      <div class="container">
        <LinkTo @route="index" class="navbar-brand">
          <i class="bi bi-trophy-fill"></i> Jallikattu
        </LinkTo>
        <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#publicNav">
          <i class="bi bi-list"></i>
        </button>
        <div class="collapse navbar-collapse" id="publicNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><LinkTo @route="index" class="nav-link">Home</LinkTo></li>
            <li class="nav-item"><LinkTo @route="scoreboard" class="nav-link">Live Scores</LinkTo></li>
            <li class="nav-item"><LinkTo @route="matches" class="nav-link">Matches</LinkTo></li>
            <li class="nav-item"><LinkTo @route="leaderboard" class="nav-link">Leaderboard</LinkTo></li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item"><LinkTo @route="signup" class="nav-link">Register</LinkTo></li>
            <li class="nav-item"><LinkTo @route="login" class="nav-link"><i class="bi bi-box-arrow-in-right"></i> Login</LinkTo></li>
          </ul>
        </div>
      </div>
    </nav>
    <main>
      {{outlet}}
    </main>
  
  {{else}}
    {{!-- ===== LOGIN PAGE (bare layout) ===== --}}
    {{outlet}}
  {{/if}}
  
  */
  {
    "id": "/DDvj9SG",
    "block": "[[[1,[28,[35,0],[\"Jallikattu Statistics\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"toast-container\"],[14,1,\"toast-container\"],[12],[13],[1,\"\\n\\n\"],[41,[30,0,[\"auth\",\"isAuthenticated\"]],[[[1,\"  \"],[10,0],[14,0,\"app-wrapper\"],[12],[1,\"\\n\"],[1,\"    \"],[11,0],[16,0,[29,[\"sidebar-overlay \",[52,[30,0,[\"sidebarOpen\"]],\"show\"]]]],[24,\"role\",\"button\"],[4,[38,2],[\"click\",[30,0,[\"toggleSidebar\"]]],null],[12],[13],[1,\"\\n\\n\"],[1,\"    \"],[10,\"aside\"],[15,0,[29,[\"sidebar \",[52,[30,0,[\"sidebarOpen\"]],\"show\"]]]],[12],[1,\"\\n      \"],[10,0],[14,0,\"sidebar-brand\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"sidebar-brand-icon\"],[12],[10,\"i\"],[14,0,\"bi bi-trophy-fill\"],[12],[13],[13],[1,\"\\n        \"],[10,0],[12],[1,\"\\n          \"],[10,\"h5\"],[12],[1,\"Jallikattu\"],[13],[1,\"\\n          \"],[10,\"small\"],[12],[1,\"Statistics Overlay\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"ul\"],[14,0,\"sidebar-nav\"],[12],[1,\"\\n\"],[1,\"        \"],[10,\"li\"],[14,0,\"sidebar-section\"],[12],[1,\"Main\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n          \"],[8,[39,3],null,[[\"@route\"],[\"dashboard\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-grid-1x2-fill\"],[12],[13],[1,\" Dashboard\"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[1,\"        \"],[10,\"li\"],[14,0,\"sidebar-section\"],[12],[1,\"Public\"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n          \"],[8,[39,3],null,[[\"@route\"],[\"index\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-house-fill\"],[12],[13],[1,\" Home\"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n          \"],[8,[39,3],null,[[\"@route\"],[\"scoreboard\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-broadcast\"],[12],[13],[1,\" Live Scoreboard\"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n          \"],[8,[39,3],null,[[\"@route\"],[\"matches\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-calendar-event\"],[12],[13],[1,\" Matches\"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n          \"],[8,[39,3],null,[[\"@route\"],[\"leaderboard\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-bar-chart-fill\"],[12],[13],[1,\" Leaderboard\"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"auth\",\"isScorer\"]],[[[1,\"          \"],[10,\"li\"],[14,0,\"sidebar-section\"],[12],[1,\"Scoring\"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"match-control\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-sliders2\"],[12],[13],[1,\" Match Control\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"winners\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-award-fill\"],[12],[13],[1,\" Winners\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"auth\",\"isRegistrar\"]],[[[1,\"          \"],[10,\"li\"],[14,0,\"sidebar-section\"],[12],[1,\"Events\"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"events\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-calendar-check\"],[12],[13],[1,\" Event Manager\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"registration\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-person-plus-fill\"],[12],[13],[1,\" Registration\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"auth\",\"isPlayer\"]],[[[1,\"          \"],[10,\"li\"],[14,0,\"sidebar-section\"],[12],[1,\"My Account\"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"my-profile\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-person-circle\"],[12],[13],[1,\" My Profile\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"my-history\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-clock-history\"],[12],[13],[1,\" Match History\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"my-matches\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-flag-fill\"],[12],[13],[1,\" Register for Match\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"auth\",\"isOwner\"]],[[[1,\"          \"],[10,\"li\"],[14,0,\"sidebar-section\"],[12],[1,\"Bull Management\"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"my-bulls\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\" My Bulls\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"auth\",\"isAdmin\"]],[[[1,\"          \"],[10,\"li\"],[14,0,\"sidebar-section\"],[12],[1,\"Administration\"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"prizes\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-trophy-fill\"],[12],[13],[1,\" Prize Management\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@route\"],[\"tables\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-database-fill\"],[12],[13],[1,\" Data Tables\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n\"],[41,[30,0,[\"auth\",\"isSuperAdmin\"]],[[[1,\"            \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n              \"],[8,[39,3],null,[[\"@route\"],[\"users\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-shield-fill-check\"],[12],[13],[1,\" User Management\"]],[]]]]],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[1,\"    \"],[10,0],[14,0,\"main-content\"],[12],[1,\"\\n      \"],[10,\"header\"],[14,0,\"topbar\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"topbar-left\"],[12],[1,\"\\n          \"],[11,\"button\"],[24,0,\"sidebar-toggle\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"toggleSidebar\"]]],null],[12],[1,\"\\n            \"],[10,\"i\"],[14,0,\"bi bi-list\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,1],[14,0,\"topbar-title\"],[12],[1,[30,0,[\"pageTitle\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"topbar-right\"],[12],[1,\"\\n          \"],[10,1],[15,0,[29,[\"role-tag \",[30,0,[\"auth\",\"role\"]]]]],[12],[1,[30,0,[\"auth\",\"role\"]]],[13],[1,\"\\n          \"],[10,0],[14,0,\"user-badge\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"user-avatar\"],[12],[1,[30,0,[\"auth\",\"initials\"]]],[13],[1,\"\\n            \"],[10,1],[14,0,\"d-none d-md-inline\"],[12],[1,[30,0,[\"auth\",\"user\",\"full_name\"]]],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[11,\"button\"],[24,0,\"btn btn-sm btn-outline-secondary\"],[24,\"title\",\"Logout\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"logout\"]]],null],[12],[1,\"\\n            \"],[10,\"i\"],[14,0,\"bi bi-box-arrow-right\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"main\"],[14,0,\"page-content\"],[12],[1,\"\\n        \"],[46,[28,[37,5],null,null],null,null,null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"]],[]],[[[41,[30,0,[\"isPublicRoute\"]],[[[1,\"  \"],[10,\"nav\"],[14,0,\"navbar navbar-expand-lg public-navbar sticky-top\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n      \"],[8,[39,3],[[24,0,\"navbar-brand\"]],[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"i\"],[14,0,\"bi bi-trophy-fill\"],[12],[13],[1,\" Jallikattu\\n      \"]],[]]]]],[1,\"\\n      \"],[10,\"button\"],[14,0,\"navbar-toggler text-white\"],[14,\"data-bs-toggle\",\"collapse\"],[14,\"data-bs-target\",\"#publicNav\"],[14,4,\"button\"],[12],[1,\"\\n        \"],[10,\"i\"],[14,0,\"bi bi-list\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"collapse navbar-collapse\"],[14,1,\"publicNav\"],[12],[1,\"\\n        \"],[10,\"ul\"],[14,0,\"navbar-nav me-auto\"],[12],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[8,[39,3],[[24,0,\"nav-link\"]],[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"Home\"]],[]]]]],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[8,[39,3],[[24,0,\"nav-link\"]],[[\"@route\"],[\"scoreboard\"]],[[\"default\"],[[[[1,\"Live Scores\"]],[]]]]],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[8,[39,3],[[24,0,\"nav-link\"]],[[\"@route\"],[\"matches\"]],[[\"default\"],[[[[1,\"Matches\"]],[]]]]],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[8,[39,3],[[24,0,\"nav-link\"]],[[\"@route\"],[\"leaderboard\"]],[[\"default\"],[[[[1,\"Leaderboard\"]],[]]]]],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"ul\"],[14,0,\"navbar-nav\"],[12],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[8,[39,3],[[24,0,\"nav-link\"]],[[\"@route\"],[\"signup\"]],[[\"default\"],[[[[1,\"Register\"]],[]]]]],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[8,[39,3],[[24,0,\"nav-link\"]],[[\"@route\"],[\"login\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-box-arrow-in-right\"],[12],[13],[1,\" Login\"]],[]]]]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"main\"],[12],[1,\"\\n    \"],[46,[28,[37,5],null,null],null,null,null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"]],[]],[[[1,\"  \"],[46,[28,[37,5],null,null],null,null,null],[1,\"\\n\"]],[]]]],[]]]],[],false,[\"page-title\",\"if\",\"on\",\"link-to\",\"component\",\"-outlet\"]]",
    "moduleName": "jallikattu-frontend/templates/application.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/bull-profile", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title (concat "Bull - " (or this.model.profile.bull_name "Unknown"))}}
  <div class="container py-4">
    <div class="mb-3">
      <LinkTo @route="leaderboard" class="text-decoration-none text-muted">
        <i class="bi bi-arrow-left"></i> Back to Leaderboard
      </LinkTo>
    </div>
  
    {{#if this.model.error}}
      <div class="alert alert-danger">{{this.model.error}}</div>
    {{else}}
      <div class="row g-4">
        {{!-- Profile Card --}}
        <div class="col-lg-4">
          <div class="card profile-card">
            <div class="profile-avatar" style="background: linear-gradient(135deg, #198754, #20c997);">
              <i class="bi bi-shield-fill"></i>
            </div>
            <h4 class="fw-bold">{{this.model.profile.bull_name}}</h4>
            <p class="text-muted mb-1">Breed: <strong>{{this.model.profile.breed}}</strong></p>
            <p class="text-muted mb-1">Age: <strong>{{this.model.profile.age}} years</strong></p>
            <p class="text-muted mb-1">Owner: <strong>{{this.model.profile.owner_name}}</strong></p>
            {{#if this.model.profile.fitness_certificate}}
              <span class="badge bg-success"><i class="bi bi-check-circle"></i> {{this.model.profile.fitness_certificate}}</span>
            {{/if}}
          </div>
        </div>
  
        {{!-- Career Stats --}}
        <div class="col-lg-8">
          <div class="row g-3 mb-4">
            <div class="col-6 col-md-3">
              <div class="card stat-card accent">
                <div class="stat-value">{{or this.model.profile.matches_played 0}}</div>
                <div class="stat-label">Matches</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card stat-card green">
                <div class="stat-value">{{or this.model.profile.avg_aggression "0"}}</div>
                <div class="stat-label">Avg Aggression</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card stat-card saffron">
                <div class="stat-value">{{or this.model.profile.avg_difficulty "0"}}</div>
                <div class="stat-label">Avg Difficulty</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card stat-card blue">
                <div class="stat-value">{{or this.model.profile.total_releases 0}}</div>
                <div class="stat-label">Total Releases</div>
              </div>
            </div>
          </div>
  
          {{!-- Match History --}}
          <div class="card">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-clock-history"></i> Match History</h6>
              {{#if this.model.matchHistory.length}}
                <div class="table-responsive">
                  <table class="table table-sm mb-0">
                    <thead>
                      <tr><th>Match</th><th>Round</th><th class="text-center">Aggression</th><th class="text-center">Difficulty</th><th class="text-center">Releases</th></tr>
                    </thead>
                    <tbody>
                      {{#each this.model.matchHistory as |h|}}
                        <tr>
                          <td>
                            <LinkTo @route="match-detail" @model={{h.match_id}} class="text-decoration-none">
                              Match #{{h.match_id}}
                            </LinkTo>
                          </td>
                          <td>{{h.round_name}}</td>
                          <td class="text-center">{{h.aggression}}</td>
                          <td class="text-center">{{h.difficulty}}</td>
                          <td class="text-center">{{h.release_count}}</td>
                        </tr>
                      {{/each}}
                    </tbody>
                  </table>
                </div>
              {{else}}
                <div class="empty-state"><i class="bi bi-inbox d-block"></i>No match history</div>
              {{/if}}
            </div>
          </div>
        </div>
      </div>
    {{/if}}
  </div>
  
  */
  {
    "id": "yEemXsDv",
    "block": "[[[1,[28,[35,0],[[28,[37,1],[\"Bull - \",[28,[37,2],[[30,0,[\"model\",\"profile\",\"bull_name\"]],\"Unknown\"],null]],null]],null]],[1,\"\\n\"],[10,0],[14,0,\"container py-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n    \"],[8,[39,3],[[24,0,\"text-decoration-none text-muted\"]],[[\"@route\"],[\"leaderboard\"]],[[\"default\"],[[[[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-arrow-left\"],[12],[13],[1,\" Back to Leaderboard\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"error\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-danger\"],[12],[1,[30,0,[\"model\",\"error\"]]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"row g-4\"],[12],[1,\"\\n\"],[1,\"      \"],[10,0],[14,0,\"col-lg-4\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card profile-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"profile-avatar\"],[14,5,\"background: linear-gradient(135deg, #198754, #20c997);\"],[12],[1,\"\\n            \"],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"h4\"],[14,0,\"fw-bold\"],[12],[1,[30,0,[\"model\",\"profile\",\"bull_name\"]]],[13],[1,\"\\n          \"],[10,2],[14,0,\"text-muted mb-1\"],[12],[1,\"Breed: \"],[10,\"strong\"],[12],[1,[30,0,[\"model\",\"profile\",\"breed\"]]],[13],[13],[1,\"\\n          \"],[10,2],[14,0,\"text-muted mb-1\"],[12],[1,\"Age: \"],[10,\"strong\"],[12],[1,[30,0,[\"model\",\"profile\",\"age\"]]],[1,\" years\"],[13],[13],[1,\"\\n          \"],[10,2],[14,0,\"text-muted mb-1\"],[12],[1,\"Owner: \"],[10,\"strong\"],[12],[1,[30,0,[\"model\",\"profile\",\"owner_name\"]]],[13],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"profile\",\"fitness_certificate\"]],[[[1,\"            \"],[10,1],[14,0,\"badge bg-success\"],[12],[10,\"i\"],[14,0,\"bi bi-check-circle\"],[12],[13],[1,\" \"],[1,[30,0,[\"model\",\"profile\",\"fitness_certificate\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[1,\"      \"],[10,0],[14,0,\"col-lg-8\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card stat-card accent\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"stat-value\"],[12],[1,[28,[35,2],[[30,0,[\"model\",\"profile\",\"matches_played\"]],0],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Matches\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card stat-card green\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"stat-value\"],[12],[1,[28,[35,2],[[30,0,[\"model\",\"profile\",\"avg_aggression\"]],\"0\"],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Avg Aggression\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card stat-card saffron\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"stat-value\"],[12],[1,[28,[35,2],[[30,0,[\"model\",\"profile\",\"avg_difficulty\"]],\"0\"],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Avg Difficulty\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card stat-card blue\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"stat-value\"],[12],[1,[28,[35,2],[[30,0,[\"model\",\"profile\",\"total_releases\"]],0],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Total Releases\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[1,\"        \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-clock-history\"],[12],[13],[1,\" Match History\"],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"matchHistory\",\"length\"]],[[[1,\"              \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n                \"],[10,\"table\"],[14,0,\"table table-sm mb-0\"],[12],[1,\"\\n                  \"],[10,\"thead\"],[12],[1,\"\\n                    \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Match\"],[13],[10,\"th\"],[12],[1,\"Round\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Aggression\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Difficulty\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Releases\"],[13],[13],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"model\",\"matchHistory\"]]],null]],null],null,[[[1,\"                      \"],[10,\"tr\"],[12],[1,\"\\n                        \"],[10,\"td\"],[12],[1,\"\\n                          \"],[8,[39,3],[[24,0,\"text-decoration-none\"]],[[\"@route\",\"@model\"],[\"match-detail\",[30,1,[\"match_id\"]]]],[[\"default\"],[[[[1,\"\\n                            Match #\"],[1,[30,1,[\"match_id\"]]],[1,\"\\n                          \"]],[]]]]],[1,\"\\n                        \"],[13],[1,\"\\n                        \"],[10,\"td\"],[12],[1,[30,1,[\"round_name\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,1,[\"aggression\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,1,[\"difficulty\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,1,[\"release_count\"]]],[13],[1,\"\\n                      \"],[13],[1,\"\\n\"]],[1]],null],[1,\"                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[10,0],[14,0,\"empty-state\"],[12],[10,\"i\"],[14,0,\"bi bi-inbox d-block\"],[12],[13],[1,\"No match history\"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[13],[1,\"\\n\"]],[\"h\"],false,[\"page-title\",\"concat\",\"or\",\"link-to\",\"if\",\"each\",\"-track-array\"]]",
    "moduleName": "jallikattu-frontend/templates/bull-profile.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/dashboard", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Dashboard"}}
  
  {{!-- Welcome banner --}}
  <div class="card bg-dark text-white mb-4">
    <div class="card-body d-flex align-items-center justify-content-between py-3">
      <div>
        <h4 class="fw-bold mb-1">Welcome, {{this.auth.user.full_name}}</h4>
        <p class="mb-0 opacity-75">Here's your overview for today</p>
      </div>
      <span class="role-tag {{this.auth.role}}" style="font-size:0.8rem; padding:0.3rem 0.8rem;">{{this.auth.role}}</span>
    </div>
  </div>
  
  {{!-- Stats row (admin/registrar/scorer only — players/owners don't need table counts) --}}
  {{#if this.auth.isAdmin}}
  <div class="row g-3 mb-4">
    {{#each-in @model.stats as |key value|}}
      <div class="col-6 col-md-3">
        <div class="card stat-card {{if (eq key 'player') 'accent' (if (eq key 'bull_table') 'green' (if (eq key 'match_table') 'blue' 'saffron'))}}">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <div class="stat-value">{{value}}</div>
              <div class="stat-label">{{key}}</div>
            </div>
          </div>
        </div>
      </div>
    {{/each-in}}
  </div>
  {{/if}}
  
  {{!-- Role-specific actions --}}
  <div class="section-header">
    <h5><i class="bi bi-lightning-fill text-warning"></i> Quick Actions</h5>
  </div>
  
  <div class="row g-3 mb-4">
    {{!-- Common --}}
    <div class="col-6 col-md-4 col-lg-3">
      <LinkTo @route="scoreboard" class="text-decoration-none">
        <div class="card action-card">
          <div class="action-icon bg-danger"><i class="bi bi-broadcast"></i></div>
          <h6>Live Scoreboard</h6>
          <p>View live match scores</p>
        </div>
      </LinkTo>
    </div>
    <div class="col-6 col-md-4 col-lg-3">
      <LinkTo @route="leaderboard" class="text-decoration-none">
        <div class="card action-card">
          <div class="action-icon bg-warning"><i class="bi bi-bar-chart-fill"></i></div>
          <h6>Leaderboard</h6>
          <p>Top players &amp; bulls</p>
        </div>
      </LinkTo>
    </div>
  
    {{!-- Scorer --}}
    {{#if this.auth.isScorer}}
      <div class="col-6 col-md-4 col-lg-3">
        <LinkTo @route="match-control" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon bg-success"><i class="bi bi-sliders2"></i></div>
            <h6>Match Control</h6>
            <p>Enter &amp; edit scores</p>
          </div>
        </LinkTo>
      </div>
      <div class="col-6 col-md-4 col-lg-3">
        <LinkTo @route="winners" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon" style="background:#6f42c1;"><i class="bi bi-award-fill"></i></div>
            <h6>Winners</h6>
            <p>Declare match winners</p>
          </div>
        </LinkTo>
      </div>
    {{/if}}
  
    {{!-- Registrar --}}
    {{#if this.auth.isRegistrar}}
      <div class="col-6 col-md-4 col-lg-3">
        <LinkTo @route="events" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon bg-primary"><i class="bi bi-calendar-check"></i></div>
            <h6>Events</h6>
            <p>Manage events &amp; batches</p>
          </div>
        </LinkTo>
      </div>
      <div class="col-6 col-md-4 col-lg-3">
        <LinkTo @route="registration" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon bg-info"><i class="bi bi-person-plus-fill"></i></div>
            <h6>Registration</h6>
            <p>Approve registrations</p>
          </div>
        </LinkTo>
      </div>
    {{/if}}
  
    {{!-- Admin --}}
    {{#if this.auth.isAdmin}}
      <div class="col-6 col-md-4 col-lg-3">
        <LinkTo @route="tables" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon" style="background:#0d6efd;"><i class="bi bi-database-fill"></i></div>
            <h6>Data Tables</h6>
            <p>Manage master data</p>
          </div>
        </LinkTo>
      </div>
      <div class="col-6 col-md-4 col-lg-3">
        <LinkTo @route="users" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon" style="background:#dc3545;"><i class="bi bi-people-fill"></i></div>
            <h6>Users</h6>
            <p>Manage user accounts</p>
          </div>
        </LinkTo>
      </div>
    {{/if}}
  
    {{!-- Player --}}
    {{#if (eq this.auth.role "player")}}
      <div class="col-6 col-md-4 col-lg-3">
        <LinkTo @route="my-profile" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon bg-primary"><i class="bi bi-person-circle"></i></div>
            <h6>My Profile</h6>
            <p>View career stats</p>
          </div>
        </LinkTo>
      </div>
      <div class="col-6 col-md-4 col-lg-3">
        <LinkTo @route="my-matches" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon bg-success"><i class="bi bi-flag-fill"></i></div>
            <h6>Join Match</h6>
            <p>Register for events</p>
          </div>
        </LinkTo>
      </div>
    {{/if}}
  
    {{!-- Owner --}}
    {{#if (eq this.auth.role "owner")}}
      <div class="col-6 col-md-4 col-lg-3">
        <LinkTo @route="my-bulls" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon" style="background:#20c997;"><i class="bi bi-shield-fill"></i></div>
            <h6>My Bulls</h6>
            <p>Manage your bulls</p>
          </div>
        </LinkTo>
      </div>
    {{/if}}
  </div>
  
  */
  {
    "id": "Zw09kOs4",
    "block": "[[[1,[28,[35,0],[\"Dashboard\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"card bg-dark text-white mb-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"card-body d-flex align-items-center justify-content-between py-3\"],[12],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      \"],[10,\"h4\"],[14,0,\"fw-bold mb-1\"],[12],[1,\"Welcome, \"],[1,[30,0,[\"auth\",\"user\",\"full_name\"]]],[13],[1,\"\\n      \"],[10,2],[14,0,\"mb-0 opacity-75\"],[12],[1,\"Here's your overview for today\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,1],[15,0,[29,[\"role-tag \",[30,0,[\"auth\",\"role\"]]]]],[14,5,\"font-size:0.8rem; padding:0.3rem 0.8rem;\"],[12],[1,[30,0,[\"auth\",\"role\"]]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"auth\",\"isAdmin\"]],[[[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[30,1,[\"stats\"]]],null],null,[[[1,\"    \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n      \"],[10,0],[15,0,[29,[\"card stat-card \",[52,[28,[37,4],[[30,3],\"player\"],null],\"accent\",[52,[28,[37,4],[[30,3],\"bull_table\"],null],\"green\",[52,[28,[37,4],[[30,3],\"match_table\"],null],\"blue\",\"saffron\"]]]]]],[12],[1,\"\\n        \"],[10,0],[14,0,\"d-flex justify-content-between align-items-start\"],[12],[1,\"\\n          \"],[10,0],[12],[1,\"\\n            \"],[10,0],[14,0,\"stat-value\"],[12],[1,[30,2]],[13],[1,\"\\n            \"],[10,0],[14,0,\"stat-label\"],[12],[1,[30,3]],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[2,3]],null],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-lightning-fill text-warning\"],[12],[13],[1,\" Quick Actions\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n    \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"scoreboard\"]],[[\"default\"],[[[[1,\"\\n      \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"action-icon bg-danger\"],[12],[10,\"i\"],[14,0,\"bi bi-broadcast\"],[12],[13],[13],[1,\"\\n        \"],[10,\"h6\"],[12],[1,\"Live Scoreboard\"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"View live match scores\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n    \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"leaderboard\"]],[[\"default\"],[[[[1,\"\\n      \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"action-icon bg-warning\"],[12],[10,\"i\"],[14,0,\"bi bi-bar-chart-fill\"],[12],[13],[13],[1,\"\\n        \"],[10,\"h6\"],[12],[1,\"Leaderboard\"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"Top players & bulls\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"auth\",\"isScorer\"]],[[[1,\"    \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"match-control\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon bg-success\"],[12],[10,\"i\"],[14,0,\"bi bi-sliders2\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"Match Control\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"Enter & edit scores\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"winners\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon\"],[14,5,\"background:#6f42c1;\"],[12],[10,\"i\"],[14,0,\"bi bi-award-fill\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"Winners\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"Declare match winners\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"auth\",\"isRegistrar\"]],[[[1,\"    \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"events\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon bg-primary\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar-check\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"Events\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"Manage events & batches\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"registration\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon bg-info\"],[12],[10,\"i\"],[14,0,\"bi bi-person-plus-fill\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"Registration\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"Approve registrations\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"auth\",\"isAdmin\"]],[[[1,\"    \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"tables\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon\"],[14,5,\"background:#0d6efd;\"],[12],[10,\"i\"],[14,0,\"bi bi-database-fill\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"Data Tables\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"Manage master data\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"users\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon\"],[14,5,\"background:#dc3545;\"],[12],[10,\"i\"],[14,0,\"bi bi-people-fill\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"Users\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"Manage user accounts\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,4],[[30,0,[\"auth\",\"role\"]],\"player\"],null],[[[1,\"    \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"my-profile\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon bg-primary\"],[12],[10,\"i\"],[14,0,\"bi bi-person-circle\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"My Profile\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"View career stats\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"my-matches\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon bg-success\"],[12],[10,\"i\"],[14,0,\"bi bi-flag-fill\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"Join Match\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"Register for events\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,4],[[30,0,[\"auth\",\"role\"]],\"owner\"],null],[[[1,\"    \"],[10,0],[14,0,\"col-6 col-md-4 col-lg-3\"],[12],[1,\"\\n      \"],[8,[39,5],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"my-bulls\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon\"],[14,5,\"background:#20c997;\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"My Bulls\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"Manage your bulls\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\"]],[\"@model\",\"value\",\"key\"],false,[\"page-title\",\"if\",\"each\",\"-each-in\",\"eq\",\"link-to\"]]",
    "moduleName": "jallikattu-frontend/templates/dashboard.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/event-detail", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Event Detail"}}
  
  {{#if @model.error}}
    <div class="empty-state py-5">
      <i class="bi bi-exclamation-triangle" style="font-size:3rem;"></i>
      <h5 class="mt-3">Event Not Found</h5>
      <LinkTo @route="events" class="btn btn-outline-primary btn-sm">Back to Events</LinkTo>
    </div>
  {{else}}
    <div class="mb-3">
      <LinkTo @route="events" class="btn btn-outline-secondary btn-sm">
        <i class="bi bi-arrow-left"></i> Back to Events
      </LinkTo>
    </div>
  
    {{!-- Event header --}}
    <div class="card mb-4">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
          <div>
            <h4 class="fw-bold mb-1">{{@model.match.match_name}}</h4>
            <div class="d-flex flex-wrap gap-3 text-muted">
              <span><i class="bi bi-calendar3"></i> {{@model.match.match_date}}</span>
              <span><i class="bi bi-geo-alt-fill"></i> {{@model.match.district}} — {{@model.match.area}}</span>
              <span><i class="bi bi-building"></i> {{@model.match.organizer_name}}</span>
            </div>
          </div>
          <span class="status-badge {{if (eq @model.match.status 'Completed') 'completed' (if (eq @model.match.status 'Live') 'live' 'scheduled')}}">
            {{@model.match.status}}
          </span>
        </div>
      </div>
    </div>
  
    {{!-- Capacity stats --}}
    <div class="row g-3 mb-4">
      <div class="col-md-3 col-6">
        <div class="card stat-card accent">
          <div class="stat-value">{{@model.capacity.registeredPlayers}}</div>
          <div class="stat-label">Registered Players</div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="card stat-card green">
          <div class="stat-value">{{@model.match.player_limit}}</div>
          <div class="stat-label">Player Limit</div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="card stat-card blue">
          <div class="stat-value">{{@model.capacity.registeredBulls}}</div>
          <div class="stat-label">Registered Bulls</div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="card stat-card saffron">
          <div class="stat-value">{{@model.match.bull_limit}}</div>
          <div class="stat-label">Bull Limit</div>
        </div>
      </div>
    </div>
  
    {{!-- Registered Players --}}
    {{#if @model.playerRegistrations.length}}
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="fw-bold mb-3"><i class="bi bi-person-arms-up text-primary"></i> Registered Players ({{@model.playerRegistrations.length}})</h6>
          <div class="table-responsive">
            <table class="table table-sm table-hover align-middle mb-0">
              <thead class="table-light">
                <tr><th>Player</th><th>Round</th><th>Batch</th><th>Status</th></tr>
              </thead>
              <tbody>
                {{#each @model.playerRegistrations as |p|}}
                  <tr>
                    <td class="fw-semibold">{{p.player_name}}</td>
                    <td><span class="badge bg-secondary">{{p.round_name}}</span></td>
                    <td>{{p.batch_name}}</td>
                    <td><span class="status-badge {{if (eq p.status 'approved') 'approved' 'pending'}}">{{p.status}}</span></td>
                  </tr>
                {{/each}}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {{/if}}
  
    {{!-- Registered Bulls --}}
    {{#if @model.bullRegistrations.length}}
      <div class="card">
        <div class="card-body">
          <h6 class="fw-bold mb-3"><i class="bi bi-shield-fill text-danger"></i> Registered Bulls ({{@model.bullRegistrations.length}})</h6>
          <div class="table-responsive">
            <table class="table table-sm table-hover align-middle mb-0">
              <thead class="table-light">
                <tr><th>Bull</th><th>Owner</th><th>Breed</th><th>Round</th><th>Status</th></tr>
              </thead>
              <tbody>
                {{#each @model.bullRegistrations as |b|}}
                  <tr>
                    <td class="fw-semibold">{{b.bull_name}}</td>
                    <td>{{b.owner_name}}</td>
                    <td>{{b.breed}}</td>
                    <td><span class="badge bg-secondary">{{b.round_name}}</span></td>
                    <td><span class="status-badge {{if (eq b.status 'approved') 'approved' 'pending'}}">{{b.status}}</span></td>
                  </tr>
                {{/each}}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {{/if}}
  {{/if}}
  
  */
  {
    "id": "4AhQTk3Y",
    "block": "[[[1,[28,[35,0],[\"Event Detail\"],null]],[1,\"\\n\\n\"],[41,[30,1,[\"error\"]],[[[1,\"  \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-exclamation-triangle\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"Event Not Found\"],[13],[1,\"\\n    \"],[8,[39,2],[[24,0,\"btn btn-outline-primary btn-sm\"]],[[\"@route\"],[\"events\"]],[[\"default\"],[[[[1,\"Back to Events\"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n    \"],[8,[39,2],[[24,0,\"btn btn-outline-secondary btn-sm\"]],[[\"@route\"],[\"events\"]],[[\"default\"],[[[[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-arrow-left\"],[12],[13],[1,\" Back to Events\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"d-flex justify-content-between align-items-start flex-wrap gap-2\"],[12],[1,\"\\n        \"],[10,0],[12],[1,\"\\n          \"],[10,\"h4\"],[14,0,\"fw-bold mb-1\"],[12],[1,[30,1,[\"match\",\"match_name\"]]],[13],[1,\"\\n          \"],[10,0],[14,0,\"d-flex flex-wrap gap-3 text-muted\"],[12],[1,\"\\n            \"],[10,1],[12],[10,\"i\"],[14,0,\"bi bi-calendar3\"],[12],[13],[1,\" \"],[1,[30,1,[\"match\",\"match_date\"]]],[13],[1,\"\\n            \"],[10,1],[12],[10,\"i\"],[14,0,\"bi bi-geo-alt-fill\"],[12],[13],[1,\" \"],[1,[30,1,[\"match\",\"district\"]]],[1,\" — \"],[1,[30,1,[\"match\",\"area\"]]],[13],[1,\"\\n            \"],[10,1],[12],[10,\"i\"],[14,0,\"bi bi-building\"],[12],[13],[1,\" \"],[1,[30,1,[\"match\",\"organizer_name\"]]],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,1],[15,0,[29,[\"status-badge \",[52,[28,[37,3],[[30,1,[\"match\",\"status\"]],\"Completed\"],null],\"completed\",[52,[28,[37,3],[[30,1,[\"match\",\"status\"]],\"Live\"],null],\"live\",\"scheduled\"]]]]],[12],[1,\"\\n          \"],[1,[30,1,[\"match\",\"status\"]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card stat-card accent\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"stat-value\"],[12],[1,[30,1,[\"capacity\",\"registeredPlayers\"]]],[13],[1,\"\\n        \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Registered Players\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card stat-card green\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"stat-value\"],[12],[1,[30,1,[\"match\",\"player_limit\"]]],[13],[1,\"\\n        \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Player Limit\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card stat-card blue\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"stat-value\"],[12],[1,[30,1,[\"capacity\",\"registeredBulls\"]]],[13],[1,\"\\n        \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Registered Bulls\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card stat-card saffron\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"stat-value\"],[12],[1,[30,1,[\"match\",\"bull_limit\"]]],[13],[1,\"\\n        \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Bull Limit\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,1,[\"playerRegistrations\",\"length\"]],[[[1,\"    \"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n        \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-person-arms-up text-primary\"],[12],[13],[1,\" Registered Players (\"],[1,[30,1,[\"playerRegistrations\",\"length\"]]],[1,\")\"],[13],[1,\"\\n        \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n          \"],[10,\"table\"],[14,0,\"table table-sm table-hover align-middle mb-0\"],[12],[1,\"\\n            \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n              \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Player\"],[13],[10,\"th\"],[12],[1,\"Round\"],[13],[10,\"th\"],[12],[1,\"Batch\"],[13],[10,\"th\"],[12],[1,\"Status\"],[13],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,1,[\"playerRegistrations\"]]],null]],null],null,[[[1,\"                \"],[10,\"tr\"],[12],[1,\"\\n                  \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,2,[\"player_name\"]]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,[30,2,[\"round_name\"]]],[13],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[30,2,[\"batch_name\"]]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[10,1],[15,0,[29,[\"status-badge \",[52,[28,[37,3],[[30,2,[\"status\"]],\"approved\"],null],\"approved\",\"pending\"]]]],[12],[1,[30,2,[\"status\"]]],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[2]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,1,[\"bullRegistrations\",\"length\"]],[[[1,\"    \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n        \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill text-danger\"],[12],[13],[1,\" Registered Bulls (\"],[1,[30,1,[\"bullRegistrations\",\"length\"]]],[1,\")\"],[13],[1,\"\\n        \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n          \"],[10,\"table\"],[14,0,\"table table-sm table-hover align-middle mb-0\"],[12],[1,\"\\n            \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n              \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Bull\"],[13],[10,\"th\"],[12],[1,\"Owner\"],[13],[10,\"th\"],[12],[1,\"Breed\"],[13],[10,\"th\"],[12],[1,\"Round\"],[13],[10,\"th\"],[12],[1,\"Status\"],[13],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,1,[\"bullRegistrations\"]]],null]],null],null,[[[1,\"                \"],[10,\"tr\"],[12],[1,\"\\n                  \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,3,[\"bull_name\"]]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[30,3,[\"owner_name\"]]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[30,3,[\"breed\"]]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,[30,3,[\"round_name\"]]],[13],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[10,1],[15,0,[29,[\"status-badge \",[52,[28,[37,3],[[30,3,[\"status\"]],\"approved\"],null],\"approved\",\"pending\"]]]],[12],[1,[30,3,[\"status\"]]],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[3]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]]]],[\"@model\",\"p\",\"b\"],false,[\"page-title\",\"if\",\"link-to\",\"eq\",\"each\",\"-track-array\"]]",
    "moduleName": "jallikattu-frontend/templates/event-detail.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/events", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Events"}}
  
  <div class="section-header d-flex justify-content-between align-items-center">
    <h5><i class="bi bi-calendar-check-fill"></i> Event Management</h5>
  </div>
  
  {{#if @model.length}}
    <div class="row g-3">
      {{#each @model as |event|}}
        <div class="col-md-6 col-lg-4">
          <LinkTo @route="event-detail" @model={{event.match_id}} class="text-decoration-none">
            <div class="card match-card h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="fw-bold mb-0">{{event.match_name}}</h6>
                  <span class="status-badge {{if (eq event.status 'Completed') 'completed' (if (eq event.status 'Live') 'live' 'scheduled')}}">
                    {{event.status}}
                  </span>
                </div>
                <div class="text-muted small mb-2">
                  <div><i class="bi bi-calendar3"></i> {{event.match_date}}</div>
                  <div><i class="bi bi-geo-alt-fill"></i> {{event.location}} — {{event.area}}</div>
                  <div><i class="bi bi-building"></i> {{event.organizer_name}}</div>
                </div>
                {{#if event.capacity}}
                  <div class="mb-1">
                    <small class="text-muted">Players: {{event.capacity.registeredPlayers}}/{{event.player_limit}}</small>
                    <div class="capacity-meter">
                      <div class="capacity-fill" style="width:{{if event.player_limit (mult (div event.capacity.registeredPlayers event.player_limit) 100) 0}}%"></div>
                    </div>
                  </div>
                  <div>
                    <small class="text-muted">Bulls: {{event.capacity.registeredBulls}}/{{event.bull_limit}}</small>
                    <div class="capacity-meter">
                      <div class="capacity-fill" style="width:{{if event.bull_limit (mult (div event.capacity.registeredBulls event.bull_limit) 100) 0}}%"></div>
                    </div>
                  </div>
                {{/if}}
              </div>
            </div>
          </LinkTo>
        </div>
      {{/each}}
    </div>
  {{else}}
    <div class="empty-state py-5">
      <i class="bi bi-calendar-x" style="font-size:3rem;"></i>
      <h5 class="mt-3">No Events Found</h5>
      <p class="text-muted">Schedule a match using the Registration page first</p>
      <LinkTo @route="registration" class="btn btn-accent btn-sm">Go to Registration</LinkTo>
    </div>
  {{/if}}
  
  */
  {
    "id": "sFp5BZfK",
    "block": "[[[1,[28,[35,0],[\"Events\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header d-flex justify-content-between align-items-center\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar-check-fill\"],[12],[13],[1,\" Event Management\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,1,[\"length\"]],[[[1,\"  \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,1]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"col-md-6 col-lg-4\"],[12],[1,\"\\n        \"],[8,[39,4],[[24,0,\"text-decoration-none\"]],[[\"@route\",\"@model\"],[\"event-detail\",[30,2,[\"match_id\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[10,0],[14,0,\"card match-card h-100\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"d-flex justify-content-between align-items-start mb-2\"],[12],[1,\"\\n                \"],[10,\"h6\"],[14,0,\"fw-bold mb-0\"],[12],[1,[30,2,[\"match_name\"]]],[13],[1,\"\\n                \"],[10,1],[15,0,[29,[\"status-badge \",[52,[28,[37,5],[[30,2,[\"status\"]],\"Completed\"],null],\"completed\",[52,[28,[37,5],[[30,2,[\"status\"]],\"Live\"],null],\"live\",\"scheduled\"]]]]],[12],[1,\"\\n                  \"],[1,[30,2,[\"status\"]]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"text-muted small mb-2\"],[12],[1,\"\\n                \"],[10,0],[12],[10,\"i\"],[14,0,\"bi bi-calendar3\"],[12],[13],[1,\" \"],[1,[30,2,[\"match_date\"]]],[13],[1,\"\\n                \"],[10,0],[12],[10,\"i\"],[14,0,\"bi bi-geo-alt-fill\"],[12],[13],[1,\" \"],[1,[30,2,[\"location\"]]],[1,\" — \"],[1,[30,2,[\"area\"]]],[13],[1,\"\\n                \"],[10,0],[12],[10,\"i\"],[14,0,\"bi bi-building\"],[12],[13],[1,\" \"],[1,[30,2,[\"organizer_name\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"],[41,[30,2,[\"capacity\"]],[[[1,\"                \"],[10,0],[14,0,\"mb-1\"],[12],[1,\"\\n                  \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"Players: \"],[1,[30,2,[\"capacity\",\"registeredPlayers\"]]],[1,\"/\"],[1,[30,2,[\"player_limit\"]]],[13],[1,\"\\n                  \"],[10,0],[14,0,\"capacity-meter\"],[12],[1,\"\\n                    \"],[10,0],[14,0,\"capacity-fill\"],[15,5,[29,[\"width:\",[52,[30,2,[\"player_limit\"]],[28,[37,6],[[28,[37,7],[[30,2,[\"capacity\",\"registeredPlayers\"]],[30,2,[\"player_limit\"]]],null],100],null],0],\"%\"]]],[12],[13],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,0],[12],[1,\"\\n                  \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"Bulls: \"],[1,[30,2,[\"capacity\",\"registeredBulls\"]]],[1,\"/\"],[1,[30,2,[\"bull_limit\"]]],[13],[1,\"\\n                  \"],[10,0],[14,0,\"capacity-meter\"],[12],[1,\"\\n                    \"],[10,0],[14,0,\"capacity-fill\"],[15,5,[29,[\"width:\",[52,[30,2,[\"bull_limit\"]],[28,[37,6],[[28,[37,7],[[30,2,[\"capacity\",\"registeredBulls\"]],[30,2,[\"bull_limit\"]]],null],100],null],0],\"%\"]]],[12],[13],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[2]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-calendar-x\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"No Events Found\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"Schedule a match using the Registration page first\"],[13],[1,\"\\n    \"],[8,[39,4],[[24,0,\"btn btn-accent btn-sm\"]],[[\"@route\"],[\"registration\"]],[[\"default\"],[[[[1,\"Go to Registration\"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"@model\",\"event\"],false,[\"page-title\",\"if\",\"each\",\"-track-array\",\"link-to\",\"eq\",\"mult\",\"div\"]]",
    "moduleName": "jallikattu-frontend/templates/events.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Home - Jallikattu Statistics"}}
  
  {{!-- Hero Section --}}
  <section class="hero">
    <div class="container position-relative" style="z-index:1">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <h1>Jallikattu<br>Statistics Overlay</h1>
          <p class="lead mt-3">Live scores, leaderboards, player &amp; bull statistics for Tamil Nadu's legendary bull-taming sport.</p>
          <div class="d-flex gap-3 mt-4">
            <LinkTo @route="scoreboard" class="btn btn-light btn-lg px-4">
              <i class="bi bi-broadcast"></i> Live Scores
            </LinkTo>
            <LinkTo @route="leaderboard" class="btn btn-outline-light btn-lg px-4">
              <i class="bi bi-bar-chart"></i> Leaderboard
            </LinkTo>
          </div>
        </div>
        <div class="col-lg-5 text-center mt-4 mt-lg-0">
          {{#if this.model.stats}}
            <div class="row g-3">
              <div class="col-6">
                <div class="bg-white bg-opacity-10 rounded-3 p-3">
                  <div class="fs-1 fw-bold">{{this.model.stats.totalPlayers}}</div>
                  <small class="text-white-50">Players</small>
                </div>
              </div>
              <div class="col-6">
                <div class="bg-white bg-opacity-10 rounded-3 p-3">
                  <div class="fs-1 fw-bold">{{this.model.stats.totalBulls}}</div>
                  <small class="text-white-50">Bulls</small>
                </div>
              </div>
              <div class="col-6">
                <div class="bg-white bg-opacity-10 rounded-3 p-3">
                  <div class="fs-1 fw-bold">{{this.model.stats.totalMatches}}</div>
                  <small class="text-white-50">Matches</small>
                </div>
              </div>
              <div class="col-6">
                <div class="bg-white bg-opacity-10 rounded-3 p-3">
                  <div class="fs-1 fw-bold text-warning">{{this.model.stats.liveMatches}}</div>
                  <small class="text-white-50">Live Now</small>
                </div>
              </div>
            </div>
          {{/if}}
        </div>
      </div>
    </div>
  </section>
  
  <div class="container py-4">
    {{!-- Live Matches --}}
    {{#if this.liveMatches.length}}
      <div class="section-header">
        <h5><i class="bi bi-broadcast text-danger"></i> Live Now</h5>
      </div>
      <div class="row g-3 mb-4">
        {{#each this.liveMatches as |match|}}
          <div class="col-md-6 col-lg-4">
            <LinkTo @route="match-detail" @model={{match.match_id}} class="text-decoration-none">
              <div class="match-card">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="fw-bold mb-0">Match #{{match.match_id}}</h6>
                  <span class="status-badge live">LIVE</span>
                </div>
                <div class="match-venue"><i class="bi bi-geo-alt"></i> {{match.location}}</div>
                <div class="match-date"><i class="bi bi-calendar3"></i> {{match.match_date}}</div>
              </div>
            </LinkTo>
          </div>
        {{/each}}
      </div>
    {{/if}}
  
    {{!-- Upcoming Matches --}}
    {{#if this.upcomingMatches.length}}
      <div class="section-header">
        <h5><i class="bi bi-calendar-event text-primary"></i> Upcoming Matches</h5>
        <LinkTo @route="matches" class="btn btn-sm btn-outline-secondary">View All</LinkTo>
      </div>
      <div class="row g-3 mb-4">
        {{#each this.upcomingMatches as |match|}}
          <div class="col-md-6 col-lg-4">
            <LinkTo @route="match-detail" @model={{match.match_id}} class="text-decoration-none">
              <div class="match-card">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="fw-bold mb-0">Match #{{match.match_id}}</h6>
                  <span class="status-badge scheduled">Scheduled</span>
                </div>
                <div class="match-venue"><i class="bi bi-geo-alt"></i> {{match.location}}</div>
                <div class="match-date"><i class="bi bi-calendar3"></i> {{match.match_date}}</div>
              </div>
            </LinkTo>
          </div>
        {{/each}}
      </div>
    {{/if}}
  
    {{!-- Top Players & Bulls --}}
    {{#if this.model.leaderboard}}
      <div class="row g-4 mb-4">
        {{!-- Top Players --}}
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold mb-0"><i class="bi bi-trophy-fill text-warning"></i> Top Players</h5>
                <LinkTo @route="leaderboard" class="btn btn-sm btn-outline-secondary">See All</LinkTo>
              </div>
              <div class="table-responsive">
                <table class="table table-sm mb-0">
                  <thead>
                    <tr><th>#</th><th>Player</th><th class="text-end">Net Score</th></tr>
                  </thead>
                  <tbody>
                    {{#each this.model.leaderboard.topPlayers as |p index|}}
                      <tr>
                        <td>
                          <span class="leaderboard-rank {{if (eq index 0) 'gold' (if (eq index 1) 'silver' (if (eq index 2) 'bronze' 'default'))}}">
                            {{add index 1}}
                          </span>
                        </td>
                        <td>
                          <LinkTo @route="player-profile" @model={{p.player_id}} class="text-decoration-none fw-semibold">
                            {{p.player_name}}
                          </LinkTo>
                        </td>
                        <td class="text-end fw-bold">{{p.net_score}}</td>
                      </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
  
        {{!-- Top Bulls --}}
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold mb-0"><i class="bi bi-shield-fill text-success"></i> Top Bulls</h5>
                <LinkTo @route="leaderboard" class="btn btn-sm btn-outline-secondary">See All</LinkTo>
              </div>
              <div class="table-responsive">
                <table class="table table-sm mb-0">
                  <thead>
                    <tr><th>#</th><th>Bull</th><th class="text-end">Avg Difficulty</th></tr>
                  </thead>
                  <tbody>
                    {{#each this.model.leaderboard.topBulls as |b index|}}
                      <tr>
                        <td>
                          <span class="leaderboard-rank {{if (eq index 0) 'gold' (if (eq index 1) 'silver' (if (eq index 2) 'bronze' 'default'))}}">
                            {{add index 1}}
                          </span>
                        </td>
                        <td>
                          <LinkTo @route="bull-profile" @model={{b.bull_id}} class="text-decoration-none fw-semibold">
                            {{b.bull_name}}
                          </LinkTo>
                        </td>
                        <td class="text-end fw-bold">{{b.avg_difficulty}}</td>
                      </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    {{/if}}
  
    {{!-- Call-to-action --}}
    <div class="card bg-dark text-white">
      <div class="card-body text-center py-4">
        {{#if this.auth.isAuthenticated}}
          <h5 class="fw-bold">Ready to compete?</h5>
          <p class="text-white-50 mb-3">Browse available matches and register</p>
          <div class="d-flex gap-2 justify-content-center">
            {{#if this.auth.isPlayer}}
              <LinkTo @route="my-matches" class="btn btn-accent px-4">
                <i class="bi bi-flag-fill"></i> Register for Match
              </LinkTo>
            {{/if}}
            <LinkTo @route="events" class="btn btn-outline-light px-4">
              <i class="bi bi-calendar-event"></i> Browse Events
            </LinkTo>
          </div>
        {{else}}
          <h5 class="fw-bold">Want to participate?</h5>
          <p class="text-white-50 mb-3">Register as a player or bull owner</p>
          <div class="d-flex gap-2 justify-content-center">
            <LinkTo @route="signup" class="btn btn-accent px-4">
              <i class="bi bi-person-plus"></i> Register Now
            </LinkTo>
            <LinkTo @route="login" class="btn btn-outline-light px-4">
              <i class="bi bi-box-arrow-in-right"></i> Login
            </LinkTo>
          </div>
        {{/if}}
      </div>
    </div>
  </div>
  
  {{!-- Footer --}}
  <footer class="bg-dark text-white-50 py-4 mt-4">
    <div class="container text-center">
      <p class="mb-0"><i class="bi bi-trophy-fill text-warning"></i> Jallikattu Statistics Overlay &copy; 2026</p>
    </div>
  </footer>
  
  */
  {
    "id": "oWuFtaG+",
    "block": "[[[1,[28,[35,0],[\"Home - Jallikattu Statistics\"],null]],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"hero\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"container position-relative\"],[14,5,\"z-index:1\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"row align-items-center\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"col-lg-7\"],[12],[1,\"\\n        \"],[10,\"h1\"],[12],[1,\"Jallikattu\"],[10,\"br\"],[12],[13],[1,\"Statistics Overlay\"],[13],[1,\"\\n        \"],[10,2],[14,0,\"lead mt-3\"],[12],[1,\"Live scores, leaderboards, player & bull statistics for Tamil Nadu's legendary bull-taming sport.\"],[13],[1,\"\\n        \"],[10,0],[14,0,\"d-flex gap-3 mt-4\"],[12],[1,\"\\n          \"],[8,[39,1],[[24,0,\"btn btn-light btn-lg px-4\"]],[[\"@route\"],[\"scoreboard\"]],[[\"default\"],[[[[1,\"\\n            \"],[10,\"i\"],[14,0,\"bi bi-broadcast\"],[12],[13],[1,\" Live Scores\\n          \"]],[]]]]],[1,\"\\n          \"],[8,[39,1],[[24,0,\"btn btn-outline-light btn-lg px-4\"]],[[\"@route\"],[\"leaderboard\"]],[[\"default\"],[[[[1,\"\\n            \"],[10,\"i\"],[14,0,\"bi bi-bar-chart\"],[12],[13],[1,\" Leaderboard\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"col-lg-5 text-center mt-4 mt-lg-0\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"stats\"]],[[[1,\"          \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-6\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"bg-white bg-opacity-10 rounded-3 p-3\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"fs-1 fw-bold\"],[12],[1,[30,0,[\"model\",\"stats\",\"totalPlayers\"]]],[13],[1,\"\\n                \"],[10,\"small\"],[14,0,\"text-white-50\"],[12],[1,\"Players\"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"col-6\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"bg-white bg-opacity-10 rounded-3 p-3\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"fs-1 fw-bold\"],[12],[1,[30,0,[\"model\",\"stats\",\"totalBulls\"]]],[13],[1,\"\\n                \"],[10,\"small\"],[14,0,\"text-white-50\"],[12],[1,\"Bulls\"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"col-6\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"bg-white bg-opacity-10 rounded-3 p-3\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"fs-1 fw-bold\"],[12],[1,[30,0,[\"model\",\"stats\",\"totalMatches\"]]],[13],[1,\"\\n                \"],[10,\"small\"],[14,0,\"text-white-50\"],[12],[1,\"Matches\"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"col-6\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"bg-white bg-opacity-10 rounded-3 p-3\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"fs-1 fw-bold text-warning\"],[12],[1,[30,0,[\"model\",\"stats\",\"liveMatches\"]]],[13],[1,\"\\n                \"],[10,\"small\"],[14,0,\"text-white-50\"],[12],[1,\"Live Now\"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"container py-4\"],[12],[1,\"\\n\"],[41,[30,0,[\"liveMatches\",\"length\"]],[[[1,\"    \"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n      \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-broadcast text-danger\"],[12],[13],[1,\" Live Now\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"liveMatches\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"col-md-6 col-lg-4\"],[12],[1,\"\\n          \"],[8,[39,1],[[24,0,\"text-decoration-none\"]],[[\"@route\",\"@model\"],[\"match-detail\",[30,1,[\"match_id\"]]]],[[\"default\"],[[[[1,\"\\n            \"],[10,0],[14,0,\"match-card\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"d-flex justify-content-between align-items-start mb-2\"],[12],[1,\"\\n                \"],[10,\"h6\"],[14,0,\"fw-bold mb-0\"],[12],[1,\"Match #\"],[1,[30,1,[\"match_id\"]]],[13],[1,\"\\n                \"],[10,1],[14,0,\"status-badge live\"],[12],[1,\"LIVE\"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"match-venue\"],[12],[10,\"i\"],[14,0,\"bi bi-geo-alt\"],[12],[13],[1,\" \"],[1,[30,1,[\"location\"]]],[13],[1,\"\\n              \"],[10,0],[14,0,\"match-date\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar3\"],[12],[13],[1,\" \"],[1,[30,1,[\"match_date\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"upcomingMatches\",\"length\"]],[[[1,\"    \"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n      \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar-event text-primary\"],[12],[13],[1,\" Upcoming Matches\"],[13],[1,\"\\n      \"],[8,[39,1],[[24,0,\"btn btn-sm btn-outline-secondary\"]],[[\"@route\"],[\"matches\"]],[[\"default\"],[[[[1,\"View All\"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"upcomingMatches\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"col-md-6 col-lg-4\"],[12],[1,\"\\n          \"],[8,[39,1],[[24,0,\"text-decoration-none\"]],[[\"@route\",\"@model\"],[\"match-detail\",[30,2,[\"match_id\"]]]],[[\"default\"],[[[[1,\"\\n            \"],[10,0],[14,0,\"match-card\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"d-flex justify-content-between align-items-start mb-2\"],[12],[1,\"\\n                \"],[10,\"h6\"],[14,0,\"fw-bold mb-0\"],[12],[1,\"Match #\"],[1,[30,2,[\"match_id\"]]],[13],[1,\"\\n                \"],[10,1],[14,0,\"status-badge scheduled\"],[12],[1,\"Scheduled\"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"match-venue\"],[12],[10,\"i\"],[14,0,\"bi bi-geo-alt\"],[12],[13],[1,\" \"],[1,[30,2,[\"location\"]]],[13],[1,\"\\n              \"],[10,0],[14,0,\"match-date\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar3\"],[12],[13],[1,\" \"],[1,[30,2,[\"match_date\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[2]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"leaderboard\"]],[[[1,\"    \"],[10,0],[14,0,\"row g-4 mb-4\"],[12],[1,\"\\n\"],[1,\"      \"],[10,0],[14,0,\"col-lg-6\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"d-flex justify-content-between align-items-center mb-3\"],[12],[1,\"\\n              \"],[10,\"h5\"],[14,0,\"fw-bold mb-0\"],[12],[10,\"i\"],[14,0,\"bi bi-trophy-fill text-warning\"],[12],[13],[1,\" Top Players\"],[13],[1,\"\\n              \"],[8,[39,1],[[24,0,\"btn btn-sm btn-outline-secondary\"]],[[\"@route\"],[\"leaderboard\"]],[[\"default\"],[[[[1,\"See All\"]],[]]]]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n              \"],[10,\"table\"],[14,0,\"table table-sm mb-0\"],[12],[1,\"\\n                \"],[10,\"thead\"],[12],[1,\"\\n                  \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"#\"],[13],[10,\"th\"],[12],[1,\"Player\"],[13],[10,\"th\"],[14,0,\"text-end\"],[12],[1,\"Net Score\"],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"model\",\"leaderboard\",\"topPlayers\"]]],null]],null],null,[[[1,\"                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"td\"],[12],[1,\"\\n                        \"],[10,1],[15,0,[29,[\"leaderboard-rank \",[52,[28,[37,5],[[30,4],0],null],\"gold\",[52,[28,[37,5],[[30,4],1],null],\"silver\",[52,[28,[37,5],[[30,4],2],null],\"bronze\",\"default\"]]]]]],[12],[1,\"\\n                          \"],[1,[28,[35,6],[[30,4],1],null]],[1,\"\\n                        \"],[13],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,\"\\n                        \"],[8,[39,1],[[24,0,\"text-decoration-none fw-semibold\"]],[[\"@route\",\"@model\"],[\"player-profile\",[30,3,[\"player_id\"]]]],[[\"default\"],[[[[1,\"\\n                          \"],[1,[30,3,[\"player_name\"]]],[1,\"\\n                        \"]],[]]]]],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-end fw-bold\"],[12],[1,[30,3,[\"net_score\"]]],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[3,4]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[1,\"      \"],[10,0],[14,0,\"col-lg-6\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"d-flex justify-content-between align-items-center mb-3\"],[12],[1,\"\\n              \"],[10,\"h5\"],[14,0,\"fw-bold mb-0\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill text-success\"],[12],[13],[1,\" Top Bulls\"],[13],[1,\"\\n              \"],[8,[39,1],[[24,0,\"btn btn-sm btn-outline-secondary\"]],[[\"@route\"],[\"leaderboard\"]],[[\"default\"],[[[[1,\"See All\"]],[]]]]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n              \"],[10,\"table\"],[14,0,\"table table-sm mb-0\"],[12],[1,\"\\n                \"],[10,\"thead\"],[12],[1,\"\\n                  \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"#\"],[13],[10,\"th\"],[12],[1,\"Bull\"],[13],[10,\"th\"],[14,0,\"text-end\"],[12],[1,\"Avg Difficulty\"],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"model\",\"leaderboard\",\"topBulls\"]]],null]],null],null,[[[1,\"                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"td\"],[12],[1,\"\\n                        \"],[10,1],[15,0,[29,[\"leaderboard-rank \",[52,[28,[37,5],[[30,6],0],null],\"gold\",[52,[28,[37,5],[[30,6],1],null],\"silver\",[52,[28,[37,5],[[30,6],2],null],\"bronze\",\"default\"]]]]]],[12],[1,\"\\n                          \"],[1,[28,[35,6],[[30,6],1],null]],[1,\"\\n                        \"],[13],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,\"\\n                        \"],[8,[39,1],[[24,0,\"text-decoration-none fw-semibold\"]],[[\"@route\",\"@model\"],[\"bull-profile\",[30,5,[\"bull_id\"]]]],[[\"default\"],[[[[1,\"\\n                          \"],[1,[30,5,[\"bull_name\"]]],[1,\"\\n                        \"]],[]]]]],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-end fw-bold\"],[12],[1,[30,5,[\"avg_difficulty\"]]],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[5,6]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"card bg-dark text-white\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body text-center py-4\"],[12],[1,\"\\n\"],[41,[30,0,[\"auth\",\"isAuthenticated\"]],[[[1,\"        \"],[10,\"h5\"],[14,0,\"fw-bold\"],[12],[1,\"Ready to compete?\"],[13],[1,\"\\n        \"],[10,2],[14,0,\"text-white-50 mb-3\"],[12],[1,\"Browse available matches and register\"],[13],[1,\"\\n        \"],[10,0],[14,0,\"d-flex gap-2 justify-content-center\"],[12],[1,\"\\n\"],[41,[30,0,[\"auth\",\"isPlayer\"]],[[[1,\"            \"],[8,[39,1],[[24,0,\"btn btn-accent px-4\"]],[[\"@route\"],[\"my-matches\"]],[[\"default\"],[[[[1,\"\\n              \"],[10,\"i\"],[14,0,\"bi bi-flag-fill\"],[12],[13],[1,\" Register for Match\\n            \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"          \"],[8,[39,1],[[24,0,\"btn btn-outline-light px-4\"]],[[\"@route\"],[\"events\"]],[[\"default\"],[[[[1,\"\\n            \"],[10,\"i\"],[14,0,\"bi bi-calendar-event\"],[12],[13],[1,\" Browse Events\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],[[[1,\"        \"],[10,\"h5\"],[14,0,\"fw-bold\"],[12],[1,\"Want to participate?\"],[13],[1,\"\\n        \"],[10,2],[14,0,\"text-white-50 mb-3\"],[12],[1,\"Register as a player or bull owner\"],[13],[1,\"\\n        \"],[10,0],[14,0,\"d-flex gap-2 justify-content-center\"],[12],[1,\"\\n          \"],[8,[39,1],[[24,0,\"btn btn-accent px-4\"]],[[\"@route\"],[\"signup\"]],[[\"default\"],[[[[1,\"\\n            \"],[10,\"i\"],[14,0,\"bi bi-person-plus\"],[12],[13],[1,\" Register Now\\n          \"]],[]]]]],[1,\"\\n          \"],[8,[39,1],[[24,0,\"btn btn-outline-light px-4\"]],[[\"@route\"],[\"login\"]],[[\"default\"],[[[[1,\"\\n            \"],[10,\"i\"],[14,0,\"bi bi-box-arrow-in-right\"],[12],[13],[1,\" Login\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"footer\"],[14,0,\"bg-dark text-white-50 py-4 mt-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"container text-center\"],[12],[1,\"\\n    \"],[10,2],[14,0,\"mb-0\"],[12],[10,\"i\"],[14,0,\"bi bi-trophy-fill text-warning\"],[12],[13],[1,\" Jallikattu Statistics Overlay © 2026\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"match\",\"match\",\"p\",\"index\",\"b\",\"index\"],false,[\"page-title\",\"link-to\",\"if\",\"each\",\"-track-array\",\"eq\",\"add\"]]",
    "moduleName": "jallikattu-frontend/templates/index.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/leaderboard", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Leaderboard"}}
  <div class="container py-4">
    <div class="section-header">
      <h5><i class="bi bi-bar-chart-fill"></i> All-Time Leaderboard</h5>
    </div>
  
    <div class="row g-4">
      {{!-- Players --}}
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h6 class="fw-bold mb-3"><i class="bi bi-trophy-fill text-warning"></i> Top Players</h6>
            {{#if this.model.topPlayers.length}}
              <div class="table-responsive">
                <table class="table table-sm mb-0">
                  <thead>
                    <tr><th>#</th><th>Player</th><th class="text-center">Matches</th><th class="text-center">Caught</th><th class="text-center">Net Score</th></tr>
                  </thead>
                  <tbody>
                    {{#each this.model.topPlayers as |p index|}}
                      <tr>
                        <td>
                          <span class="leaderboard-rank {{if (eq index 0) 'gold' (if (eq index 1) 'silver' (if (eq index 2) 'bronze' 'default'))}}">
                            {{add index 1}}
                          </span>
                        </td>
                        <td>
                          <LinkTo @route="player-profile" @model={{p.player_id}} class="fw-semibold text-decoration-none">
                            {{p.player_name}}
                          </LinkTo>
                        </td>
                        <td class="text-center">{{p.matches_played}}</td>
                        <td class="text-center">{{p.total_caught}}</td>
                        <td class="text-center"><span class="score-net">{{p.net_score}}</span></td>
                      </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            {{else}}
              <div class="empty-state"><i class="bi bi-person-x d-block"></i>No player data</div>
            {{/if}}
          </div>
        </div>
      </div>
  
      {{!-- Bulls --}}
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h6 class="fw-bold mb-3"><i class="bi bi-shield-fill text-success"></i> Top Bulls</h6>
            {{#if this.model.topBulls.length}}
              <div class="table-responsive">
                <table class="table table-sm mb-0">
                  <thead>
                    <tr><th>#</th><th>Bull</th><th>Owner</th><th class="text-center">Avg Difficulty</th></tr>
                  </thead>
                  <tbody>
                    {{#each this.model.topBulls as |b index|}}
                      <tr>
                        <td>
                          <span class="leaderboard-rank {{if (eq index 0) 'gold' (if (eq index 1) 'silver' (if (eq index 2) 'bronze' 'default'))}}">
                            {{add index 1}}
                          </span>
                        </td>
                        <td>
                          <LinkTo @route="bull-profile" @model={{b.bull_id}} class="fw-semibold text-decoration-none">
                            {{b.bull_name}}
                          </LinkTo>
                        </td>
                        <td><small class="text-muted">{{b.owner_name}}</small></td>
                        <td class="text-center fw-bold">{{b.avg_difficulty}}</td>
                      </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            {{else}}
              <div class="empty-state"><i class="bi bi-shield-x d-block"></i>No bull data</div>
            {{/if}}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  */
  {
    "id": "koqpL9r9",
    "block": "[[[1,[28,[35,0],[\"Leaderboard\"],null]],[1,\"\\n\"],[10,0],[14,0,\"container py-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n    \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-bar-chart-fill\"],[12],[13],[1,\" All-Time Leaderboard\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"row g-4\"],[12],[1,\"\\n\"],[1,\"    \"],[10,0],[14,0,\"col-lg-6\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n          \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-trophy-fill text-warning\"],[12],[13],[1,\" Top Players\"],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"topPlayers\",\"length\"]],[[[1,\"            \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n              \"],[10,\"table\"],[14,0,\"table table-sm mb-0\"],[12],[1,\"\\n                \"],[10,\"thead\"],[12],[1,\"\\n                  \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"#\"],[13],[10,\"th\"],[12],[1,\"Player\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Matches\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Caught\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Net Score\"],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"model\",\"topPlayers\"]]],null]],null],null,[[[1,\"                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"td\"],[12],[1,\"\\n                        \"],[10,1],[15,0,[29,[\"leaderboard-rank \",[52,[28,[37,4],[[30,2],0],null],\"gold\",[52,[28,[37,4],[[30,2],1],null],\"silver\",[52,[28,[37,4],[[30,2],2],null],\"bronze\",\"default\"]]]]]],[12],[1,\"\\n                          \"],[1,[28,[35,5],[[30,2],1],null]],[1,\"\\n                        \"],[13],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,\"\\n                        \"],[8,[39,6],[[24,0,\"fw-semibold text-decoration-none\"]],[[\"@route\",\"@model\"],[\"player-profile\",[30,1,[\"player_id\"]]]],[[\"default\"],[[[[1,\"\\n                          \"],[1,[30,1,[\"player_name\"]]],[1,\"\\n                        \"]],[]]]]],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,1,[\"matches_played\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,1,[\"total_caught\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center\"],[12],[10,1],[14,0,\"score-net\"],[12],[1,[30,1,[\"net_score\"]]],[13],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[1,2]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],[[[1,\"            \"],[10,0],[14,0,\"empty-state\"],[12],[10,\"i\"],[14,0,\"bi bi-person-x d-block\"],[12],[13],[1,\"No player data\"],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[1,\"    \"],[10,0],[14,0,\"col-lg-6\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n          \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill text-success\"],[12],[13],[1,\" Top Bulls\"],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"topBulls\",\"length\"]],[[[1,\"            \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n              \"],[10,\"table\"],[14,0,\"table table-sm mb-0\"],[12],[1,\"\\n                \"],[10,\"thead\"],[12],[1,\"\\n                  \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"#\"],[13],[10,\"th\"],[12],[1,\"Bull\"],[13],[10,\"th\"],[12],[1,\"Owner\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Avg Difficulty\"],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"model\",\"topBulls\"]]],null]],null],null,[[[1,\"                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"td\"],[12],[1,\"\\n                        \"],[10,1],[15,0,[29,[\"leaderboard-rank \",[52,[28,[37,4],[[30,4],0],null],\"gold\",[52,[28,[37,4],[[30,4],1],null],\"silver\",[52,[28,[37,4],[[30,4],2],null],\"bronze\",\"default\"]]]]]],[12],[1,\"\\n                          \"],[1,[28,[35,5],[[30,4],1],null]],[1,\"\\n                        \"],[13],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,\"\\n                        \"],[8,[39,6],[[24,0,\"fw-semibold text-decoration-none\"]],[[\"@route\",\"@model\"],[\"bull-profile\",[30,3,[\"bull_id\"]]]],[[\"default\"],[[[[1,\"\\n                          \"],[1,[30,3,[\"bull_name\"]]],[1,\"\\n                        \"]],[]]]]],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,[30,3,[\"owner_name\"]]],[13],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center fw-bold\"],[12],[1,[30,3,[\"avg_difficulty\"]]],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[3,4]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],[[[1,\"            \"],[10,0],[14,0,\"empty-state\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-x d-block\"],[12],[13],[1,\"No bull data\"],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"p\",\"index\",\"b\",\"index\"],false,[\"page-title\",\"if\",\"each\",\"-track-array\",\"eq\",\"add\",\"link-to\"]]",
    "moduleName": "jallikattu-frontend/templates/leaderboard.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/login", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Login"}}
  
  <div class="login-page">
    {{!-- Left hero panel --}}
    <div class="login-hero">
      <div class="position-relative" style="z-index:1;">
        <h1 class="fw-bold mb-3" style="font-size: 2.5rem;">Jallikattu<br>Statistics Overlay</h1>
        <p class="lead opacity-75">Tamil Nadu's premier bull-taming sport management platform.</p>
        <div class="mt-4">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="bg-white bg-opacity-10 rounded-3 p-2"><i class="bi bi-broadcast fs-5"></i></div>
            <span>Live scoring &amp; real-time updates</span>
          </div>
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="bg-white bg-opacity-10 rounded-3 p-2"><i class="bi bi-bar-chart fs-5"></i></div>
            <span>Player &amp; bull career statistics</span>
          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="bg-white bg-opacity-10 rounded-3 p-2"><i class="bi bi-people fs-5"></i></div>
            <span>Event management &amp; registration</span>
          </div>
        </div>
      </div>
    </div>
  
    {{!-- Right login form --}}
    <div class="login-form-section">
      <div style="max-width: 360px; margin: 0 auto;">
        <div class="mb-4">
          <h3 class="fw-bold"><i class="bi bi-trophy-fill text-accent"></i> Welcome back</h3>
          <p class="text-muted">Sign in to your account</p>
        </div>
  
        {{#if this.error}}
          <div class="alert alert-danger py-2">
            <i class="bi bi-exclamation-triangle"></i> {{this.error}}
          </div>
        {{/if}}
  
        <form {{on "submit" this.login}}>
          <div class="mb-3">
            <label class="form-label fw-semibold" for="username">Username</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input type="text" class="form-control" id="username" placeholder="Enter username"
                value={{this.username}} {{on "input" (fn this.updateField "username")}} required autofocus>
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label fw-semibold" for="password">Password</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input type="password" class="form-control" id="password" placeholder="Enter password"
                value={{this.password}} {{on "input" (fn this.updateField "password")}} required>
            </div>
          </div>
          <button type="submit" class="btn btn-accent w-100 py-2" disabled={{this.isLoading}}>
            {{#if this.isLoading}}
              <span class="spinner-border spinner-border-sm"></span> Signing in...
            {{else}}
              <i class="bi bi-box-arrow-in-right"></i> Sign In
            {{/if}}
          </button>
        </form>
  
        <div class="text-center mt-4">
          <span class="text-muted">Don't have an account?</span>
          <LinkTo @route="signup" class="text-accent fw-semibold ms-1">Register</LinkTo>
        </div>
        <div class="text-center mt-2">
          <LinkTo @route="index" class="text-muted small"><i class="bi bi-arrow-left"></i> Browse public stats</LinkTo>
        </div>
      </div>
    </div>
  </div>
  
  */
  {
    "id": "8FRJ33Ma",
    "block": "[[[1,[28,[35,0],[\"Login\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"login-page\"],[12],[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"login-hero\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"position-relative\"],[14,5,\"z-index:1;\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,0,\"fw-bold mb-3\"],[14,5,\"font-size: 2.5rem;\"],[12],[1,\"Jallikattu\"],[10,\"br\"],[12],[13],[1,\"Statistics Overlay\"],[13],[1,\"\\n      \"],[10,2],[14,0,\"lead opacity-75\"],[12],[1,\"Tamil Nadu's premier bull-taming sport management platform.\"],[13],[1,\"\\n      \"],[10,0],[14,0,\"mt-4\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"d-flex align-items-center gap-3 mb-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"bg-white bg-opacity-10 rounded-3 p-2\"],[12],[10,\"i\"],[14,0,\"bi bi-broadcast fs-5\"],[12],[13],[13],[1,\"\\n          \"],[10,1],[12],[1,\"Live scoring & real-time updates\"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"d-flex align-items-center gap-3 mb-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"bg-white bg-opacity-10 rounded-3 p-2\"],[12],[10,\"i\"],[14,0,\"bi bi-bar-chart fs-5\"],[12],[13],[13],[1,\"\\n          \"],[10,1],[12],[1,\"Player & bull career statistics\"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"d-flex align-items-center gap-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"bg-white bg-opacity-10 rounded-3 p-2\"],[12],[10,\"i\"],[14,0,\"bi bi-people fs-5\"],[12],[13],[13],[1,\"\\n          \"],[10,1],[12],[1,\"Event management & registration\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"login-form-section\"],[12],[1,\"\\n    \"],[10,0],[14,5,\"max-width: 360px; margin: 0 auto;\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"mb-4\"],[12],[1,\"\\n        \"],[10,\"h3\"],[14,0,\"fw-bold\"],[12],[10,\"i\"],[14,0,\"bi bi-trophy-fill text-accent\"],[12],[13],[1,\" Welcome back\"],[13],[1,\"\\n        \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"Sign in to your account\"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"error\"]],[[[1,\"        \"],[10,0],[14,0,\"alert alert-danger py-2\"],[12],[1,\"\\n          \"],[10,\"i\"],[14,0,\"bi bi-exclamation-triangle\"],[12],[13],[1,\" \"],[1,[30,0,[\"error\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[11,\"form\"],[4,[38,2],[\"submit\",[30,0,[\"login\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[14,\"for\",\"username\"],[12],[1,\"Username\"],[13],[1,\"\\n          \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n            \"],[10,1],[14,0,\"input-group-text\"],[12],[10,\"i\"],[14,0,\"bi bi-person\"],[12],[13],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[24,1,\"username\"],[24,\"placeholder\",\"Enter username\"],[16,2,[30,0,[\"username\"]]],[24,\"required\",\"\"],[24,\"autofocus\",\"\"],[24,4,\"text\"],[4,[38,2],[\"input\",[28,[37,3],[[30,0,[\"updateField\"]],\"username\"],null]],null],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"mb-4\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[14,\"for\",\"password\"],[12],[1,\"Password\"],[13],[1,\"\\n          \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n            \"],[10,1],[14,0,\"input-group-text\"],[12],[10,\"i\"],[14,0,\"bi bi-lock\"],[12],[13],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[24,1,\"password\"],[24,\"placeholder\",\"Enter password\"],[16,2,[30,0,[\"password\"]]],[24,\"required\",\"\"],[24,4,\"password\"],[4,[38,2],[\"input\",[28,[37,3],[[30,0,[\"updateField\"]],\"password\"],null]],null],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-accent w-100 py-2\"],[15,\"disabled\",[30,0,[\"isLoading\"]]],[14,4,\"submit\"],[12],[1,\"\\n\"],[41,[30,0,[\"isLoading\"]],[[[1,\"            \"],[10,1],[14,0,\"spinner-border spinner-border-sm\"],[12],[13],[1,\" Signing in...\\n\"]],[]],[[[1,\"            \"],[10,\"i\"],[14,0,\"bi bi-box-arrow-in-right\"],[12],[13],[1,\" Sign In\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"text-center mt-4\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"text-muted\"],[12],[1,\"Don't have an account?\"],[13],[1,\"\\n        \"],[8,[39,4],[[24,0,\"text-accent fw-semibold ms-1\"]],[[\"@route\"],[\"signup\"]],[[\"default\"],[[[[1,\"Register\"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"text-center mt-2\"],[12],[1,\"\\n        \"],[8,[39,4],[[24,0,\"text-muted small\"]],[[\"@route\"],[\"index\"]],[[\"default\"],[[[[10,\"i\"],[14,0,\"bi bi-arrow-left\"],[12],[13],[1,\" Browse public stats\"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"page-title\",\"if\",\"on\",\"fn\",\"link-to\"]]",
    "moduleName": "jallikattu-frontend/templates/login.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/match-control", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Match Control"}}
  
  <div class="section-header d-flex justify-content-between align-items-center flex-wrap gap-2">
    <h5><i class="bi bi-sliders2"></i> Match Control Panel</h5>
    {{#if this.matchStatus}}
      <div class="d-flex align-items-center gap-2">
        <span class="status-badge {{if (eq this.matchStatus 'Live') 'live' (if (eq this.matchStatus 'Completed') 'completed' 'scheduled')}}">
          {{this.matchStatus}}
        </span>
        {{#if (eq this.matchStatus "Scheduled")}}
          <button class="btn btn-success btn-sm" type="button" {{on "click" (fn this.updateMatchStatus "Live")}}>
            <i class="bi bi-play-circle-fill"></i> Go Live
          </button>
        {{/if}}
        {{#if (eq this.matchStatus "Live")}}
          <button class="btn btn-outline-danger btn-sm" type="button" {{on "click" (fn this.updateMatchStatus "Completed")}}>
            <i class="bi bi-stop-circle-fill"></i> End Match
          </button>
        {{/if}}
      </div>
    {{/if}}
  </div>
  
  {{!-- Toast --}}
  {{#if this.statusMessage}}
    <div class="toast-notification {{this.statusType}}" role="alert">
      <i class="bi {{if (eq this.statusType 'success') 'bi-check-circle-fill' 'bi-exclamation-triangle-fill'}}"></i>
      {{this.statusMessage}}
    </div>
  {{/if}}
  
  {{!-- Match Selector --}}
  <div class="card mb-4">
    <div class="card-body py-3">
      <div class="row align-items-center g-3">
        <div class="col-md-5">
          <label class="form-label fw-semibold mb-1">Select Match</label>
          <select class="form-select" {{on "change" this.loadMatch}}>
            <option value="">-- Choose a Match --</option>
            {{#if (gt this.liveMatchCount 0)}}
              <optgroup label="&#x1F534; Live">
                {{#each @model.matches as |m|}}
                  {{#if (eq m.status "Live")}}
                    <option value={{m.match_id}} selected={{eq (to-string m.match_id) (to-string this.selectedMatchId)}}>
                      {{m.match_name}}
                    </option>
                  {{/if}}
                {{/each}}
              </optgroup>
            {{/if}}
            {{#if (gt this.scheduledMatchCount 0)}}
              <optgroup label="&#x1F7E1; Scheduled">
                {{#each @model.matches as |m|}}
                  {{#if (eq m.status "Scheduled")}}
                    <option value={{m.match_id}} selected={{eq (to-string m.match_id) (to-string this.selectedMatchId)}}>
                      {{m.match_name}}
                    </option>
                  {{/if}}
                {{/each}}
              </optgroup>
            {{/if}}
            <optgroup label="Completed">
              {{#each @model.matches as |m|}}
                {{#if (eq m.status "Completed")}}
                  <option value={{m.match_id}} selected={{eq (to-string m.match_id) (to-string this.selectedMatchId)}}>
                    {{m.match_name}}
                  </option>
                {{/if}}
              {{/each}}
            </optgroup>
          </select>
        </div>
        {{#if this.selectedMatch}}
          <div class="col-md-7">
            <div class="d-flex flex-wrap gap-3 text-muted small mt-md-4">
              <span><i class="bi bi-geo-alt-fill text-danger"></i> {{this.selectedMatch.location}}</span>
              <span><i class="bi bi-calendar3 text-primary"></i> {{this.selectedMatch.match_date}}</span>
              <span><i class="bi bi-building text-secondary"></i> {{this.selectedMatch.organizer_name}}</span>
            </div>
          </div>
        {{/if}}
      </div>
    </div>
  </div>
  
  {{#if this.isLoading}}
    <div class="text-center py-5">
      <div class="spinner-border text-primary" style="width:3rem;height:3rem;" role="status"></div>
      <p class="mt-2 text-muted">Loading match data...</p>
    </div>
  {{else if this.scoringData}}
  
    {{!-- Tab Navigation --}}
    <div class="tab-nav mb-3">
      <button class="tab-btn {{if (eq this.activeTab 'players') 'active'}}" type="button" {{on "click" (fn this.switchTab "players")}}>
        <i class="bi bi-person-arms-up"></i> Player Scores
        <span class="badge bg-primary ms-1">{{this.scoringData.playerScores.length}}</span>
      </button>
      <button class="tab-btn {{if (eq this.activeTab 'bulls') 'active'}}" type="button" {{on "click" (fn this.switchTab "bulls")}}>
        <i class="bi bi-shield-fill"></i> Bull Scores
        <span class="badge bg-danger ms-1">{{this.scoringData.bullScores.length}}</span>
      </button>
      <button class="tab-btn {{if (eq this.activeTab 'interactions') 'active'}}" type="button" {{on "click" (fn this.switchTab "interactions")}}>
        <i class="bi bi-arrow-left-right"></i> Interactions
        <span class="badge bg-info ms-1">{{this.scoringData.interactions.length}}</span>
      </button>
    </div>
  
    {{!-- ═══════ PLAYER SCORES TAB ═══════ --}}
    {{#if (eq this.activeTab "players")}}
      <div class="score-panel">
        <div class="score-panel-header d-flex justify-content-between align-items-center">
          <span><i class="bi bi-person-arms-up"></i> Player Score Entry</span>
          {{#if this.isLive}}
            <button class="btn btn-success btn-sm" type="button"
              disabled={{this.isSaving}}
              {{on "click" this.saveAllScores}}>
              {{#if this.isSaving}}
                <span class="spinner-border spinner-border-sm"></span> Saving...
              {{else}}
                <i class="bi bi-floppy-fill"></i> Save All Scores
              {{/if}}
            </button>
          {{/if}}
        </div>
  
        {{#each this.scoringData.playerScores as |p|}}
          <div class="score-row">
            <div class="score-row-header">
              <div>
                <strong>{{p.player_name}}</strong>
                <span class="badge bg-secondary ms-2">{{p.round_name}}</span>
                <small class="text-muted ms-2">Batch: {{p.batch_name}}</small>
              </div>
              <div class="d-flex align-items-center gap-3">
                <span class="fw-bold" style="font-size:1.1rem; color:var(--accent);">
                  Net: {{p.net_score}}
                </span>
              </div>
            </div>
            <div class="score-row-inputs">
              <div class="score-input-group">
                <label>Bulls Caught</label>
                {{#if this.isLive}}
                  <input type="number" class="score-input success" value={{p.bull_caught}} min="0"
                    id="p-bc-{{p.player_id}}-{{p.round_type_id}}">
                {{else}}
                  <div class="score-display success">{{p.bull_caught}}</div>
                {{/if}}
              </div>
              <div class="score-input-group">
                <label>Penalties</label>
                {{#if this.isLive}}
                  <input type="number" class="score-input danger" value={{p.penalties}} min="0"
                    id="p-pen-{{p.player_id}}-{{p.round_type_id}}">
                {{else}}
                  <div class="score-display danger">{{p.penalties}}</div>
                {{/if}}
              </div>
            </div>
          </div>
        {{else}}
          <div class="empty-state py-4">
            <i class="bi bi-person-x"></i>
            <p>No approved players for this match</p>
            <LinkTo @route="registration" class="btn btn-outline-primary btn-sm">Register Players</LinkTo>
          </div>
        {{/each}}
      </div>
    {{/if}}
  
    {{!-- ═══════ BULL SCORES TAB ═══════ --}}
    {{#if (eq this.activeTab "bulls")}}
      <div class="score-panel">
        <div class="score-panel-header d-flex justify-content-between align-items-center">
          <span><i class="bi bi-shield-fill"></i> Bull Score Entry</span>
          {{#if this.isLive}}
            <button class="btn btn-success btn-sm" type="button"
              disabled={{this.isSaving}}
              {{on "click" this.saveAllScores}}>
              {{#if this.isSaving}}
                <span class="spinner-border spinner-border-sm"></span> Saving...
              {{else}}
                <i class="bi bi-floppy-fill"></i> Save All Scores
              {{/if}}
            </button>
          {{/if}}
        </div>
  
        {{#each this.scoringData.bullScores as |b|}}
          <div class="score-row">
            <div class="score-row-header">
              <div>
                <strong>{{b.bull_name}}</strong>
                <span class="badge bg-secondary ms-2">{{b.round_name}}</span>
                <small class="text-muted ms-2">Tamer: {{b.tamer_name}}</small>
              </div>
              <div>
                <span class="text-muted small">Releases: <strong>{{b.release_count}}</strong></span>
              </div>
            </div>
            <div class="score-row-inputs">
              <div class="score-input-group">
                <label>Aggression</label>
                {{#if this.isLive}}
                  <input type="number" class="score-input" value={{b.aggression}} min="0" max="10"
                    id="b-agg-{{b.bull_id}}-{{b.round_type_id}}">
                {{else}}
                  <div class="score-display">{{b.aggression}}</div>
                {{/if}}
              </div>
              <div class="score-input-group">
                <label>Play Area</label>
                {{#if this.isLive}}
                  <input type="number" class="score-input" value={{b.play_area}} min="0" max="10"
                    id="b-pa-{{b.bull_id}}-{{b.round_type_id}}">
                {{else}}
                  <div class="score-display">{{b.play_area}}</div>
                {{/if}}
              </div>
              <div class="score-input-group">
                <label>Difficulty</label>
                {{#if this.isLive}}
                  <input type="number" class="score-input danger" value={{b.difficulty}} min="0" max="10"
                    id="b-diff-{{b.bull_id}}-{{b.round_type_id}}">
                {{else}}
                  <div class="score-display danger">{{b.difficulty}}</div>
                {{/if}}
              </div>
            </div>
          </div>
        {{else}}
          <div class="empty-state py-4">
            <i class="bi bi-shield-x"></i>
            <p>No approved bulls for this match</p>
            <LinkTo @route="registration" class="btn btn-outline-primary btn-sm">Register Bulls</LinkTo>
          </div>
        {{/each}}
      </div>
    {{/if}}
  
    {{!-- ═══════ INTERACTIONS TAB ═══════ --}}
    {{#if (eq this.activeTab "interactions")}}
      {{!-- Add Interaction Form (Live only) --}}
      {{#if this.isLive}}
        <div class="card mb-3 border-info">
          <div class="card-body">
            <h6 class="fw-bold mb-3"><i class="bi bi-plus-circle-fill text-info"></i> Record Interaction</h6>
            <form {{on "submit" this.addInteraction}}>
              <div class="row g-2">
                <div class="col-md-3 col-6">
                  <label class="form-label small fw-semibold">Player</label>
                  <select name="player_id" class="form-select form-select-sm" required>
                    <option value="">Select...</option>
                    {{#each this.scoringData.approvedPlayers as |p|}}
                      <option value={{p.player_id}}>{{p.player_name}}</option>
                    {{/each}}
                  </select>
                </div>
                <div class="col-md-2 col-6">
                  <label class="form-label small fw-semibold">Bull</label>
                  <select name="bull_id" class="form-select form-select-sm" required>
                    <option value="">Select...</option>
                    {{#each this.scoringData.approvedBulls as |b|}}
                      <option value={{b.bull_id}}>{{b.bull_name}}</option>
                    {{/each}}
                  </select>
                </div>
                <div class="col-md-2 col-6">
                  <label class="form-label small fw-semibold">Round</label>
                  <select name="round_type_id" class="form-select form-select-sm" required>
                    <option value="">Select...</option>
                    {{#each this.scoringData.roundTypes as |r|}}
                      <option value={{r.round_type_id}}>{{r.round_name}}</option>
                    {{/each}}
                  </select>
                </div>
                <div class="col-md-2 col-6">
                  <label class="form-label small fw-semibold">Hold #</label>
                  <input type="number" name="hold_sequence" class="form-control form-control-sm" min="1" required>
                </div>
                <div class="col-md-2 col-6">
                  <label class="form-label small fw-semibold">Duration (s)</label>
                  <div class="input-group input-group-sm">
                    <input type="number" name="hold_duration" class="form-control form-control-sm" min="0" step="0.1" required>
                    {{#if this.timerRunning}}
                      <button type="button" class="btn btn-danger btn-sm stopwatch-btn stopwatch-active"
                        title="Release to stop"
                        {{on "mouseup" this.stopTimer}}
                        {{on "mouseleave" this.stopTimer}}
                        {{on "touchend" this.stopTimer}}>
                        <i class="bi bi-stopwatch-fill"></i> {{this.timerDisplay}}s
                      </button>
                    {{else}}
                      <button type="button" class="btn btn-outline-warning btn-sm stopwatch-btn"
                        title="Hold to time"
                        {{on "mousedown" this.startTimer}}
                        {{on "touchstart" this.startTimer}}>
                        <i class="bi bi-stopwatch"></i>
                        {{#if (not-eq this.timerDisplay "0.0")}}
                          {{this.timerDisplay}}s
                        {{/if}}
                      </button>
                    {{/if}}
                  </div>
                  {{#if (not-eq this.timerDisplay "0.0")}}
                    <button type="button" class="btn btn-link btn-sm text-muted p-0 mt-1" {{on "click" this.resetTimer}}>
                      <i class="bi bi-arrow-counterclockwise"></i> reset
                    </button>
                  {{/if}}
                </div>
                <div class="col-md-1 col-6 d-flex align-items-end">
                  <button type="submit" class="btn btn-info btn-sm text-white w-100">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      {{/if}}
  
      {{!-- Interaction Log --}}
      <div class="card">
        <div class="card-body table-responsive p-0">
          <table class="table table-hover table-sm align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Player</th>
                <th>Bull</th>
                <th>Round</th>
                <th class="text-center">Sequence</th>
                <th class="text-center">Duration</th>
              </tr>
            </thead>
            <tbody>
              {{#each this.scoringData.interactions as |i|}}
                <tr>
                  <td class="fw-semibold">{{i.player_name}}</td>
                  <td>{{i.bull_name}}</td>
                  <td><span class="badge bg-secondary">{{i.round_name}}</span></td>
                  <td class="text-center">{{i.hold_sequence}}</td>
                  <td class="text-center"><span class="badge bg-primary">{{i.hold_duration}}s</span></td>
                </tr>
              {{else}}
                <tr>
                  <td colspan="5">
                    <div class="empty-state py-3">
                      <i class="bi bi-arrow-left-right"></i>
                      <p>No interactions recorded yet</p>
                    </div>
                  </td>
                </tr>
              {{/each}}
            </tbody>
          </table>
        </div>
      </div>
    {{/if}}
  
  {{else}}
    <div class="empty-state py-5">
      <i class="bi bi-sliders2" style="font-size:3rem;"></i>
      <h5 class="mt-3">Select a Match to Begin Scoring</h5>
      <p class="text-muted">Choose a match from the dropdown above.<br>
        Only <strong>Live</strong> matches can be edited. Set a <strong>Scheduled</strong> match to Live to start.</p>
    </div>
  {{/if}}
  
  */
  {
    "id": "Kj2DQZ4m",
    "block": "[[[1,[28,[35,0],[\"Match Control\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header d-flex justify-content-between align-items-center flex-wrap gap-2\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-sliders2\"],[12],[13],[1,\" Match Control Panel\"],[13],[1,\"\\n\"],[41,[30,0,[\"matchStatus\"]],[[[1,\"    \"],[10,0],[14,0,\"d-flex align-items-center gap-2\"],[12],[1,\"\\n      \"],[10,1],[15,0,[29,[\"status-badge \",[52,[28,[37,2],[[30,0,[\"matchStatus\"]],\"Live\"],null],\"live\",[52,[28,[37,2],[[30,0,[\"matchStatus\"]],\"Completed\"],null],\"completed\",\"scheduled\"]]]]],[12],[1,\"\\n        \"],[1,[30,0,[\"matchStatus\"]]],[1,\"\\n      \"],[13],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"matchStatus\"]],\"Scheduled\"],null],[[[1,\"        \"],[11,\"button\"],[24,0,\"btn btn-success btn-sm\"],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"updateMatchStatus\"]],\"Live\"],null]],null],[12],[1,\"\\n          \"],[10,\"i\"],[14,0,\"bi bi-play-circle-fill\"],[12],[13],[1,\" Go Live\\n        \"],[13],[1,\"\\n\"]],[]],null],[41,[28,[37,2],[[30,0,[\"matchStatus\"]],\"Live\"],null],[[[1,\"        \"],[11,\"button\"],[24,0,\"btn btn-outline-danger btn-sm\"],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"updateMatchStatus\"]],\"Completed\"],null]],null],[12],[1,\"\\n          \"],[10,\"i\"],[14,0,\"bi bi-stop-circle-fill\"],[12],[13],[1,\" End Match\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[41,[30,0,[\"statusMessage\"]],[[[1,\"  \"],[10,0],[15,0,[29,[\"toast-notification \",[30,0,[\"statusType\"]]]]],[14,\"role\",\"alert\"],[12],[1,\"\\n    \"],[10,\"i\"],[15,0,[29,[\"bi \",[52,[28,[37,2],[[30,0,[\"statusType\"]],\"success\"],null],\"bi-check-circle-fill\",\"bi-exclamation-triangle-fill\"]]]],[12],[13],[1,\"\\n    \"],[1,[30,0,[\"statusMessage\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"card-body py-3\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"row align-items-center g-3\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"col-md-5\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"form-label fw-semibold mb-1\"],[12],[1,\"Select Match\"],[13],[1,\"\\n        \"],[11,\"select\"],[24,0,\"form-select\"],[4,[38,3],[\"change\",[30,0,[\"loadMatch\"]]],null],[12],[1,\"\\n          \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"-- Choose a Match --\"],[13],[1,\"\\n\"],[41,[28,[37,5],[[30,0,[\"liveMatchCount\"]],0],null],[[[1,\"            \"],[10,\"optgroup\"],[14,\"label\",\" Live\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,1,[\"matches\"]]],null]],null],null,[[[41,[28,[37,2],[[30,2,[\"status\"]],\"Live\"],null],[[[1,\"                  \"],[10,\"option\"],[15,2,[30,2,[\"match_id\"]]],[15,\"selected\",[28,[37,2],[[28,[37,8],[[30,2,[\"match_id\"]]],null],[28,[37,8],[[30,0,[\"selectedMatchId\"]]],null]],null]],[12],[1,\"\\n                    \"],[1,[30,2,[\"match_name\"]]],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null]],[2]],null],[1,\"            \"],[13],[1,\"\\n\"]],[]],null],[41,[28,[37,5],[[30,0,[\"scheduledMatchCount\"]],0],null],[[[1,\"            \"],[10,\"optgroup\"],[14,\"label\",\" Scheduled\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,1,[\"matches\"]]],null]],null],null,[[[41,[28,[37,2],[[30,3,[\"status\"]],\"Scheduled\"],null],[[[1,\"                  \"],[10,\"option\"],[15,2,[30,3,[\"match_id\"]]],[15,\"selected\",[28,[37,2],[[28,[37,8],[[30,3,[\"match_id\"]]],null],[28,[37,8],[[30,0,[\"selectedMatchId\"]]],null]],null]],[12],[1,\"\\n                    \"],[1,[30,3,[\"match_name\"]]],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null]],[3]],null],[1,\"            \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[10,\"optgroup\"],[14,\"label\",\"Completed\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,1,[\"matches\"]]],null]],null],null,[[[41,[28,[37,2],[[30,4,[\"status\"]],\"Completed\"],null],[[[1,\"                \"],[10,\"option\"],[15,2,[30,4,[\"match_id\"]]],[15,\"selected\",[28,[37,2],[[28,[37,8],[[30,4,[\"match_id\"]]],null],[28,[37,8],[[30,0,[\"selectedMatchId\"]]],null]],null]],[12],[1,\"\\n                  \"],[1,[30,4,[\"match_name\"]]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null]],[4]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"],[41,[30,0,[\"selectedMatch\"]],[[[1,\"        \"],[10,0],[14,0,\"col-md-7\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"d-flex flex-wrap gap-3 text-muted small mt-md-4\"],[12],[1,\"\\n            \"],[10,1],[12],[10,\"i\"],[14,0,\"bi bi-geo-alt-fill text-danger\"],[12],[13],[1,\" \"],[1,[30,0,[\"selectedMatch\",\"location\"]]],[13],[1,\"\\n            \"],[10,1],[12],[10,\"i\"],[14,0,\"bi bi-calendar3 text-primary\"],[12],[13],[1,\" \"],[1,[30,0,[\"selectedMatch\",\"match_date\"]]],[13],[1,\"\\n            \"],[10,1],[12],[10,\"i\"],[14,0,\"bi bi-building text-secondary\"],[12],[13],[1,\" \"],[1,[30,0,[\"selectedMatch\",\"organizer_name\"]]],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"isLoading\"]],[[[1,\"  \"],[10,0],[14,0,\"text-center py-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"spinner-border text-primary\"],[14,5,\"width:3rem;height:3rem;\"],[14,\"role\",\"status\"],[12],[13],[1,\"\\n    \"],[10,2],[14,0,\"mt-2 text-muted\"],[12],[1,\"Loading match data...\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"scoringData\"]],[[[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"tab-nav mb-3\"],[12],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"tab-btn \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"players\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"switchTab\"]],\"players\"],null]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-person-arms-up\"],[12],[13],[1,\" Player Scores\\n      \"],[10,1],[14,0,\"badge bg-primary ms-1\"],[12],[1,[30,0,[\"scoringData\",\"playerScores\",\"length\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"tab-btn \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"bulls\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"switchTab\"]],\"bulls\"],null]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\" Bull Scores\\n      \"],[10,1],[14,0,\"badge bg-danger ms-1\"],[12],[1,[30,0,[\"scoringData\",\"bullScores\",\"length\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"tab-btn \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"interactions\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"switchTab\"]],\"interactions\"],null]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-arrow-left-right\"],[12],[13],[1,\" Interactions\\n      \"],[10,1],[14,0,\"badge bg-info ms-1\"],[12],[1,[30,0,[\"scoringData\",\"interactions\",\"length\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"players\"],null],[[[1,\"    \"],[10,0],[14,0,\"score-panel\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"score-panel-header d-flex justify-content-between align-items-center\"],[12],[1,\"\\n        \"],[10,1],[12],[10,\"i\"],[14,0,\"bi bi-person-arms-up\"],[12],[13],[1,\" Player Score Entry\"],[13],[1,\"\\n\"],[41,[30,0,[\"isLive\"]],[[[1,\"          \"],[11,\"button\"],[24,0,\"btn btn-success btn-sm\"],[16,\"disabled\",[30,0,[\"isSaving\"]]],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"saveAllScores\"]]],null],[12],[1,\"\\n\"],[41,[30,0,[\"isSaving\"]],[[[1,\"              \"],[10,1],[14,0,\"spinner-border spinner-border-sm\"],[12],[13],[1,\" Saving...\\n\"]],[]],[[[1,\"              \"],[10,\"i\"],[14,0,\"bi bi-floppy-fill\"],[12],[13],[1,\" Save All Scores\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"scoringData\",\"playerScores\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"score-row\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"score-row-header\"],[12],[1,\"\\n            \"],[10,0],[12],[1,\"\\n              \"],[10,\"strong\"],[12],[1,[30,5,[\"player_name\"]]],[13],[1,\"\\n              \"],[10,1],[14,0,\"badge bg-secondary ms-2\"],[12],[1,[30,5,[\"round_name\"]]],[13],[1,\"\\n              \"],[10,\"small\"],[14,0,\"text-muted ms-2\"],[12],[1,\"Batch: \"],[1,[30,5,[\"batch_name\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"d-flex align-items-center gap-3\"],[12],[1,\"\\n              \"],[10,1],[14,0,\"fw-bold\"],[14,5,\"font-size:1.1rem; color:var(--accent);\"],[12],[1,\"\\n                Net: \"],[1,[30,5,[\"net_score\"]]],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"score-row-inputs\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"score-input-group\"],[12],[1,\"\\n              \"],[10,\"label\"],[12],[1,\"Bulls Caught\"],[13],[1,\"\\n\"],[41,[30,0,[\"isLive\"]],[[[1,\"                \"],[10,\"input\"],[14,0,\"score-input success\"],[15,2,[30,5,[\"bull_caught\"]]],[14,\"min\",\"0\"],[15,1,[29,[\"p-bc-\",[30,5,[\"player_id\"]],\"-\",[30,5,[\"round_type_id\"]]]]],[14,4,\"number\"],[12],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,0],[14,0,\"score-display success\"],[12],[1,[30,5,[\"bull_caught\"]]],[13],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"score-input-group\"],[12],[1,\"\\n              \"],[10,\"label\"],[12],[1,\"Penalties\"],[13],[1,\"\\n\"],[41,[30,0,[\"isLive\"]],[[[1,\"                \"],[10,\"input\"],[14,0,\"score-input danger\"],[15,2,[30,5,[\"penalties\"]]],[14,\"min\",\"0\"],[15,1,[29,[\"p-pen-\",[30,5,[\"player_id\"]],\"-\",[30,5,[\"round_type_id\"]]]]],[14,4,\"number\"],[12],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,0],[14,0,\"score-display danger\"],[12],[1,[30,5,[\"penalties\"]]],[13],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[5]],[[[1,\"        \"],[10,0],[14,0,\"empty-state py-4\"],[12],[1,\"\\n          \"],[10,\"i\"],[14,0,\"bi bi-person-x\"],[12],[13],[1,\"\\n          \"],[10,2],[12],[1,\"No approved players for this match\"],[13],[1,\"\\n          \"],[8,[39,9],[[24,0,\"btn btn-outline-primary btn-sm\"]],[[\"@route\"],[\"registration\"]],[[\"default\"],[[[[1,\"Register Players\"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"bulls\"],null],[[[1,\"    \"],[10,0],[14,0,\"score-panel\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"score-panel-header d-flex justify-content-between align-items-center\"],[12],[1,\"\\n        \"],[10,1],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\" Bull Score Entry\"],[13],[1,\"\\n\"],[41,[30,0,[\"isLive\"]],[[[1,\"          \"],[11,\"button\"],[24,0,\"btn btn-success btn-sm\"],[16,\"disabled\",[30,0,[\"isSaving\"]]],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"saveAllScores\"]]],null],[12],[1,\"\\n\"],[41,[30,0,[\"isSaving\"]],[[[1,\"              \"],[10,1],[14,0,\"spinner-border spinner-border-sm\"],[12],[13],[1,\" Saving...\\n\"]],[]],[[[1,\"              \"],[10,\"i\"],[14,0,\"bi bi-floppy-fill\"],[12],[13],[1,\" Save All Scores\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"scoringData\",\"bullScores\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"score-row\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"score-row-header\"],[12],[1,\"\\n            \"],[10,0],[12],[1,\"\\n              \"],[10,\"strong\"],[12],[1,[30,6,[\"bull_name\"]]],[13],[1,\"\\n              \"],[10,1],[14,0,\"badge bg-secondary ms-2\"],[12],[1,[30,6,[\"round_name\"]]],[13],[1,\"\\n              \"],[10,\"small\"],[14,0,\"text-muted ms-2\"],[12],[1,\"Tamer: \"],[1,[30,6,[\"tamer_name\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[12],[1,\"\\n              \"],[10,1],[14,0,\"text-muted small\"],[12],[1,\"Releases: \"],[10,\"strong\"],[12],[1,[30,6,[\"release_count\"]]],[13],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"score-row-inputs\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"score-input-group\"],[12],[1,\"\\n              \"],[10,\"label\"],[12],[1,\"Aggression\"],[13],[1,\"\\n\"],[41,[30,0,[\"isLive\"]],[[[1,\"                \"],[10,\"input\"],[14,0,\"score-input\"],[15,2,[30,6,[\"aggression\"]]],[14,\"min\",\"0\"],[14,\"max\",\"10\"],[15,1,[29,[\"b-agg-\",[30,6,[\"bull_id\"]],\"-\",[30,6,[\"round_type_id\"]]]]],[14,4,\"number\"],[12],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,0],[14,0,\"score-display\"],[12],[1,[30,6,[\"aggression\"]]],[13],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"score-input-group\"],[12],[1,\"\\n              \"],[10,\"label\"],[12],[1,\"Play Area\"],[13],[1,\"\\n\"],[41,[30,0,[\"isLive\"]],[[[1,\"                \"],[10,\"input\"],[14,0,\"score-input\"],[15,2,[30,6,[\"play_area\"]]],[14,\"min\",\"0\"],[14,\"max\",\"10\"],[15,1,[29,[\"b-pa-\",[30,6,[\"bull_id\"]],\"-\",[30,6,[\"round_type_id\"]]]]],[14,4,\"number\"],[12],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,0],[14,0,\"score-display\"],[12],[1,[30,6,[\"play_area\"]]],[13],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"score-input-group\"],[12],[1,\"\\n              \"],[10,\"label\"],[12],[1,\"Difficulty\"],[13],[1,\"\\n\"],[41,[30,0,[\"isLive\"]],[[[1,\"                \"],[10,\"input\"],[14,0,\"score-input danger\"],[15,2,[30,6,[\"difficulty\"]]],[14,\"min\",\"0\"],[14,\"max\",\"10\"],[15,1,[29,[\"b-diff-\",[30,6,[\"bull_id\"]],\"-\",[30,6,[\"round_type_id\"]]]]],[14,4,\"number\"],[12],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,0],[14,0,\"score-display danger\"],[12],[1,[30,6,[\"difficulty\"]]],[13],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[6]],[[[1,\"        \"],[10,0],[14,0,\"empty-state py-4\"],[12],[1,\"\\n          \"],[10,\"i\"],[14,0,\"bi bi-shield-x\"],[12],[13],[1,\"\\n          \"],[10,2],[12],[1,\"No approved bulls for this match\"],[13],[1,\"\\n          \"],[8,[39,9],[[24,0,\"btn btn-outline-primary btn-sm\"]],[[\"@route\"],[\"registration\"]],[[\"default\"],[[[[1,\"Register Bulls\"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"interactions\"],null],[[[41,[30,0,[\"isLive\"]],[[[1,\"      \"],[10,0],[14,0,\"card mb-3 border-info\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n          \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-plus-circle-fill text-info\"],[12],[13],[1,\" Record Interaction\"],[13],[1,\"\\n          \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"addInteraction\"]]],null],[12],[1,\"\\n            \"],[10,0],[14,0,\"row g-2\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n                \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Player\"],[13],[1,\"\\n                \"],[10,\"select\"],[14,3,\"player_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n                  \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select...\"],[13],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"scoringData\",\"approvedPlayers\"]]],null]],null],null,[[[1,\"                    \"],[10,\"option\"],[15,2,[30,7,[\"player_id\"]]],[12],[1,[30,7,[\"player_name\"]]],[13],[1,\"\\n\"]],[7]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n                \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Bull\"],[13],[1,\"\\n                \"],[10,\"select\"],[14,3,\"bull_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n                  \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select...\"],[13],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"scoringData\",\"approvedBulls\"]]],null]],null],null,[[[1,\"                    \"],[10,\"option\"],[15,2,[30,8,[\"bull_id\"]]],[12],[1,[30,8,[\"bull_name\"]]],[13],[1,\"\\n\"]],[8]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n                \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Round\"],[13],[1,\"\\n                \"],[10,\"select\"],[14,3,\"round_type_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n                  \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select...\"],[13],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"scoringData\",\"roundTypes\"]]],null]],null],null,[[[1,\"                    \"],[10,\"option\"],[15,2,[30,9,[\"round_type_id\"]]],[12],[1,[30,9,[\"round_name\"]]],[13],[1,\"\\n\"]],[9]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n                \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Hold #\"],[13],[1,\"\\n                \"],[10,\"input\"],[14,3,\"hold_sequence\"],[14,0,\"form-control form-control-sm\"],[14,\"min\",\"1\"],[14,\"required\",\"\"],[14,4,\"number\"],[12],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n                \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Duration (s)\"],[13],[1,\"\\n                \"],[10,0],[14,0,\"input-group input-group-sm\"],[12],[1,\"\\n                  \"],[10,\"input\"],[14,3,\"hold_duration\"],[14,0,\"form-control form-control-sm\"],[14,\"min\",\"0\"],[14,\"step\",\"0.1\"],[14,\"required\",\"\"],[14,4,\"number\"],[12],[13],[1,\"\\n\"],[41,[30,0,[\"timerRunning\"]],[[[1,\"                    \"],[11,\"button\"],[24,0,\"btn btn-danger btn-sm stopwatch-btn stopwatch-active\"],[24,\"title\",\"Release to stop\"],[24,4,\"button\"],[4,[38,3],[\"mouseup\",[30,0,[\"stopTimer\"]]],null],[4,[38,3],[\"mouseleave\",[30,0,[\"stopTimer\"]]],null],[4,[38,3],[\"touchend\",[30,0,[\"stopTimer\"]]],null],[12],[1,\"\\n                      \"],[10,\"i\"],[14,0,\"bi bi-stopwatch-fill\"],[12],[13],[1,\" \"],[1,[30,0,[\"timerDisplay\"]]],[1,\"s\\n                    \"],[13],[1,\"\\n\"]],[]],[[[1,\"                    \"],[11,\"button\"],[24,0,\"btn btn-outline-warning btn-sm stopwatch-btn\"],[24,\"title\",\"Hold to time\"],[24,4,\"button\"],[4,[38,3],[\"mousedown\",[30,0,[\"startTimer\"]]],null],[4,[38,3],[\"touchstart\",[30,0,[\"startTimer\"]]],null],[12],[1,\"\\n                      \"],[10,\"i\"],[14,0,\"bi bi-stopwatch\"],[12],[13],[1,\"\\n\"],[41,[28,[37,10],[[30,0,[\"timerDisplay\"]],\"0.0\"],null],[[[1,\"                        \"],[1,[30,0,[\"timerDisplay\"]]],[1,\"s\\n\"]],[]],null],[1,\"                    \"],[13],[1,\"\\n\"]],[]]],[1,\"                \"],[13],[1,\"\\n\"],[41,[28,[37,10],[[30,0,[\"timerDisplay\"]],\"0.0\"],null],[[[1,\"                  \"],[11,\"button\"],[24,0,\"btn btn-link btn-sm text-muted p-0 mt-1\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"resetTimer\"]]],null],[12],[1,\"\\n                    \"],[10,\"i\"],[14,0,\"bi bi-arrow-counterclockwise\"],[12],[13],[1,\" reset\\n                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"col-md-1 col-6 d-flex align-items-end\"],[12],[1,\"\\n                \"],[10,\"button\"],[14,0,\"btn btn-info btn-sm text-white w-100\"],[14,4,\"submit\"],[12],[1,\"\\n                  \"],[10,\"i\"],[14,0,\"bi bi-plus-lg\"],[12],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[1,\"    \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-body table-responsive p-0\"],[12],[1,\"\\n        \"],[10,\"table\"],[14,0,\"table table-hover table-sm align-middle mb-0\"],[12],[1,\"\\n          \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"Player\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"Bull\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"Round\"],[13],[1,\"\\n              \"],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Sequence\"],[13],[1,\"\\n              \"],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Duration\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"scoringData\",\"interactions\"]]],null]],null],null,[[[1,\"              \"],[10,\"tr\"],[12],[1,\"\\n                \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,10,[\"player_name\"]]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[30,10,[\"bull_name\"]]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,[30,10,[\"round_name\"]]],[13],[13],[1,\"\\n                \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,10,[\"hold_sequence\"]]],[13],[1,\"\\n                \"],[10,\"td\"],[14,0,\"text-center\"],[12],[10,1],[14,0,\"badge bg-primary\"],[12],[1,[30,10,[\"hold_duration\"]]],[1,\"s\"],[13],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[10]],[[[1,\"              \"],[10,\"tr\"],[12],[1,\"\\n                \"],[10,\"td\"],[14,\"colspan\",\"5\"],[12],[1,\"\\n                  \"],[10,0],[14,0,\"empty-state py-3\"],[12],[1,\"\\n                    \"],[10,\"i\"],[14,0,\"bi bi-arrow-left-right\"],[12],[13],[1,\"\\n                    \"],[10,2],[12],[1,\"No interactions recorded yet\"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-sliders2\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"Select a Match to Begin Scoring\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"Choose a match from the dropdown above.\"],[10,\"br\"],[12],[13],[1,\"\\n      Only \"],[10,\"strong\"],[12],[1,\"Live\"],[13],[1,\" matches can be edited. Set a \"],[10,\"strong\"],[12],[1,\"Scheduled\"],[13],[1,\" match to Live to start.\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[]]]],[\"@model\",\"m\",\"m\",\"m\",\"p\",\"b\",\"p\",\"b\",\"r\",\"i\"],false,[\"page-title\",\"if\",\"eq\",\"on\",\"fn\",\"gt\",\"each\",\"-track-array\",\"to-string\",\"link-to\",\"not-eq\"]]",
    "moduleName": "jallikattu-frontend/templates/match-control.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/match-detail", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title (concat "Match #" this.model.match_id)}}
  <div class="container py-4">
    <div class="mb-3">
      <LinkTo @route="matches" class="text-decoration-none text-muted">
        <i class="bi bi-arrow-left"></i> Back to Matches
      </LinkTo>
    </div>
  
    <div class="section-header">
      <h5><i class="bi bi-trophy"></i> Match #{{this.model.match_id}} — Results</h5>
    </div>
  
    {{!-- Winners --}}
    {{#if this.model.winners.overallWinner.length}}
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="fw-bold text-warning"><i class="bi bi-award-fill"></i> Overall Winner</h6>
          {{#let (get this.model.winners.overallWinner 0) as |w|}}
            <div class="d-flex align-items-center gap-3 mt-2">
              <div class="profile-avatar" style="width:50px;height:50px;font-size:1.2rem;">
                <i class="bi bi-trophy-fill"></i>
              </div>
              <div>
                <h5 class="mb-0 fw-bold">{{w.player_name}}</h5>
                <span class="text-muted">Net Score: <strong>{{w.net_score}}</strong> ({{w.total_bulls_caught}} caught)</span>
              </div>
            </div>
          {{/let}}
        </div>
      </div>
    {{/if}}
  
    {{!-- Round Winners --}}
    {{#if this.model.winners.roundWinners.length}}
      <h6 class="fw-bold mb-3"><i class="bi bi-flag-fill"></i> Round Winners</h6>
      <div class="row g-3 mb-4">
        {{#each this.model.winners.roundWinners as |rw|}}
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <small class="text-muted">{{rw.round_name}}</small>
                <h6 class="fw-bold mt-1">{{rw.player_name}}</h6>
                <span class="badge bg-success">Caught: {{rw.bull_caught}}</span>
              </div>
            </div>
          </div>
        {{/each}}
      </div>
    {{/if}}
  
    {{!-- Best Bulls --}}
    {{#if this.model.winners.bestBullPerRound.length}}
      <h6 class="fw-bold mb-3"><i class="bi bi-shield-fill"></i> Top Bulls</h6>
      <div class="table-container mb-4">
        <table class="table table-sm">
          <thead>
            <tr><th>Bull</th><th>Round</th><th class="text-center">Difficulty</th></tr>
          </thead>
          <tbody>
            {{#each this.model.winners.bestBullPerRound as |b|}}
              <tr>
                <td class="fw-semibold">{{b.bull_name}}</td>
                <td>{{b.round_name}}</td>
                <td class="text-center fw-bold">{{b.difficulty}}</td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    {{/if}}
  
    {{!-- Player Scores --}}
    {{#if this.model.scores.topPlayers.length}}
      <h6 class="fw-bold mb-3"><i class="bi bi-person-fill"></i> Player Scores</h6>
      <div class="table-container mb-4">
        <table class="table table-sm">
          <thead>
            <tr><th>#</th><th>Player</th><th>Batch</th><th class="text-center">Caught</th><th class="text-center">Penalties</th><th class="text-center">Net</th></tr>
          </thead>
          <tbody>
            {{#each this.model.scores.topPlayers as |p index|}}
              <tr>
                <td>
                  <span class="leaderboard-rank {{if (eq index 0) 'gold' (if (eq index 1) 'silver' (if (eq index 2) 'bronze' 'default'))}}">
                    {{add index 1}}
                  </span>
                </td>
                <td>
                  <LinkTo @route="player-profile" @model={{p.player_id}} class="fw-semibold text-decoration-none">
                    {{p.player_name}}
                  </LinkTo>
                </td>
                <td><small class="text-muted">{{p.batch_name}}</small></td>
                <td class="text-center">{{p.total_caught}}</td>
                <td class="text-center text-danger">{{p.total_penalties}}</td>
                <td class="text-center"><span class="score-net">{{p.net_score}}</span></td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    {{/if}}
  </div>
  
  */
  {
    "id": "UeqPqXcY",
    "block": "[[[1,[28,[35,0],[[28,[37,1],[\"Match #\",[30,0,[\"model\",\"match_id\"]]],null]],null]],[1,\"\\n\"],[10,0],[14,0,\"container py-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n    \"],[8,[39,2],[[24,0,\"text-decoration-none text-muted\"]],[[\"@route\"],[\"matches\"]],[[\"default\"],[[[[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-arrow-left\"],[12],[13],[1,\" Back to Matches\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n    \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-trophy\"],[12],[13],[1,\" Match #\"],[1,[30,0,[\"model\",\"match_id\"]]],[1,\" — Results\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"winners\",\"overallWinner\",\"length\"]],[[[1,\"    \"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n        \"],[10,\"h6\"],[14,0,\"fw-bold text-warning\"],[12],[10,\"i\"],[14,0,\"bi bi-award-fill\"],[12],[13],[1,\" Overall Winner\"],[13],[1,\"\\n\"],[44,[[28,[37,5],[[30,0,[\"model\",\"winners\",\"overallWinner\"]],0],null]],[[[1,\"          \"],[10,0],[14,0,\"d-flex align-items-center gap-3 mt-2\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"profile-avatar\"],[14,5,\"width:50px;height:50px;font-size:1.2rem;\"],[12],[1,\"\\n              \"],[10,\"i\"],[14,0,\"bi bi-trophy-fill\"],[12],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[12],[1,\"\\n              \"],[10,\"h5\"],[14,0,\"mb-0 fw-bold\"],[12],[1,[30,1,[\"player_name\"]]],[13],[1,\"\\n              \"],[10,1],[14,0,\"text-muted\"],[12],[1,\"Net Score: \"],[10,\"strong\"],[12],[1,[30,1,[\"net_score\"]]],[13],[1,\" (\"],[1,[30,1,[\"total_bulls_caught\"]]],[1,\" caught)\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[1]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"winners\",\"roundWinners\",\"length\"]],[[[1,\"    \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-flag-fill\"],[12],[13],[1,\" Round Winners\"],[13],[1,\"\\n    \"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"model\",\"winners\",\"roundWinners\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"col-md-4\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n              \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,[30,2,[\"round_name\"]]],[13],[1,\"\\n              \"],[10,\"h6\"],[14,0,\"fw-bold mt-1\"],[12],[1,[30,2,[\"player_name\"]]],[13],[1,\"\\n              \"],[10,1],[14,0,\"badge bg-success\"],[12],[1,\"Caught: \"],[1,[30,2,[\"bull_caught\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[2]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"winners\",\"bestBullPerRound\",\"length\"]],[[[1,\"    \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\" Top Bulls\"],[13],[1,\"\\n    \"],[10,0],[14,0,\"table-container mb-4\"],[12],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-sm\"],[12],[1,\"\\n        \"],[10,\"thead\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Bull\"],[13],[10,\"th\"],[12],[1,\"Round\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Difficulty\"],[13],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"model\",\"winners\",\"bestBullPerRound\"]]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,3,[\"bull_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,3,[\"round_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-center fw-bold\"],[12],[1,[30,3,[\"difficulty\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[3]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"scores\",\"topPlayers\",\"length\"]],[[[1,\"    \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-person-fill\"],[12],[13],[1,\" Player Scores\"],[13],[1,\"\\n    \"],[10,0],[14,0,\"table-container mb-4\"],[12],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-sm\"],[12],[1,\"\\n        \"],[10,\"thead\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"#\"],[13],[10,\"th\"],[12],[1,\"Player\"],[13],[10,\"th\"],[12],[1,\"Batch\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Caught\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Penalties\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Net\"],[13],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"model\",\"scores\",\"topPlayers\"]]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[12],[1,\"\\n                \"],[10,1],[15,0,[29,[\"leaderboard-rank \",[52,[28,[37,8],[[30,5],0],null],\"gold\",[52,[28,[37,8],[[30,5],1],null],\"silver\",[52,[28,[37,8],[[30,5],2],null],\"bronze\",\"default\"]]]]]],[12],[1,\"\\n                  \"],[1,[28,[35,9],[[30,5],1],null]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,\"\\n                \"],[8,[39,2],[[24,0,\"fw-semibold text-decoration-none\"]],[[\"@route\",\"@model\"],[\"player-profile\",[30,4,[\"player_id\"]]]],[[\"default\"],[[[[1,\"\\n                  \"],[1,[30,4,[\"player_name\"]]],[1,\"\\n                \"]],[]]]]],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"td\"],[12],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,[30,4,[\"batch_name\"]]],[13],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,4,[\"total_caught\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-center text-danger\"],[12],[1,[30,4,[\"total_penalties\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-center\"],[12],[10,1],[14,0,\"score-net\"],[12],[1,[30,4,[\"net_score\"]]],[13],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[4,5]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\"]],[\"w\",\"rw\",\"b\",\"p\",\"index\"],false,[\"page-title\",\"concat\",\"link-to\",\"if\",\"let\",\"get\",\"each\",\"-track-array\",\"eq\",\"add\"]]",
    "moduleName": "jallikattu-frontend/templates/match-detail.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/matches", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Matches"}}
  <div class="container py-4">
    <div class="section-header">
      <h5><i class="bi bi-calendar-event"></i> All Matches</h5>
    </div>
  
    <div class="row g-3">
      {{#each this.model.matches as |match|}}
        <div class="col-md-6 col-lg-4">
          <LinkTo @route="match-detail" @model={{match.match_id}} class="text-decoration-none">
            <div class="match-card">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="fw-bold mb-0">Match #{{match.match_id}}</h6>
                <span class="status-badge {{match.status}}">{{match.status}}</span>
              </div>
              <div class="match-venue"><i class="bi bi-geo-alt"></i> {{match.location}}</div>
              <div class="match-date"><i class="bi bi-calendar3"></i> {{match.match_date}}</div>
              {{#if match.player_limit}}
                <div class="mt-2">
                  <small class="text-muted">Capacity: {{match.player_limit}} players / {{match.bull_limit}} bulls</small>
                </div>
              {{/if}}
            </div>
          </LinkTo>
        </div>
      {{else}}
        <div class="col-12">
          <div class="empty-state">
            <i class="bi bi-calendar-x d-block"></i>
            <h6>No matches found</h6>
          </div>
        </div>
      {{/each}}
    </div>
  </div>
  
  */
  {
    "id": "afyGUaJl",
    "block": "[[[1,[28,[35,0],[\"Matches\"],null]],[1,\"\\n\"],[10,0],[14,0,\"container py-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n    \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar-event\"],[12],[13],[1,\" All Matches\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"model\",\"matches\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"col-md-6 col-lg-4\"],[12],[1,\"\\n        \"],[8,[39,3],[[24,0,\"text-decoration-none\"]],[[\"@route\",\"@model\"],[\"match-detail\",[30,1,[\"match_id\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[10,0],[14,0,\"match-card\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"d-flex justify-content-between align-items-start mb-2\"],[12],[1,\"\\n              \"],[10,\"h6\"],[14,0,\"fw-bold mb-0\"],[12],[1,\"Match #\"],[1,[30,1,[\"match_id\"]]],[13],[1,\"\\n              \"],[10,1],[15,0,[29,[\"status-badge \",[30,1,[\"status\"]]]]],[12],[1,[30,1,[\"status\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"match-venue\"],[12],[10,\"i\"],[14,0,\"bi bi-geo-alt\"],[12],[13],[1,\" \"],[1,[30,1,[\"location\"]]],[13],[1,\"\\n            \"],[10,0],[14,0,\"match-date\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar3\"],[12],[13],[1,\" \"],[1,[30,1,[\"match_date\"]]],[13],[1,\"\\n\"],[41,[30,1,[\"player_limit\"]],[[[1,\"              \"],[10,0],[14,0,\"mt-2\"],[12],[1,\"\\n                \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"Capacity: \"],[1,[30,1,[\"player_limit\"]]],[1,\" players / \"],[1,[30,1,[\"bull_limit\"]]],[1,\" bulls\"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1]],[[[1,\"      \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"empty-state\"],[12],[1,\"\\n          \"],[10,\"i\"],[14,0,\"bi bi-calendar-x d-block\"],[12],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"No matches found\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"match\"],false,[\"page-title\",\"each\",\"-track-array\",\"link-to\",\"if\"]]",
    "moduleName": "jallikattu-frontend/templates/matches.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/my-bulls", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "My Bulls"}}
  
  <div class="section-header">
    <h5><i class="bi bi-shield-fill"></i> My Bulls</h5>
  </div>
  
  {{!-- Status message --}}
  {{#if this.message}}
    <div class="alert alert-{{this.messageType}} alert-dismissible fade show" role="alert">
      <i class="bi {{if (eq this.messageType 'success') 'bi-check-circle-fill' (if (eq this.messageType 'danger') 'bi-exclamation-triangle-fill' 'bi-info-circle-fill')}}"></i>
      {{this.message}}
      <button type="button" class="btn-close" {{on "click" this.dismissMessage}}></button>
    </div>
  {{/if}}
  
  {{#if @model.bulls.length}}
    <div class="row g-3 mb-4">
      {{#each @model.bulls as |bull|}}
        <div class="col-md-6 col-lg-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center" style="width:48px;height:48px;font-size:1.3rem;">
                  <i class="bi bi-shield-fill"></i>
                </div>
                <div>
                  <h6 class="fw-bold mb-0">{{bull.bull_name}}</h6>
                  <small class="text-muted">Age: {{bull.age}} &bull; Breed: {{bull.breed}}</small>
                </div>
              </div>
              <div class="d-flex flex-wrap gap-2 mb-2">
                {{#if bull.fitness_certificate}}
                  <span class="badge bg-success"><i class="bi bi-check-circle"></i> Fitness Certified</span>
                {{else}}
                  <span class="badge bg-warning text-dark"><i class="bi bi-exclamation-triangle"></i> No Certificate</span>
                {{/if}}
              </div>
              {{#if bull.stats}}
                <div class="row g-2 mt-2">
                  <div class="col-4 text-center">
                    <div class="fw-bold text-primary">{{bull.stats.total_matches}}</div>
                    <small class="text-muted">Matches</small>
                  </div>
                  <div class="col-4 text-center">
                    <div class="fw-bold text-danger">{{bull.stats.avg_aggression}}</div>
                    <small class="text-muted">Avg Aggr.</small>
                  </div>
                  <div class="col-4 text-center">
                    <div class="fw-bold text-warning">{{bull.stats.avg_difficulty}}</div>
                    <small class="text-muted">Avg Diff.</small>
                  </div>
                </div>
              {{/if}}
              <div class="mt-3">
                <LinkTo @route="bull-profile" @model={{bull.bull_id}} class="btn btn-outline-primary btn-sm w-100">
                  <i class="bi bi-eye"></i> View Full Profile
                </LinkTo>
              </div>
            </div>
          </div>
        </div>
      {{/each}}
    </div>
  
    {{!-- ═══════ REGISTER BULL FOR MATCH ═══════ --}}
    {{#if @model.matches.length}}
      <div class="section-header">
        <h5><i class="bi bi-flag-fill"></i> Register Bull for Match</h5>
      </div>
      <p class="text-muted mb-3">Available scheduled matches</p>
  
      <div class="row g-3">
        {{#each @model.matches as |match|}}
          <div class="col-md-6">
            <div class="card h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="fw-bold mb-0">{{match.match_name}}</h6>
                  <span class="status-badge scheduled">{{match.status}}</span>
                </div>
                <div class="text-muted small mb-2">
                  <div><i class="bi bi-calendar3"></i> {{match.match_date}}</div>
                  <div><i class="bi bi-geo-alt-fill"></i> {{match.location}}{{#if match.area}}, {{match.area}}{{/if}}</div>
                </div>
                <div class="d-flex gap-2 flex-wrap mb-3">
                  <span class="badge bg-secondary">
                    <i class="bi bi-people-fill"></i> {{match.capacity.registeredPlayers}}/{{match.player_limit}} players
                  </span>
                  <span class="badge {{if (eq match.capacity.bullSlotsRemaining 0) 'bg-danger' 'bg-secondary'}}">
                    <i class="bi bi-shield-fill"></i> {{match.capacity.registeredBulls}}/{{match.bull_limit}} bulls
                  </span>
                </div>
  
                {{#if (eq match.capacity.bullSlotsRemaining 0)}}
                  <div class="text-center">
                    <span class="badge bg-danger"><i class="bi bi-x-circle"></i> Bull Slots Full</span>
                  </div>
                {{else}}
                  <div class="d-flex flex-wrap gap-2">
                    {{#each @model.bulls as |bull|}}
                      <button
                        class="btn btn-outline-danger btn-sm"
                        type="button"
                        disabled={{if this.registeringKey true false}}
                        {{on "click" (fn this.registerBullForMatch bull.bull_id match.match_id)}}
                      >
                        <i class="bi bi-shield-plus"></i> {{bull.bull_name}}
                      </button>
                    {{/each}}
                  </div>
                {{/if}}
              </div>
            </div>
          </div>
        {{/each}}
      </div>
    {{/if}}
  {{else}}
    <div class="empty-state py-5">
      <i class="bi bi-shield-x" style="font-size:3rem;"></i>
      <h5 class="mt-3">No Bulls Registered</h5>
      <p class="text-muted">You haven't registered any bulls yet</p>
    </div>
  {{/if}}
  
  */
  {
    "id": "dvO+M3kU",
    "block": "[[[1,[28,[35,0],[\"My Bulls\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\" My Bulls\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"message\"]],[[[1,\"  \"],[10,0],[15,0,[29,[\"alert alert-\",[30,0,[\"messageType\"]],\" alert-dismissible fade show\"]]],[14,\"role\",\"alert\"],[12],[1,\"\\n    \"],[10,\"i\"],[15,0,[29,[\"bi \",[52,[28,[37,2],[[30,0,[\"messageType\"]],\"success\"],null],\"bi-check-circle-fill\",[52,[28,[37,2],[[30,0,[\"messageType\"]],\"danger\"],null],\"bi-exclamation-triangle-fill\",\"bi-info-circle-fill\"]]]]],[12],[13],[1,\"\\n    \"],[1,[30,0,[\"message\"]]],[1,\"\\n    \"],[11,\"button\"],[24,0,\"btn-close\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"dismissMessage\"]]],null],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,1,[\"bulls\",\"length\"]],[[[1,\"  \"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,1,[\"bulls\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"col-md-6 col-lg-4\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card h-100\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"d-flex align-items-center gap-3 mb-3\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"rounded-circle bg-danger text-white d-flex align-items-center justify-content-center\"],[14,5,\"width:48px;height:48px;font-size:1.3rem;\"],[12],[1,\"\\n                \"],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[12],[1,\"\\n                \"],[10,\"h6\"],[14,0,\"fw-bold mb-0\"],[12],[1,[30,2,[\"bull_name\"]]],[13],[1,\"\\n                \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"Age: \"],[1,[30,2,[\"age\"]]],[1,\" • Breed: \"],[1,[30,2,[\"breed\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"d-flex flex-wrap gap-2 mb-2\"],[12],[1,\"\\n\"],[41,[30,2,[\"fitness_certificate\"]],[[[1,\"                \"],[10,1],[14,0,\"badge bg-success\"],[12],[10,\"i\"],[14,0,\"bi bi-check-circle\"],[12],[13],[1,\" Fitness Certified\"],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,1],[14,0,\"badge bg-warning text-dark\"],[12],[10,\"i\"],[14,0,\"bi bi-exclamation-triangle\"],[12],[13],[1,\" No Certificate\"],[13],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n\"],[41,[30,2,[\"stats\"]],[[[1,\"              \"],[10,0],[14,0,\"row g-2 mt-2\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"col-4 text-center\"],[12],[1,\"\\n                  \"],[10,0],[14,0,\"fw-bold text-primary\"],[12],[1,[30,2,[\"stats\",\"total_matches\"]]],[13],[1,\"\\n                  \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"Matches\"],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,0],[14,0,\"col-4 text-center\"],[12],[1,\"\\n                  \"],[10,0],[14,0,\"fw-bold text-danger\"],[12],[1,[30,2,[\"stats\",\"avg_aggression\"]]],[13],[1,\"\\n                  \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"Avg Aggr.\"],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,0],[14,0,\"col-4 text-center\"],[12],[1,\"\\n                  \"],[10,0],[14,0,\"fw-bold text-warning\"],[12],[1,[30,2,[\"stats\",\"avg_difficulty\"]]],[13],[1,\"\\n                  \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"Avg Diff.\"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[10,0],[14,0,\"mt-3\"],[12],[1,\"\\n              \"],[8,[39,6],[[24,0,\"btn btn-outline-primary btn-sm w-100\"]],[[\"@route\",\"@model\"],[\"bull-profile\",[30,2,[\"bull_id\"]]]],[[\"default\"],[[[[1,\"\\n                \"],[10,\"i\"],[14,0,\"bi bi-eye\"],[12],[13],[1,\" View Full Profile\\n              \"]],[]]]]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[2]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,1,[\"matches\",\"length\"]],[[[1,\"    \"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n      \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-flag-fill\"],[12],[13],[1,\" Register Bull for Match\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted mb-3\"],[12],[1,\"Available scheduled matches\"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,1,[\"matches\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"col-md-6\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card h-100\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"d-flex justify-content-between align-items-start mb-2\"],[12],[1,\"\\n                \"],[10,\"h6\"],[14,0,\"fw-bold mb-0\"],[12],[1,[30,3,[\"match_name\"]]],[13],[1,\"\\n                \"],[10,1],[14,0,\"status-badge scheduled\"],[12],[1,[30,3,[\"status\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"text-muted small mb-2\"],[12],[1,\"\\n                \"],[10,0],[12],[10,\"i\"],[14,0,\"bi bi-calendar3\"],[12],[13],[1,\" \"],[1,[30,3,[\"match_date\"]]],[13],[1,\"\\n                \"],[10,0],[12],[10,\"i\"],[14,0,\"bi bi-geo-alt-fill\"],[12],[13],[1,\" \"],[1,[30,3,[\"location\"]]],[41,[30,3,[\"area\"]],[[[1,\", \"],[1,[30,3,[\"area\"]]]],[]],null],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"d-flex gap-2 flex-wrap mb-3\"],[12],[1,\"\\n                \"],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,\"\\n                  \"],[10,\"i\"],[14,0,\"bi bi-people-fill\"],[12],[13],[1,\" \"],[1,[30,3,[\"capacity\",\"registeredPlayers\"]]],[1,\"/\"],[1,[30,3,[\"player_limit\"]]],[1,\" players\\n                \"],[13],[1,\"\\n                \"],[10,1],[15,0,[29,[\"badge \",[52,[28,[37,2],[[30,3,[\"capacity\",\"bullSlotsRemaining\"]],0],null],\"bg-danger\",\"bg-secondary\"]]]],[12],[1,\"\\n                  \"],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\" \"],[1,[30,3,[\"capacity\",\"registeredBulls\"]]],[1,\"/\"],[1,[30,3,[\"bull_limit\"]]],[1,\" bulls\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\\n\"],[41,[28,[37,2],[[30,3,[\"capacity\",\"bullSlotsRemaining\"]],0],null],[[[1,\"                \"],[10,0],[14,0,\"text-center\"],[12],[1,\"\\n                  \"],[10,1],[14,0,\"badge bg-danger\"],[12],[10,\"i\"],[14,0,\"bi bi-x-circle\"],[12],[13],[1,\" Bull Slots Full\"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,0],[14,0,\"d-flex flex-wrap gap-2\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,1,[\"bulls\"]]],null]],null],null,[[[1,\"                    \"],[11,\"button\"],[24,0,\"btn btn-outline-danger btn-sm\"],[16,\"disabled\",[52,[30,0,[\"registeringKey\"]],true,false]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,7],[[30,0,[\"registerBullForMatch\"]],[30,4,[\"bull_id\"]],[30,3,[\"match_id\"]]],null]],null],[12],[1,\"\\n                      \"],[10,\"i\"],[14,0,\"bi bi-shield-plus\"],[12],[13],[1,\" \"],[1,[30,4,[\"bull_name\"]]],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[4]],null],[1,\"                \"],[13],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[3]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null]],[]],[[[1,\"  \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-shield-x\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"No Bulls Registered\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"You haven't registered any bulls yet\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"@model\",\"bull\",\"match\",\"bull\"],false,[\"page-title\",\"if\",\"eq\",\"on\",\"each\",\"-track-array\",\"link-to\",\"fn\"]]",
    "moduleName": "jallikattu-frontend/templates/my-bulls.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/my-history", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Match History"}}
  
  <div class="section-header">
    <h5><i class="bi bi-clock-history"></i> Match History</h5>
  </div>
  
  {{#if @model.length}}
    <div class="card">
      <div class="card-body p-0 table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Match</th>
              <th>Date</th>
              <th>Round</th>
              <th class="text-center">Bulls Caught</th>
              <th class="text-center">Penalties</th>
              <th class="text-center">Net Score</th>
            </tr>
          </thead>
          <tbody>
            {{#each @model as |h|}}
              <tr>
                <td class="fw-semibold">{{h.match_name}}</td>
                <td class="text-muted small">{{h.match_date}}</td>
                <td><span class="badge bg-secondary">{{h.round_name}}</span></td>
                <td class="text-center text-success fw-bold">{{h.bull_caught}}</td>
                <td class="text-center text-danger">{{h.penalties}}</td>
                <td class="text-center fw-bold" style="color:var(--primary);">{{h.net_score}}</td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  {{else}}
    <div class="empty-state py-5">
      <i class="bi bi-clock-history" style="font-size:3rem;"></i>
      <h5 class="mt-3">No Match History</h5>
      <p class="text-muted">You haven't participated in any matches yet</p>
      <LinkTo @route="my-matches" class="btn btn-accent btn-sm">Find Matches</LinkTo>
    </div>
  {{/if}}
  
  */
  {
    "id": "yWauEIFK",
    "block": "[[[1,[28,[35,0],[\"Match History\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-clock-history\"],[12],[13],[1,\" Match History\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,1,[\"length\"]],[[[1,\"  \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body p-0 table-responsive\"],[12],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-hover align-middle mb-0\"],[12],[1,\"\\n        \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[10,\"th\"],[12],[1,\"Match\"],[13],[1,\"\\n            \"],[10,\"th\"],[12],[1,\"Date\"],[13],[1,\"\\n            \"],[10,\"th\"],[12],[1,\"Round\"],[13],[1,\"\\n            \"],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Bulls Caught\"],[13],[1,\"\\n            \"],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Penalties\"],[13],[1,\"\\n            \"],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Net Score\"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,1]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,2,[\"match_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-muted small\"],[12],[1,[30,2,[\"match_date\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,[30,2,[\"round_name\"]]],[13],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-center text-success fw-bold\"],[12],[1,[30,2,[\"bull_caught\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-center text-danger\"],[12],[1,[30,2,[\"penalties\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-center fw-bold\"],[14,5,\"color:var(--primary);\"],[12],[1,[30,2,[\"net_score\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[2]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-clock-history\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"No Match History\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"You haven't participated in any matches yet\"],[13],[1,\"\\n    \"],[8,[39,4],[[24,0,\"btn btn-accent btn-sm\"]],[[\"@route\"],[\"my-matches\"]],[[\"default\"],[[[[1,\"Find Matches\"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"@model\",\"h\"],false,[\"page-title\",\"if\",\"each\",\"-track-array\",\"link-to\"]]",
    "moduleName": "jallikattu-frontend/templates/my-history.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/my-matches", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Register for Match"}}
  
  <div class="section-header">
    <h5><i class="bi bi-flag-fill"></i> Register for Match</h5>
  </div>
  
  {{!-- Status message --}}
  {{#if this.message}}
    <div class="alert alert-{{this.messageType}} alert-dismissible fade show" role="alert">
      <i class="bi {{if (eq this.messageType 'success') 'bi-check-circle-fill' (if (eq this.messageType 'danger') 'bi-exclamation-triangle-fill' 'bi-info-circle-fill')}}"></i>
      {{this.message}}
      <button type="button" class="btn-close" {{on "click" this.dismissMessage}}></button>
    </div>
  {{/if}}
  
  {{#if @model.length}}
    <p class="text-muted mb-3">Available scheduled matches</p>
    <div class="row g-3">
      {{#each @model as |match|}}
        <div class="col-md-6 col-lg-4">
          <div class="card match-card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="fw-bold mb-0">{{match.match_name}}</h6>
                <span class="status-badge scheduled">{{match.status}}</span>
              </div>
              <div class="text-muted small mb-2">
                <div><i class="bi bi-calendar3"></i> {{match.match_date}}</div>
                <div><i class="bi bi-geo-alt-fill"></i> {{match.location}}{{#if match.area}}, {{match.area}}{{/if}}</div>
                {{#if match.organizer_name}}
                  <div><i class="bi bi-building"></i> {{match.organizer_name}}</div>
                {{/if}}
              </div>
              <div class="d-flex gap-2 flex-wrap mb-3">
                <span class="badge {{if (eq match.capacity.playerSlotsRemaining 0) 'bg-danger' 'bg-secondary'}}">
                  <i class="bi bi-people-fill"></i>
                  {{match.capacity.registeredPlayers}}/{{match.player_limit}} players
                </span>
                <span class="badge bg-secondary">
                  <i class="bi bi-shield-fill"></i>
                  {{match.capacity.registeredBulls}}/{{match.bull_limit}} bulls
                </span>
              </div>
              {{#if (eq match.capacity.playerSlotsRemaining 0)}}
                <button class="btn btn-secondary btn-sm w-100" disabled>
                  <i class="bi bi-x-circle"></i> Player Slots Full
                </button>
              {{else}}
                <button
                  class="btn btn-accent btn-sm w-100"
                  type="button"
                  disabled={{if (eq this.registeringMatchId match.match_id) true false}}
                  {{on "click" (fn this.registerForMatch match)}}
                >
                  {{#if (eq this.registeringMatchId match.match_id)}}
                    <span class="spinner-border spinner-border-sm"></span> Registering...
                  {{else}}
                    <i class="bi bi-check-lg"></i> Register
                  {{/if}}
                </button>
              {{/if}}
            </div>
          </div>
        </div>
      {{/each}}
    </div>
  {{else}}
    <div class="empty-state py-5">
      <i class="bi bi-flag" style="font-size:3rem;"></i>
      <h5 class="mt-3">No Available Matches</h5>
      <p class="text-muted">There are no scheduled matches open for registration right now</p>
      <LinkTo @route="events" class="btn btn-accent btn-sm">Browse Events</LinkTo>
    </div>
  {{/if}}
  
  */
  {
    "id": "nUpVwG8l",
    "block": "[[[1,[28,[35,0],[\"Register for Match\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-flag-fill\"],[12],[13],[1,\" Register for Match\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"message\"]],[[[1,\"  \"],[10,0],[15,0,[29,[\"alert alert-\",[30,0,[\"messageType\"]],\" alert-dismissible fade show\"]]],[14,\"role\",\"alert\"],[12],[1,\"\\n    \"],[10,\"i\"],[15,0,[29,[\"bi \",[52,[28,[37,2],[[30,0,[\"messageType\"]],\"success\"],null],\"bi-check-circle-fill\",[52,[28,[37,2],[[30,0,[\"messageType\"]],\"danger\"],null],\"bi-exclamation-triangle-fill\",\"bi-info-circle-fill\"]]]]],[12],[13],[1,\"\\n    \"],[1,[30,0,[\"message\"]]],[1,\"\\n    \"],[11,\"button\"],[24,0,\"btn-close\"],[24,4,\"button\"],[4,[38,3],[\"click\",[30,0,[\"dismissMessage\"]]],null],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,1,[\"length\"]],[[[1,\"  \"],[10,2],[14,0,\"text-muted mb-3\"],[12],[1,\"Available scheduled matches\"],[13],[1,\"\\n  \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,1]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"col-md-6 col-lg-4\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card match-card h-100\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"d-flex justify-content-between align-items-start mb-2\"],[12],[1,\"\\n              \"],[10,\"h6\"],[14,0,\"fw-bold mb-0\"],[12],[1,[30,2,[\"match_name\"]]],[13],[1,\"\\n              \"],[10,1],[14,0,\"status-badge scheduled\"],[12],[1,[30,2,[\"status\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"text-muted small mb-2\"],[12],[1,\"\\n              \"],[10,0],[12],[10,\"i\"],[14,0,\"bi bi-calendar3\"],[12],[13],[1,\" \"],[1,[30,2,[\"match_date\"]]],[13],[1,\"\\n              \"],[10,0],[12],[10,\"i\"],[14,0,\"bi bi-geo-alt-fill\"],[12],[13],[1,\" \"],[1,[30,2,[\"location\"]]],[41,[30,2,[\"area\"]],[[[1,\", \"],[1,[30,2,[\"area\"]]]],[]],null],[13],[1,\"\\n\"],[41,[30,2,[\"organizer_name\"]],[[[1,\"                \"],[10,0],[12],[10,\"i\"],[14,0,\"bi bi-building\"],[12],[13],[1,\" \"],[1,[30,2,[\"organizer_name\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"d-flex gap-2 flex-wrap mb-3\"],[12],[1,\"\\n              \"],[10,1],[15,0,[29,[\"badge \",[52,[28,[37,2],[[30,2,[\"capacity\",\"playerSlotsRemaining\"]],0],null],\"bg-danger\",\"bg-secondary\"]]]],[12],[1,\"\\n                \"],[10,\"i\"],[14,0,\"bi bi-people-fill\"],[12],[13],[1,\"\\n                \"],[1,[30,2,[\"capacity\",\"registeredPlayers\"]]],[1,\"/\"],[1,[30,2,[\"player_limit\"]]],[1,\" players\\n              \"],[13],[1,\"\\n              \"],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,\"\\n                \"],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\"\\n                \"],[1,[30,2,[\"capacity\",\"registeredBulls\"]]],[1,\"/\"],[1,[30,2,[\"bull_limit\"]]],[1,\" bulls\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"],[41,[28,[37,2],[[30,2,[\"capacity\",\"playerSlotsRemaining\"]],0],null],[[[1,\"              \"],[10,\"button\"],[14,0,\"btn btn-secondary btn-sm w-100\"],[14,\"disabled\",\"\"],[12],[1,\"\\n                \"],[10,\"i\"],[14,0,\"bi bi-x-circle\"],[12],[13],[1,\" Player Slots Full\\n              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[11,\"button\"],[24,0,\"btn btn-accent btn-sm w-100\"],[16,\"disabled\",[52,[28,[37,2],[[30,0,[\"registeringMatchId\"]],[30,2,[\"match_id\"]]],null],true,false]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,6],[[30,0,[\"registerForMatch\"]],[30,2]],null]],null],[12],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"registeringMatchId\"]],[30,2,[\"match_id\"]]],null],[[[1,\"                  \"],[10,1],[14,0,\"spinner-border spinner-border-sm\"],[12],[13],[1,\" Registering...\\n\"]],[]],[[[1,\"                  \"],[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\" Register\\n\"]],[]]],[1,\"              \"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[2]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-flag\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"No Available Matches\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"There are no scheduled matches open for registration right now\"],[13],[1,\"\\n    \"],[8,[39,7],[[24,0,\"btn btn-accent btn-sm\"]],[[\"@route\"],[\"events\"]],[[\"default\"],[[[[1,\"Browse Events\"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"@model\",\"match\"],false,[\"page-title\",\"if\",\"eq\",\"on\",\"each\",\"-track-array\",\"fn\",\"link-to\"]]",
    "moduleName": "jallikattu-frontend/templates/my-matches.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/my-profile", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "My Profile"}}
  
  <div class="section-header">
    <h5><i class="bi bi-person-circle"></i> My Profile</h5>
  </div>
  
  {{#if @model.error}}
    <div class="empty-state py-5">
      <i class="bi bi-person-x" style="font-size:3rem;"></i>
      <h5 class="mt-3">Profile Not Found</h5>
      <p class="text-muted">Your account may not have a linked player or owner profile</p>
    </div>
  {{else}}
    {{!-- Profile card --}}
    <div class="card mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <div class="profile-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:64px;height:64px;font-size:1.5rem;font-weight:700;">
            {{this.auth.initials}}
          </div>
          <div>
            <h4 class="fw-bold mb-0">{{@model.player.player_name}}</h4>
            <span class="role-tag player">Player</span>
            {{#if @model.player.Phone_number}}
              <div class="text-muted small mt-1"><i class="bi bi-telephone"></i> {{@model.player.Phone_number}}</div>
            {{/if}}
          </div>
        </div>
      </div>
    </div>
  
    {{!-- Stats --}}
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <div class="card stat-card accent">
            <div class="stat-value">{{if @model.career.matches_played @model.career.matches_played 0}}</div>
            <div class="stat-label">Matches Played</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card green">
            <div class="stat-value">{{if @model.career.total_bulls_caught @model.career.total_bulls_caught 0}}</div>
            <div class="stat-label">Bulls Caught</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card saffron">
            <div class="stat-value">{{if @model.career.total_penalties @model.career.total_penalties 0}}</div>
            <div class="stat-label">Penalties</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card stat-card blue">
            <div class="stat-value">{{if @model.career.career_net_score @model.career.career_net_score 0}}</div>
            <div class="stat-label">Net Score</div>
          </div>
        </div>
      </div>
  
    {{!-- Quick links --}}
    <div class="row g-3">
      <div class="col-md-4">
        <LinkTo @route="my-history" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon bg-primary"><i class="bi bi-clock-history"></i></div>
            <h6>Match History</h6>
            <p>View your past performances</p>
          </div>
        </LinkTo>
      </div>
      <div class="col-md-4">
        <LinkTo @route="my-matches" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon bg-success"><i class="bi bi-flag-fill"></i></div>
            <h6>My Matches</h6>
            <p>Upcoming registered matches</p>
          </div>
        </LinkTo>
      </div>
      <div class="col-md-4">
        <LinkTo @route="leaderboard" class="text-decoration-none">
          <div class="card action-card">
            <div class="action-icon bg-warning"><i class="bi bi-bar-chart-fill"></i></div>
            <h6>Leaderboard</h6>
            <p>See how you rank</p>
          </div>
        </LinkTo>
      </div>
    </div>
  {{/if}}
  
  */
  {
    "id": "7+tI5oW7",
    "block": "[[[1,[28,[35,0],[\"My Profile\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-person-circle\"],[12],[13],[1,\" My Profile\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,1,[\"error\"]],[[[1,\"  \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-person-x\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"Profile Not Found\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"Your account may not have a linked player or owner profile\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"d-flex align-items-center gap-3\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"profile-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center\"],[14,5,\"width:64px;height:64px;font-size:1.5rem;font-weight:700;\"],[12],[1,\"\\n          \"],[1,[30,0,[\"auth\",\"initials\"]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[12],[1,\"\\n          \"],[10,\"h4\"],[14,0,\"fw-bold mb-0\"],[12],[1,[30,1,[\"player\",\"player_name\"]]],[13],[1,\"\\n          \"],[10,1],[14,0,\"role-tag player\"],[12],[1,\"Player\"],[13],[1,\"\\n\"],[41,[30,1,[\"player\",\"Phone_number\"]],[[[1,\"            \"],[10,0],[14,0,\"text-muted small mt-1\"],[12],[10,\"i\"],[14,0,\"bi bi-telephone\"],[12],[13],[1,\" \"],[1,[30,1,[\"player\",\"Phone_number\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"    \"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card stat-card accent\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"stat-value\"],[12],[1,[52,[30,1,[\"career\",\"matches_played\"]],[30,1,[\"career\",\"matches_played\"]],0]],[13],[1,\"\\n          \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Matches Played\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card stat-card green\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"stat-value\"],[12],[1,[52,[30,1,[\"career\",\"total_bulls_caught\"]],[30,1,[\"career\",\"total_bulls_caught\"]],0]],[13],[1,\"\\n          \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Bulls Caught\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card stat-card saffron\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"stat-value\"],[12],[1,[52,[30,1,[\"career\",\"total_penalties\"]],[30,1,[\"career\",\"total_penalties\"]],0]],[13],[1,\"\\n          \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Penalties\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card stat-card blue\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"stat-value\"],[12],[1,[52,[30,1,[\"career\",\"career_net_score\"]],[30,1,[\"career\",\"career_net_score\"]],0]],[13],[1,\"\\n          \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Net Score\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"col-md-4\"],[12],[1,\"\\n      \"],[8,[39,2],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"my-history\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon bg-primary\"],[12],[10,\"i\"],[14,0,\"bi bi-clock-history\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"Match History\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"View your past performances\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-md-4\"],[12],[1,\"\\n      \"],[8,[39,2],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"my-matches\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon bg-success\"],[12],[10,\"i\"],[14,0,\"bi bi-flag-fill\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"My Matches\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"Upcoming registered matches\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"col-md-4\"],[12],[1,\"\\n      \"],[8,[39,2],[[24,0,\"text-decoration-none\"]],[[\"@route\"],[\"leaderboard\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"card action-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"action-icon bg-warning\"],[12],[10,\"i\"],[14,0,\"bi bi-bar-chart-fill\"],[12],[13],[13],[1,\"\\n          \"],[10,\"h6\"],[12],[1,\"Leaderboard\"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"See how you rank\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[\"@model\"],false,[\"page-title\",\"if\",\"link-to\"]]",
    "moduleName": "jallikattu-frontend/templates/my-profile.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/player-profile", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title (concat "Player - " (or this.model.profile.player_name "Unknown"))}}
  <div class="container py-4">
    <div class="mb-3">
      <LinkTo @route="leaderboard" class="text-decoration-none text-muted">
        <i class="bi bi-arrow-left"></i> Back to Leaderboard
      </LinkTo>
    </div>
  
    {{#if this.model.error}}
      <div class="alert alert-danger">{{this.model.error}}</div>
    {{else}}
      <div class="row g-4">
        {{!-- Profile Card --}}
        <div class="col-lg-4">
          <div class="card profile-card">
            <div class="profile-avatar">
              {{#let (or this.model.profile.player_name "?") as |name|}}
                {{#let (get (split name " ") 0) as |first|}}
                  {{slice first 0 1}}
                {{/let}}
              {{/let}}
            </div>
            <h4 class="fw-bold">{{this.model.profile.player_name}}</h4>
            {{#if this.model.profile.Phone_number}}
              <p class="text-muted"><i class="bi bi-phone"></i> {{this.model.profile.Phone_number}}</p>
            {{/if}}
          </div>
        </div>
  
        {{!-- Career Stats --}}
        <div class="col-lg-8">
          <div class="row g-3 mb-4">
            <div class="col-6 col-md-3">
              <div class="card stat-card accent">
                <div class="stat-value">{{or this.model.profile.matches_played 0}}</div>
                <div class="stat-label">Matches</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card stat-card green">
                <div class="stat-value">{{or this.model.profile.total_bulls_caught 0}}</div>
                <div class="stat-label">Bulls Caught</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card stat-card saffron">
                <div class="stat-value">{{or this.model.profile.total_penalties 0}}</div>
                <div class="stat-label">Penalties</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card stat-card blue">
                <div class="stat-value">{{or this.model.profile.career_net_score 0}}</div>
                <div class="stat-label">Net Score</div>
              </div>
            </div>
          </div>
  
          {{!-- Match History --}}
          <div class="card">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-clock-history"></i> Match History</h6>
              {{#if this.model.matchHistory.length}}
                <div class="table-responsive">
                  <table class="table table-sm mb-0">
                    <thead>
                      <tr><th>Match</th><th>Round</th><th class="text-center">Caught</th><th class="text-center">Penalties</th><th class="text-center">Net</th></tr>
                    </thead>
                    <tbody>
                      {{#each this.model.matchHistory as |h|}}
                        <tr>
                          <td>
                            <LinkTo @route="match-detail" @model={{h.match_id}} class="text-decoration-none">
                              Match #{{h.match_id}}
                            </LinkTo>
                          </td>
                          <td>{{h.round_name}}</td>
                          <td class="text-center">{{h.bull_caught}}</td>
                          <td class="text-center text-danger">{{h.penalties}}</td>
                          <td class="text-center fw-bold">{{h.net_score}}</td>
                        </tr>
                      {{/each}}
                    </tbody>
                  </table>
                </div>
              {{else}}
                <div class="empty-state"><i class="bi bi-inbox d-block"></i>No match history</div>
              {{/if}}
            </div>
          </div>
        </div>
      </div>
    {{/if}}
  </div>
  
  */
  {
    "id": "a8R3X3Ex",
    "block": "[[[1,[28,[35,0],[[28,[37,1],[\"Player - \",[28,[37,2],[[30,0,[\"model\",\"profile\",\"player_name\"]],\"Unknown\"],null]],null]],null]],[1,\"\\n\"],[10,0],[14,0,\"container py-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n    \"],[8,[39,3],[[24,0,\"text-decoration-none text-muted\"]],[[\"@route\"],[\"leaderboard\"]],[[\"default\"],[[[[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-arrow-left\"],[12],[13],[1,\" Back to Leaderboard\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"error\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-danger\"],[12],[1,[30,0,[\"model\",\"error\"]]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"row g-4\"],[12],[1,\"\\n\"],[1,\"      \"],[10,0],[14,0,\"col-lg-4\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card profile-card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"profile-avatar\"],[12],[1,\"\\n\"],[44,[[28,[37,2],[[30,0,[\"model\",\"profile\",\"player_name\"]],\"?\"],null]],[[[44,[[28,[37,6],[[28,[37,7],[[30,1],\" \"],null],0],null]],[[[1,\"                \"],[1,[28,[35,8],[[30,2],0,1],null]],[1,\"\\n\"]],[2]]]],[1]]],[1,\"          \"],[13],[1,\"\\n          \"],[10,\"h4\"],[14,0,\"fw-bold\"],[12],[1,[30,0,[\"model\",\"profile\",\"player_name\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"profile\",\"Phone_number\"]],[[[1,\"            \"],[10,2],[14,0,\"text-muted\"],[12],[10,\"i\"],[14,0,\"bi bi-phone\"],[12],[13],[1,\" \"],[1,[30,0,[\"model\",\"profile\",\"Phone_number\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[1,\"      \"],[10,0],[14,0,\"col-lg-8\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card stat-card accent\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"stat-value\"],[12],[1,[28,[35,2],[[30,0,[\"model\",\"profile\",\"matches_played\"]],0],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Matches\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card stat-card green\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"stat-value\"],[12],[1,[28,[35,2],[[30,0,[\"model\",\"profile\",\"total_bulls_caught\"]],0],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Bulls Caught\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card stat-card saffron\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"stat-value\"],[12],[1,[28,[35,2],[[30,0,[\"model\",\"profile\",\"total_penalties\"]],0],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Penalties\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-6 col-md-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"card stat-card blue\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"stat-value\"],[12],[1,[28,[35,2],[[30,0,[\"model\",\"profile\",\"career_net_score\"]],0],null]],[13],[1,\"\\n              \"],[10,0],[14,0,\"stat-label\"],[12],[1,\"Net Score\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[1,\"        \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-clock-history\"],[12],[13],[1,\" Match History\"],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"matchHistory\",\"length\"]],[[[1,\"              \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n                \"],[10,\"table\"],[14,0,\"table table-sm mb-0\"],[12],[1,\"\\n                  \"],[10,\"thead\"],[12],[1,\"\\n                    \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Match\"],[13],[10,\"th\"],[12],[1,\"Round\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Caught\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Penalties\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Net\"],[13],[13],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,10],[[28,[37,10],[[30,0,[\"model\",\"matchHistory\"]]],null]],null],null,[[[1,\"                      \"],[10,\"tr\"],[12],[1,\"\\n                        \"],[10,\"td\"],[12],[1,\"\\n                          \"],[8,[39,3],[[24,0,\"text-decoration-none\"]],[[\"@route\",\"@model\"],[\"match-detail\",[30,3,[\"match_id\"]]]],[[\"default\"],[[[[1,\"\\n                            Match #\"],[1,[30,3,[\"match_id\"]]],[1,\"\\n                          \"]],[]]]]],[1,\"\\n                        \"],[13],[1,\"\\n                        \"],[10,\"td\"],[12],[1,[30,3,[\"round_name\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,3,[\"bull_caught\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center text-danger\"],[12],[1,[30,3,[\"penalties\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center fw-bold\"],[12],[1,[30,3,[\"net_score\"]]],[13],[1,\"\\n                      \"],[13],[1,\"\\n\"]],[3]],null],[1,\"                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[10,0],[14,0,\"empty-state\"],[12],[10,\"i\"],[14,0,\"bi bi-inbox d-block\"],[12],[13],[1,\"No match history\"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[13],[1,\"\\n\"]],[\"name\",\"first\",\"h\"],false,[\"page-title\",\"concat\",\"or\",\"link-to\",\"if\",\"let\",\"get\",\"split\",\"slice\",\"each\",\"-track-array\"]]",
    "moduleName": "jallikattu-frontend/templates/player-profile.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/prizes", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Prize Management"}}
  
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold"><i class="bi bi-trophy-fill text-warning"></i> Prize Management</h2>
      {{#unless this.isAdding}}
        <button class="btn btn-accent" type="button" {{on "click" this.startAdd}}>
          <i class="bi bi-plus-circle"></i> Add Prize
        </button>
      {{/unless}}
    </div>
  
    {{#if this.error}}
      <div class="alert alert-danger alert-dismissible fade show">
        <i class="bi bi-exclamation-triangle-fill"></i> {{this.error}}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    {{/if}}
  
    {{#if this.success}}
      <div class="alert alert-success alert-dismissible fade show">
        <i class="bi bi-check-circle-fill"></i> {{this.success}}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    {{/if}}
  
    {{!-- Add Prize Form --}}
    {{#if this.isAdding}}
      <div class="card mb-4 border-accent">
        <div class="card-header bg-accent text-white fw-semibold">
          <i class="bi bi-plus-circle"></i> New Prize
        </div>
        <div class="card-body">
          <form {{on "submit" this.addPrize}}>
            <div class="row g-3">
              <div class="col-md-5">
                <label class="form-label fw-semibold">Prize Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control" value={{this.newName}} {{on "input" (fn this.updateField "newName")}} required placeholder="e.g. Gold Medal, Cash ₹50,000">
              </div>
              <div class="col-md-5">
                <label class="form-label fw-semibold">Provided By</label>
                <input type="text" class="form-control" value={{this.newProvider}} {{on "input" (fn this.updateField "newProvider")}} placeholder="Sponsor or organizer name">
              </div>
              <div class="col-md-2 d-flex align-items-end gap-2">
                <button type="submit" class="btn btn-success" disabled={{this.isLoading}}>
                  {{#if this.isLoading}}<span class="spinner-border spinner-border-sm"></span>{{else}}<i class="bi bi-check-lg"></i> Save{{/if}}
                </button>
                <button type="button" class="btn btn-outline-secondary" {{on "click" this.cancelAdd}}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    {{/if}}
  
    {{!-- Prizes Table --}}
    <div class="card">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover table-striped mb-0">
            <thead class="table-dark">
              <tr>
                <th style="width: 60px">ID</th>
                <th>Prize Name</th>
                <th>Provided By</th>
                <th style="width: 150px" class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {{#each @model as |prize|}}
                {{#if (eq this.editingId prize.prize_id)}}
                  <tr class="table-warning">
                    <td class="align-middle fw-semibold">{{prize.prize_id}}</td>
                    <td>
                      <form id="edit-form-{{prize.prize_id}}" {{on "submit" (fn this.savePrize prize.prize_id)}}>
                        <input type="text" class="form-control form-control-sm" value={{this.editName}} {{on "input" (fn this.updateField "editName")}} required>
                      </form>
                    </td>
                    <td>
                      <input type="text" class="form-control form-control-sm" value={{this.editProvider}} {{on "input" (fn this.updateField "editProvider")}} form="edit-form-{{prize.prize_id}}">
                    </td>
                    <td class="text-center">
                      <button type="submit" form="edit-form-{{prize.prize_id}}" class="btn btn-sm btn-success me-1" disabled={{this.isLoading}}>
                        <i class="bi bi-check-lg"></i>
                      </button>
                      <button type="button" class="btn btn-sm btn-outline-secondary" {{on "click" this.cancelEdit}}>
                        <i class="bi bi-x-lg"></i>
                      </button>
                    </td>
                  </tr>
                {{else}}
                  <tr>
                    <td class="fw-semibold">{{prize.prize_id}}</td>
                    <td>{{prize.prize}}</td>
                    <td>{{if prize.prize_provided_by prize.prize_provided_by "—"}}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-primary me-1" title="Edit" {{on "click" (fn this.startEdit prize)}}>
                        <i class="bi bi-pencil-fill"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger" title="Delete" {{on "click" (fn this.deletePrize prize.prize_id)}}>
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                {{/if}}
              {{else}}
                <tr>
                  <td colspan="4" class="text-center text-muted py-4">
                    <i class="bi bi-trophy" style="font-size: 2rem"></i>
                    <p class="mt-2 mb-0">No prizes configured yet. Click <strong>Add Prize</strong> to get started.</p>
                  </td>
                </tr>
              {{/each}}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
    <div class="text-muted small mt-3">
      <i class="bi bi-info-circle"></i> Prizes are awarded to top-performing bulls in match history records. Deleting a prize may affect existing records.
    </div>
  </div>
  
  */
  {
    "id": "lQRqoWnz",
    "block": "[[[1,[28,[35,0],[\"Prize Management\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"container-fluid py-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"d-flex justify-content-between align-items-center mb-4\"],[12],[1,\"\\n    \"],[10,\"h2\"],[14,0,\"fw-bold\"],[12],[10,\"i\"],[14,0,\"bi bi-trophy-fill text-warning\"],[12],[13],[1,\" Prize Management\"],[13],[1,\"\\n\"],[41,[51,[30,0,[\"isAdding\"]]],[[[1,\"      \"],[11,\"button\"],[24,0,\"btn btn-accent\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"startAdd\"]]],null],[12],[1,\"\\n        \"],[10,\"i\"],[14,0,\"bi bi-plus-circle\"],[12],[13],[1,\" Add Prize\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"error\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-danger alert-dismissible fade show\"],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-exclamation-triangle-fill\"],[12],[13],[1,\" \"],[1,[30,0,[\"error\"]]],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-close\"],[14,\"data-bs-dismiss\",\"alert\"],[14,4,\"button\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"success\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-success alert-dismissible fade show\"],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-check-circle-fill\"],[12],[13],[1,\" \"],[1,[30,0,[\"success\"]]],[1,\"\\n      \"],[10,\"button\"],[14,0,\"btn-close\"],[14,\"data-bs-dismiss\",\"alert\"],[14,4,\"button\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"isAdding\"]],[[[1,\"    \"],[10,0],[14,0,\"card mb-4 border-accent\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-header bg-accent text-white fw-semibold\"],[12],[1,\"\\n        \"],[10,\"i\"],[14,0,\"bi bi-plus-circle\"],[12],[13],[1,\" New Prize\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n        \"],[11,\"form\"],[4,[38,2],[\"submit\",[30,0,[\"addPrize\"]]],null],[12],[1,\"\\n          \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-md-5\"],[12],[1,\"\\n              \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Prize Name \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n              \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"newName\"]]],[24,\"required\",\"\"],[24,\"placeholder\",\"e.g. Gold Medal, Cash ₹50,000\"],[24,4,\"text\"],[4,[38,2],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"newName\"],null]],null],[12],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"col-md-5\"],[12],[1,\"\\n              \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Provided By\"],[13],[1,\"\\n              \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"newProvider\"]]],[24,\"placeholder\",\"Sponsor or organizer name\"],[24,4,\"text\"],[4,[38,2],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"newProvider\"],null]],null],[12],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"col-md-2 d-flex align-items-end gap-2\"],[12],[1,\"\\n              \"],[10,\"button\"],[14,0,\"btn btn-success\"],[15,\"disabled\",[30,0,[\"isLoading\"]]],[14,4,\"submit\"],[12],[1,\"\\n                \"],[41,[30,0,[\"isLoading\"]],[[[10,1],[14,0,\"spinner-border spinner-border-sm\"],[12],[13]],[]],[[[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\" Save\"]],[]]],[1,\"\\n              \"],[13],[1,\"\\n              \"],[11,\"button\"],[24,0,\"btn btn-outline-secondary\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"cancelAdd\"]]],null],[12],[1,\"Cancel\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body p-0\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n        \"],[10,\"table\"],[14,0,\"table table-hover table-striped mb-0\"],[12],[1,\"\\n          \"],[10,\"thead\"],[14,0,\"table-dark\"],[12],[1,\"\\n            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"th\"],[14,5,\"width: 60px\"],[12],[1,\"ID\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"Prize Name\"],[13],[1,\"\\n              \"],[10,\"th\"],[12],[1,\"Provided By\"],[13],[1,\"\\n              \"],[10,\"th\"],[14,5,\"width: 150px\"],[14,0,\"text-center\"],[12],[1,\"Actions\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1]],null]],null],null,[[[41,[28,[37,7],[[30,0,[\"editingId\"]],[30,2,[\"prize_id\"]]],null],[[[1,\"                \"],[10,\"tr\"],[14,0,\"table-warning\"],[12],[1,\"\\n                  \"],[10,\"td\"],[14,0,\"align-middle fw-semibold\"],[12],[1,[30,2,[\"prize_id\"]]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,\"\\n                    \"],[11,\"form\"],[16,1,[29,[\"edit-form-\",[30,2,[\"prize_id\"]]]]],[4,[38,2],[\"submit\",[28,[37,4],[[30,0,[\"savePrize\"]],[30,2,[\"prize_id\"]]],null]],null],[12],[1,\"\\n                      \"],[11,\"input\"],[24,0,\"form-control form-control-sm\"],[16,2,[30,0,[\"editName\"]]],[24,\"required\",\"\"],[24,4,\"text\"],[4,[38,2],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"editName\"],null]],null],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,\"\\n                    \"],[11,\"input\"],[24,0,\"form-control form-control-sm\"],[16,2,[30,0,[\"editProvider\"]]],[16,\"form\",[29,[\"edit-form-\",[30,2,[\"prize_id\"]]]]],[24,4,\"text\"],[4,[38,2],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"editProvider\"],null]],null],[12],[13],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,\"\\n                    \"],[10,\"button\"],[15,\"form\",[29,[\"edit-form-\",[30,2,[\"prize_id\"]]]]],[14,0,\"btn btn-sm btn-success me-1\"],[15,\"disabled\",[30,0,[\"isLoading\"]]],[14,4,\"submit\"],[12],[1,\"\\n                      \"],[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[11,\"button\"],[24,0,\"btn btn-sm btn-outline-secondary\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"cancelEdit\"]]],null],[12],[1,\"\\n                      \"],[10,\"i\"],[14,0,\"bi bi-x-lg\"],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,\"tr\"],[12],[1,\"\\n                  \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,2,[\"prize_id\"]]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[30,2,[\"prize\"]]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[52,[30,2,[\"prize_provided_by\"]],[30,2,[\"prize_provided_by\"]],\"—\"]],[13],[1,\"\\n                  \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,\"\\n                    \"],[11,\"button\"],[24,0,\"btn btn-sm btn-outline-primary me-1\"],[24,\"title\",\"Edit\"],[4,[38,2],[\"click\",[28,[37,4],[[30,0,[\"startEdit\"]],[30,2]],null]],null],[12],[1,\"\\n                      \"],[10,\"i\"],[14,0,\"bi bi-pencil-fill\"],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[11,\"button\"],[24,0,\"btn btn-sm btn-outline-danger\"],[24,\"title\",\"Delete\"],[4,[38,2],[\"click\",[28,[37,4],[[30,0,[\"deletePrize\"]],[30,2,[\"prize_id\"]]],null]],null],[12],[1,\"\\n                      \"],[10,\"i\"],[14,0,\"bi bi-trash-fill\"],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]]]],[2]],[[[1,\"              \"],[10,\"tr\"],[12],[1,\"\\n                \"],[10,\"td\"],[14,\"colspan\",\"4\"],[14,0,\"text-center text-muted py-4\"],[12],[1,\"\\n                  \"],[10,\"i\"],[14,0,\"bi bi-trophy\"],[14,5,\"font-size: 2rem\"],[12],[13],[1,\"\\n                  \"],[10,2],[14,0,\"mt-2 mb-0\"],[12],[1,\"No prizes configured yet. Click \"],[10,\"strong\"],[12],[1,\"Add Prize\"],[13],[1,\" to get started.\"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"text-muted small mt-3\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-info-circle\"],[12],[13],[1,\" Prizes are awarded to top-performing bulls in match history records. Deleting a prize may affect existing records.\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"@model\",\"prize\"],false,[\"page-title\",\"unless\",\"on\",\"if\",\"fn\",\"each\",\"-track-array\",\"eq\"]]",
    "moduleName": "jallikattu-frontend/templates/prizes.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/registration", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Registration & Management"}}
  
  <div class="section-header">
    <h5><i class="bi bi-person-plus-fill"></i> Registration &amp; Management</h5>
  </div>
  
  {{!-- Toast --}}
  {{#if this.statusMessage}}
    <div class="toast-notification {{this.statusType}}" role="alert">
      <i class="bi {{if (eq this.statusType 'success') 'bi-check-circle-fill' 'bi-exclamation-triangle-fill'}}"></i>
      {{this.statusMessage}}
    </div>
  {{/if}}
  
  {{!-- Tab Navigation --}}
  <div class="tab-nav mb-4">
    <button class="tab-btn {{if (eq this.activeTab 'player') 'active'}}" type="button" {{on "click" (fn this.setTab "player")}}>
      <i class="bi bi-person-arms-up"></i> Players
    </button>
    <button class="tab-btn {{if (eq this.activeTab 'bull') 'active'}}" type="button" {{on "click" (fn this.setTab "bull")}}>
      <i class="bi bi-shield-fill"></i> Bulls
    </button>
    <button class="tab-btn {{if (eq this.activeTab 'owner') 'active'}}" type="button" {{on "click" (fn this.setTab "owner")}}>
      <i class="bi bi-person-badge-fill"></i> Owners
    </button>
    <button class="tab-btn {{if (eq this.activeTab 'organizer') 'active'}}" type="button" {{on "click" (fn this.setTab "organizer")}}>
      <i class="bi bi-building"></i> Organizers
    </button>
    <button class="tab-btn {{if (eq this.activeTab 'match') 'active'}}" type="button" {{on "click" (fn this.setTab "match")}}>
      <i class="bi bi-calendar-plus"></i> Schedule Match
    </button>
  </div>
  
  {{!-- ═══════════════════════════════════════ --}}
  {{!-- ═══════ PLAYERS TAB ═══════ --}}
  {{!-- ═══════════════════════════════════════ --}}
  {{#if (eq this.activeTab "player")}}
  
    {{!-- Create New Player --}}
    <div class="card mb-4 border-primary">
      <div class="card-body">
        <h6 class="fw-bold mb-3"><i class="bi bi-person-plus text-primary"></i> Create New Player</h6>
        <form {{on "submit" this.createPlayer}}>
          <div class="row g-3">
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Name <span class="text-danger">*</span></label>
              <input type="text" name="player_name" class="form-control form-control-sm" required placeholder="Full name">
            </div>
            <div class="col-md-2 col-6">
              <label class="form-label small fw-semibold">Date of Birth</label>
              <input type="date" name="dob" class="form-control form-control-sm">
            </div>
            <div class="col-md-2 col-6">
              <label class="form-label small fw-semibold">Aadhaar <span class="text-danger">*</span></label>
              <input type="text" name="aadhaar" class="form-control form-control-sm" required placeholder="12 digits" maxlength="12" pattern="\d{12}">
            </div>
            <div class="col-md-2 col-6">
              <label class="form-label small fw-semibold">Phone <span class="text-danger">*</span></label>
              <input type="text" name="phone" class="form-control form-control-sm" required placeholder="10 digits" maxlength="10" pattern="\d{10}">
            </div>
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Link to User (optional)</label>
              <select name="user_id" class="form-select form-select-sm">
                <option value="">None</option>
                {{#each @model.users as |u|}}
                  {{#if (eq u.role "player")}}
                    <option value={{u.user_id}}>{{u.username}} ({{u.full_name}})</option>
                  {{/if}}
                {{/each}}
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-sm mt-3"><i class="bi bi-plus-lg"></i> Create Player</button>
        </form>
      </div>
    </div>
  
    {{!-- Register Player for Match --}}
    <div class="card mb-4">
      <div class="card-body">
        <h6 class="fw-bold mb-3"><i class="bi bi-person-check text-success"></i> Register Player for Match</h6>
        <form {{on "submit" this.registerPlayer}}>
          <div class="row g-3">
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Match <span class="text-danger">*</span></label>
              <select name="match_id" class="form-select form-select-sm" required>
                <option value="">Select match...</option>
                {{#each @model.scheduledMatches as |m|}}
                  <option value={{m.match_id}}>{{m.match_name}}</option>
                {{/each}}
              </select>
            </div>
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Player <span class="text-danger">*</span></label>
              <select name="player_id" class="form-select form-select-sm" required>
                <option value="">Select player...</option>
                {{#each @model.players as |p|}}
                  <option value={{p.player_id}}>{{p.player_name}}</option>
                {{/each}}
              </select>
            </div>
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Round <span class="text-danger">*</span></label>
              <select name="round_type_id" class="form-select form-select-sm" required>
                <option value="">Select round...</option>
                {{#each @model.roundTypes as |r|}}
                  <option value={{r.round_type_id}}>{{r.round_name}}</option>
                {{/each}}
              </select>
            </div>
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Batch <span class="text-danger">*</span></label>
              <select name="batch_id" class="form-select form-select-sm" required>
                <option value="">Select batch...</option>
                {{#each @model.batches as |b|}}
                  <option value={{b.batch_id}}>{{b.batch_name}}</option>
                {{/each}}
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-success btn-sm mt-3"><i class="bi bi-check-lg"></i> Register</button>
        </form>
      </div>
    </div>
  
    {{!-- Pending Player Registrations --}}
    <div class="card">
      <div class="card-body p-0 table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr><th>Match</th><th>Player</th><th>Round</th><th>Status</th><th class="text-end">Action</th></tr>
          </thead>
          <tbody>
            {{#each @model.pendingPlayers as |p|}}
              <tr>
                <td>{{p.match_name}}</td>
                <td class="fw-semibold">{{p.player_name}}</td>
                <td><span class="badge bg-secondary">{{p.round_name}}</span></td>
                <td>
                  <span class="status-badge {{if (eq p.status 'approved') 'approved' 'pending'}}">{{p.status}}</span>
                </td>
                <td class="text-end">
                  {{#if (eq p.status "registered")}}
                    <button class="btn btn-success btn-sm" type="button"
                      {{on "click" (fn this.approvePlayer p.match_id p.player_id p.round_type_id)}}>
                      <i class="bi bi-check-lg"></i> Approve
                    </button>
                  {{else}}
                    <i class="bi bi-check-circle-fill text-success"></i>
                  {{/if}}
                </td>
              </tr>
            {{else}}
              <tr>
                <td colspan="5">
                  <div class="empty-state py-3"><i class="bi bi-inbox"></i><p>No player registrations</p></div>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  
    {{!-- All Players List --}}
    <div class="card mt-4">
      <div class="card-body p-0 table-responsive">
        <h6 class="fw-bold p-3 mb-0"><i class="bi bi-list-ul"></i> All Players ({{@model.players.length}})</h6>
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr><th>ID</th><th>Name</th><th>DOB</th><th>Aadhaar</th><th>Phone</th></tr>
          </thead>
          <tbody>
            {{#each @model.players as |p|}}
              <tr>
                <td class="text-muted small">{{p.player_id}}</td>
                <td class="fw-semibold">{{p.player_name}}</td>
                <td>{{p.DOB}}</td>
                <td class="small">{{p.Aadhaar}}</td>
                <td class="small">{{p.Phone_number}}</td>
              </tr>
            {{else}}
              <tr><td colspan="5"><div class="empty-state py-3"><p>No players yet</p></div></td></tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  {{/if}}
  
  {{!-- ═══════════════════════════════════════ --}}
  {{!-- ═══════ BULLS TAB ═══════ --}}
  {{!-- ═══════════════════════════════════════ --}}
  {{#if (eq this.activeTab "bull")}}
  
    {{!-- Create New Bull --}}
    <div class="card mb-4 border-danger">
      <div class="card-body">
        <h6 class="fw-bold mb-3"><i class="bi bi-shield-fill-plus text-danger"></i> Create New Bull</h6>
        <form {{on "submit" this.createBull}}>
          <div class="row g-3">
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Bull Name <span class="text-danger">*</span></label>
              <input type="text" name="bull_name" class="form-control form-control-sm" required placeholder="e.g. Kodai">
            </div>
            <div class="col-md-2 col-6">
              <label class="form-label small fw-semibold">Age (yrs) <span class="text-danger">*</span></label>
              <input type="number" name="age" class="form-control form-control-sm" required min="1" max="30">
            </div>
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Owner <span class="text-danger">*</span></label>
              <select name="owner_id" class="form-select form-select-sm" required>
                <option value="">Select owner...</option>
                {{#each @model.owners as |o|}}
                  <option value={{o.owner_id}}>{{o.name}}</option>
                {{/each}}
              </select>
            </div>
            <div class="col-md-2 col-6">
              <label class="form-label small fw-semibold">Breed <span class="text-danger">*</span></label>
              <select name="breed_id" class="form-select form-select-sm" required>
                <option value="">Select breed...</option>
                {{#each @model.breeds as |b|}}
                  <option value={{b.bull_breed_id}}>{{b.bull_breed_name}}</option>
                {{/each}}
              </select>
            </div>
            <div class="col-md-2 col-6">
              <label class="form-label small fw-semibold">Fitness Cert</label>
              <input type="text" name="fitness_cert" class="form-control form-control-sm" placeholder="Certificate #">
            </div>
          </div>
          <button type="submit" class="btn btn-danger btn-sm mt-3"><i class="bi bi-plus-lg"></i> Create Bull</button>
        </form>
      </div>
    </div>
  
    {{!-- Register Bull for Match --}}
    <div class="card mb-4">
      <div class="card-body">
        <h6 class="fw-bold mb-3"><i class="bi bi-shield-fill-check text-success"></i> Register Bull for Match</h6>
        <form {{on "submit" this.registerBull}}>
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label small fw-semibold">Match <span class="text-danger">*</span></label>
              <select name="match_id" class="form-select form-select-sm" required>
                <option value="">Select match...</option>
                {{#each @model.scheduledMatches as |m|}}
                  <option value={{m.match_id}}>{{m.match_name}}</option>
                {{/each}}
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label small fw-semibold">Bull <span class="text-danger">*</span></label>
              <select name="bull_id" class="form-select form-select-sm" required>
                <option value="">Select bull...</option>
                {{#each @model.bulls as |b|}}
                  <option value={{b.bull_id}}>{{b.bull_name}}</option>
                {{/each}}
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label small fw-semibold">Round <span class="text-danger">*</span></label>
              <select name="round_type_id" class="form-select form-select-sm" required>
                <option value="">Select round...</option>
                {{#each @model.roundTypes as |r|}}
                  <option value={{r.round_type_id}}>{{r.round_name}}</option>
                {{/each}}
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-success btn-sm mt-3"><i class="bi bi-check-lg"></i> Register</button>
        </form>
      </div>
    </div>
  
    {{!-- Pending Bull Registrations --}}
    <div class="card">
      <div class="card-body p-0 table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr><th>Match</th><th>Bull</th><th>Round</th><th>Status</th><th class="text-end">Action</th></tr>
          </thead>
          <tbody>
            {{#each @model.pendingBulls as |b|}}
              <tr>
                <td>{{b.match_name}}</td>
                <td class="fw-semibold">{{b.bull_name}}</td>
                <td><span class="badge bg-secondary">{{b.round_name}}</span></td>
                <td>
                  <span class="status-badge {{if (eq b.status 'approved') 'approved' 'pending'}}">{{b.status}}</span>
                </td>
                <td class="text-end">
                  {{#if (eq b.status "registered")}}
                    <button class="btn btn-success btn-sm" type="button"
                      {{on "click" (fn this.approveBull b.match_id b.bull_id b.round_type_id)}}>
                      <i class="bi bi-check-lg"></i> Approve
                    </button>
                  {{else}}
                    <i class="bi bi-check-circle-fill text-success"></i>
                  {{/if}}
                </td>
              </tr>
            {{else}}
              <tr>
                <td colspan="5">
                  <div class="empty-state py-3"><i class="bi bi-inbox"></i><p>No bull registrations</p></div>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  
    {{!-- All Bulls List --}}
    <div class="card mt-4">
      <div class="card-body p-0 table-responsive">
        <h6 class="fw-bold p-3 mb-0"><i class="bi bi-list-ul"></i> All Bulls ({{@model.bulls.length}})</h6>
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr><th>ID</th><th>Name</th><th>Age</th><th>Owner</th><th>Breed</th><th>Fitness</th></tr>
          </thead>
          <tbody>
            {{#each @model.bulls as |b|}}
              <tr>
                <td class="text-muted small">{{b.bull_id}}</td>
                <td class="fw-semibold">{{b.bull_name}}</td>
                <td>{{b.age}}</td>
                <td>{{b.owner_id}}</td>
                <td>{{b.bull_breed_id}}</td>
                <td class="small">{{b.fitness_certificate}}</td>
              </tr>
            {{else}}
              <tr><td colspan="6"><div class="empty-state py-3"><p>No bulls yet</p></div></td></tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  {{/if}}
  
  {{!-- ═══════════════════════════════════════ --}}
  {{!-- ═══════ OWNERS TAB ═══════ --}}
  {{!-- ═══════════════════════════════════════ --}}
  {{#if (eq this.activeTab "owner")}}
  
    {{!-- Create New Owner --}}
    <div class="card mb-4 border-warning">
      <div class="card-body">
        <h6 class="fw-bold mb-3"><i class="bi bi-person-badge text-warning"></i> Create New Owner</h6>
        <form {{on "submit" this.createOwner}}>
          <div class="row g-3">
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Owner Name <span class="text-danger">*</span></label>
              <input type="text" name="name" class="form-control form-control-sm" required placeholder="Full name">
            </div>
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Aadhaar <span class="text-danger">*</span></label>
              <input type="text" name="aadhaar" class="form-control form-control-sm" required placeholder="12 digits" maxlength="12" pattern="\d{12}">
            </div>
            <div class="col-md-3 col-6">
              <label class="form-label small fw-semibold">Link to User (optional)</label>
              <select name="user_id" class="form-select form-select-sm">
                <option value="">None</option>
                {{#each @model.users as |u|}}
                  {{#if (eq u.role "owner")}}
                    <option value={{u.user_id}}>{{u.username}} ({{u.full_name}})</option>
                  {{/if}}
                {{/each}}
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-warning btn-sm mt-3"><i class="bi bi-plus-lg"></i> Create Owner</button>
        </form>
      </div>
    </div>
  
    {{!-- Owners List --}}
    <div class="card">
      <div class="card-body p-0 table-responsive">
        <h6 class="fw-bold p-3 mb-0"><i class="bi bi-list-ul"></i> All Owners ({{@model.owners.length}})</h6>
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr><th>ID</th><th>Name</th><th>Aadhaar</th><th>Bulls Owned</th></tr>
          </thead>
          <tbody>
            {{#each @model.owners as |o|}}
              <tr>
                <td class="text-muted small">{{o.owner_id}}</td>
                <td class="fw-semibold">{{o.name}}</td>
                <td class="small">{{o.Aadhaar}}</td>
                <td>
                  {{#each @model.bulls as |b|}}
                    {{#if (eq b.owner_id o.owner_id)}}
                      <span class="badge bg-secondary me-1">{{b.bull_name}}</span>
                    {{/if}}
                  {{/each}}
                </td>
              </tr>
            {{else}}
              <tr><td colspan="4"><div class="empty-state py-3"><p>No owners yet</p></div></td></tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  {{/if}}
  
  {{!-- ═══════════════════════════════════════ --}}
  {{!-- ═══════ ORGANIZERS TAB ═══════ --}}
  {{!-- ═══════════════════════════════════════ --}}
  {{#if (eq this.activeTab "organizer")}}
  
    {{!-- Create New Organizer --}}
    <div class="card mb-4 border-info">
      <div class="card-body">
        <h6 class="fw-bold mb-3"><i class="bi bi-building text-info"></i> Create New Organizer</h6>
        <form {{on "submit" this.createOrganizer}}>
          <div class="row g-3">
            <div class="col-md-4 col-6">
              <label class="form-label small fw-semibold">Organizer Name <span class="text-danger">*</span></label>
              <input type="text" name="organizer_name" class="form-control form-control-sm" required placeholder="e.g. Alanganallur Panchayat">
            </div>
          </div>
          <button type="submit" class="btn btn-info btn-sm mt-3"><i class="bi bi-plus-lg"></i> Create Organizer</button>
        </form>
      </div>
    </div>
  
    {{!-- Organizers List --}}
    <div class="card">
      <div class="card-body p-0 table-responsive">
        <h6 class="fw-bold p-3 mb-0"><i class="bi bi-list-ul"></i> All Organizers ({{@model.organizers.length}})</h6>
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr><th>ID</th><th>Name</th><th>Matches Organized</th></tr>
          </thead>
          <tbody>
            {{#each @model.organizers as |o|}}
              <tr>
                <td class="text-muted small">{{o.organizer_id}}</td>
                <td class="fw-semibold">{{o.organizer_name}}</td>
                <td>
                  {{#each @model.matches as |m|}}
                    {{#if (eq m.organizer_id o.organizer_id)}}
                      <span class="badge bg-secondary me-1">{{m.match_name}}</span>
                    {{/if}}
                  {{/each}}
                </td>
              </tr>
            {{else}}
              <tr><td colspan="3"><div class="empty-state py-3"><p>No organizers yet</p></div></td></tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  {{/if}}
  
  {{!-- ═══════════════════════════════════════ --}}
  {{!-- ═══════ SCHEDULE MATCH TAB ═══════ --}}
  {{!-- ═══════════════════════════════════════ --}}
  {{#if (eq this.activeTab "match")}}
    <div class="card mb-4">
      <div class="card-body">
        <h6 class="fw-bold mb-3"><i class="bi bi-calendar-plus text-primary"></i> Schedule New Match</h6>
        <form {{on "submit" this.scheduleMatch}}>
          <div class="row g-3">
            <div class="col-md-4 col-6">
              <label class="form-label small fw-semibold">Match ID <span class="text-danger">*</span></label>
              <input type="number" name="match_id" class="form-control form-control-sm" required placeholder="Unique ID">
            </div>
            <div class="col-md-4 col-6">
              <label class="form-label small fw-semibold">Match Name <span class="text-danger">*</span></label>
              <input type="text" name="match_name" class="form-control form-control-sm" required placeholder="e.g. Alanganallur 2026">
            </div>
            <div class="col-md-4 col-6">
              <label class="form-label small fw-semibold">Date <span class="text-danger">*</span></label>
              <input type="date" name="match_date" class="form-control form-control-sm" required>
            </div>
            <div class="col-md-4 col-6">
              <label class="form-label small fw-semibold">Location <span class="text-danger">*</span></label>
              <select name="location_id" class="form-select form-select-sm" required>
                <option value="">Select...</option>
                {{#each @model.locations as |l|}}
                  <option value={{l.location_id}}>{{l.area}}, {{l.district}}</option>
                {{/each}}
              </select>
            </div>
            <div class="col-md-4 col-6">
              <label class="form-label small fw-semibold">Organizer <span class="text-danger">*</span></label>
              <select name="organizer_id" class="form-select form-select-sm" required>
                <option value="">Select...</option>
                {{#each @model.organizers as |o|}}
                  <option value={{o.organizer_id}}>{{o.organizer_name}}</option>
                {{/each}}
              </select>
            </div>
            <div class="col-md-2 col-6">
              <label class="form-label small fw-semibold">Player Limit</label>
              <input type="number" name="player_limit" class="form-control form-control-sm" placeholder="Max">
            </div>
            <div class="col-md-2 col-6">
              <label class="form-label small fw-semibold">Bull Limit</label>
              <input type="number" name="bull_limit" class="form-control form-control-sm" placeholder="Max">
            </div>
          </div>
          <button type="submit" class="btn btn-success btn-sm mt-3"><i class="bi bi-calendar-check"></i> Schedule</button>
        </form>
      </div>
    </div>
  
    <div class="card">
      <div class="card-body p-0 table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr><th>ID</th><th>Name</th><th>Date</th><th>Capacity</th><th>Status</th></tr>
          </thead>
          <tbody>
            {{#each @model.matches as |m|}}
              <tr>
                <td class="text-muted small">{{m.match_id}}</td>
                <td class="fw-semibold">{{m.match_name}}</td>
                <td>{{m.match_date}}</td>
                <td>
                  <small>P: {{m.registered_player_count}}/{{m.player_limit}} &bull; B: {{m.registered_bull_count}}/{{m.bull_limit}}</small>
                </td>
                <td>
                  <span class="status-badge {{if (eq m.status 'Completed') 'completed' (if (eq m.status 'Live') 'live' 'scheduled')}}">
                    {{m.status}}
                  </span>
                </td>
              </tr>
            {{else}}
              <tr>
                <td colspan="5">
                  <div class="empty-state py-3"><i class="bi bi-calendar-x"></i><p>No matches scheduled</p></div>
                </td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
    </div>
  {{/if}}
  
  */
  {
    "id": "vPVWmmCt",
    "block": "[[[1,[28,[35,0],[\"Registration & Management\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-person-plus-fill\"],[12],[13],[1,\" Registration & Management\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"statusMessage\"]],[[[1,\"  \"],[10,0],[15,0,[29,[\"toast-notification \",[30,0,[\"statusType\"]]]]],[14,\"role\",\"alert\"],[12],[1,\"\\n    \"],[10,\"i\"],[15,0,[29,[\"bi \",[52,[28,[37,2],[[30,0,[\"statusType\"]],\"success\"],null],\"bi-check-circle-fill\",\"bi-exclamation-triangle-fill\"]]]],[12],[13],[1,\"\\n    \"],[1,[30,0,[\"statusMessage\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"tab-nav mb-4\"],[12],[1,\"\\n  \"],[11,\"button\"],[16,0,[29,[\"tab-btn \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"player\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"setTab\"]],\"player\"],null]],null],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-person-arms-up\"],[12],[13],[1,\" Players\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[16,0,[29,[\"tab-btn \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"bull\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"setTab\"]],\"bull\"],null]],null],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\" Bulls\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[16,0,[29,[\"tab-btn \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"owner\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"setTab\"]],\"owner\"],null]],null],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-person-badge-fill\"],[12],[13],[1,\" Owners\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[16,0,[29,[\"tab-btn \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"organizer\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"setTab\"]],\"organizer\"],null]],null],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-building\"],[12],[13],[1,\" Organizers\\n  \"],[13],[1,\"\\n  \"],[11,\"button\"],[16,0,[29,[\"tab-btn \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"match\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"setTab\"]],\"match\"],null]],null],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-calendar-plus\"],[12],[13],[1,\" Schedule Match\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"player\"],null],[[[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"card mb-4 border-primary\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-person-plus text-primary\"],[12],[13],[1,\" Create New Player\"],[13],[1,\"\\n      \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"createPlayer\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Name \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"player_name\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"placeholder\",\"Full name\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Date of Birth\"],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"dob\"],[14,0,\"form-control form-control-sm\"],[14,4,\"date\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Aadhaar \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"aadhaar\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"placeholder\",\"12 digits\"],[14,\"maxlength\",\"12\"],[14,\"pattern\",\"\\\\d{12}\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Phone \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"phone\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"placeholder\",\"10 digits\"],[14,\"maxlength\",\"10\"],[14,\"pattern\",\"\\\\d{10}\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Link to User (optional)\"],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"user_id\"],[14,0,\"form-select form-select-sm\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"None\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"users\"]]],null]],null],null,[[[41,[28,[37,2],[[30,2,[\"role\"]],\"player\"],null],[[[1,\"                  \"],[10,\"option\"],[15,2,[30,2,[\"user_id\"]]],[12],[1,[30,2,[\"username\"]]],[1,\" (\"],[1,[30,2,[\"full_name\"]]],[1,\")\"],[13],[1,\"\\n\"]],[]],null]],[2]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-primary btn-sm mt-3\"],[14,4,\"submit\"],[12],[10,\"i\"],[14,0,\"bi bi-plus-lg\"],[12],[13],[1,\" Create Player\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-person-check text-success\"],[12],[13],[1,\" Register Player for Match\"],[13],[1,\"\\n      \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"registerPlayer\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Match \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"match_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select match...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"scheduledMatches\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,3,[\"match_id\"]]],[12],[1,[30,3,[\"match_name\"]]],[13],[1,\"\\n\"]],[3]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Player \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"player_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select player...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"players\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,4,[\"player_id\"]]],[12],[1,[30,4,[\"player_name\"]]],[13],[1,\"\\n\"]],[4]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Round \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"round_type_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select round...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"roundTypes\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,5,[\"round_type_id\"]]],[12],[1,[30,5,[\"round_name\"]]],[13],[1,\"\\n\"]],[5]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Batch \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"batch_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select batch...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"batches\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,6,[\"batch_id\"]]],[12],[1,[30,6,[\"batch_name\"]]],[13],[1,\"\\n\"]],[6]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-success btn-sm mt-3\"],[14,4,\"submit\"],[12],[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\" Register\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body p-0 table-responsive\"],[12],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-hover align-middle mb-0\"],[12],[1,\"\\n        \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Match\"],[13],[10,\"th\"],[12],[1,\"Player\"],[13],[10,\"th\"],[12],[1,\"Round\"],[13],[10,\"th\"],[12],[1,\"Status\"],[13],[10,\"th\"],[14,0,\"text-end\"],[12],[1,\"Action\"],[13],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"pendingPlayers\"]]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,7,[\"match_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,7,[\"player_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,[30,7,[\"round_name\"]]],[13],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,\"\\n                \"],[10,1],[15,0,[29,[\"status-badge \",[52,[28,[37,2],[[30,7,[\"status\"]],\"approved\"],null],\"approved\",\"pending\"]]]],[12],[1,[30,7,[\"status\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-end\"],[12],[1,\"\\n\"],[41,[28,[37,2],[[30,7,[\"status\"]],\"registered\"],null],[[[1,\"                  \"],[11,\"button\"],[24,0,\"btn btn-success btn-sm\"],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"approvePlayer\"]],[30,7,[\"match_id\"]],[30,7,[\"player_id\"]],[30,7,[\"round_type_id\"]]],null]],null],[12],[1,\"\\n                    \"],[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\" Approve\\n                  \"],[13],[1,\"\\n\"]],[]],[[[1,\"                  \"],[10,\"i\"],[14,0,\"bi bi-check-circle-fill text-success\"],[12],[13],[1,\"\\n\"]],[]]],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[7]],[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,\"colspan\",\"5\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"empty-state py-3\"],[12],[10,\"i\"],[14,0,\"bi bi-inbox\"],[12],[13],[10,2],[12],[1,\"No player registrations\"],[13],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"card mt-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body p-0 table-responsive\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold p-3 mb-0\"],[12],[10,\"i\"],[14,0,\"bi bi-list-ul\"],[12],[13],[1,\" All Players (\"],[1,[30,1,[\"players\",\"length\"]]],[1,\")\"],[13],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-hover align-middle mb-0\"],[12],[1,\"\\n        \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"ID\"],[13],[10,\"th\"],[12],[1,\"Name\"],[13],[10,\"th\"],[12],[1,\"DOB\"],[13],[10,\"th\"],[12],[1,\"Aadhaar\"],[13],[10,\"th\"],[12],[1,\"Phone\"],[13],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"players\"]]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-muted small\"],[12],[1,[30,8,[\"player_id\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,8,[\"player_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,8,[\"DOB\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"small\"],[12],[1,[30,8,[\"Aadhaar\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"small\"],[12],[1,[30,8,[\"Phone_number\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[8]],[[[1,\"            \"],[10,\"tr\"],[12],[10,\"td\"],[14,\"colspan\",\"5\"],[12],[10,0],[14,0,\"empty-state py-3\"],[12],[10,2],[12],[1,\"No players yet\"],[13],[13],[13],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"bull\"],null],[[[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"card mb-4 border-danger\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill-plus text-danger\"],[12],[13],[1,\" Create New Bull\"],[13],[1,\"\\n      \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"createBull\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Bull Name \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"bull_name\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"placeholder\",\"e.g. Kodai\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Age (yrs) \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"age\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"min\",\"1\"],[14,\"max\",\"30\"],[14,4,\"number\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Owner \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"owner_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select owner...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"owners\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,9,[\"owner_id\"]]],[12],[1,[30,9,[\"name\"]]],[13],[1,\"\\n\"]],[9]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Breed \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"breed_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select breed...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"breeds\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,10,[\"bull_breed_id\"]]],[12],[1,[30,10,[\"bull_breed_name\"]]],[13],[1,\"\\n\"]],[10]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Fitness Cert\"],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"fitness_cert\"],[14,0,\"form-control form-control-sm\"],[14,\"placeholder\",\"Certificate #\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-danger btn-sm mt-3\"],[14,4,\"submit\"],[12],[10,\"i\"],[14,0,\"bi bi-plus-lg\"],[12],[13],[1,\" Create Bull\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill-check text-success\"],[12],[13],[1,\" Register Bull for Match\"],[13],[1,\"\\n      \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"registerBull\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-md-4\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Match \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"match_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select match...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"scheduledMatches\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,11,[\"match_id\"]]],[12],[1,[30,11,[\"match_name\"]]],[13],[1,\"\\n\"]],[11]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-4\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Bull \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"bull_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select bull...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"bulls\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,12,[\"bull_id\"]]],[12],[1,[30,12,[\"bull_name\"]]],[13],[1,\"\\n\"]],[12]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-4\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Round \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"round_type_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select round...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"roundTypes\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,13,[\"round_type_id\"]]],[12],[1,[30,13,[\"round_name\"]]],[13],[1,\"\\n\"]],[13]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-success btn-sm mt-3\"],[14,4,\"submit\"],[12],[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\" Register\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body p-0 table-responsive\"],[12],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-hover align-middle mb-0\"],[12],[1,\"\\n        \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Match\"],[13],[10,\"th\"],[12],[1,\"Bull\"],[13],[10,\"th\"],[12],[1,\"Round\"],[13],[10,\"th\"],[12],[1,\"Status\"],[13],[10,\"th\"],[14,0,\"text-end\"],[12],[1,\"Action\"],[13],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"pendingBulls\"]]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,14,[\"match_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,14,[\"bull_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,[30,14,[\"round_name\"]]],[13],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,\"\\n                \"],[10,1],[15,0,[29,[\"status-badge \",[52,[28,[37,2],[[30,14,[\"status\"]],\"approved\"],null],\"approved\",\"pending\"]]]],[12],[1,[30,14,[\"status\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-end\"],[12],[1,\"\\n\"],[41,[28,[37,2],[[30,14,[\"status\"]],\"registered\"],null],[[[1,\"                  \"],[11,\"button\"],[24,0,\"btn btn-success btn-sm\"],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"approveBull\"]],[30,14,[\"match_id\"]],[30,14,[\"bull_id\"]],[30,14,[\"round_type_id\"]]],null]],null],[12],[1,\"\\n                    \"],[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\" Approve\\n                  \"],[13],[1,\"\\n\"]],[]],[[[1,\"                  \"],[10,\"i\"],[14,0,\"bi bi-check-circle-fill text-success\"],[12],[13],[1,\"\\n\"]],[]]],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[14]],[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,\"colspan\",\"5\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"empty-state py-3\"],[12],[10,\"i\"],[14,0,\"bi bi-inbox\"],[12],[13],[10,2],[12],[1,\"No bull registrations\"],[13],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"card mt-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body p-0 table-responsive\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold p-3 mb-0\"],[12],[10,\"i\"],[14,0,\"bi bi-list-ul\"],[12],[13],[1,\" All Bulls (\"],[1,[30,1,[\"bulls\",\"length\"]]],[1,\")\"],[13],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-hover align-middle mb-0\"],[12],[1,\"\\n        \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"ID\"],[13],[10,\"th\"],[12],[1,\"Name\"],[13],[10,\"th\"],[12],[1,\"Age\"],[13],[10,\"th\"],[12],[1,\"Owner\"],[13],[10,\"th\"],[12],[1,\"Breed\"],[13],[10,\"th\"],[12],[1,\"Fitness\"],[13],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"bulls\"]]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-muted small\"],[12],[1,[30,15,[\"bull_id\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,15,[\"bull_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,15,[\"age\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,15,[\"owner_id\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,15,[\"bull_breed_id\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"small\"],[12],[1,[30,15,[\"fitness_certificate\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[15]],[[[1,\"            \"],[10,\"tr\"],[12],[10,\"td\"],[14,\"colspan\",\"6\"],[12],[10,0],[14,0,\"empty-state py-3\"],[12],[10,2],[12],[1,\"No bulls yet\"],[13],[13],[13],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"owner\"],null],[[[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"card mb-4 border-warning\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-person-badge text-warning\"],[12],[13],[1,\" Create New Owner\"],[13],[1,\"\\n      \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"createOwner\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Owner Name \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"name\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"placeholder\",\"Full name\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Aadhaar \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"aadhaar\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"placeholder\",\"12 digits\"],[14,\"maxlength\",\"12\"],[14,\"pattern\",\"\\\\d{12}\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-3 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Link to User (optional)\"],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"user_id\"],[14,0,\"form-select form-select-sm\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"None\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"users\"]]],null]],null],null,[[[41,[28,[37,2],[[30,16,[\"role\"]],\"owner\"],null],[[[1,\"                  \"],[10,\"option\"],[15,2,[30,16,[\"user_id\"]]],[12],[1,[30,16,[\"username\"]]],[1,\" (\"],[1,[30,16,[\"full_name\"]]],[1,\")\"],[13],[1,\"\\n\"]],[]],null]],[16]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-warning btn-sm mt-3\"],[14,4,\"submit\"],[12],[10,\"i\"],[14,0,\"bi bi-plus-lg\"],[12],[13],[1,\" Create Owner\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body p-0 table-responsive\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold p-3 mb-0\"],[12],[10,\"i\"],[14,0,\"bi bi-list-ul\"],[12],[13],[1,\" All Owners (\"],[1,[30,1,[\"owners\",\"length\"]]],[1,\")\"],[13],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-hover align-middle mb-0\"],[12],[1,\"\\n        \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"ID\"],[13],[10,\"th\"],[12],[1,\"Name\"],[13],[10,\"th\"],[12],[1,\"Aadhaar\"],[13],[10,\"th\"],[12],[1,\"Bulls Owned\"],[13],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"owners\"]]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-muted small\"],[12],[1,[30,17,[\"owner_id\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,17,[\"name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"small\"],[12],[1,[30,17,[\"Aadhaar\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"bulls\"]]],null]],null],null,[[[41,[28,[37,2],[[30,18,[\"owner_id\"]],[30,17,[\"owner_id\"]]],null],[[[1,\"                    \"],[10,1],[14,0,\"badge bg-secondary me-1\"],[12],[1,[30,18,[\"bull_name\"]]],[13],[1,\"\\n\"]],[]],null]],[18]],null],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[17]],[[[1,\"            \"],[10,\"tr\"],[12],[10,\"td\"],[14,\"colspan\",\"4\"],[12],[10,0],[14,0,\"empty-state py-3\"],[12],[10,2],[12],[1,\"No owners yet\"],[13],[13],[13],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"organizer\"],null],[[[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"card mb-4 border-info\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-building text-info\"],[12],[13],[1,\" Create New Organizer\"],[13],[1,\"\\n      \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"createOrganizer\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-md-4 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Organizer Name \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"organizer_name\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"placeholder\",\"e.g. Alanganallur Panchayat\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-info btn-sm mt-3\"],[14,4,\"submit\"],[12],[10,\"i\"],[14,0,\"bi bi-plus-lg\"],[12],[13],[1,\" Create Organizer\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body p-0 table-responsive\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold p-3 mb-0\"],[12],[10,\"i\"],[14,0,\"bi bi-list-ul\"],[12],[13],[1,\" All Organizers (\"],[1,[30,1,[\"organizers\",\"length\"]]],[1,\")\"],[13],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-hover align-middle mb-0\"],[12],[1,\"\\n        \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"ID\"],[13],[10,\"th\"],[12],[1,\"Name\"],[13],[10,\"th\"],[12],[1,\"Matches Organized\"],[13],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"organizers\"]]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-muted small\"],[12],[1,[30,19,[\"organizer_id\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,19,[\"organizer_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"matches\"]]],null]],null],null,[[[41,[28,[37,2],[[30,20,[\"organizer_id\"]],[30,19,[\"organizer_id\"]]],null],[[[1,\"                    \"],[10,1],[14,0,\"badge bg-secondary me-1\"],[12],[1,[30,20,[\"match_name\"]]],[13],[1,\"\\n\"]],[]],null]],[20]],null],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[19]],[[[1,\"            \"],[10,\"tr\"],[12],[10,\"td\"],[14,\"colspan\",\"3\"],[12],[10,0],[14,0,\"empty-state py-3\"],[12],[10,2],[12],[1,\"No organizers yet\"],[13],[13],[13],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"match\"],null],[[[1,\"  \"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar-plus text-primary\"],[12],[13],[1,\" Schedule New Match\"],[13],[1,\"\\n      \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"scheduleMatch\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-md-4 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Match ID \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"match_id\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"placeholder\",\"Unique ID\"],[14,4,\"number\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-4 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Match Name \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"match_name\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,\"placeholder\",\"e.g. Alanganallur 2026\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-4 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Date \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"match_date\"],[14,0,\"form-control form-control-sm\"],[14,\"required\",\"\"],[14,4,\"date\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-4 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Location \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"location_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"locations\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,21,[\"location_id\"]]],[12],[1,[30,21,[\"area\"]]],[1,\", \"],[1,[30,21,[\"district\"]]],[13],[1,\"\\n\"]],[21]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-4 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Organizer \"],[10,1],[14,0,\"text-danger\"],[12],[1,\"*\"],[13],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"organizer_id\"],[14,0,\"form-select form-select-sm\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select...\"],[13],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"organizers\"]]],null]],null],null,[[[1,\"                \"],[10,\"option\"],[15,2,[30,22,[\"organizer_id\"]]],[12],[1,[30,22,[\"organizer_name\"]]],[13],[1,\"\\n\"]],[22]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Player Limit\"],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"player_limit\"],[14,0,\"form-control form-control-sm\"],[14,\"placeholder\",\"Max\"],[14,4,\"number\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-2 col-6\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label small fw-semibold\"],[12],[1,\"Bull Limit\"],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"bull_limit\"],[14,0,\"form-control form-control-sm\"],[14,\"placeholder\",\"Max\"],[14,4,\"number\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"button\"],[14,0,\"btn btn-success btn-sm mt-3\"],[14,4,\"submit\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar-check\"],[12],[13],[1,\" Schedule\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body p-0 table-responsive\"],[12],[1,\"\\n      \"],[10,\"table\"],[14,0,\"table table-hover align-middle mb-0\"],[12],[1,\"\\n        \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n          \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"ID\"],[13],[10,\"th\"],[12],[1,\"Name\"],[13],[10,\"th\"],[12],[1,\"Date\"],[13],[10,\"th\"],[12],[1,\"Capacity\"],[13],[10,\"th\"],[12],[1,\"Status\"],[13],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,1,[\"matches\"]]],null]],null],null,[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,0,\"text-muted small\"],[12],[1,[30,23,[\"match_id\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,23,[\"match_name\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,23,[\"match_date\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,\"\\n                \"],[10,\"small\"],[12],[1,\"P: \"],[1,[30,23,[\"registered_player_count\"]]],[1,\"/\"],[1,[30,23,[\"player_limit\"]]],[1,\" • B: \"],[1,[30,23,[\"registered_bull_count\"]]],[1,\"/\"],[1,[30,23,[\"bull_limit\"]]],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,\"\\n                \"],[10,1],[15,0,[29,[\"status-badge \",[52,[28,[37,2],[[30,23,[\"status\"]],\"Completed\"],null],\"completed\",[52,[28,[37,2],[[30,23,[\"status\"]],\"Live\"],null],\"live\",\"scheduled\"]]]]],[12],[1,\"\\n                  \"],[1,[30,23,[\"status\"]]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[23]],[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[14,\"colspan\",\"5\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"empty-state py-3\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar-x\"],[12],[13],[10,2],[12],[1,\"No matches scheduled\"],[13],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"@model\",\"u\",\"m\",\"p\",\"r\",\"b\",\"p\",\"p\",\"o\",\"b\",\"m\",\"b\",\"r\",\"b\",\"b\",\"u\",\"o\",\"b\",\"o\",\"m\",\"l\",\"o\",\"m\"],false,[\"page-title\",\"if\",\"eq\",\"on\",\"fn\",\"each\",\"-track-array\"]]",
    "moduleName": "jallikattu-frontend/templates/registration.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/scoreboard", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Live Scoreboard"}}
  <div class="container py-4">
    <div class="section-header">
      <h5><i class="bi bi-broadcast text-danger"></i> Live Scoreboard</h5>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm {{if this.autoRefresh 'btn-success' 'btn-outline-secondary'}}" type="button" {{on "click" this.toggleAutoRefresh}}>
          <i class="bi {{if this.autoRefresh 'bi-pause-circle' 'bi-play-circle'}}"></i>
          {{if this.autoRefresh "Auto-refresh ON" "Auto-refresh OFF"}}
        </button>
      </div>
    </div>
  
    {{!-- Match selector --}}
    <div class="row g-3 mb-4">
      {{#each this.allMatches as |match|}}
        <div class="col-md-4 col-lg-3">
          <div class="match-card cursor-pointer {{if (eq this.selectedMatchId match.match_id) 'border-danger'}}"
               role="button" {{on "click" (fn this.selectMatch match.match_id)}}>
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h6 class="fw-bold mb-0 small">Match #{{match.match_id}}</h6>
              <span class="status-badge {{match.status}}">{{match.status}}</span>
            </div>
            <div class="match-venue"><i class="bi bi-geo-alt"></i> {{match.location}}</div>
            <div class="match-date"><i class="bi bi-calendar3"></i> {{match.match_date}}</div>
          </div>
        </div>
      {{/each}}
    </div>
  
    {{#if this.isLoading}}
      <div class="loading-spinner">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    {{else if this.scores}}
      <div class="row g-4">
        {{!-- Player Leaderboard --}}
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-person-fill text-primary"></i> Player Leaderboard</h6>
              {{#if this.topPlayers.length}}
                <div class="table-responsive">
                  <table class="table table-sm mb-0">
                    <thead>
                      <tr>
                        <th>#</th><th>Player</th><th class="text-center">Caught</th>
                        <th class="text-center">Penalties</th><th class="text-center">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {{#each this.topPlayers as |p index|}}
                        <tr>
                          <td>
                            <span class="leaderboard-rank {{if (eq index 0) 'gold' (if (eq index 1) 'silver' (if (eq index 2) 'bronze' 'default'))}}">
                              {{add index 1}}
                            </span>
                          </td>
                          <td>
                            <LinkTo @route="player-profile" @model={{p.player_id}} class="fw-semibold text-decoration-none">
                              {{p.player_name}}
                            </LinkTo>
                            <br><small class="text-muted">{{p.batch_name}}</small>
                          </td>
                          <td class="text-center">{{p.total_caught}}</td>
                          <td class="text-center text-danger">{{p.total_penalties}}</td>
                          <td class="text-center"><span class="score-net">{{p.net_score}}</span></td>
                        </tr>
                      {{/each}}
                    </tbody>
                  </table>
                </div>
              {{else}}
                <div class="empty-state"><i class="bi bi-inbox d-block"></i>No player scores yet</div>
              {{/if}}
            </div>
          </div>
        </div>
  
        {{!-- Bull Leaderboard --}}
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-shield-fill text-success"></i> Bull Leaderboard</h6>
              {{#if this.topBulls.length}}
                <div class="table-responsive">
                  <table class="table table-sm mb-0">
                    <thead>
                      <tr>
                        <th>#</th><th>Bull</th><th class="text-center">Aggression</th>
                        <th class="text-center">Difficulty</th><th class="text-center">Releases</th>
                      </tr>
                    </thead>
                    <tbody>
                      {{#each this.topBulls as |b index|}}
                        <tr>
                          <td>
                            <span class="leaderboard-rank {{if (eq index 0) 'gold' (if (eq index 1) 'silver' (if (eq index 2) 'bronze' 'default'))}}">
                              {{add index 1}}
                            </span>
                          </td>
                          <td>
                            <LinkTo @route="bull-profile" @model={{b.bull_id}} class="fw-semibold text-decoration-none">
                              {{b.bull_name}}
                            </LinkTo>
                            <br><small class="text-muted">{{b.owner_name}}</small>
                          </td>
                          <td class="text-center">{{b.avg_aggression}}</td>
                          <td class="text-center">{{b.avg_difficulty}}</td>
                          <td class="text-center">{{b.total_releases}}</td>
                        </tr>
                      {{/each}}
                    </tbody>
                  </table>
                </div>
              {{else}}
                <div class="empty-state"><i class="bi bi-inbox d-block"></i>No bull scores yet</div>
              {{/if}}
            </div>
          </div>
        </div>
      </div>
    {{else}}
      <div class="empty-state">
        <i class="bi bi-hand-index d-block"></i>
        <h6>Select a match above to view scores</h6>
        <p class="text-muted">Pick any match to see the live scoreboard</p>
      </div>
    {{/if}}
  </div>
  
  */
  {
    "id": "rbkT9dgh",
    "block": "[[[1,[28,[35,0],[\"Live Scoreboard\"],null]],[1,\"\\n\"],[10,0],[14,0,\"container py-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n    \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-broadcast text-danger\"],[12],[13],[1,\" Live Scoreboard\"],[13],[1,\"\\n    \"],[10,0],[14,0,\"d-flex align-items-center gap-2\"],[12],[1,\"\\n      \"],[11,\"button\"],[16,0,[29,[\"btn btn-sm \",[52,[30,0,[\"autoRefresh\"]],\"btn-success\",\"btn-outline-secondary\"]]]],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"toggleAutoRefresh\"]]],null],[12],[1,\"\\n        \"],[10,\"i\"],[15,0,[29,[\"bi \",[52,[30,0,[\"autoRefresh\"]],\"bi-pause-circle\",\"bi-play-circle\"]]]],[12],[13],[1,\"\\n        \"],[1,[52,[30,0,[\"autoRefresh\"]],\"Auto-refresh ON\",\"Auto-refresh OFF\"]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"row g-3 mb-4\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"allMatches\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"col-md-4 col-lg-3\"],[12],[1,\"\\n        \"],[11,0],[16,0,[29,[\"match-card cursor-pointer \",[52,[28,[37,5],[[30,0,[\"selectedMatchId\"]],[30,1,[\"match_id\"]]],null],\"border-danger\"]]]],[24,\"role\",\"button\"],[4,[38,2],[\"click\",[28,[37,6],[[30,0,[\"selectMatch\"]],[30,1,[\"match_id\"]]],null]],null],[12],[1,\"\\n          \"],[10,0],[14,0,\"d-flex justify-content-between align-items-start mb-1\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-0 small\"],[12],[1,\"Match #\"],[1,[30,1,[\"match_id\"]]],[13],[1,\"\\n            \"],[10,1],[15,0,[29,[\"status-badge \",[30,1,[\"status\"]]]]],[12],[1,[30,1,[\"status\"]]],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"match-venue\"],[12],[10,\"i\"],[14,0,\"bi bi-geo-alt\"],[12],[13],[1,\" \"],[1,[30,1,[\"location\"]]],[13],[1,\"\\n          \"],[10,0],[14,0,\"match-date\"],[12],[10,\"i\"],[14,0,\"bi bi-calendar3\"],[12],[13],[1,\" \"],[1,[30,1,[\"match_date\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"isLoading\"]],[[[1,\"    \"],[10,0],[14,0,\"loading-spinner\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"spinner-border text-danger\"],[14,\"role\",\"status\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"visually-hidden\"],[12],[1,\"Loading...\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"scores\"]],[[[1,\"    \"],[10,0],[14,0,\"row g-4\"],[12],[1,\"\\n\"],[1,\"      \"],[10,0],[14,0,\"col-lg-6\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-person-fill text-primary\"],[12],[13],[1,\" Player Leaderboard\"],[13],[1,\"\\n\"],[41,[30,0,[\"topPlayers\",\"length\"]],[[[1,\"              \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n                \"],[10,\"table\"],[14,0,\"table table-sm mb-0\"],[12],[1,\"\\n                  \"],[10,\"thead\"],[12],[1,\"\\n                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"th\"],[12],[1,\"#\"],[13],[10,\"th\"],[12],[1,\"Player\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Caught\"],[13],[1,\"\\n                      \"],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Penalties\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Net\"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"topPlayers\"]]],null]],null],null,[[[1,\"                      \"],[10,\"tr\"],[12],[1,\"\\n                        \"],[10,\"td\"],[12],[1,\"\\n                          \"],[10,1],[15,0,[29,[\"leaderboard-rank \",[52,[28,[37,5],[[30,3],0],null],\"gold\",[52,[28,[37,5],[[30,3],1],null],\"silver\",[52,[28,[37,5],[[30,3],2],null],\"bronze\",\"default\"]]]]]],[12],[1,\"\\n                            \"],[1,[28,[35,7],[[30,3],1],null]],[1,\"\\n                          \"],[13],[1,\"\\n                        \"],[13],[1,\"\\n                        \"],[10,\"td\"],[12],[1,\"\\n                          \"],[8,[39,8],[[24,0,\"fw-semibold text-decoration-none\"]],[[\"@route\",\"@model\"],[\"player-profile\",[30,2,[\"player_id\"]]]],[[\"default\"],[[[[1,\"\\n                            \"],[1,[30,2,[\"player_name\"]]],[1,\"\\n                          \"]],[]]]]],[1,\"\\n                          \"],[10,\"br\"],[12],[13],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,[30,2,[\"batch_name\"]]],[13],[1,\"\\n                        \"],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,2,[\"total_caught\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center text-danger\"],[12],[1,[30,2,[\"total_penalties\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center\"],[12],[10,1],[14,0,\"score-net\"],[12],[1,[30,2,[\"net_score\"]]],[13],[13],[1,\"\\n                      \"],[13],[1,\"\\n\"]],[2,3]],null],[1,\"                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[10,0],[14,0,\"empty-state\"],[12],[10,\"i\"],[14,0,\"bi bi-inbox d-block\"],[12],[13],[1,\"No player scores yet\"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[1,\"      \"],[10,0],[14,0,\"col-lg-6\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill text-success\"],[12],[13],[1,\" Bull Leaderboard\"],[13],[1,\"\\n\"],[41,[30,0,[\"topBulls\",\"length\"]],[[[1,\"              \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n                \"],[10,\"table\"],[14,0,\"table table-sm mb-0\"],[12],[1,\"\\n                  \"],[10,\"thead\"],[12],[1,\"\\n                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"th\"],[12],[1,\"#\"],[13],[10,\"th\"],[12],[1,\"Bull\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Aggression\"],[13],[1,\"\\n                      \"],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Difficulty\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Releases\"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"topBulls\"]]],null]],null],null,[[[1,\"                      \"],[10,\"tr\"],[12],[1,\"\\n                        \"],[10,\"td\"],[12],[1,\"\\n                          \"],[10,1],[15,0,[29,[\"leaderboard-rank \",[52,[28,[37,5],[[30,5],0],null],\"gold\",[52,[28,[37,5],[[30,5],1],null],\"silver\",[52,[28,[37,5],[[30,5],2],null],\"bronze\",\"default\"]]]]]],[12],[1,\"\\n                            \"],[1,[28,[35,7],[[30,5],1],null]],[1,\"\\n                          \"],[13],[1,\"\\n                        \"],[13],[1,\"\\n                        \"],[10,\"td\"],[12],[1,\"\\n                          \"],[8,[39,8],[[24,0,\"fw-semibold text-decoration-none\"]],[[\"@route\",\"@model\"],[\"bull-profile\",[30,4,[\"bull_id\"]]]],[[\"default\"],[[[[1,\"\\n                            \"],[1,[30,4,[\"bull_name\"]]],[1,\"\\n                          \"]],[]]]]],[1,\"\\n                          \"],[10,\"br\"],[12],[13],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,[30,4,[\"owner_name\"]]],[13],[1,\"\\n                        \"],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,4,[\"avg_aggression\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,4,[\"avg_difficulty\"]]],[13],[1,\"\\n                        \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,4,[\"total_releases\"]]],[13],[1,\"\\n                      \"],[13],[1,\"\\n\"]],[4,5]],null],[1,\"                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[10,0],[14,0,\"empty-state\"],[12],[10,\"i\"],[14,0,\"bi bi-inbox d-block\"],[12],[13],[1,\"No bull scores yet\"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"empty-state\"],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-hand-index d-block\"],[12],[13],[1,\"\\n      \"],[10,\"h6\"],[12],[1,\"Select a match above to view scores\"],[13],[1,\"\\n      \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"Pick any match to see the live scoreboard\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]],[]]],[13],[1,\"\\n\"]],[\"match\",\"p\",\"index\",\"b\",\"index\"],false,[\"page-title\",\"if\",\"on\",\"each\",\"-track-array\",\"eq\",\"fn\",\"add\",\"link-to\"]]",
    "moduleName": "jallikattu-frontend/templates/scoreboard.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/signup", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Register"}}
  <div class="container py-5" style="max-width: 600px;">
    <div class="text-center mb-4">
      <i class="bi bi-trophy-fill text-accent" style="font-size:2.5rem;"></i>
      <h3 class="fw-bold mt-2">Join Jallikattu</h3>
      <p class="text-muted">Register as a player or bull owner</p>
    </div>
  
    {{!-- Tab switcher --}}
    <ul class="nav nav-tabs mb-4 justify-content-center">
      <li class="nav-item">
        <button class="nav-link {{if (eq this.activeTab 'player') 'active'}}" type="button" {{on "click" (fn this.setTab "player")}}>
          <i class="bi bi-person-fill"></i> Player
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link {{if (eq this.activeTab 'owner') 'active'}}" type="button" {{on "click" (fn this.setTab "owner")}}>
          <i class="bi bi-shield-fill"></i> Bull Owner
        </button>
      </li>
    </ul>
  
    {{#if this.error}}
      <div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> {{this.error}}</div>
    {{/if}}
    {{#if this.success}}
      <div class="alert alert-success">
        <i class="bi bi-check-circle"></i> {{this.success}}
        <div class="mt-2"><LinkTo @route="login" class="btn btn-sm btn-success">Go to Login</LinkTo></div>
      </div>
    {{/if}}
  
    {{!-- Player Form --}}
    {{#if (eq this.activeTab "player")}}
      <div class="card">
        <div class="card-body">
          <form {{on "submit" this.registerPlayer}}>
            <div class="mb-3">
              <label class="form-label fw-semibold">Username</label>
              <input type="text" class="form-control" value={{this.pUsername}} {{on "input" (fn this.updateField "pUsername")}} required minlength="3">
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Password</label>
              <input type="password" class="form-control" value={{this.pPassword}} {{on "input" (fn this.updateField "pPassword")}} required minlength="6">
              <small class="text-muted">Minimum 6 characters</small>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Full Name</label>
              <input type="text" class="form-control" value={{this.pName}} {{on "input" (fn this.updateField "pName")}} required>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Date of Birth</label>
              <input type="date" class="form-control" value={{this.pDOB}} {{on "input" (fn this.updateField "pDOB")}} required>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Phone Number</label>
              <input type="text" class="form-control" value={{this.pPhone}} {{on "input" (fn this.updateField "pPhone")}} required pattern="\d{10}" maxlength="10">
              <small class="text-muted">10-digit phone number</small>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Aadhaar Number</label>
              <input type="text" class="form-control" value={{this.pAadhaar}} {{on "input" (fn this.updateField "pAadhaar")}} required pattern="\d{12}" maxlength="12">
              <small class="text-muted">12-digit Aadhaar number</small>
            </div>
            <button type="submit" class="btn btn-accent w-100" disabled={{this.isLoading}}>
              {{#if this.isLoading}}
                <span class="spinner-border spinner-border-sm"></span> Registering...
              {{else}}
                <i class="bi bi-person-plus"></i> Register as Player
              {{/if}}
            </button>
          </form>
        </div>
      </div>
    {{/if}}
  
    {{!-- Owner Form --}}
    {{#if (eq this.activeTab "owner")}}
      <div class="card">
        <div class="card-body">
          <form {{on "submit" this.registerOwner}}>
            <div class="mb-3">
              <label class="form-label fw-semibold">Username</label>
              <input type="text" class="form-control" value={{this.oUsername}} {{on "input" (fn this.updateField "oUsername")}} required minlength="3">
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Password</label>
              <input type="password" class="form-control" value={{this.oPassword}} {{on "input" (fn this.updateField "oPassword")}} required minlength="6">
              <small class="text-muted">Minimum 6 characters</small>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Owner Name</label>
              <input type="text" class="form-control" value={{this.oName}} {{on "input" (fn this.updateField "oName")}} required>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Phone Number</label>
              <input type="text" class="form-control" value={{this.oPhone}} {{on "input" (fn this.updateField "oPhone")}} required pattern="\d{10}" maxlength="10">
            </div>
            <button type="submit" class="btn btn-accent w-100" disabled={{this.isLoading}}>
              {{#if this.isLoading}}
                <span class="spinner-border spinner-border-sm"></span> Registering...
              {{else}}
                <i class="bi bi-shield-plus"></i> Register as Bull Owner
              {{/if}}
            </button>
          </form>
        </div>
      </div>
    {{/if}}
  
    <div class="text-center mt-3">
      <span class="text-muted">Already have an account?</span>
      <LinkTo @route="login" class="text-accent fw-semibold">Login</LinkTo>
    </div>
  </div>
  
  */
  {
    "id": "lzB9YiHm",
    "block": "[[[1,[28,[35,0],[\"Register\"],null]],[1,\"\\n\"],[10,0],[14,0,\"container py-5\"],[14,5,\"max-width: 600px;\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"text-center mb-4\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-trophy-fill text-accent\"],[14,5,\"font-size:2.5rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h3\"],[14,0,\"fw-bold mt-2\"],[12],[1,\"Join Jallikattu\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"Register as a player or bull owner\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,\"ul\"],[14,0,\"nav nav-tabs mb-4 justify-content-center\"],[12],[1,\"\\n    \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[16,0,[29,[\"nav-link \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"player\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"setTab\"]],\"player\"],null]],null],[12],[1,\"\\n        \"],[10,\"i\"],[14,0,\"bi bi-person-fill\"],[12],[13],[1,\" Player\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"li\"],[14,0,\"nav-item\"],[12],[1,\"\\n      \"],[11,\"button\"],[16,0,[29,[\"nav-link \",[52,[28,[37,2],[[30,0,[\"activeTab\"]],\"owner\"],null],\"active\"]]]],[24,4,\"button\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"setTab\"]],\"owner\"],null]],null],[12],[1,\"\\n        \"],[10,\"i\"],[14,0,\"bi bi-shield-fill\"],[12],[13],[1,\" Bull Owner\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"error\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-danger\"],[12],[10,\"i\"],[14,0,\"bi bi-exclamation-triangle\"],[12],[13],[1,\" \"],[1,[30,0,[\"error\"]]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"success\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-success\"],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-check-circle\"],[12],[13],[1,\" \"],[1,[30,0,[\"success\"]]],[1,\"\\n      \"],[10,0],[14,0,\"mt-2\"],[12],[8,[39,5],[[24,0,\"btn btn-sm btn-success\"]],[[\"@route\"],[\"login\"]],[[\"default\"],[[[[1,\"Go to Login\"]],[]]]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"player\"],null],[[[1,\"    \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n        \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"registerPlayer\"]]],null],[12],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Username\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"pUsername\"]]],[24,\"required\",\"\"],[24,\"minlength\",\"3\"],[24,4,\"text\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"pUsername\"],null]],null],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Password\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"pPassword\"]]],[24,\"required\",\"\"],[24,\"minlength\",\"6\"],[24,4,\"password\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"pPassword\"],null]],null],[12],[13],[1,\"\\n            \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"Minimum 6 characters\"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Full Name\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"pName\"]]],[24,\"required\",\"\"],[24,4,\"text\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"pName\"],null]],null],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Date of Birth\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"pDOB\"]]],[24,\"required\",\"\"],[24,4,\"date\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"pDOB\"],null]],null],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Phone Number\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"pPhone\"]]],[24,\"required\",\"\"],[24,\"pattern\",\"\\\\d{10}\"],[24,\"maxlength\",\"10\"],[24,4,\"text\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"pPhone\"],null]],null],[12],[13],[1,\"\\n            \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"10-digit phone number\"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Aadhaar Number\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"pAadhaar\"]]],[24,\"required\",\"\"],[24,\"pattern\",\"\\\\d{12}\"],[24,\"maxlength\",\"12\"],[24,4,\"text\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"pAadhaar\"],null]],null],[12],[13],[1,\"\\n            \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"12-digit Aadhaar number\"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"button\"],[14,0,\"btn btn-accent w-100\"],[15,\"disabled\",[30,0,[\"isLoading\"]]],[14,4,\"submit\"],[12],[1,\"\\n\"],[41,[30,0,[\"isLoading\"]],[[[1,\"              \"],[10,1],[14,0,\"spinner-border spinner-border-sm\"],[12],[13],[1,\" Registering...\\n\"]],[]],[[[1,\"              \"],[10,\"i\"],[14,0,\"bi bi-person-plus\"],[12],[13],[1,\" Register as Player\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,2],[[30,0,[\"activeTab\"]],\"owner\"],null],[[[1,\"    \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n        \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"registerOwner\"]]],null],[12],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Username\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"oUsername\"]]],[24,\"required\",\"\"],[24,\"minlength\",\"3\"],[24,4,\"text\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"oUsername\"],null]],null],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Password\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"oPassword\"]]],[24,\"required\",\"\"],[24,\"minlength\",\"6\"],[24,4,\"password\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"oPassword\"],null]],null],[12],[13],[1,\"\\n            \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"Minimum 6 characters\"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Owner Name\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"oName\"]]],[24,\"required\",\"\"],[24,4,\"text\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"oName\"],null]],null],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Phone Number\"],[13],[1,\"\\n            \"],[11,\"input\"],[24,0,\"form-control\"],[16,2,[30,0,[\"oPhone\"]]],[24,\"required\",\"\"],[24,\"pattern\",\"\\\\d{10}\"],[24,\"maxlength\",\"10\"],[24,4,\"text\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0,[\"updateField\"]],\"oPhone\"],null]],null],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"button\"],[14,0,\"btn btn-accent w-100\"],[15,\"disabled\",[30,0,[\"isLoading\"]]],[14,4,\"submit\"],[12],[1,\"\\n\"],[41,[30,0,[\"isLoading\"]],[[[1,\"              \"],[10,1],[14,0,\"spinner-border spinner-border-sm\"],[12],[13],[1,\" Registering...\\n\"]],[]],[[[1,\"              \"],[10,\"i\"],[14,0,\"bi bi-shield-plus\"],[12],[13],[1,\" Register as Bull Owner\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"text-center mt-3\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"text-muted\"],[12],[1,\"Already have an account?\"],[13],[1,\"\\n    \"],[8,[39,5],[[24,0,\"text-accent fw-semibold\"]],[[\"@route\"],[\"login\"]],[[\"default\"],[[[[1,\"Login\"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"page-title\",\"if\",\"eq\",\"on\",\"fn\",\"link-to\"]]",
    "moduleName": "jallikattu-frontend/templates/signup.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/tables", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Data Tables"}}
  
  <div class="section-header">
    <h5><i class="bi bi-database-fill"></i> Data Tables</h5>
  </div>
  
  {{!-- Toast --}}
  {{#if this.statusMessage}}
    <div class="toast-notification info" role="alert">
      <i class="bi bi-info-circle-fill"></i> {{this.statusMessage}}
    </div>
  {{/if}}
  
  <div class="row g-3">
    {{!-- Table List Sidebar --}}
    <div class="col-lg-3 col-md-4">
      <div class="card">
        <div class="card-body p-2">
          <div class="list-group list-group-flush">
            {{#each @model as |tableName|}}
              <button type="button"
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-3 py-2 {{if (eq this.selectedTable tableName) 'active'}}"
                {{on "click" (fn this.loadTable tableName)}}>
                <span class="text-capitalize"><i class="bi bi-table me-2"></i>{{tableName}}</span>
                <i class="bi bi-chevron-right small"></i>
              </button>
            {{/each}}
          </div>
        </div>
      </div>
    </div>
  
    {{!-- Table Content --}}
    <div class="col-lg-9 col-md-8">
      {{#if this.isLoading}}
        <div class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2 text-muted">Loading table data...</p>
        </div>
      {{else if this.tableData}}
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 class="text-capitalize fw-bold mb-0">{{this.selectedTable}}</h5>
            <small class="text-muted">{{this.tableData.rows.length}} records</small>
          </div>
          <button class="btn btn-accent btn-sm" type="button" {{on "click" this.toggleAddForm}}>
            <i class="bi bi-plus-lg"></i> Add Row
          </button>
        </div>
  
        {{!-- Add Row Form --}}
        {{#if this.showAddForm}}
          <div class="card mb-3 border-success">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-plus-circle"></i> New Record</h6>
              <form {{on "submit" this.addRow}}>
                <div class="row g-2">
                  {{#each this.tableData.columns as |col|}}
                    <div class="col-md-4 col-lg-3">
                      <label class="form-label small fw-semibold text-capitalize">{{col.name}}</label>
                      <input type="text" name="{{col.name}}" class="form-control form-control-sm"
                        placeholder="{{if (eq col.autoIncrement 'YES') '(auto)' ''}}"
                        disabled={{eq col.autoIncrement "YES"}}>
                    </div>
                  {{/each}}
                </div>
                <div class="mt-3 d-flex gap-2">
                  <button type="submit" class="btn btn-success btn-sm"><i class="bi bi-check-lg"></i> Save</button>
                  <button type="button" class="btn btn-outline-secondary btn-sm" {{on "click" this.toggleAddForm}}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        {{/if}}
  
        {{!-- Edit Row Form --}}
        {{#if this.editRow}}
          <div class="card mb-3 border-warning">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-pencil-square"></i> Edit Record</h6>
              <div class="row g-2">
                {{#each this.tableData.columns as |col|}}
                  <div class="col-md-4 col-lg-3">
                    <label class="form-label small fw-semibold text-capitalize">{{col.name}}</label>
                    <input type="text" class="form-control form-control-sm"
                      value={{get this.editRow col.name}}
                      {{on "input" (fn this.updateEditField col.name)}}
                      disabled={{includes this.tableData.primaryKeys col.name}}>
                  </div>
                {{/each}}
              </div>
              <div class="mt-3 d-flex gap-2">
                <button class="btn btn-success btn-sm" type="button" {{on "click" this.saveEdit}}><i class="bi bi-check-lg"></i> Update</button>
                <button class="btn btn-outline-secondary btn-sm" type="button" {{on "click" this.cancelEdit}}>Cancel</button>
              </div>
            </div>
          </div>
        {{/if}}
  
        {{!-- Data Table --}}
        <div class="card">
          <div class="card-body table-responsive p-0">
            <table class="table table-hover table-sm align-middle mb-0">
              <thead class="table-light">
                <tr>
                  {{#each this.tableData.columns as |col|}}
                    <th class="text-capitalize small">{{col.name}}</th>
                  {{/each}}
                  <th style="width:100px" class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {{#each this.tableData.rows as |row|}}
                  <tr>
                    {{#each this.tableData.columns as |col|}}
                      <td class="small">{{get row col.name}}</td>
                    {{/each}}
                    <td class="text-end">
                      <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" type="button" title="Edit" {{on "click" (fn this.startEdit row)}}>
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger" type="button" title="Delete" {{on "click" (fn this.deleteRow row)}}>
                          <i class="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                {{else}}
                  <tr>
                    <td colspan="99">
                      <div class="empty-state py-3">
                        <i class="bi bi-inbox"></i>
                        <p>No records in this table</p>
                      </div>
                    </td>
                  </tr>
                {{/each}}
              </tbody>
            </table>
          </div>
        </div>
      {{else}}
        <div class="empty-state py-5">
          <i class="bi bi-arrow-left-circle" style="font-size:3rem;"></i>
          <h5 class="mt-3">Select a Table</h5>
          <p>Choose a table from the sidebar to view and manage its data</p>
        </div>
      {{/if}}
    </div>
  </div>
  
  */
  {
    "id": "3KCUWJYX",
    "block": "[[[1,[28,[35,0],[\"Data Tables\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-database-fill\"],[12],[13],[1,\" Data Tables\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"statusMessage\"]],[[[1,\"  \"],[10,0],[14,0,\"toast-notification info\"],[14,\"role\",\"alert\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-info-circle-fill\"],[12],[13],[1,\" \"],[1,[30,0,[\"statusMessage\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n\"],[1,\"  \"],[10,0],[14,0,\"col-lg-3 col-md-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-body p-2\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"list-group list-group-flush\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,1]],null]],null],null,[[[1,\"            \"],[11,\"button\"],[16,0,[29,[\"list-group-item list-group-item-action d-flex justify-content-between align-items-center px-3 py-2 \",[52,[28,[37,4],[[30,0,[\"selectedTable\"]],[30,2]],null],\"active\"]]]],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"loadTable\"]],[30,2]],null]],null],[12],[1,\"\\n              \"],[10,1],[14,0,\"text-capitalize\"],[12],[10,\"i\"],[14,0,\"bi bi-table me-2\"],[12],[13],[1,[30,2]],[13],[1,\"\\n              \"],[10,\"i\"],[14,0,\"bi bi-chevron-right small\"],[12],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[2]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[1,\"  \"],[10,0],[14,0,\"col-lg-9 col-md-8\"],[12],[1,\"\\n\"],[41,[30,0,[\"isLoading\"]],[[[1,\"      \"],[10,0],[14,0,\"text-center py-5\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"spinner-border text-primary\"],[14,\"role\",\"status\"],[12],[13],[1,\"\\n        \"],[10,2],[14,0,\"mt-2 text-muted\"],[12],[1,\"Loading table data...\"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"tableData\"]],[[[1,\"      \"],[10,0],[14,0,\"d-flex justify-content-between align-items-center mb-3\"],[12],[1,\"\\n        \"],[10,0],[12],[1,\"\\n          \"],[10,\"h5\"],[14,0,\"text-capitalize fw-bold mb-0\"],[12],[1,[30,0,[\"selectedTable\"]]],[13],[1,\"\\n          \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,[30,0,[\"tableData\",\"rows\",\"length\"]]],[1,\" records\"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[11,\"button\"],[24,0,\"btn btn-accent btn-sm\"],[24,4,\"button\"],[4,[38,5],[\"click\",[30,0,[\"toggleAddForm\"]]],null],[12],[1,\"\\n          \"],[10,\"i\"],[14,0,\"bi bi-plus-lg\"],[12],[13],[1,\" Add Row\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showAddForm\"]],[[[1,\"        \"],[10,0],[14,0,\"card mb-3 border-success\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-plus-circle\"],[12],[13],[1,\" New Record\"],[13],[1,\"\\n            \"],[11,\"form\"],[4,[38,5],[\"submit\",[30,0,[\"addRow\"]]],null],[12],[1,\"\\n              \"],[10,0],[14,0,\"row g-2\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"tableData\",\"columns\"]]],null]],null],null,[[[1,\"                  \"],[10,0],[14,0,\"col-md-4 col-lg-3\"],[12],[1,\"\\n                    \"],[10,\"label\"],[14,0,\"form-label small fw-semibold text-capitalize\"],[12],[1,[30,3,[\"name\"]]],[13],[1,\"\\n                    \"],[10,\"input\"],[15,3,[29,[[30,3,[\"name\"]]]]],[14,0,\"form-control form-control-sm\"],[15,\"placeholder\",[29,[[52,[28,[37,4],[[30,3,[\"autoIncrement\"]],\"YES\"],null],\"(auto)\",\"\"]]]],[15,\"disabled\",[28,[37,4],[[30,3,[\"autoIncrement\"]],\"YES\"],null]],[14,4,\"text\"],[12],[13],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[3]],null],[1,\"              \"],[13],[1,\"\\n              \"],[10,0],[14,0,\"mt-3 d-flex gap-2\"],[12],[1,\"\\n                \"],[10,\"button\"],[14,0,\"btn btn-success btn-sm\"],[14,4,\"submit\"],[12],[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\" Save\"],[13],[1,\"\\n                \"],[11,\"button\"],[24,0,\"btn btn-outline-secondary btn-sm\"],[24,4,\"button\"],[4,[38,5],[\"click\",[30,0,[\"toggleAddForm\"]]],null],[12],[1,\"Cancel\"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"editRow\"]],[[[1,\"        \"],[10,0],[14,0,\"card mb-3 border-warning\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-pencil-square\"],[12],[13],[1,\" Edit Record\"],[13],[1,\"\\n            \"],[10,0],[14,0,\"row g-2\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"tableData\",\"columns\"]]],null]],null],null,[[[1,\"                \"],[10,0],[14,0,\"col-md-4 col-lg-3\"],[12],[1,\"\\n                  \"],[10,\"label\"],[14,0,\"form-label small fw-semibold text-capitalize\"],[12],[1,[30,4,[\"name\"]]],[13],[1,\"\\n                  \"],[11,\"input\"],[24,0,\"form-control form-control-sm\"],[16,2,[28,[37,7],[[30,0,[\"editRow\"]],[30,4,[\"name\"]]],null]],[16,\"disabled\",[28,[37,8],[[30,0,[\"tableData\",\"primaryKeys\"]],[30,4,[\"name\"]]],null]],[24,4,\"text\"],[4,[38,5],[\"input\",[28,[37,6],[[30,0,[\"updateEditField\"]],[30,4,[\"name\"]]],null]],null],[12],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[4]],null],[1,\"            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"mt-3 d-flex gap-2\"],[12],[1,\"\\n              \"],[11,\"button\"],[24,0,\"btn btn-success btn-sm\"],[24,4,\"button\"],[4,[38,5],[\"click\",[30,0,[\"saveEdit\"]]],null],[12],[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\" Update\"],[13],[1,\"\\n              \"],[11,\"button\"],[24,0,\"btn btn-outline-secondary btn-sm\"],[24,4,\"button\"],[4,[38,5],[\"click\",[30,0,[\"cancelEdit\"]]],null],[12],[1,\"Cancel\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[1,\"      \"],[10,0],[14,0,\"card\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card-body table-responsive p-0\"],[12],[1,\"\\n          \"],[10,\"table\"],[14,0,\"table table-hover table-sm align-middle mb-0\"],[12],[1,\"\\n            \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n              \"],[10,\"tr\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"tableData\",\"columns\"]]],null]],null],null,[[[1,\"                  \"],[10,\"th\"],[14,0,\"text-capitalize small\"],[12],[1,[30,5,[\"name\"]]],[13],[1,\"\\n\"]],[5]],null],[1,\"                \"],[10,\"th\"],[14,5,\"width:100px\"],[14,0,\"text-end\"],[12],[1,\"Actions\"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"tableData\",\"rows\"]]],null]],null],null,[[[1,\"                \"],[10,\"tr\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"tableData\",\"columns\"]]],null]],null],null,[[[1,\"                    \"],[10,\"td\"],[14,0,\"small\"],[12],[1,[28,[35,7],[[30,6],[30,7,[\"name\"]]],null]],[13],[1,\"\\n\"]],[7]],null],[1,\"                  \"],[10,\"td\"],[14,0,\"text-end\"],[12],[1,\"\\n                    \"],[10,0],[14,0,\"btn-group btn-group-sm\"],[12],[1,\"\\n                      \"],[11,\"button\"],[24,0,\"btn btn-outline-primary\"],[24,\"title\",\"Edit\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"startEdit\"]],[30,6]],null]],null],[12],[1,\"\\n                        \"],[10,\"i\"],[14,0,\"bi bi-pencil\"],[12],[13],[1,\"\\n                      \"],[13],[1,\"\\n                      \"],[11,\"button\"],[24,0,\"btn btn-outline-danger\"],[24,\"title\",\"Delete\"],[24,4,\"button\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"deleteRow\"]],[30,6]],null]],null],[12],[1,\"\\n                        \"],[10,\"i\"],[14,0,\"bi bi-trash3\"],[12],[13],[1,\"\\n                      \"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[6]],[[[1,\"                \"],[10,\"tr\"],[12],[1,\"\\n                  \"],[10,\"td\"],[14,\"colspan\",\"99\"],[12],[1,\"\\n                    \"],[10,0],[14,0,\"empty-state py-3\"],[12],[1,\"\\n                      \"],[10,\"i\"],[14,0,\"bi bi-inbox\"],[12],[13],[1,\"\\n                      \"],[10,2],[12],[1,\"No records in this table\"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n        \"],[10,\"i\"],[14,0,\"bi bi-arrow-left-circle\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n        \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"Select a Table\"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"Choose a table from the sidebar to view and manage its data\"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]],[]]],[1,\"  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"@model\",\"tableName\",\"col\",\"col\",\"col\",\"row\",\"col\"],false,[\"page-title\",\"if\",\"each\",\"-track-array\",\"eq\",\"on\",\"fn\",\"get\",\"includes\"]]",
    "moduleName": "jallikattu-frontend/templates/tables.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/users", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Super Admin – User Management"}}
  
  <div class="section-header d-flex justify-content-between align-items-center">
    <h5><i class="bi bi-shield-fill-check"></i> Super Admin &mdash; User Management</h5>
    <button class="btn btn-accent btn-sm" type="button" {{on "click" this.toggleAddForm}}>
      <i class="bi bi-person-plus-fill"></i> {{if this.showAddForm "Cancel" "Add User"}}
    </button>
  </div>
  
  {{!-- Toast --}}
  {{#if this.statusMessage}}
    <div class="toast-notification {{this.statusType}}" role="alert">
      <i class="bi {{if (eq this.statusType 'success') 'bi-check-circle-fill' 'bi-exclamation-triangle-fill'}}"></i>
      {{this.statusMessage}}
    </div>
  {{/if}}
  
  {{!-- Add User Form --}}
  {{#if this.showAddForm}}
    <div class="card mb-4">
      <div class="card-body">
        <h6 class="fw-bold mb-3"><i class="bi bi-person-plus"></i> Create New User</h6>
        <form {{on "submit" this.createUser}}>
          <div class="row g-3">
            <div class="col-md-6 col-lg-3">
              <label class="form-label fw-semibold">Username</label>
              <input type="text" name="username" class="form-control" placeholder="johndoe" required>
            </div>
            <div class="col-md-6 col-lg-3">
              <label class="form-label fw-semibold">Password</label>
              <input type="password" name="password" class="form-control" placeholder="Min 6 characters" required>
            </div>
            <div class="col-md-6 col-lg-3">
              <label class="form-label fw-semibold">Full Name</label>
              <input type="text" name="full_name" class="form-control" placeholder="John Doe" required>
            </div>
            <div class="col-md-6 col-lg-3">
              <label class="form-label fw-semibold">Role</label>
              <select name="role" class="form-select" required>
                <option value="">Select role...</option>
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="registrar">Registrar</option>
                <option value="scorer">Scorer</option>
                <option value="player">Player</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>
          <div class="mt-3 d-flex gap-2">
            <button type="submit" class="btn btn-success btn-sm">
              <i class="bi bi-check-lg"></i> Create User
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm" {{on "click" this.toggleAddForm}}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  {{/if}}
  
  {{!-- Role filter tabs --}}
  <div class="mb-3">
    <div class="d-flex flex-wrap gap-2">
      <button class="btn btn-sm {{if (eq this.roleFilter '') 'btn-dark' 'btn-outline-secondary'}}" type="button" {{on "click" (fn this.filterByRole "")}}>
        All <span class="badge bg-secondary ms-1">{{@model.length}}</span>
      </button>
      <button class="btn btn-sm {{if (eq this.roleFilter 'super_admin') 'btn-dark' 'btn-outline-secondary'}}" type="button" {{on "click" (fn this.filterByRole "super_admin")}}>
        <i class="bi bi-shield-fill-check"></i> Super Admin
      </button>
      <button class="btn btn-sm {{if (eq this.roleFilter 'admin') 'btn-dark' 'btn-outline-secondary'}}" type="button" {{on "click" (fn this.filterByRole "admin")}}>
        <i class="bi bi-gear-fill"></i> Admin
      </button>
      <button class="btn btn-sm {{if (eq this.roleFilter 'scorer') 'btn-dark' 'btn-outline-secondary'}}" type="button" {{on "click" (fn this.filterByRole "scorer")}}>
        <i class="bi bi-clipboard-data-fill"></i> Scorer
      </button>
      <button class="btn btn-sm {{if (eq this.roleFilter 'registrar') 'btn-dark' 'btn-outline-secondary'}}" type="button" {{on "click" (fn this.filterByRole "registrar")}}>
        <i class="bi bi-calendar-check-fill"></i> Registrar
      </button>
      <button class="btn btn-sm {{if (eq this.roleFilter 'player') 'btn-dark' 'btn-outline-secondary'}}" type="button" {{on "click" (fn this.filterByRole "player")}}>
        <i class="bi bi-person-arms-up"></i> Player
      </button>
      <button class="btn btn-sm {{if (eq this.roleFilter 'owner') 'btn-dark' 'btn-outline-secondary'}}" type="button" {{on "click" (fn this.filterByRole "owner")}}>
        <i class="bi bi-person-badge-fill"></i> Owner
      </button>
    </div>
  </div>
  
  {{!-- Users table --}}
  <div class="card">
    <div class="card-body table-responsive p-0">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th style="width:60px">ID</th>
            <th>User</th>
            <th>Current Role</th>
            <th>Change Role</th>
            <th style="width:100px" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {{#each this.filteredUsers as |user|}}
            <tr>
              <td class="text-muted small">{{user.user_id}}</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar-sm bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:32px;height:32px;font-size:0.75rem;">
                    {{user.username}}
                  </div>
                  <div>
                    <div class="fw-semibold">{{user.full_name}}</div>
                    <small class="text-muted">@{{user.username}}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="role-tag {{user.role}}">{{user.role}}</span>
              </td>
              <td>
                <select
                  class="form-select form-select-sm"
                  style="max-width:160px"
                  {{on "change" (fn this.changeRole user.user_id)}}
                >
                  <option value="" selected disabled>Change to...</option>
                  <option value="super_admin" disabled={{eq user.role "super_admin"}}>Super Admin</option>
                  <option value="admin" disabled={{eq user.role "admin"}}>Admin</option>
                  <option value="registrar" disabled={{eq user.role "registrar"}}>Registrar</option>
                  <option value="scorer" disabled={{eq user.role "scorer"}}>Scorer</option>
                  <option value="player" disabled={{eq user.role "player"}}>Player</option>
                  <option value="owner" disabled={{eq user.role "owner"}}>Owner</option>
                </select>
              </td>
              <td class="text-end">
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  title="Delete user"
                  {{on "click" (fn this.deleteUser user.user_id)}}
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          {{else}}
            <tr>
              <td colspan="5">
                <div class="empty-state py-4">
                  <i class="bi bi-people"></i>
                  <p>No users found</p>
                </div>
              </td>
            </tr>
          {{/each}}
        </tbody>
      </table>
    </div>
  </div>
  
  */
  {
    "id": "p774UaLm",
    "block": "[[[1,[28,[35,0],[\"Super Admin – User Management\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header d-flex justify-content-between align-items-center\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill-check\"],[12],[13],[1,\" Super Admin — User Management\"],[13],[1,\"\\n  \"],[11,\"button\"],[24,0,\"btn btn-accent btn-sm\"],[24,4,\"button\"],[4,[38,1],[\"click\",[30,0,[\"toggleAddForm\"]]],null],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-person-plus-fill\"],[12],[13],[1,\" \"],[1,[52,[30,0,[\"showAddForm\"]],\"Cancel\",\"Add User\"]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"statusMessage\"]],[[[1,\"  \"],[10,0],[15,0,[29,[\"toast-notification \",[30,0,[\"statusType\"]]]]],[14,\"role\",\"alert\"],[12],[1,\"\\n    \"],[10,\"i\"],[15,0,[29,[\"bi \",[52,[28,[37,3],[[30,0,[\"statusType\"]],\"success\"],null],\"bi-check-circle-fill\",\"bi-exclamation-triangle-fill\"]]]],[12],[13],[1,\"\\n    \"],[1,[30,0,[\"statusMessage\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showAddForm\"]],[[[1,\"  \"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n      \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-person-plus\"],[12],[13],[1,\" Create New User\"],[13],[1,\"\\n      \"],[11,\"form\"],[4,[38,1],[\"submit\",[30,0,[\"createUser\"]]],null],[12],[1,\"\\n        \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"col-md-6 col-lg-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Username\"],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"username\"],[14,0,\"form-control\"],[14,\"placeholder\",\"johndoe\"],[14,\"required\",\"\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-6 col-lg-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Password\"],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"password\"],[14,0,\"form-control\"],[14,\"placeholder\",\"Min 6 characters\"],[14,\"required\",\"\"],[14,4,\"password\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-6 col-lg-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Full Name\"],[13],[1,\"\\n            \"],[10,\"input\"],[14,3,\"full_name\"],[14,0,\"form-control\"],[14,\"placeholder\",\"John Doe\"],[14,\"required\",\"\"],[14,4,\"text\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"col-md-6 col-lg-3\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"form-label fw-semibold\"],[12],[1,\"Role\"],[13],[1,\"\\n            \"],[10,\"select\"],[14,3,\"role\"],[14,0,\"form-select\"],[14,\"required\",\"\"],[12],[1,\"\\n              \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"Select role...\"],[13],[1,\"\\n              \"],[10,\"option\"],[14,2,\"super_admin\"],[12],[1,\"Super Admin\"],[13],[1,\"\\n              \"],[10,\"option\"],[14,2,\"admin\"],[12],[1,\"Admin\"],[13],[1,\"\\n              \"],[10,\"option\"],[14,2,\"registrar\"],[12],[1,\"Registrar\"],[13],[1,\"\\n              \"],[10,\"option\"],[14,2,\"scorer\"],[12],[1,\"Scorer\"],[13],[1,\"\\n              \"],[10,\"option\"],[14,2,\"player\"],[12],[1,\"Player\"],[13],[1,\"\\n              \"],[10,\"option\"],[14,2,\"owner\"],[12],[1,\"Owner\"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"mt-3 d-flex gap-2\"],[12],[1,\"\\n          \"],[10,\"button\"],[14,0,\"btn btn-success btn-sm\"],[14,4,\"submit\"],[12],[1,\"\\n            \"],[10,\"i\"],[14,0,\"bi bi-check-lg\"],[12],[13],[1,\" Create User\\n          \"],[13],[1,\"\\n          \"],[11,\"button\"],[24,0,\"btn btn-outline-secondary btn-sm\"],[24,4,\"button\"],[4,[38,1],[\"click\",[30,0,[\"toggleAddForm\"]]],null],[12],[1,\"Cancel\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"mb-3\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"d-flex flex-wrap gap-2\"],[12],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"btn btn-sm \",[52,[28,[37,3],[[30,0,[\"roleFilter\"]],\"\"],null],\"btn-dark\",\"btn-outline-secondary\"]]]],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,4],[[30,0,[\"filterByRole\"]],\"\"],null]],null],[12],[1,\"\\n      All \"],[10,1],[14,0,\"badge bg-secondary ms-1\"],[12],[1,[30,1,[\"length\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"btn btn-sm \",[52,[28,[37,3],[[30,0,[\"roleFilter\"]],\"super_admin\"],null],\"btn-dark\",\"btn-outline-secondary\"]]]],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,4],[[30,0,[\"filterByRole\"]],\"super_admin\"],null]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-shield-fill-check\"],[12],[13],[1,\" Super Admin\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"btn btn-sm \",[52,[28,[37,3],[[30,0,[\"roleFilter\"]],\"admin\"],null],\"btn-dark\",\"btn-outline-secondary\"]]]],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,4],[[30,0,[\"filterByRole\"]],\"admin\"],null]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-gear-fill\"],[12],[13],[1,\" Admin\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"btn btn-sm \",[52,[28,[37,3],[[30,0,[\"roleFilter\"]],\"scorer\"],null],\"btn-dark\",\"btn-outline-secondary\"]]]],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,4],[[30,0,[\"filterByRole\"]],\"scorer\"],null]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-clipboard-data-fill\"],[12],[13],[1,\" Scorer\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"btn btn-sm \",[52,[28,[37,3],[[30,0,[\"roleFilter\"]],\"registrar\"],null],\"btn-dark\",\"btn-outline-secondary\"]]]],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,4],[[30,0,[\"filterByRole\"]],\"registrar\"],null]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-calendar-check-fill\"],[12],[13],[1,\" Registrar\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"btn btn-sm \",[52,[28,[37,3],[[30,0,[\"roleFilter\"]],\"player\"],null],\"btn-dark\",\"btn-outline-secondary\"]]]],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,4],[[30,0,[\"filterByRole\"]],\"player\"],null]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-person-arms-up\"],[12],[13],[1,\" Player\\n    \"],[13],[1,\"\\n    \"],[11,\"button\"],[16,0,[29,[\"btn btn-sm \",[52,[28,[37,3],[[30,0,[\"roleFilter\"]],\"owner\"],null],\"btn-dark\",\"btn-outline-secondary\"]]]],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,4],[[30,0,[\"filterByRole\"]],\"owner\"],null]],null],[12],[1,\"\\n      \"],[10,\"i\"],[14,0,\"bi bi-person-badge-fill\"],[12],[13],[1,\" Owner\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"card\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"card-body table-responsive p-0\"],[12],[1,\"\\n    \"],[10,\"table\"],[14,0,\"table table-hover align-middle mb-0\"],[12],[1,\"\\n      \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n        \"],[10,\"tr\"],[12],[1,\"\\n          \"],[10,\"th\"],[14,5,\"width:60px\"],[12],[1,\"ID\"],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,\"User\"],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,\"Current Role\"],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,\"Change Role\"],[13],[1,\"\\n          \"],[10,\"th\"],[14,5,\"width:100px\"],[14,0,\"text-end\"],[12],[1,\"Actions\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"filteredUsers\"]]],null]],null],null,[[[1,\"          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[10,\"td\"],[14,0,\"text-muted small\"],[12],[1,[30,2,[\"user_id\"]]],[13],[1,\"\\n            \"],[10,\"td\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"d-flex align-items-center gap-2\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"avatar-sm bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center\"],[14,5,\"width:32px;height:32px;font-size:0.75rem;\"],[12],[1,\"\\n                  \"],[1,[30,2,[\"username\"]]],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,0],[12],[1,\"\\n                  \"],[10,0],[14,0,\"fw-semibold\"],[12],[1,[30,2,[\"full_name\"]]],[13],[1,\"\\n                  \"],[10,\"small\"],[14,0,\"text-muted\"],[12],[1,\"@\"],[1,[30,2,[\"username\"]]],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"td\"],[12],[1,\"\\n              \"],[10,1],[15,0,[29,[\"role-tag \",[30,2,[\"role\"]]]]],[12],[1,[30,2,[\"role\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"td\"],[12],[1,\"\\n              \"],[11,\"select\"],[24,0,\"form-select form-select-sm\"],[24,5,\"max-width:160px\"],[4,[38,1],[\"change\",[28,[37,4],[[30,0,[\"changeRole\"]],[30,2,[\"user_id\"]]],null]],null],[12],[1,\"\\n                \"],[10,\"option\"],[14,2,\"\"],[14,\"selected\",\"\"],[14,\"disabled\",\"\"],[12],[1,\"Change to...\"],[13],[1,\"\\n                \"],[10,\"option\"],[14,2,\"super_admin\"],[15,\"disabled\",[28,[37,3],[[30,2,[\"role\"]],\"super_admin\"],null]],[12],[1,\"Super Admin\"],[13],[1,\"\\n                \"],[10,\"option\"],[14,2,\"admin\"],[15,\"disabled\",[28,[37,3],[[30,2,[\"role\"]],\"admin\"],null]],[12],[1,\"Admin\"],[13],[1,\"\\n                \"],[10,\"option\"],[14,2,\"registrar\"],[15,\"disabled\",[28,[37,3],[[30,2,[\"role\"]],\"registrar\"],null]],[12],[1,\"Registrar\"],[13],[1,\"\\n                \"],[10,\"option\"],[14,2,\"scorer\"],[15,\"disabled\",[28,[37,3],[[30,2,[\"role\"]],\"scorer\"],null]],[12],[1,\"Scorer\"],[13],[1,\"\\n                \"],[10,\"option\"],[14,2,\"player\"],[15,\"disabled\",[28,[37,3],[[30,2,[\"role\"]],\"player\"],null]],[12],[1,\"Player\"],[13],[1,\"\\n                \"],[10,\"option\"],[14,2,\"owner\"],[15,\"disabled\",[28,[37,3],[[30,2,[\"role\"]],\"owner\"],null]],[12],[1,\"Owner\"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"td\"],[14,0,\"text-end\"],[12],[1,\"\\n              \"],[11,\"button\"],[24,0,\"btn btn-outline-danger btn-sm\"],[24,\"title\",\"Delete user\"],[24,4,\"button\"],[4,[38,1],[\"click\",[28,[37,4],[[30,0,[\"deleteUser\"]],[30,2,[\"user_id\"]]],null]],null],[12],[1,\"\\n                \"],[10,\"i\"],[14,0,\"bi bi-trash3\"],[12],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[2]],[[[1,\"          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[10,\"td\"],[14,\"colspan\",\"5\"],[12],[1,\"\\n              \"],[10,0],[14,0,\"empty-state py-4\"],[12],[1,\"\\n                \"],[10,\"i\"],[14,0,\"bi bi-people\"],[12],[13],[1,\"\\n                \"],[10,2],[12],[1,\"No users found\"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"@model\",\"user\"],false,[\"page-title\",\"on\",\"if\",\"eq\",\"fn\",\"each\",\"-track-array\"]]",
    "moduleName": "jallikattu-frontend/templates/users.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/templates/winners", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Winners"}}
  
  <div class="section-header">
    <h5><i class="bi bi-award-fill"></i> Match Winners</h5>
  </div>
  
  {{!-- Match Selector --}}
  <div class="card mb-4">
    <div class="card-body py-3">
      <div class="row align-items-center">
        <div class="col-md-5">
          <label class="form-label fw-semibold mb-1">Select Completed Match</label>
          <select class="form-select" {{on "change" this.loadWinners}}>
            <option value="">-- Choose Match --</option>
            {{#each this.completedMatches as |m|}}
              <option value={{m.match_id}}>{{m.match_name}}</option>
            {{/each}}
          </select>
        </div>
      </div>
    </div>
  </div>
  
  {{#if this.isLoading}}
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
  {{else if this.winnerData}}
  
    {{!-- Overall Winner --}}
    {{#if this.winnerData.overallWinner.length}}
      <div class="card mb-4" style="background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); color:#fff;">
        <div class="card-body text-center py-4">
          <i class="bi bi-trophy-fill" style="font-size:2.5rem;"></i>
          {{#each this.winnerData.overallWinner as |w|}}
            <h3 class="fw-bold mt-2 mb-1">{{w.player_name}}</h3>
            <p class="mb-0 opacity-75" style="font-size:1.1rem;">{{w.total_bulls_caught}} Bulls Caught — Overall Champion</p>
          {{/each}}
        </div>
      </div>
    {{/if}}
  
    <div class="row g-3">
      {{!-- Round Winners --}}
      {{#if this.winnerData.roundWinners.length}}
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-flag-fill text-primary"></i> Round Winners</h6>
              <div class="table-responsive">
                <table class="table table-sm table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr><th>Round</th><th>Player</th><th class="text-center">Caught</th><th class="text-center">Penalties</th></tr>
                  </thead>
                  <tbody>
                    {{#each this.winnerData.roundWinners as |w|}}
                      <tr>
                        <td><span class="badge bg-secondary">{{w.round_name}}</span></td>
                        <td class="fw-semibold">{{w.player_name}}</td>
                        <td class="text-center text-success fw-bold">{{w.bull_caught}}</td>
                        <td class="text-center text-danger">{{w.penalties}}</td>
                      </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      {{/if}}
  
      {{!-- Best Bull Per Round --}}
      {{#if this.winnerData.bestBullPerRound.length}}
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-shield-fill-exclamation text-danger"></i> Best Bull Per Round</h6>
              <div class="table-responsive">
                <table class="table table-sm table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr><th>Round</th><th>Bull</th><th class="text-center">Aggression</th><th class="text-center">Difficulty</th></tr>
                  </thead>
                  <tbody>
                    {{#each this.winnerData.bestBullPerRound as |b|}}
                      <tr>
                        <td><span class="badge bg-secondary">{{b.round_name}}</span></td>
                        <td class="fw-semibold">{{b.bull_name}}</td>
                        <td class="text-center">{{b.aggression}}</td>
                        <td class="text-center text-danger fw-bold">{{b.difficulty}}</td>
                      </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      {{/if}}
    </div>
  
    <div class="row g-3 mt-1">
      {{!-- Best Bull Overall --}}
      {{#if this.winnerData.bestBullOverall.length}}
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-star-fill text-warning"></i> Best Bull Overall</h6>
              <div class="table-responsive">
                <table class="table table-sm table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr><th>Bull</th><th class="text-center">Total Aggression</th><th class="text-center">Total Difficulty</th></tr>
                  </thead>
                  <tbody>
                    {{#each this.winnerData.bestBullOverall as |b|}}
                      <tr>
                        <td class="fw-semibold">{{b.bull_name}}</td>
                        <td class="text-center">{{b.total_aggression}}</td>
                        <td class="text-center text-danger fw-bold">{{b.total_difficulty}}</td>
                      </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      {{/if}}
  
      {{!-- Interaction Winners --}}
      {{#if this.winnerData.interactionWinners.length}}
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h6 class="fw-bold mb-3"><i class="bi bi-hand-thumbs-up-fill text-success"></i> Interaction Winners</h6>
              <div class="table-responsive">
                <table class="table table-sm table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr><th>Player</th><th>Bull</th><th class="text-center">Longest Hold</th><th class="text-center">Total Hold</th></tr>
                  </thead>
                  <tbody>
                    {{#each this.winnerData.interactionWinners as |i|}}
                      <tr>
                        <td class="fw-semibold">{{i.player_name}}</td>
                        <td>{{i.bull_name}}</td>
                        <td class="text-center"><span class="badge bg-primary">{{i.longest_hold}}s</span></td>
                        <td class="text-center"><span class="badge bg-secondary">{{i.total_hold_time}}s</span></td>
                      </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      {{/if}}
    </div>
  
  {{else if this.selectedMatchId}}
    <div class="empty-state py-5">
      <i class="bi bi-award" style="font-size:3rem;"></i>
      <h5 class="mt-3">No Winners Data</h5>
      <p class="text-muted">Winners have not been declared for this match yet</p>
    </div>
  {{else}}
    <div class="empty-state py-5">
      <i class="bi bi-trophy" style="font-size:3rem;"></i>
      <h5 class="mt-3">Select a Completed Match</h5>
      <p class="text-muted">Choose a match from the dropdown above to view its winners</p>
    </div>
  {{/if}}
  
  */
  {
    "id": "d2w9mXkd",
    "block": "[[[1,[28,[35,0],[\"Winners\"],null]],[1,\"\\n\\n\"],[10,0],[14,0,\"section-header\"],[12],[1,\"\\n  \"],[10,\"h5\"],[12],[10,\"i\"],[14,0,\"bi bi-award-fill\"],[12],[13],[1,\" Match Winners\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"card mb-4\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"card-body py-3\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"row align-items-center\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"col-md-5\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"form-label fw-semibold mb-1\"],[12],[1,\"Select Completed Match\"],[13],[1,\"\\n        \"],[11,\"select\"],[24,0,\"form-select\"],[4,[38,1],[\"change\",[30,0,[\"loadWinners\"]]],null],[12],[1,\"\\n          \"],[10,\"option\"],[14,2,\"\"],[12],[1,\"-- Choose Match --\"],[13],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"completedMatches\"]]],null]],null],null,[[[1,\"            \"],[10,\"option\"],[15,2,[30,1,[\"match_id\"]]],[12],[1,[30,1,[\"match_name\"]]],[13],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"isLoading\"]],[[[1,\"  \"],[10,0],[14,0,\"text-center py-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"spinner-border text-primary\"],[14,\"role\",\"status\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"winnerData\"]],[[[1,\"\\n\"],[41,[30,0,[\"winnerData\",\"overallWinner\",\"length\"]],[[[1,\"    \"],[10,0],[14,0,\"card mb-4\"],[14,5,\"background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); color:#fff;\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"card-body text-center py-4\"],[12],[1,\"\\n        \"],[10,\"i\"],[14,0,\"bi bi-trophy-fill\"],[14,5,\"font-size:2.5rem;\"],[12],[13],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"winnerData\",\"overallWinner\"]]],null]],null],null,[[[1,\"          \"],[10,\"h3\"],[14,0,\"fw-bold mt-2 mb-1\"],[12],[1,[30,2,[\"player_name\"]]],[13],[1,\"\\n          \"],[10,2],[14,0,\"mb-0 opacity-75\"],[14,5,\"font-size:1.1rem;\"],[12],[1,[30,2,[\"total_bulls_caught\"]]],[1,\" Bulls Caught — Overall Champion\"],[13],[1,\"\\n\"]],[2]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"row g-3\"],[12],[1,\"\\n\"],[41,[30,0,[\"winnerData\",\"roundWinners\",\"length\"]],[[[1,\"      \"],[10,0],[14,0,\"col-md-6\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card h-100\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-flag-fill text-primary\"],[12],[13],[1,\" Round Winners\"],[13],[1,\"\\n            \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n              \"],[10,\"table\"],[14,0,\"table table-sm table-hover align-middle mb-0\"],[12],[1,\"\\n                \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n                  \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Round\"],[13],[10,\"th\"],[12],[1,\"Player\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Caught\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Penalties\"],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"winnerData\",\"roundWinners\"]]],null]],null],null,[[[1,\"                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"td\"],[12],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,[30,3,[\"round_name\"]]],[13],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,3,[\"player_name\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center text-success fw-bold\"],[12],[1,[30,3,[\"bull_caught\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center text-danger\"],[12],[1,[30,3,[\"penalties\"]]],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[3]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"winnerData\",\"bestBullPerRound\",\"length\"]],[[[1,\"      \"],[10,0],[14,0,\"col-md-6\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card h-100\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-shield-fill-exclamation text-danger\"],[12],[13],[1,\" Best Bull Per Round\"],[13],[1,\"\\n            \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n              \"],[10,\"table\"],[14,0,\"table table-sm table-hover align-middle mb-0\"],[12],[1,\"\\n                \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n                  \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Round\"],[13],[10,\"th\"],[12],[1,\"Bull\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Aggression\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Difficulty\"],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"winnerData\",\"bestBullPerRound\"]]],null]],null],null,[[[1,\"                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"td\"],[12],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,[30,4,[\"round_name\"]]],[13],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,4,[\"bull_name\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,4,[\"aggression\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center text-danger fw-bold\"],[12],[1,[30,4,[\"difficulty\"]]],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[4]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"row g-3 mt-1\"],[12],[1,\"\\n\"],[41,[30,0,[\"winnerData\",\"bestBullOverall\",\"length\"]],[[[1,\"      \"],[10,0],[14,0,\"col-md-6\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card h-100\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-star-fill text-warning\"],[12],[13],[1,\" Best Bull Overall\"],[13],[1,\"\\n            \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n              \"],[10,\"table\"],[14,0,\"table table-sm table-hover align-middle mb-0\"],[12],[1,\"\\n                \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n                  \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Bull\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Total Aggression\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Total Difficulty\"],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"winnerData\",\"bestBullOverall\"]]],null]],null],null,[[[1,\"                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,5,[\"bull_name\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center\"],[12],[1,[30,5,[\"total_aggression\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center text-danger fw-bold\"],[12],[1,[30,5,[\"total_difficulty\"]]],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[5]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"winnerData\",\"interactionWinners\",\"length\"]],[[[1,\"      \"],[10,0],[14,0,\"col-md-6\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"card h-100\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-body\"],[12],[1,\"\\n            \"],[10,\"h6\"],[14,0,\"fw-bold mb-3\"],[12],[10,\"i\"],[14,0,\"bi bi-hand-thumbs-up-fill text-success\"],[12],[13],[1,\" Interaction Winners\"],[13],[1,\"\\n            \"],[10,0],[14,0,\"table-responsive\"],[12],[1,\"\\n              \"],[10,\"table\"],[14,0,\"table table-sm table-hover align-middle mb-0\"],[12],[1,\"\\n                \"],[10,\"thead\"],[14,0,\"table-light\"],[12],[1,\"\\n                  \"],[10,\"tr\"],[12],[10,\"th\"],[12],[1,\"Player\"],[13],[10,\"th\"],[12],[1,\"Bull\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Longest Hold\"],[13],[10,\"th\"],[14,0,\"text-center\"],[12],[1,\"Total Hold\"],[13],[13],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"winnerData\",\"interactionWinners\"]]],null]],null],null,[[[1,\"                    \"],[10,\"tr\"],[12],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"fw-semibold\"],[12],[1,[30,6,[\"player_name\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[12],[1,[30,6,[\"bull_name\"]]],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center\"],[12],[10,1],[14,0,\"badge bg-primary\"],[12],[1,[30,6,[\"longest_hold\"]]],[1,\"s\"],[13],[13],[1,\"\\n                      \"],[10,\"td\"],[14,0,\"text-center\"],[12],[10,1],[14,0,\"badge bg-secondary\"],[12],[1,[30,6,[\"total_hold_time\"]]],[1,\"s\"],[13],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[6]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"]],[]],[[[41,[30,0,[\"selectedMatchId\"]],[[[1,\"  \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-award\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"No Winners Data\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"Winners have not been declared for this match yet\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"empty-state py-5\"],[12],[1,\"\\n    \"],[10,\"i\"],[14,0,\"bi bi-trophy\"],[14,5,\"font-size:3rem;\"],[12],[13],[1,\"\\n    \"],[10,\"h5\"],[14,0,\"mt-3\"],[12],[1,\"Select a Completed Match\"],[13],[1,\"\\n    \"],[10,2],[14,0,\"text-muted\"],[12],[1,\"Choose a match from the dropdown above to view its winners\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[]]]],[]]]],[\"m\",\"w\",\"w\",\"b\",\"b\",\"i\"],false,[\"page-title\",\"on\",\"each\",\"-track-array\",\"if\"]]",
    "moduleName": "jallikattu-frontend/templates/winners.hbs",
    "isStrictMode": false
  });
});
;define("jallikattu-frontend/transforms/boolean", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.BooleanTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the BooleanTransform. Use `export { BooleanTransform as default } from '@ember-data/serializer/transform';` in app/transforms/boolean.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("jallikattu-frontend/transforms/date", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.DateTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the DateTransform. Use `export { DateTransform as default } from '@ember-data/serializer/transform';` in app/transforms/date.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("jallikattu-frontend/transforms/number", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.NumberTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the NumberTransform. Use `export { NumberTransform as default } from '@ember-data/serializer/transform';` in app/transforms/number.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;define("jallikattu-frontend/transforms/string", ["exports", "@ember/debug", "@ember-data/serializer/transform"], function (_exports, _debug, _transform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _transform.StringTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/transform"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the StringTransform. Use `export { StringTransform as default } from '@ember-data/serializer/transform';` in app/transforms/string.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '4.13'
    }
  }));
});
;

;define('jallikattu-frontend/config/environment', [], function() {
  var prefix = 'jallikattu-frontend';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("jallikattu-frontend/app")["default"].create({"API_HOST":"http://localhost:8080","API_NAMESPACE":"jallikattu-admin/api","name":"jallikattu-frontend","version":"1.0.0+9868af60"});
          }
        
//# sourceMappingURL=jallikattu-frontend.map
