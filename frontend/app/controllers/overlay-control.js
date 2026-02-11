import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { OVERLAY } from 'jallikattu-frontend/constants/api-paths';

export default class OverlayControlController extends Controller {
  @service auth;

  @tracked overlayType = 'none';
  @tracked entityId = '';
  @tracked videoUrl = '';
  @tracked layout = 'bottom-bar';
  @tracked visible = false;
  @tracked statusMsg = '';
  @tracked statusType = 'info';
  @tracked isSaving = false;

  // Active match for branding/ticker
  @tracked activeMatchId = '';
  @tracked activeRoundId = '';

  // Clock
  @tracked clockState = 'stopped';
  @tracked clockLabel = '';

  // Independent overlay toggles
  @tracked showTicker = false;
  @tracked showScoreboard = false;

  // Rating overlay
  @tracked showRating = false;
  @tracked rating = 0;
  @tracked ratingLabelText = '';

  // Next bull overlay
  @tracked showNextBull = false;
  @tracked nextBullId = '';
  @tracked nextBullName = '';

  // Secondary entity (for dual overlay)
  @tracked secondaryType = 'none';
  @tracked secondaryEntityId = '';

  // Preview polling
  @tracked previewData = null;
  _previewTimer = null;

  get players() {
    return this.model?.players || [];
  }

  get bulls() {
    return this.model?.bulls || [];
  }

  get matches() {
    return this.model?.matches || [];
  }

  get roundTypes() {
    return this.model?.roundTypes || [];
  }

  get entityOptions() {
    if (this.overlayType === 'player') return this.players;
    if (this.overlayType === 'bull') return this.bulls;
    if (this.overlayType === 'match') return this.matches;
    return [];
  }

  get entityLabel() {
    if (this.overlayType === 'player') return 'player_name';
    if (this.overlayType === 'bull') return 'bull_name';
    if (this.overlayType === 'match') return 'match_name';
    return 'name';
  }

  get entityIdField() {
    if (this.overlayType === 'player') return 'player_id';
    if (this.overlayType === 'bull') return 'bull_id';
    if (this.overlayType === 'match') return 'match_id';
    return 'id';
  }

  // Secondary entity helpers
  get secondaryEntityOptions() {
    if (this.secondaryType === 'player') return this.players;
    if (this.secondaryType === 'bull') return this.bulls;
    if (this.secondaryType === 'match') return this.matches;
    return [];
  }

  get secondaryEntityLabel() {
    if (this.secondaryType === 'player') return 'player_name';
    if (this.secondaryType === 'bull') return 'bull_name';
    if (this.secondaryType === 'match') return 'match_name';
    return 'name';
  }

  get secondaryEntityIdField() {
    if (this.secondaryType === 'player') return 'player_id';
    if (this.secondaryType === 'bull') return 'bull_id';
    if (this.secondaryType === 'match') return 'match_id';
    return 'id';
  }

  get hasDualOverlay() {
    return this.overlayType !== 'none' && this.secondaryType !== 'none';
  }

  get viewerUrl() {
    const base = window.location.origin;
    return `${base}/overlay-viewer`;
  }

  @action
  initFromModel() {
    if (this.model?.state) {
      const s = this.model.state;
      this.overlayType = s.type || 'none';
      this.entityId = s.entityId || '';
      this.videoUrl = s.videoUrl || '';
      this.layout = s.layout || 'bottom-bar';
      this.visible = s.visible || false;
      this.secondaryType = s.secondaryType || 'none';
      this.secondaryEntityId = s.secondaryId || '';
      this.activeMatchId = s.activeMatchId || '';
      this.activeRoundId = s.activeRoundId || '';
      this.clockState = s.clockState || 'stopped';
      this.clockLabel = s.clockLabel || '';
      this.showTicker = s.showTicker || false;
      this.showScoreboard = s.showScoreboard || false;
      this.showRating = s.showRating || false;
      this.rating = s.rating || 0;
      this.ratingLabelText = s.ratingLabel || '';
      this.showNextBull = s.showNextBull || false;
      this.nextBullId = s.nextBullId || '';
      this.nextBullName = s.nextBullName || '';
    }
    this._startPreviewPolling();
  }

  @action
  cleanup() {
    if (this._previewTimer) {
      clearInterval(this._previewTimer);
      this._previewTimer = null;
    }
  }

  @action
  setOverlayType(event) {
    this.overlayType = event.target.value;
    this.entityId = '';
  }

  @action
  setEntityId(event) {
    this.entityId = event.target.value;
  }

