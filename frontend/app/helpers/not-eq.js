import Helper from '@ember/component/helper';

export default class NotEqHelper extends Helper {
  compute([a, b]) {
    return a !== b;
  }
}
