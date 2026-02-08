import { helper } from '@ember/component/helper';

export default helper(function mult([a, b]) {
  return (Number(a) || 0) * (Number(b) || 0);
});
