import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { SPOT_PRIZES } from 'jallikattu-frontend/constants/api-paths';

export default class SpotPrizesController extends Controller {
  @service auth;
  @service router;

  /* ── Tab state ── */
  @tracked activeTab = 'prizes'; // 'types' | 'prizes' | 'awards'

  /* ── Shared UI state ── */
  @tracked error = null;
  @tracked success = null;
  @tracked isLoading = false;

  /* ── Spot Prize Type form ── */
  @tracked isAddingType = false;
  @tracked newTypeName = '';
  @tracked editingTypeId = null;
  @tracked editTypeName = '';

  /* ── Spot Prize form ── */
  @tracked isAddingPrize = false;
  @tracked newPrizeMatchId = '';
  @tracked newPrizeTypeId = '';
  @tracked newPrizeSponsor = '';
  @tracked newPrizeTitle = '';
  @tracked newPrizeQty = 1;
  @tracked editingPrizeId = null;
  @tracked editPrizeMatchId = '';
  @tracked editPrizeTypeId = '';
  @tracked editPrizeSponsor = '';
  @tracked editPrizeTitle = '';
  @tracked editPrizeQty = 1;

  /* ── Spot Prize Award form ── */
  @tracked isAddingAward = false;
  @tracked newAwardPlayerId = '';
  @tracked newAwardPrizeId = '';
  @tracked newAwardBullId = '';
  @tracked editingAwardId = null;
  @tracked editAwardPlayerId = '';
  @tracked editAwardPrizeId = '';
  @tracked editAwardBullId = '';

  /* ── Helpers ── */
  get types() { return this.model?.types || []; }
  get prizes() { return this.model?.prizes || []; }
  get awards() { return this.model?.awards || []; }
  get matches() { return this.model?.matches || []; }
  get players() { return this.model?.players || []; }
  get bulls() { return this.model?.bulls || []; }

  typeName(typeId) {
    const t = this.types.find((x) => String(x.spot_prize_type_id) === String(typeId));
    return t ? t.spot_prize_type_name : '—';
  }

  matchLabel(matchId) {
    const m = this.matches.find((x) => String(x.match_id) === String(matchId));
    return m ? `${m.match_name || 'Match'} #${m.match_id}` : `#${matchId}`;
  }

  prizeLabel(prizeId) {
    const p = this.prizes.find((x) => String(x.spot_prize_id) === String(prizeId));
    return p ? `${p.prize_title || 'Prize'} #${p.spot_prize_id}` : `#${prizeId}`;
  }

  playerName(playerId) {
    const p = this.players.find((x) => String(x.player_id) === String(playerId));
    return p ? `${p.first_name || ''} ${p.last_name || ''}`.trim() || `Player #${p.player_id}` : `#${playerId}`;
  }

  bullName(bullId) {
    const b = this.bulls.find((x) => String(x.bull_id) === String(bullId));
    return b ? `${b.bull_name || 'Bull'} #${b.bull_id}` : `#${bullId}`;
  }

  clearMessages() {
    this.error = null;
    this.success = null;
  }

  /* ──────────────────── Tab ──────────────────── */
  @action switchTab(tab) {
    this.activeTab = tab;
    this.clearMessages();
    this.cancelAllEdits();
  }

  cancelAllEdits() {
    this.isAddingType = false;
    this.editingTypeId = null;
    this.isAddingPrize = false;
    this.editingPrizeId = null;
    this.isAddingAward = false;
    this.editingAwardId = null;
  }

  @action updateField(field, event) {
    this[field] = event.target.value;
  }

  /* ═══════════════════════════════════════════════
     SPOT PRIZE TYPES
     ═══════════════════════════════════════════════ */
  @action startAddType() {
    this.clearMessages();
    this.isAddingType = true;
    this.newTypeName = '';
    this.editingTypeId = null;
  }

  @action cancelAddType() { this.isAddingType = false; }

