import Helper from '@ember/component/helper';

export default class ToStringHelper extends Helper {
  compute([value]) {
    return String(value ?? '');
  }
}
