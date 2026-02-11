import Controller from "@ember/controller";
import { service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

const PUBLIC_ROUTES = [
  "index",
  "scoreboard",
  "matches",
  "match-detail",
  "leaderboard",
  "player-profile",
  "bull-profile",
  "signup",
  "overlay-viewer",
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
      dashboard: "Dashboard",
      "match-control": "Match Control",
      winners: "Winners",
      registration: "Registration",
      events: "Event Manager",
      "event-detail": "Event Detail",
      tables: "Data Tables",
      users: "User Management",
      "my-profile": "My Profile",
      "my-history": "Match History",
      "my-matches": "Register for Match",
      "my-bulls": "My Bulls",
      scoreboard: "Live Scoreboard",
      "overlay-control": "Overlay Control",
      "overlay-viewer": "Live Overlay",
      prizes: "Prize Management",
      "spot-prizes": "Spot Prizes",
    };
    return map[this.router.currentRouteName] || "Jallikattu";
  }

  /**
   * Returns sidebar sections ordered by the current user's role.
   * The section that is "primary" for the logged-in role floats to the top,
   * so an owner sees Bull Management first, a scorer sees Scoring first, etc.
   */
  get sidebarSections() {
    const role = this.auth.role;

    const allSections = [
      {
        id: "scoring",
        visible: this.auth.isScorer || this.auth.isRegistrar,
        primaryFor: ["scorer"],
      },
      {
        id: "events",
        visible: this.auth.isRegistrar,
        primaryFor: ["registrar"],
      },
      { id: "my-account", visible: this.auth.isPlayer, primaryFor: ["player"] },
      { id: "bulls", visible: this.auth.isOwner, primaryFor: ["owner"] },
      {
        id: "admin",
        visible: this.auth.isAdmin,
        primaryFor: ["admin", "super_admin"],
      },
    ];

    return allSections
      .filter((s) => s.visible)
      .sort((a, b) => {
        const aPri = a.primaryFor.includes(role);
        const bPri = b.primaryFor.includes(role);
        if (aPri && !bPri) return -1;
        if (!aPri && bPri) return 1;
        return 0;
      });
  }

  @action
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  @action
  async logout() {
    await this.auth.logout();
    this.sidebarOpen = false;
    this.router.transitionTo("login");
  }
}
