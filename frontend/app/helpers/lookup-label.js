import Helper from '@ember/component/helper';

/**
 * Look up a display label from an array of objects by matching a key.
 * Usage: {{lookup-label collection key value displayKey fallback}}
 * e.g.   {{lookup-label this.types "spot_prize_type_id" p.spot_type_id "spot_prize_type_name" "—"}}
 */
export default class LookupLabelHelper extends Helper {
  compute([collection, key, value, displayKey, fallback]) {
    if (!collection || value == null) return fallback || '—';
    const item = collection.find(
      (x) => String(x[key]) === String(value),
    );
    return item ? item[displayKey] || fallback || '—' : fallback || '—';
  }
}
