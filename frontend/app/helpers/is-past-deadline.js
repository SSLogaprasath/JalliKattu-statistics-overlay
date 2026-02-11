import { helper } from '@ember/component/helper';

/**
 * Returns true if the given ISO datetime string is in the past.
 * Returns false if value is null/undefined/empty (no deadline = not expired).
 * Usage: {{is-past-deadline match.registration_deadline}}
 */
export default helper(function isPastDeadline([dateStr]) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
});
