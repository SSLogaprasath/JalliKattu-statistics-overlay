import { helper } from '@ember/component/helper';

export default helper(function and(params) {
  return params.every(Boolean);
});
