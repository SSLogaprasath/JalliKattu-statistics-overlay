import { helper } from '@ember/component/helper';

export default helper(function div([a, b]) {
  if (!b || Number(b) === 0) return 0;
  return Number(a) / Number(b);
});
