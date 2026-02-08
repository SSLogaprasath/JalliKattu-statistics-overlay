import Helper from '@ember/component/helper';

export default class EqHelper extends Helper {
  compute([a, b]) {
    return a === b;
  }
}
