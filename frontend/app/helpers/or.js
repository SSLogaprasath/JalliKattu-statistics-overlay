import Helper from '@ember/component/helper';

export default class OrHelper extends Helper {
  compute(params) {
    return params.some(Boolean);
  }
}
