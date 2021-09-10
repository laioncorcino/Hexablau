import { randomId, STORAGE } from '@core';

/**
 * @version 2
 * @name Reducer
 * @interface
 * @author Elihofni Guirra Lima
 * Modelo de controlador de estado local
 */
export default class AbstractReducer {
  constructor({ storageName = '', initialState = {}, attributes = {}, current = {} } = {}) {
    this.CURRENT = current;
    this.INITIAL_STATE = initialState;
    this.STORAGE_NAME = storageName;
    this.ATTRIBUTES = Object.keys(attributes)
                            .reduce((acc, key) => {
                              acc[key] = key.toString();
                              return acc;
                            }, {});

    STORAGE[this.STORAGE_NAME] = this.initialState;
    this.resetCurrent();
  }

  /**
   * @protected
   * @description Estado inicial do controlador
   */
  get initialState() {
    return this.INITIAL_STATE;
  }


  /**
   * @description Configura o estado inicial do controlador
   * @param {*} state Estado inicial
   */
  set initialState(state) {
    if (Array.isArray(state)) {
      this.INITIAL_STATE = state.reduce((acc, item) => {
        const id = item.id || randomId();
        acc[id] = { ...item, id };
        return acc;
      }, {});
    } else {
      this.INITIAL_STATE = state;
    }
  }

  get attributes() {
    return this.ATTRIBUTES;
  }

  get size() {
    return Object.values(STORAGE[this.STORAGE_NAME]).length;
  }


  /**
   * @description Acessa um item da storage
   * @param {number} id ID
   * @return {*|null}
   */
  get(id) {
    return STORAGE[this.STORAGE_NAME][id] || null;
  }


  /**
   * @description Acessa todos os items da storage
   * @return {*}
   */
  getAll() {
    return Object.values(STORAGE[this.STORAGE_NAME]);
  }

  /**
   * @description Armazena um novo item
   * @param {*} value Novo item
   */
  add(value) {
    if (Array.isArray(value)) {
      STORAGE[this.STORAGE_NAME] = value.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
    } else {
      STORAGE[this.STORAGE_NAME][value.id] = value;
    }
  }


  /**
   * @description Atualiza todos os itens da storage
   * @param {*} values Novos valores
   */
  set(values) {
    if (Array.isArray(values)) {
      STORAGE[this.STORAGE_NAME] = values.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
    } else {
      STORAGE[this.STORAGE_NAME] = values;
    }
  }


  /**
   * @description Atualiza um item da storage
   * @param {*} value Objeto a ser atualizado
   * @return {*}
   */
  update(value) {
    STORAGE[this.STORAGE_NAME][value.id.toString()] = value;
    return value;
  }


  remove(id) {
    delete STORAGE[this.STORAGE_NAME][id];
  }


  /**
   * @description Acessa o valor do item atual
   * @return {*|{}}
   */
  getCurrent() {
    return this.CURRENT;
  }

  /**
   * @description Acessa o valor de um atributo do item atua
   * @param {string} attribute Nome do atributo
   * @return {*|null}
   */
  getCurrentAttribute(attribute = '') {
    return this.CURRENT[attribute] || null;
  }


  /**
   * @description Atualiza o valor de um atributo do item atual
   * @param {string} attribute Nome do atributo que será atualizado
   * @param {*} value Valor para o atributo
   * @return {*}
   */
  updateCurrent(attribute = '', value = null) {
    this.CURRENT[attribute] = value;
    return this.CURRENT[attribute];
  }

  /**
   * @description Sobrescreve o objeto do item atual
   * @param {string} newCurrent Novo objeto
   */
  setCurrent(newCurrent) {
    this.CURRENT = { ...newCurrent };
  }


  resetCurrent() {
    this.CURRENT = { ...this.ATTRIBUTES };
  }
}