import Helper from '@ember/component/helper';

export default class AddHelper extends Helper {
  compute([a, b]) {
    return (Number(a) || 0) + (Number(b) || 0);
  }
}
