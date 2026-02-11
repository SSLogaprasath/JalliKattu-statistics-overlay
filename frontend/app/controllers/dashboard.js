import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class DashboardController extends Controller {
  @service auth;

  // ─── Role checks ───
  get isPlayer()     { return this.auth.role === 'player'; }
  get isOwner()      { return this.auth.role === 'owner'; }
  get isScorer()     { return this.auth.role === 'scorer' || this.auth.isAdmin; }
  get isRegistrar()  { return this.auth.role === 'registrar' || this.auth.isAdmin; }
  get isAdmin()      { return this.auth.role === 'admin' || this.auth.isSuperAdmin; }
  get isSuperAdmin() { return this.auth.role === 'super_admin'; }

  // ─── Player computed ───
  get playerCareer() { return this.model?.career || {}; }
  get totalCaught()  { return Number(this.playerCareer.total_caught || 0); }
  get totalPenalties() { return Number(this.playerCareer.total_penalties || 0); }
  get netScore()     { return this.totalCaught - this.totalPenalties; }
  get matchesPlayed(){ return Number(this.playerCareer.matches_played || 0); }
  get totalRounds()  { return Number(this.playerCareer.total_rounds || 0); }
  get leaderboardRank() { return this.model?.leaderboardRank || '-'; }
  get spotPrizesWon()   { return this.model?.spotPrizesWon || 0; }
  get playerRecentMatches() { return this.model?.recentMatches || []; }

  get catchRate() {
    if (!this.totalRounds) return '0.0';
    return (this.totalCaught / this.totalRounds).toFixed(1);
  }

  get catchRatePct() {
    if (!this.totalRounds) return 0;
    // Assuming max ~10 catches/round is extraordinary, scale to percentage
    return Math.min(100, Math.round((this.totalCaught / this.totalRounds) * 100 / 10));
  }

  /** Bar chart data: per-match net scores. */
  get matchScoreBars() {
    const scores = this.model?.matchScores || [];
    if (!scores.length) return [];
    const max = Math.max(...scores.map(s => Math.abs(Number(s.net_score) || 0)), 1);
    return scores.map(s => {
      const net = Number(s.net_score) || 0;
      return {
        match_name: s.match_name,
        net_score: net,
        heightPct: Math.round((Math.abs(net) / max) * 100),
        isPositive: net >= 0,
      };
    });
  }

  // ─── Owner computed ───
  get ownerStats()    { return this.model?.stats || {}; }
  get ownerBulls()    { return this.model?.bulls || []; }
  get ownerRecent()   { return this.model?.recentMatches || []; }
  get bestBull() {
    const s = this.ownerStats;
    if (!s.bestBullName) return null;
    return { bull_name: s.bestBullName, avg_difficulty: s.bestBullDifficulty };
  }
  get ownerTotalBulls()        { return this.ownerStats.totalBulls || 0; }
  get ownerMatchAppearances()  { return this.ownerStats.matchAppearances || 0; }
  get ownerTotalWins()         { return this.ownerStats.totalWins || 0; }
  get ownerAvgDifficulty()     { return this.ownerStats.avgDifficulty || 0; }
  get ownerAvgAggression()     { return this.ownerStats.avgAggression || 0; }
  get ownerSpotPrizes()        { return this.ownerStats.spotPrizesWon || 0; }

  get ownerWinRate() {
    if (!this.ownerMatchAppearances) return 0;
    return Math.round((this.ownerTotalWins / this.ownerMatchAppearances) * 100);
  }

  // ─── Admin / Super Admin computed ───
  get systemStats()   { return this.model?.system || {}; }
  get matchBreakdown(){ return this.model?.matchBreakdown || {}; }
  get topPlayers()    { return this.model?.topPlayers || []; }
  get topBulls()      { return this.model?.topBulls || []; }
  get pendingRegs()   { return this.model?.pendingRegistrations || {}; }
  get liveMatches()   { return this.model?.liveMatches || []; }
  get totalMatchCount() {
    const mb = this.matchBreakdown;
    return (mb.Scheduled || 0) + (mb.Live || 0) + (mb.Completed || 0);
  }

  get matchBreakdownBars() {
    const mb = this.matchBreakdown;
    const total = this.totalMatchCount || 1;
    return [
      { label: 'Completed', count: mb.Completed || 0, pct: Math.round(((mb.Completed || 0) / total) * 100), color: '#198754' },
      { label: 'Live',      count: mb.Live || 0,      pct: Math.round(((mb.Live || 0) / total) * 100),      color: '#dc3545' },
      { label: 'Scheduled', count: mb.Scheduled || 0, pct: Math.round(((mb.Scheduled || 0) / total) * 100), color: '#0d6efd' },
    ];
  }

  // ─── Super Admin extras ───
  get userBreakdown()   { return this.model?.userBreakdown || {}; }
  get totalUsers()      { return this.model?.totalUsers || 0; }
  get tableSizes()      { return this.model?.tableSizes || {}; }

  get userBreakdownBars() {
    const ub = this.userBreakdown;
    const total = this.totalUsers || 1;
    const colorMap = {
      super_admin: '#e94560', admin: '#6f42c1', registrar: '#0d6efd',
      scorer: '#198754', player: '#ff9933', owner: '#20c997',
    };
    return Object.entries(ub).map(([role, count]) => ({
      role,
      count,
      pct: Math.round((count / total) * 100),
      color: colorMap[role] || '#6c757d',
    }));
  }

  get tableList() {
    return Object.entries(this.tableSizes).map(([name, count]) => ({ name, count }));
  }

  // ─── Scorer computed ───
  get scorerLiveMatches() { return this.model?.liveMatches || []; }
  get scorerTopPlayers()  { return this.model?.topPlayers || []; }

  // ─── Registrar computed ───
  get registrarPending()  { return this.model?.pendingRegistrations || {}; }
  get upcomingMatches()   { return this.model?.upcomingMatches || []; }
}
