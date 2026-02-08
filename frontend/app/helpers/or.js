import { helper } from '@ember/component/helper';

export default helper(function or(params) {
  for (const p of params) {
    if (p) return p;
  }
  return params[params.length - 1];
});
