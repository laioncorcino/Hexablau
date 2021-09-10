import { AbstractActions } from '@core';
import Template from './template';

export default class HomeActions extends AbstractActions {
  /** @override AbstractActions.title */
  static get title() {
    return '';
  }

  /** @override AbstractActions.template */
  static get template() {
    return Template;
  }
}