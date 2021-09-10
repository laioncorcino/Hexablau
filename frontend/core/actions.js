import { API, DEFAULTS, AbstractTemplate, AbstractReducer } from '@core';
import { classNames as modalClassNames } from '@components/modal/modal';
import InlineAlert, { classNames as alertClassNames } from '@components/inline-alert/inline-alert';
import InlineLoading, { classNames as loadingClassNames } from '@components/inline-loading/inline-loading';

/**
 * @version 2
 * @name Actions
 * @interface
 * @author Elihofni Guirra Lima
 * Modelo de controlador/ações da página
 */
export default class AbstractActions {
  constructor({ title = '', template = AbstractTemplate, reducer = AbstractReducer } = {}) {
    this.TITLE = title;
    this.TEMPLATE = template;
    this.REDUCER = reducer;
  }


  /**
   * @public
   * @return {string}
   */
  get title() {
    return this.TITLE;
  }


  /**
   * @public
   * @param {string} newTitle Titulo
   */
  set title(newTitle) {
    this.TITLE = newTitle;
  }


  /**
   * @protected
   * @description Retorna o controlador do template HTML associado
   * @return {AbstractTemplate}
   */
  get template() {
    return this.TEMPLATE;
  }


  /**
   * @protected
   * @description Atualiza controlador do template HTML associado
   * @param {AbstractTemplate} newTemplate Novo template
   */
  set template(newTemplate) {
    this.TEMPLATE = newTemplate;
  }


  /**
   * @protected
   * @description Retorna o manejador de estados associado
   * @return {AbstractReducer}
   */
  get reducer() {
    return this.REDUCER;
  }


  /**
   * @protected
   * @description Atualiza manejador de estados associado
   * @param {AbstractReducer} newReducer Novo reducer
   */
  set reducer(newReducer) {
    this.REDUCER = newReducer;
  }


  /**
   * @public
   * @async
   * @param {*} params Parâmetros extras repassados para o template
   * @return {Promise<void>}
   */
  async init(params = null) {
    const { title } = this;
    document.title = `${DEFAULTS.TITLE} ${title ? `- ${title.substring(0, 1).toUpperCase() + title.substring(1)}` : ''}`;
    await this.showPage(params);
  }


  /**
   * @public
   * @async
   * @return {Promise<void>}
   */
  async terminate() {
    await this.hidePage();
  }


  /**
   * @protected
   * @async
   * @param {*} params Parâmetros extras repassados para o template
   * @return {Promise<void>}
   */
  async showPage(params = null) {
    await this.template.load(params);
    await this.template.afterLoad(params);
  }


  /**
   * @protected
   * @async
   * @return {Promise<void>}
   * */
  async hidePage() {
    await this.template.unload();
  }


  /**
   * @abstract
   * @protected
   * @async
   * @return {Promise<void>}
   */
  async refresh() { // eslint-disable-line
  }


  /**
   * @public
   * @async
   * @param {*} [data=null] Dados para enviar na requisição
   * @param {*} [extraData=null] Dados para enviar na requisição
   * @return {Promise<void>}
   */
  async retrieve(data = null, extraData = null) {
    try {
      const formatted = await this.beforeGet(data);
      const response = await this.get(formatted);
      await this.afterGet(response, extraData);
    } catch (error) {
      console.error(error); // eslint-disable-line
      this.defaultFail(error);
    } finally {
      this.defaultAlways();
    }
  }


  /**
   * @protected
   * @async
   * @description Usar para formatar os parâmetros de URL
   * @param {*} [data=null] Dados para enviar na requisição
   * @return {Promise<void>}
   */
  async beforeGet(data = null) {
    if (this.template.TABLE_ID) {
      $(`#${this.template.TABLE_ID}`).append(`<div class="${loadingClassNames.EXTRA_WRAPPER}">${InlineLoading({})}</div>`);
    }
    return data;
  }


  /**
   * @protected
   * @abstract
   * @async
   * @param {*} [data=null] Dados
   * @return {Promise<{}>}
   */
  async get(data = null) { // eslint-disable-line
    return data;
  }


  /**
   * @protected
   * @abstract
   * @async
   * @param {*} [data=null] Dados
   * @param {*} [extraData=null] Dados extras
   * @description Usar para formatar o dado recebido do backend
   * @return {Promise<void>}
   */
  async afterGet({ data = null, extraData = null } = {}) { // eslint-disable-line
  }


  /**
   * @public
   * @async
   * @param {*} [data=null] Dados
   * @return {Promise<void>}
   */
  async create(data = null) {
    try {
      const formatted = await this.beforePost(data);
      const response = await this.post(formatted);
      await this.afterPost({ data: response });
    } catch (error) {
      console.error(error); // eslint-disable-line
      this.defaultFail(error);
    } finally {
      this.defaultAlways();
    }
  }


  /**
   * @protected
   * @async
   * @param {*} [data=null] Dados
   * @description Usar para formatar o dado a enviar ao backend
   * @return {Promise<void>}
   */
  async beforePost(data = null) { // eslint-disable-line
    $(`.${modalClassNames.SUBMIT_WRAPPER} .${alertClassNames.WRAPPER}`).remove();
    $(`.${modalClassNames.SUBMIT_WRAPPER}`).prepend(InlineLoading({ extraClass: loadingClassNames.SMALL }));
    return data;
  }