  @action startEditType(t) {
    this.clearMessages();
    this.editingTypeId = t.spot_prize_type_id;
    this.editTypeName = t.spot_prize_type_name || '';
    this.isAddingType = false;
  }

  @action cancelEditType() { this.editingTypeId = null; }

  @action async addType(event) {
    event.preventDefault();
    if (!this.newTypeName.trim()) { this.error = 'Type name is required'; return; }
    this.isLoading = true;
    this.clearMessages();
    try {
      await this.auth.apiPost(SPOT_PRIZES.TYPE_CREATE, {
        spot_prize_type_name: this.newTypeName.trim(),
      });
      this.success = 'Spot-prize type added';
      this.isAddingType = false;
      this.router.refresh();
    } catch (e) { this.error = e.message || 'Failed to add type'; }
    this.isLoading = false;
  }

  @action async saveType(typeId, event) {
    event.preventDefault();
    if (!this.editTypeName.trim()) { this.error = 'Type name is required'; return; }
    this.isLoading = true;
    this.clearMessages();
    try {
      await this.auth.apiPut(SPOT_PRIZES.TYPE_UPDATE, {
        pkValues: { spot_prize_type_id: String(typeId) },
        values: { spot_prize_type_name: this.editTypeName.trim() },
      });
      this.success = 'Type updated';
      this.editingTypeId = null;
      this.router.refresh();
    } catch (e) { this.error = e.message || 'Failed to update type'; }
    this.isLoading = false;
  }

  @action async deleteType(typeId) {
    if (!confirm('Delete this spot-prize type? Prizes referencing it may be affected.')) return;
    this.isLoading = true;
    this.clearMessages();
    try {
      await this.auth.apiDelete(SPOT_PRIZES.TYPE_DELETE(typeId));
      this.success = 'Type deleted';
      this.router.refresh();
    } catch (e) { this.error = e.message || 'Failed to delete type'; }
    this.isLoading = false;
  }

  /* ═══════════════════════════════════════════════
     SPOT PRIZES
     ═══════════════════════════════════════════════ */
  @action startAddPrize() {
    this.clearMessages();
    this.isAddingPrize = true;
    this.newPrizeMatchId = '';
    this.newPrizeTypeId = '';
    this.newPrizeSponsor = '';
    this.newPrizeTitle = '';
    this.newPrizeQty = 1;
    this.editingPrizeId = null;
  }

  @action cancelAddPrize() { this.isAddingPrize = false; }

  @action startEditPrize(p) {
    this.clearMessages();
    this.editingPrizeId = p.spot_prize_id;
    this.editPrizeMatchId = p.match_id ?? '';
    this.editPrizeTypeId = p.spot_type_id ?? '';
    this.editPrizeSponsor = p.sponsor_name || '';
    this.editPrizeTitle = p.prize_title || '';
    this.editPrizeQty = p.quantity ?? 1;
    this.isAddingPrize = false;
  }

  @action cancelEditPrize() { this.editingPrizeId = null; }

  @action async addPrize(event) {
    event.preventDefault();
    if (!this.newPrizeTitle.trim()) { this.error = 'Prize title is required'; return; }
    this.isLoading = true;
    this.clearMessages();
    try {
      const body = {
        prize_title: this.newPrizeTitle.trim(),
        sponsor_name: this.newPrizeSponsor.trim() || null,
        quantity: this.newPrizeQty || 1,
      };
      if (this.newPrizeMatchId) body.match_id = this.newPrizeMatchId;
      if (this.newPrizeTypeId) body.spot_type_id = this.newPrizeTypeId;
      await this.auth.apiPost(SPOT_PRIZES.CREATE, body);
      this.success = 'Spot prize added';
      this.isAddingPrize = false;
      this.router.refresh();
    } catch (e) { this.error = e.message || 'Failed to add prize'; }
    this.isLoading = false;
  }