  @action
  setSecondaryType(event) {
    this.secondaryType = event.target.value;
    this.secondaryEntityId = '';
  }

  @action
  setSecondaryEntityId(event) {
    this.secondaryEntityId = event.target.value;
  }

  @action
  setVideoUrl(event) {
    this.videoUrl = event.target.value;
  }

  @action
  setLayout(event) {
    this.layout = event.target.value;
  }

  @action
  setActiveMatchId(event) {
    this.activeMatchId = event.target.value;
  }

  @action
  setActiveRoundId(event) {
    this.activeRoundId = event.target.value;
  }

  @action
  setClockLabel(event) {
    this.clockLabel = event.target.value;
  }

  @action
  toggleTicker() {
    this.showTicker = !this.showTicker;
  }

  @action
  toggleScoreboard() {
    this.showScoreboard = !this.showScoreboard;
  }

  @action
  toggleRating() {
    this.showRating = !this.showRating;
  }

  @action
  setRating(val) {
    this.rating = Number(val);
  }

  @action
  setRatingLabel(event) {
    this.ratingLabelText = event.target.value;
  }

  @action
  toggleNextBull() {
    this.showNextBull = !this.showNextBull;
  }

  @action
  setNextBull(event) {
    const id = event.target.value;
    this.nextBullId = id;
    // Find bull name from list
    const bull = this.bulls.find(b => String(b.bull_id) === String(id));
    this.nextBullName = bull ? bull.bull_name : '';
  }

  @action
  async clockAction(action) {
    try {
      const res = await this.auth.apiPost(OVERLAY.CLOCK, { action, label: this.clockLabel });
      this.clockState = res.clockState || 'stopped';
      this._showStatus(`Clock: ${action}`, 'success');
    } catch {
      this._showStatus('Clock action failed', 'danger');
    }
  }

  @action
  async applyOverlay() {
    this.isSaving = true;
    try {
      await this.auth.apiPost(OVERLAY.UPDATE, {
        type: this.overlayType,
        entityId: this.entityId ? Number(this.entityId) : 0,
        layout: this.layout,
        visible: this.visible,
        secondaryType: this.secondaryType,
        secondaryEntityId: this.secondaryEntityId ? Number(this.secondaryEntityId) : 0,
        activeMatchId: this.activeMatchId ? Number(this.activeMatchId) : 0,
        activeRoundId: this.activeRoundId ? Number(this.activeRoundId) : 0,
        showTicker: this.showTicker,
        showScoreboard: this.showScoreboard,
        showRating: this.showRating,
        rating: this.rating,
        ratingLabel: this.ratingLabelText,
        showNextBull: this.showNextBull,
        nextBullId: this.nextBullId,
        nextBullName: this.nextBullName,
      });
      this._showStatus('Overlay updated!', 'success');
    } catch (e) {
      this._showStatus('Failed to update overlay', 'danger');
    }
    this.isSaving = false;
  }

  @action
  async saveVideoUrl() {
    try {
      await this.auth.apiPost(OVERLAY.VIDEO, { videoUrl: this.videoUrl });
      this._showStatus('Video URL saved!', 'success');
    } catch {
      this._showStatus('Failed to save video URL', 'danger');
    }
  }

  @action
  async toggleVisibility() {
    this.visible = !this.visible;
    try {
      const endpoint = this.visible ? OVERLAY.SHOW : OVERLAY.HIDE;
      await this.auth.apiPost(endpoint, {});
      this._showStatus(this.visible ? 'Overlay shown' : 'Overlay hidden', 'success');
    } catch {
      this.visible = !this.visible; // revert
      this._showStatus('Failed to toggle visibility', 'danger');
    }
  }

  @action
  copyViewerUrl() {
    navigator.clipboard.writeText(this.viewerUrl);
    this._showStatus('Viewer URL copied!', 'info');
  }

  _showStatus(msg, type) {
    this.statusMsg = msg;
    this.statusType = type;
    setTimeout(() => { this.statusMsg = ''; }, 3000);
  }

  _startPreviewPolling() {
    const fetchPreview = async () => {
      try {
        const res = await fetch(`${this.auth.apiBase}${OVERLAY.CURRENT}`);
        if (res.ok) this.previewData = await res.json();
      } catch { /* ignore */ }
    };
    fetchPreview();
    this._previewTimer = setInterval(fetchPreview, 2000);
  }

  willDestroy() {
    super.willDestroy();
    this.cleanup();
  }
}