  /**
   * @protected
   * @abstract
   * @async
   * @param {*} [data=null] Dados
   * @return {Promise<{}>}
   */
  async post(data = null) { // eslint-disable-line
    return data;
  }


  /**
   * @protected
   * @async
   * @description Usar para formatar o dado recebido do backend
   * @param {*} [data=null] Texto informativo
   * @param {string} [message=null] Texto informativo
   * @return {Promise<void>}
   */
  async afterPost({ data = null, message = 'Criado com sucesso!' }) {
    await this.defaultDone(message);
    return data;
  }


  /**
   * @public
   * @async
   * @param {*} data Dados
   * @return {Promise<void>}
   */
  async update(data = null) {
    try {
      const formatted = await this.beforePut(data);
      const response = await this.put(formatted);
      await this.afterPut({ data: response });
    } catch (error) {
      console.error(error); // eslint-disable-line
      this.defaultFail(error);
    } finally {
      this.defaultAlways();
    }
  }


  /**
   * @protected
   * @async
   * @param {*} data Dados
   * @description Usar para formatar o dado a enviar ao backend
   * @return {Promise<void>}
   */
  async beforePut(data = null) { // eslint-disable-line
    $(`.${modalClassNames.SUBMIT_WRAPPER} .${alertClassNames.WRAPPER}`).remove();
    $(`.${modalClassNames.SUBMIT_WRAPPER}`).prepend(InlineLoading({ extraClass: loadingClassNames.SMALL }));
    return data;
  }


  /**
   * @protected
   * @abstract
   * @async
   * @param {*} data Dados
   * @return {Promise<{}>}
   */
  async put(data = null) { // eslint-disable-line
    return data;
  }


  /**
   * @protected
   * @async
   * @param {*} data Dados
   * @param {string} message Mensagem
   * @description Usar para formatar o dado recebido do backend
   * @return {Promise<void>}
   */
  async afterPut({ data = null, message = 'Atualizado com sucesso!' }) {
    await this.defaultDone(message);
    return data;
  }


  /**
   * @public
   * @async
   * @param {*} data Dados
   * @return {Promise<{void}>}
   */
  async exclude(data = null) {
    try {
      const formatted = await this.beforeDelete(data);
      const response = await this.delete(formatted);
      await this.afterDelete(response);
    } catch (error) {
      console.error(error); // eslint-disable-line
      this.modalFail(error);
    } finally {
      this.modalAlways();
    }
  }


  /**
   * @protected
   * @async
   * @param {*} data Dadosados
   * @return {Promise<*>}
   */
  async beforeDelete(data = null) { // eslint-disable-line
    $(`.${modalClassNames.SUBMIT_WRAPPER} .${alertClassNames.WRAPPER}`).remove();
    $(`.${modalClassNames.SUBMIT_WRAPPER}`).prepend(InlineLoading({ extraClass: loadingClassNames.SMALL }));
    return data;
  }


  /**
   * @protected
   * @abstract
   * @async
   * @param {*} data Dados
   * @return {Promise<*>}
   */
  async delete(data = null) { // eslint-disable-line
    return data;
  }


  /**
   * @protected
   * @async
   * @param {*} data Dados
   * @param {string} message Mensagem
   * @return {Promise<*>}
   */
  async afterDelete({ data = null, message = 'Removido com sucesso!' }) {
    await this.defaultDone(message);
    return data;
  }


  /**
   * @protected
   * @param {string} [text=''] Texto
   * @param {boolean} [isQuiet=true] Toast
   */
  defaultDone(text = '', isQuiet = true) {
    document.getElementById(this.template.id)
            .prepend(InlineAlert({
              kind: 'success',
              iconName: 'success',
              text,
              isAbsolute: isQuiet,
            }));
    const inlineAlert = $(`#${this.template.id} .${alertClassNames.WRAPPER}`);

    setTimeout(() => inlineAlert.fadeOut(DEFAULTS.HIDE_PAGE_TIME), DEFAULTS.HIDE_PAGE_TIME);
    setTimeout(() => inlineAlert.remove(), 2 * DEFAULTS.HIDE_PAGE_TIME);
  }


  /**
   * @protected
   * @param {XMLHttpRequest} [xhr={}] Cabeçalho da requisição
   */
  defaultFail(xhr = {}) {
    document.getElementById(this.template.id).prepend(InlineAlert(API.getErrorType(xhr)));
  }


  /** @protected */
  defaultAlways() {
    $(`#${this.template.id} .${loadingClassNames.WRAPPER}`).toggleClass(loadingClassNames.HIDE);
    $(`#${this.template.id} .${loadingClassNames.EXTRA_WRAPPER}`).remove();
  }


  /**
   * @protected
   * @param {XMLHttpRequest} [xhr={}] Cabeçalho da requisição
   */
  modalFail(xhr = {}) { // eslint-disable-line
    $(`.${modalClassNames.SUBMIT_WRAPPER} .${alertClassNames.WRAPPER}`).remove();
    $(`.${modalClassNames.SUBMIT_WRAPPER}`).prepend(InlineAlert(API.getErrorType(xhr)));
  }


  /** @protected */
  modalAlways() { // eslint-disable-line
    $(`.${modalClassNames.SUBMIT_WRAPPER} .${loadingClassNames.WRAPPER}`).remove();
  }
}