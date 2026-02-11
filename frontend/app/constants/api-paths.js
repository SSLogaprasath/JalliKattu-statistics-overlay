/**
 * Centralized API endpoint paths.
 * All paths are relative to the API namespace (e.g. /jallikattu-admin/api).
 *
 * Usage:
 *   import { AUTH, SCORES } from 'jallikattu-frontend/constants/api-paths';
 *   await this.auth.apiGet(AUTH.USERS);
 *   await this.auth.apiPost(SCORES.PLAYER(matchId), body);
 */

// ─── Auth & Users ───
export const AUTH = {
  SESSION: "/auth/session",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  USERS: "/auth/users",
  USER: (id) => `/auth/users/${id}`,
};

// ─── Dashboard ───
export const DASHBOARD = "/dashboard";

// ─── Events ───
export const EVENTS = {
  LIST: "/events",
  DETAIL: (id) => `/events/${id}`,
};

// ─── Matches ───
export const MATCHES = {
  LIST: "/matches",
  UPDATE: (id) => `/matches/${id}`,
};

// ─── Scores ───
export const SCORES = {
  GET: (matchId) => `/scores/${matchId}`,
  PLAYER: (matchId) => `/scores/${matchId}/player`,
  BULL: (matchId) => `/scores/${matchId}/bull`,
  INTERACTION: (matchId) => `/scores/${matchId}/interaction`,
  DISQUALIFY: (matchId) => `/scores/${matchId}/disqualify`,
};

// ─── Winners ───
export const WINNERS = {
  LIST: "/winners",
  BY_MATCH: (matchId) => `/winners/${matchId}`,
};

// ─── Registrations ───
export const REGISTRATIONS = {
  LIST: "/registrations",
  CREATE_PLAYER: "/registrations/create-player",
  CREATE_BULL: "/registrations/create-bull",
  CREATE_OWNER: "/registrations/create-owner",
  CREATE_ORGANIZER: "/registrations/create-organizer",
  PLAYER: "/registrations/player",
  BULL: "/registrations/bull",
  MATCH: "/registrations/match",
  APPROVE_PLAYER: "/registrations/approve-player",
  APPROVE_BULL: "/registrations/approve-bull",
};

// ─── Tables (generic CRUD) ───
export const TABLES = {
  LIST: "/tables",
  GET: (name) => `/tables/${name}`,
  CREATE: (name) => `/tables/${name}`,
  UPDATE: (name) => `/tables/${name}`,
  DELETE: (name, params) => `/tables/${name}?${params}`,
};

// ─── Prizes ───
export const PRIZES = {
  LIST: "/tables/prize",
  CREATE: "/tables/prize",
  UPDATE: "/tables/prize",
  DELETE: (id) => `/tables/prize?prize_id=${id}`,
};

// ─── Spot Prizes ───
export const SPOT_PRIZES = {
  TYPES: "/tables/spot_prize_type",
  TYPE_CREATE: "/tables/spot_prize_type",
  TYPE_UPDATE: "/tables/spot_prize_type",
  TYPE_DELETE: (id) => `/tables/spot_prize_type?spot_prize_type_id=${id}`,
  LIST: "/tables/spot_prize",
  CREATE: "/tables/spot_prize",
  UPDATE: "/tables/spot_prize",
  DELETE: (id) => `/tables/spot_prize?spot_prize_id=${id}`,
  AWARDS: "/tables/spot_prize_award",
  AWARD_CREATE: "/tables/spot_prize_award",
  AWARD_UPDATE: "/tables/spot_prize_award",
  AWARD_DELETE: (id) => `/tables/spot_prize_award?spot_prize_award_id=${id}`,
  // Lookup tables used for spot prize forms
  MATCHES: "/tables/match",
  PLAYERS: "/tables/player",
  BULLS: "/tables/bull_table",
};

// ─── Match Draw ───
export const MATCH_DRAW = {
  GET: (matchId) => `/match-draw/${matchId}`,
  AUTO_ASSIGN: (matchId) => `/match-draw/${matchId}/auto-assign`,
  BULL_QUEUE: (matchId) => `/match-draw/${matchId}/bull-queue`,
  ADVANCE: (matchId) => `/match-draw/${matchId}/advance`,
  RECORD_RELEASE: (matchId) => `/match-draw/${matchId}/record-release`,
  ROUND_CONFIG: (matchId) => `/match-draw/${matchId}/round-config`,
  FOUL: (matchId) => `/match-draw/${matchId}/foul`,
  DELETE_FOUL: (matchId) => `/match-draw/${matchId}/delete-foul`,
};

// ─── Overlay ───
export const OVERLAY = {
  CONFIG: "/overlay/config",
  CURRENT: "/overlay/current",
  UPDATE: "/overlay/update",
  CLOCK: "/overlay/clock",
  VIDEO: "/overlay/video",
  SHOW: "/overlay/show",
  HIDE: "/overlay/hide",
  PLAYBACK: "/overlay/playback",
};

// ─── Player Self-Service ───
export const PLAYER = {
  PROFILE: "/player/profile",
  MATCHES: "/player/matches",
  REGISTER_MATCH: "/player/register-match",
  HISTORY: "/player/history",
  REGISTRATIONS: "/player/registrations",
};

// ─── Owner Self-Service ───
export const OWNER = {
  PROFILE: "/owner/profile",
  BULLS: "/owner/bulls",
  BREEDS: "/owner/breeds",
  MATCHES: "/owner/matches",
  REGISTER_MATCH: "/owner/register-match",
  REGISTRATIONS: "/owner/registrations",
};

// ─── Public (no auth required) ───
export const PUBLIC = {
  STATS: "/public/stats",
  MATCHES: "/public/matches",
  MATCH_SCORES: (id) => `/public/matches/${id}/scores`,
  MATCH_WINNERS: (id) => `/public/matches/${id}/winners`,
  MATCH_SPOTS: (id) => `/public/matches/${id}/spot-prizes`,
  LEADERBOARD: (limit = 20) => `/public/leaderboard?limit=${limit}`,
  PLAYER: (id) => `/public/players/${id}`,
  BULL: (id) => `/public/bulls/${id}`,
  REGISTER_PLAYER: "/public/register/player",
  REGISTER_OWNER: "/public/register/owner",
};

// ─── AI Detection ───
export const AI = {
  HEALTH: "/ai/health",
  DETECT: "/ai/detect",
  DETECT_IMAGE: "/ai/detect-image",
};