  @action async savePrize(prizeId, event) {
    event.preventDefault();
    if (!this.editPrizeTitle.trim()) { this.error = 'Prize title is required'; return; }
    this.isLoading = true;
    this.clearMessages();
    try {
      await this.auth.apiPut(SPOT_PRIZES.UPDATE, {
        pkValues: { spot_prize_id: String(prizeId) },
        values: {
          match_id: this.editPrizeMatchId || null,
          spot_type_id: this.editPrizeTypeId || null,
          sponsor_name: this.editPrizeSponsor.trim() || null,
          prize_title: this.editPrizeTitle.trim(),
          quantity: this.editPrizeQty || 1,
        },
      });
      this.success = 'Prize updated';
      this.editingPrizeId = null;
      this.router.refresh();
    } catch (e) { this.error = e.message || 'Failed to update prize'; }
    this.isLoading = false;
  }

  @action async deletePrize(prizeId) {
    if (!confirm('Delete this spot prize? Awards referencing it will be affected.')) return;
    this.isLoading = true;
    this.clearMessages();
    try {
      await this.auth.apiDelete(SPOT_PRIZES.DELETE(prizeId));
      this.success = 'Prize deleted';
      this.router.refresh();
    } catch (e) { this.error = e.message || 'Failed to delete prize'; }
    this.isLoading = false;
  }

  /* ═══════════════════════════════════════════════
     SPOT PRIZE AWARDS
     ═══════════════════════════════════════════════ */
  @action startAddAward() {
    this.clearMessages();
    this.isAddingAward = true;
    this.newAwardPlayerId = '';
    this.newAwardPrizeId = '';
    this.newAwardBullId = '';
    this.editingAwardId = null;
  }

  @action cancelAddAward() { this.isAddingAward = false; }

  @action startEditAward(a) {
    this.clearMessages();
    this.editingAwardId = a.spot_prize_award_id;
    this.editAwardPlayerId = a.player_id ?? '';
    this.editAwardPrizeId = a.spot_prize_id ?? '';
    this.editAwardBullId = a.bull_id ?? '';
    this.isAddingAward = false;
  }

  @action cancelEditAward() { this.editingAwardId = null; }

  @action async addAward(event) {
    event.preventDefault();
    if (!this.newAwardPlayerId) { this.error = 'Player is required'; return; }
    if (!this.newAwardPrizeId) { this.error = 'Spot prize is required'; return; }
    this.isLoading = true;
    this.clearMessages();
    try {
      const body = {
        player_id: this.newAwardPlayerId,
        spot_prize_id: this.newAwardPrizeId,
      };
      if (this.newAwardBullId) body.bull_id = this.newAwardBullId;
      await this.auth.apiPost(SPOT_PRIZES.AWARD_CREATE, body);
      this.success = 'Award given!';
      this.isAddingAward = false;
      this.router.refresh();
    } catch (e) { this.error = e.message || 'Failed to add award'; }
    this.isLoading = false;
  }

  @action async saveAward(awardId, event) {
    event.preventDefault();
    if (!this.editAwardPlayerId) { this.error = 'Player is required'; return; }
    if (!this.editAwardPrizeId) { this.error = 'Spot prize is required'; return; }
    this.isLoading = true;
    this.clearMessages();
    try {
      await this.auth.apiPut(SPOT_PRIZES.AWARD_UPDATE, {
        pkValues: { spot_prize_award_id: String(awardId) },
        values: {
          player_id: this.editAwardPlayerId,
          spot_prize_id: this.editAwardPrizeId,
          bull_id: this.editAwardBullId || null,
        },
      });
      this.success = 'Award updated';
      this.editingAwardId = null;
      this.router.refresh();
    } catch (e) { this.error = e.message || 'Failed to update award'; }
    this.isLoading = false;
  }

  @action async deleteAward(awardId) {
    if (!confirm('Delete this award?')) return;
    this.isLoading = true;
    this.clearMessages();
    try {
      await this.auth.apiDelete(SPOT_PRIZES.AWARD_DELETE(awardId));
      this.success = 'Award deleted';
      this.router.refresh();
    } catch (e) { this.error = e.message || 'Failed to delete award'; }
    this.isLoading = false;
  }
}
