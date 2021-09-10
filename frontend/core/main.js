import { Router } from './index';

/* eslint-disable */

/**
 * @version 1
 * @name Main
 * @interface
 * @author Elihofni Guirra Lima
 * Modelo de ponto de início da aplicação Single Page Application (SPA)
 */
export default class Main {
  static init() {
    document.addEventListener('DOMContentLoaded', async () => {
      try {
        await this.assembleRoutes();
        await this.startStorage();
        await this.beforeInit();
        Router.init();
        await this.afterInit();
      } catch (error) {
        console.error(error.stack || error); // eslint-disable-line
      }
    });
  }

  /**
   * @abstract
   * @description Use para definir e iniciar as rotas da sua aplicação
   * @protected
   */
  static async assembleRoutes() {
  }

  /**
   * @abstract
   * @description Use para iniciar o armazenamento local
   * @protected
   */
  static async startStorage() {
  }


  /**
   * @abstract
   * @description Use para iniciar suas rotinas antes do roteador
   * @protected
   */
  static async beforeInit() {
  }


  /**
   * @abstract
   * @description Use para iniciar as demais rotinas após o roteador
   * @protected
   */
  static async afterInit() {
  }
}

/* eslint-enable */