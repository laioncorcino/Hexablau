import NotFoundActions from './defaultPages/404/404Actions';
import HomeActions from './defaultPages/home/homeActions';
import AbstractActions from './actions';


/**
 * @public
 * @version 1
 * @name Route
 * @author Elihofni Guirra Lima
 * @example new Route({ routes: ['', 'home'], pageActions: HomeActions })
 * @example new Route({ routes: ['competicoes', 'competicoes/novo', 'competicoes/:id'], pageActions: CompeticoesActions })
 * @description Uma rota pode possuir parâmetros nomeados ('rota/:nomeParametro')
 */
export default class Route {
  constructor({ routes = [], authentication = false, pageActions = AbstractActions, requirePermission = false } = {}) {
    this.routes = routes;
    this.authentication = authentication;
    this.pageActions = pageActions;
    this.requirePermission = requirePermission;
  }
}


/** @global */
export const ROUTES = {
  home: new Route({ routes: ['', 'home'], pageActions: HomeActions }),
  notFound: new Route({ routes: ['404'], pageActions: NotFoundActions })
};