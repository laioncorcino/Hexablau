import 'tooltipster/dist/js/tooltipster.bundle.min';
import 'tooltipster/dist/css/tooltipster.bundle.min.css';
import 'tooltipster/dist/css/tooltipster.main.min.css';
import 'tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-light.min.css';
import './styles/main.scss';
import Header from '@components/header/header';
// import Modal from '@components/modal/modal';
import { AbstractMain, ROUTES, DEFAULTS, Route } from '@core';
import { TableRow } from '@components';

import { HomeActions } from '@pages/home';
import { UsuariosActions } from '@pages/usuarios';

class Index extends AbstractMain {
  /**
   * @description Configura as rotas da aplicação
   * @override AbstractCore.assembleRoutes
   */
  static async assembleRoutes() {
    ROUTES.home = new Route({
      routes: [''],
      pageActions: HomeActions,
      authentication: false,
    });

    ROUTES.usuarios = new Route({
      routes: ['usuarios'],
      pageActions: UsuariosActions,
      authentication: true,
    });
  }


  /**
   * @description Configura os detalhes do projeto antes de iniciar a aplicação
   * @override AbstractCore.beforeInit
   */
  static async beforeInit() {
    DEFAULTS.TITLE = 'Hexablau';
    DEFAULTS.API_AUTHENTICATION = true;
    DEFAULTS.API_AUTHORIZATION_HEADER = 'X-Auth-Token';
    DEFAULTS.API_TOKEN_PATTERN = '';
    // DEFAULTS.TOKEN = () => PerfilReducer.token();

    Header.init();
    // Modal.initModal();

    const tabelas = new TableRow();
    tabelas.init();
  }

  /** @override AbstractCore.afterInit */
  static async afterInit() {// eslint-disable-line
  }
}

Index.init(); // Inicia o frontend

/* istanbul ignore if */
if (module.hot) {
  module.hot.accept();
}