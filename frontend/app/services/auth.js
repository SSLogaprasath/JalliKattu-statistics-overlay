import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'jallikattu-frontend/config/environment';

export default class AuthService extends Service {
  @tracked user = null;
  @tracked isAuthenticated = false;

  get apiBase() {
    return `/${config.APP.API_NAMESPACE}`;
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
    return this.user.full_name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  async checkSession() {
    try {
      const resp = await fetch(`${this.apiBase}/auth/session`, {
        credentials: 'include',
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await resp.json();
    if (resp.ok) {
      this.user = data;
      this.isAuthenticated = true;
      return { success: true };
    } else {
      return { success: false, error: data.error || 'Login failed' };
    }
  }

  async logout() {
    await fetch(`${this.apiBase}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
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
        ...(options.headers || {}),
      },
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
      body: JSON.stringify(body),
    });
    return resp.json();
  }

  async apiPut(path, body) {
    const resp = await this.apiFetch(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return resp.json();
  }

  async apiDelete(path) {
    const resp = await this.apiFetch(path, { method: 'DELETE' });
    return resp.json();
  }
}
