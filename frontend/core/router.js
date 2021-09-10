import { ROUTES, DEFAULTS, AbstractActions } from '@core';

let currentPage = null;
let routes = ROUTES;

/**
 * @public
 * @version 1
 * @name Router
 * @author Elihofni Guirra Lima
 * Responsável pela navegação de páginas (SPA)
 */
export default class Router {
  /** @protected */
  static async init() {
    const { pathname, hash } = window.location;
    routes = Object.values(ROUTES);

    // Ação de voltar pelo botão no navegador
    window.onpopstate =
      ({ state }) => state && this.navigateTo(state.route, { hash: state.hash, isReversing: true });

    if (DEFAULTS.API_AUTHENTICATION && DEFAULTS.TOKEN()) {
      await this.navigateTo(pathname.slice(1), { hash: hash.slice(1) });
    } else if (!DEFAULTS.API_AUTHENTICATION) {
      await this.navigateTo(pathname.slice(1), { hash: hash.slice(1) });
    } else {
      // Exemplo de redirecionamento 401
      const redirectTo = pathname.slice(1) !== DEFAULTS.UNAUTHENTICATED_ROUTE ? pathname.slice(1) : '';
      await this.navigateTo(DEFAULTS.UNAUTHENTICATED_ROUTE, { redirectTo });
    }
  }


  /**
   * @private
   * @param {string} route Nome da página
   * @param {string} hash Hash
   * @param {string} redirectTo caminho de redirecionamento
   */
  static onPushState({ route = '', hash = '', redirectTo = '' }) {
    const data = { route, hash, redirectTo };

    history.pushState(data, `pagina-${route}`, `/${route}${hash ? `#${hash}` : ''}`);
  }


  /**
   * @param {string} route Rota
   * @param {string} hash Hash
   * @param {boolean} isReversing Indicador se o está voltando via navegador
   * @param {string} redirectTo Caminho para redirecionamento
   * @example Router.navigateTo('competicoes')
   * @example Router.navigateTo('competicoes/novo')
   * @example Router.navigateTo('competicoes/123', { hash: 'ranking' })
   * @return {Promise<void>}
   */
  static async navigateTo(route = '', { hash = '', isReversing = false, redirectTo = '' } = {}) {
    if (currentPage && currentPage.pageActions && currentPage.pageActions.terminate) {
      await currentPage.pageActions.terminate();
    }

    const routeRegexDecoder = /^(?<routePath>[a-z0-9-]*)(?:$|\/$|\/:(?<routeParam>[a-z]*)(?:\/|)(?<routeParamSubpath>[a-z0-9-]*)|\/(?<routeSubpath>[a-z-]*))/;
    const urlRegexDecoder = /^(?<urlPath>[a-z0-9-]*)(?:\/|$)(?<urlParam>[0-9]*)(?:\/$|(?<urlSubpath>[a-z0-9-/]*))/;
    const { urlPath = '', urlParam = '', urlSubpath = '' } = route.match(urlRegexDecoder).groups;
    const subpath = urlSubpath.startsWith('/') ? urlSubpath.slice(1) : urlSubpath;

    let paramName = '';
    const page = routes.find(routeObj => routeObj.routes.find((pathway) => {
      const { routePath = '', routeParam = '', routeParamSubpath = '', routeSubpath = '' } = pathway.match(routeRegexDecoder).groups;

      const isValidPath = urlPath === routePath && (urlParam ? routeParam : true);
      let isValidSubpath = true;
      if (subpath) {
        isValidSubpath = routeSubpath === subpath || routeParamSubpath === subpath;
      }

      if (isValidPath && isValidSubpath) {
        paramName = routeParam;
        return true;
      }
      return false;
    }));

    if (route) {
      currentPage = page || ROUTES.notFound;
    } else {
      currentPage = ROUTES.home;
    }

    if (!isReversing) {
      this.onPushState({ route, hash, redirectTo });
    }

    await currentPage.pageActions.init({
      [paramName]: Number(urlParam) || urlParam,
      subpath,
      hash,
      redirectTo,
    });
  }

  static isCurrentPage(actions = AbstractActions) {
    return currentPage.pageActions === actions;
  }
}