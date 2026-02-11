import Controller from "@ember/controller";
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { MATCH_DRAW } from "jallikattu-frontend/constants/api-paths";

export default class MatchDrawController extends Controller {
  @service auth;
  @service router;

  @tracked statusMessage = "";
  @tracked statusType = "success";
  @tracked activeTab = "overview";

  // Round config form fields
  @tracked rcRoundId = "";
  @tracked rcAdvance = "";
  @tracked rcBullStart = "";
  @tracked rcBullEnd = "";

  // Foul form fields
  @tracked foulRound = "";
  @tracked foulBull = "";
  @tracked foulPlayer = "";
  @tracked foulType = "";
  @tracked foulNotes = "";

  // Advance round selector
  @tracked advanceRound = "";

  get matchId() {
    return this.model?.match?.match_id;
  }

  get arenaCapacity() {
    return this.model?.match?.arena_capacity || 0;
  }

  get totalApprovedPlayers() {
    return this.model?.summary?.approvedPlayers || 0;
  }

  get batchesNeeded() {
    if (!this.arenaCapacity || !this.totalApprovedPlayers) return 0;
    return Math.ceil(this.totalApprovedPlayers / this.arenaCapacity);
  }

  get foulTypes() {
    return [
      { value: "holding_tail", label: "Holding Tail" },
      { value: "illegal_horn_grab", label: "Illegal Horn Grab" },
      { value: "tripping_bull", label: "Tripping Bull" },
      { value: "multi_grab", label: "Multi Grab" },
      { value: "entering_early", label: "Entering Early" },
      { value: "goring", label: "Goring (Bull)" },
      { value: "barrier_jump", label: "Barrier Jump (Bull)" },
      { value: "spectator_charge", label: "Spectator Charge (Bull)" },
      { value: "passive_refusal", label: "Passive Refusal (Bull)" },
      { value: "other", label: "Other" },
    ];
  }

  /** Group players by round then batch */
  get playersByRound() {
    const players = this.model?.players || [];
    const grouped = {};
    for (const p of players) {
      const key = `${p.round_type_id}`;
      if (!grouped[key])
        grouped[key] = {
          roundName: p.round_name,
          roundId: p.round_type_id,
          batches: {},
        };
      const bKey = `${p.batch_id}`;
      if (!grouped[key].batches[bKey])
        grouped[key].batches[bKey] = { batchName: p.batch_name, players: [] };
      grouped[key].batches[bKey].players.push(p);
    }
    // Convert to array
    return Object.values(grouped).map((r) => ({
      ...r,
      batches: Object.values(r.batches),
    }));
  }

  /** Bulls sorted by release_order */
  get sortedBulls() {
    return (this.model?.bulls || []).slice().sort((a, b) => {
      if (a.release_order == null && b.release_order == null) return 0;
      if (a.release_order == null) return 1;
      if (b.release_order == null) return -1;
      return a.release_order - b.release_order;
    });
  }

  async refreshData() {
    if (!this.matchId) return;
    const data = await this.auth.apiGet(MATCH_DRAW.GET(this.matchId));
    this.set("model", data);
  }

  showStatus(msg, type = "success") {
    this.statusMessage = msg;
    this.statusType = type;
    setTimeout(() => (this.statusMessage = ""), 4000);
  }

  @action setTab(tab) {
    this.activeTab = tab;
  }

  // ─── Auto-Assign Batches ───
  @action
  async autoAssign() {
    try {
      const result = await this.auth.apiPost(
        MATCH_DRAW.AUTO_ASSIGN(this.matchId),
        {},
      );
      this.showStatus(`${result.playersAssigned} players assigned to batches`);
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || "Error auto-assigning", "danger");
    }
  }

  // ─── Bull Queue ───
  @action
  async assignBullQueue() {
    try {
      const result = await this.auth.apiPost(
        MATCH_DRAW.BULL_QUEUE(this.matchId),
        {},
      );
      this.showStatus(`${result.bullsQueued} bulls queued`);
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || "Error assigning bull queue", "danger");
    }
  }

  // ─── Advance Players ───
  @action
  async advancePlayers() {
    if (!this.advanceRound) {
      this.showStatus("Select a round first", "danger");
      return;
    }
    try {
      const result = await this.auth.apiPost(MATCH_DRAW.ADVANCE(this.matchId), {
        round_type_id: this.advanceRound,
      });
      this.showStatus(
        `${result.playersAdvanced} players advanced to next round`,
      );
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || "Error advancing players", "danger");
    }
  }

  // ─── Round Config ───
  @action
  async saveRoundConfig(event) {
    event.preventDefault();
    const f = event.target;
    const config = {
      round_type_id: f.round_type_id.value,
      advance_count: f.advance_count.value || null,
      bull_start: f.bull_start.value || null,
      bull_end: f.bull_end.value || null,
    };
    try {
      await this.auth.apiPost(MATCH_DRAW.ROUND_CONFIG(this.matchId), {
        configs: [config],
      });
      this.showStatus("Round config saved");
      f.reset();
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || "Error saving config", "danger");
    }
  }

  // ─── Record Foul ───
  @action
  async recordFoul(event) {
    event.preventDefault();
    const f = event.target;
    try {
      await this.auth.apiPost(MATCH_DRAW.FOUL(this.matchId), {
        round_type_id: f.round_type_id.value,
        bull_id: f.bull_id.value,
        player_id: f.player_id.value || null,
        foul_type: f.foul_type.value,
        notes: f.notes.value,
      });
      this.showStatus("Foul recorded");
      f.reset();
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || "Error recording foul", "danger");
    }
  }

  @action
  async deleteFoul(foulId) {
    try {
      await this.auth.apiPost(MATCH_DRAW.DELETE_FOUL(this.matchId), {
        foul_id: foulId,
      });
      this.showStatus("Foul deleted");
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || "Error deleting foul", "danger");
    }
  }

  @action setAdvanceRound(event) {
    this.advanceRound = event.target.value;
  }
}
