import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RegistrationController extends Controller {
  @service auth;

  @tracked activeTab = 'player';
  @tracked statusMessage = '';
  @tracked statusType = 'success';

  async refreshData() {
    const data = await this.auth.apiGet('/registrations');
    this.set('model', data);
  }

  showStatus(msg, type = 'success') {
    this.statusMessage = msg;
    this.statusType = type;
    setTimeout(() => (this.statusMessage = ''), 4000);
  }

  @action
  setTab(tab) {
    this.activeTab = tab;
  }

  /* ─── Create entities ─── */

  @action
  async createPlayer(event) {
    event.preventDefault();
    const f = event.target;
    try {
      await this.auth.apiPost('/registrations/create-player', {
        player_name: f.player_name.value,
        dob: f.dob.value,
        aadhaar: f.aadhaar.value,
        phone: f.phone.value,
        user_id: f.user_id.value,
      });
      this.showStatus('Player created successfully');
      f.reset();
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || 'Error creating player', 'danger');
    }
  }

  @action
  async createBull(event) {
    event.preventDefault();
    const f = event.target;
    try {
      await this.auth.apiPost('/registrations/create-bull', {
        bull_name: f.bull_name.value,
        age: f.age.value,
        owner_id: f.owner_id.value,
        breed_id: f.breed_id.value,
        fitness_cert: f.fitness_cert.value,
      });
      this.showStatus('Bull created successfully');
      f.reset();
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || 'Error creating bull', 'danger');
    }
  }

  @action
  async createOwner(event) {
    event.preventDefault();
    const f = event.target;
    try {
      await this.auth.apiPost('/registrations/create-owner', {
        name: f.name.value,
        aadhaar: f.aadhaar.value,
        user_id: f.user_id.value,
      });
      this.showStatus('Owner created successfully');
      f.reset();
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || 'Error creating owner', 'danger');
    }
  }

  @action
  async createOrganizer(event) {
    event.preventDefault();
    const f = event.target;
    try {
      await this.auth.apiPost('/registrations/create-organizer', {
        organizer_name: f.organizer_name.value,
      });
      this.showStatus('Organizer created successfully');
      f.reset();
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || 'Error creating organizer', 'danger');
    }
  }

  /* ─── Register for match ─── */

  @action
  async registerPlayer(event) {
    event.preventDefault();
    const form = event.target;
    try {
      await this.auth.apiPost('/registrations/player', {
        match_id: form.match_id.value,
        player_id: form.player_id.value,
        round_type_id: form.round_type_id.value,
        batch_id: form.batch_id.value,
      });
      this.showStatus('Player registered successfully');
      form.reset();
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || 'Error registering player', 'danger');
    }
  }

  @action
  async registerBull(event) {
    event.preventDefault();
    const form = event.target;
    try {
      await this.auth.apiPost('/registrations/bull', {
        match_id: form.match_id.value,
        bull_id: form.bull_id.value,
        round_type_id: form.round_type_id.value,
      });
      this.showStatus('Bull registered successfully');
      form.reset();
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || 'Error registering bull', 'danger');
    }
  }

  @action
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
        organizer_id: form.organizer_id.value,
      });
      this.showStatus('Match scheduled successfully');
      form.reset();
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || 'Error scheduling match', 'danger');
    }
  }

  @action
  async approvePlayer(matchId, playerId, roundTypeId) {
    try {
      await this.auth.apiPost('/registrations/approve-player', {
        match_id: matchId,
        player_id: playerId,
        round_type_id: roundTypeId,
      });
      this.showStatus('Player approved');
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || 'Error approving player', 'danger');
    }
  }

  @action
  async approveBull(matchId, bullId, roundTypeId) {
    try {
      await this.auth.apiPost('/registrations/approve-bull', {
        match_id: matchId,
        bull_id: bullId,
        round_type_id: roundTypeId,
      });
      this.showStatus('Bull approved');
      await this.refreshData();
    } catch (e) {
      this.showStatus(e.message || 'Error approving bull', 'danger');
    }
  }
}
