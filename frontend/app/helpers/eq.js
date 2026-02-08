import { helper } from '@ember/component/helper';

export default helper(function eq([a, b]) {
  // eslint-disable-next-line eqeqeq
  return a == b;
});
