import { randomId, append, DEFAULTS, resetRandomIds } from '@core';

/**
 * @version 2
 * @name Template
 * @interface
 * @author Elihofni Guirra Lima
 * Modelo de controlador do template
 */
export default class AbstractTemplate {
  constructor({ ids = {}, props = {} } = {}) {
    this.ID = randomId();
    this.IDS = ids;
    this.PROPS = props;
  }


  /**
   * @public
   * @description Getter do id único do template
   * @return {string}
   */
  get id() {
    return this.ID;
  }


  /**
   * @protected
   * @param {string} newId Novo Id
   * @description Setter do id único do template
   */
  set id(newId) {
    this.ID = newId;
  }


  /**
   * @public
   * @return {{string}}
   */
  get ids() {
    return this.IDS;
  }


  /**
   * @protected
   * @param {{string}} newIds Novo Id
   */
  set ids(newIds) {
    this.IDS = newIds;
  }


  /**
   * @public
   * @return {*}
   */
  get props() {
    return this.PROPS;
  }


  /**
   * @protected
   * @param {object} newProps novas Props
   */
  set props(newProps) {
    this.PROPS = newProps;
  }


  /**
   * @public
   * @param {*} extraData Parâmetros extras repassados
   * @description Função pública responsável por mostrar/inserir um template na tela (usado na navegação de páginas)
   * @return {Promise<void>}
   */
  async load(extraData = {}) {
    await this.beforeRender();
    const template = await this.render(extraData);
    await this.attachTemplateToDOM(template);
    await this.afterRender(extraData);
  }


  /**
   * @public
   * @description Função pública responsável por esconder/remover um template na tela (usado na navegação de páginas)
   * @return {Promise<void>}
   */
  async unload() {
    await this.beforeHide();
    await this.hide();
    await this.afterHide();
  }


  /**
   * @protected
   */
  async beforeRender({ ids = {}, generateProps = () => {} } = {}) {
    this.ID = randomId();
    this.IDS = resetRandomIds(ids);
    this.PROPS = generateProps();
  }


  /**
   * @protected
   * @abstract
   * @param {*} [extraData=null] Dados extras
   * @return {Promise<string>}
   */
  async render(extraData = null) { // eslint-disable-line
    return '';
  }


  /**
   * @protected
   * @param {*} extraData Parâmetros de URL
   * @return {Promise<void>}
   */
  async afterRender(extraData) { // eslint-disable-line
    const element = document.getElementById(this.id);

    if (element) {
      element.classList.add(DEFAULTS.ACTIVE_PAGE_CLASSNAME);
    }
  }


  /**
   * @public
   * @abstract
   * @param {*} extraData Parâmetros de URL
   * @return {Promise<void>}
   */
  async afterLoad(extraData) { // eslint-disable-line
  }

  /**
   * @protected
   * @abstract
   * @return {Promise<void>}
   */
  async beforeHide() { // eslint-disable-line
  }


  /**
   * @protected
   * @return {Promise<void>}
   */
  async hide() {
    const element = document.getElementById(this.ID);

    if (element) {
      element.classList.remove(DEFAULTS.ACTIVE_PAGE_CLASSNAME);
      setTimeout(() => element.remove(), DEFAULTS.HIDE_PAGE_TIME);
    }
  }


  /**
   * @protected
   * @abstract
   * @return {Promise<void>}
   */
  async afterHide() { // eslint-disable-line
  }


  /**
   * @protected
   * @param {string} template Marcação HTML
   * @description Insere o template no DOM
   */
  attachTemplateToDOM(template) { // eslint-disable-line
    append(template);
  }
}