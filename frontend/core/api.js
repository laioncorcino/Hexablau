import { DEFAULTS } from '@core';

/* eslint-disable */


/**
 * @public
 * @version 1
 * @name API
 * @author Elihofni Guirra Lima
 * Responsável por intermediar a comunicação com a API do backend
 */
export default class API {
  /**
   * @public
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {string} dataType 'json'|'html'|'text'
   * @param {boolean} cache Indica se a requisição pode ser cacheada pelo navegador
   * @param {string} contentType 'application/json'|'multipart/form-data'|'text/plain'
   * @param {boolean} crossDomain Indica se a requisição é fora do domínio do servidor em que a página está hospedada
   * @param {number} timeout Indica o tempo de espera limite para a requisição
   * @example API.get('competicoes')
   * @example API.get('competicoes/regionais?data_inicio=2019-11-01')
   * @example API.get('competicoes', { cache: true })
   * @return {*|jQuery|{getAllResponseHeaders, abort, setRequestHeader, readyState, getResponseHeader, overrideMimeType, statusCode}}
   */
  static get(
    endpoint = '',
    {
      dataType = 'json',
      cache = false,
      contentType = 'application/json',
      crossDomain = true,
      timeout = DEFAULTS.API_TIMEOUT,
    } = {},
  ) {
    return $.ajax({
      method: 'GET',
      url: `${API_URL}/${endpoint}`,
      cache,
      contentType,
      crossDomain,
      timeout,
      dataType,
      beforeSend: (xhr) => {
        if (DEFAULTS.API_AUTHENTICATION) {
          const token = DEFAULTS.TOKEN();
          const formattedToken = DEFAULTS.API_TOKEN_PATTERN ? `${DEFAULTS.API_TOKEN_PATTERN} ${token}` : token;

          if (token) {
            xhr.setRequestHeader(DEFAULTS.API_AUTHORIZATION_HEADER, formattedToken);
          }
        }
      },
    });
  }


  /**
   * @public
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {*} [data=null] Dados que serão enviados na requisição
   * @param {string} dataType 'json'|'html'|'text'
   * @param {boolean} cache Indica se a requisição pode ser cacheada pelo navegador
   * @param {string} contentType 'application/json'|'multipart/form-data'|'text/plain'
   * @param {boolean} crossDomain Indica se a requisição é fora do domínio do servidor em que a página está hospedada
   * @param {number} timeout Indica o tempo de espera limite para a requisição
   * @example API.post('competicoes/', { nome: 'Nome Competição', valor: 3 })
   * @return {*|jQuery|{getAllResponseHeaders, abort, setRequestHeader, readyState, getResponseHeader, overrideMimeType, statusCode}}
   */
  static post(
    endpoint = '',
    data = null,
    {
      dataType = 'json',
      cache = false,
      contentType = 'application/json',
      crossDomain = true,
      timeout = DEFAULTS.API_TIMEOUT,
    } = {},
  ) {
    return $.ajax({
      method: 'POST',
      url: `${API_URL}/${endpoint}`,
      data: JSON.stringify(data),
      cache,
      contentType,
      crossDomain,
      timeout,
      dataType,
      beforeSend: (xhr) => {
        if (DEFAULTS.API_AUTHENTICATION) {
          const token = DEFAULTS.TOKEN();

          if (token) {
            const formattedToken = DEFAULTS.API_TOKEN_PATTERN ? `${DEFAULTS.API_TOKEN_PATTERN} ${token}` : token;
            xhr.setRequestHeader(DEFAULTS.API_AUTHORIZATION_HEADER, formattedToken);
          }
        }
      },
    });
  }


  /**
   * @public
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {*|null} data Dados que serão enviados na requisição
   * @param {string} dataType 'json'|'html'|'text'
   * @param {boolean} cache Indica se a requisição pode ser cacheada pelo navegador
   * @param {string} contentType 'application/json'|'multipart/form-data'|'text/plain'
   * @param {boolean} crossDomain Indica se a requisição é fora do domínio do servidor em que a página está hospedada
   * @param {number} timeout Indica o tempo de espera limite para a requisição
   * @example API.patch('competicoes/123', { valor: 5 })
   * @return {*|jQuery|{getAllResponseHeaders, abort, setRequestHeader, readyState, getResponseHeader, overrideMimeType, statusCode}}
   */
  static patch(
    endpoint = '',
    data = null,
    {
      dataType = 'json',
      cache = false,
      contentType = 'application/json',
      crossDomain = true,
      timeout = DEFAULTS.API_TIMEOUT,
    } = {},
  ) {
    return $.ajax({
      method: 'PATCH',
      url: `${API_URL}/${endpoint}`,
      data,
      cache,
      contentType,
      crossDomain,
      timeout,
      dataType,
      beforeSend: (xhr) => {
        if (DEFAULTS.API_AUTHENTICATION) {
          const token = DEFAULTS.TOKEN();

          if (token) {
            const formattedToken = DEFAULTS.API_TOKEN_PATTERN ? `${DEFAULTS.API_TOKEN_PATTERN} ${token}` : token;
            xhr.setRequestHeader(DEFAULTS.API_AUTHORIZATION_HEADER, formattedToken);
          }
        }
      },
    });
  }



  /**
   * @public
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {*|null} data Dados que serão enviados na requisição
   * @param {string} dataType 'json'|'html'|'text'
   * @param {boolean} cache Indica se a requisição pode ser cacheada pelo navegador
   * @param {string} contentType 'application/json'|'multipart/form-data'|'text/plain'
   * @param {boolean} crossDomain Indica se a requisição é fora do domínio do servidor em que a página está hospedada
   * @param {number} timeout Indica o tempo de espera limite para a requisição
   * @example API.put('competicoes/123', { id: 123, nome: 'Nome Atualizado', valor: 3, data_criacao: '2019-11-01' })
   * @return {*|jQuery|{getAllResponseHeaders, abort, setRequestHeader, readyState, getResponseHeader, overrideMimeType, statusCode}}
   */
  static put(
    endpoint = '',
    data = null,
    {
      dataType = 'json',
      cache = false,
      contentType = 'application/json',
      crossDomain = true,
      timeout = DEFAULTS.API_TIMEOUT,
    } = {},
  ) {
    return $.ajax({
      method: 'PUT',
      url: `${API_URL}/${endpoint}`,
      data,
      cache,
      contentType,
      crossDomain,
      timeout,
      dataType,
      beforeSend: (xhr) => {
        if (DEFAULTS.API_AUTHENTICATION) {
          const token = DEFAULTS.TOKEN();

          if (token) {
            const formattedToken = DEFAULTS.API_TOKEN_PATTERN ? `${DEFAULTS.API_TOKEN_PATTERN} ${token}` : token;
            xhr.setRequestHeader(DEFAULTS.API_AUTHORIZATION_HEADER, formattedToken);
          }
        }
      },
    });
  }


  /**
   * @public
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {*|null} data Dados que serão enviados na requisição
   * @param {string} dataType 'json'|'html'|'text'
   * @param {boolean} cache Indica se a requisição pode ser cacheada pelo navegador
   * @param {string} contentType 'application/json'|'multipart/form-data'|'text/plain'
   * @param {boolean} crossDomain Indica se a requisição é fora do domínio do servidor em que a página está hospedada
   * @param {number} timeout Indica o tempo de espera limite para a requisição
   * @example API.delete('competicoes/123')
   * @return {*|jQuery|{getAllResponseHeaders, abort, setRequestHeader, readyState, getResponseHeader, overrideMimeType, statusCode}}
   */
  static delete(
    endpoint = '',
    data = null,
    {
      dataType = 'json',
      cache = false,
      contentType = 'application/json',
      crossDomain = true,
      timeout = DEFAULTS.API_TIMEOUT,
    } = {},
  ) {
    return $.ajax({
      method: 'DELETE',
      url: `${API_URL}/${endpoint}`,
      data,
      cache,
      contentType,
      crossDomain,
      timeout,
      dataType,
      beforeSend: (xhr) => {
        if (DEFAULTS.API_AUTHENTICATION) {
          const token = DEFAULTS.TOKEN();

          if (token) {
            const formattedToken = DEFAULTS.API_TOKEN_PATTERN ? `${DEFAULTS.API_TOKEN_PATTERN} ${token}` : token;
            xhr.setRequestHeader(DEFAULTS.API_AUTHORIZATION_HEADER, formattedToken);
          }
        }
      },
    });
  }





  /**
   * @public
   * @description Identifica os erros padrão da comunicação com o backend
   * @param {XMLHttpRequest} xhr API web nativa
   * @return {*}
   */
  static getErrorType(xhr = null) {
    if (xhr.statusText === 'timeout') { // 408: client-side, 504: server-side
      return {
        kind: 'error',
        iconName: 'error',
        text: DEFAULTS.API_ERROR_MESSAGES.CLIENT_TIMEOUT.MESSAGE,
        title: 'Ooops!',
        errorCode: DEFAULTS.API_ERROR_MESSAGES.CLIENT_TIMEOUT.STATUS,
        errorLabel: DEFAULTS.API_ERROR_MESSAGES.CLIENT_TIMEOUT.LABEL,
      };
    }

    switch (xhr.status) {
      case 400:
        return {
          kind: 'error',
          iconName: 'error',
          text: DEFAULTS.API_ERROR_MESSAGES.INVALID.MESSAGE,
          title: 'Monos me muerdan, Batman!',
          errorCode: DEFAULTS.API_ERROR_MESSAGES.INVALID.STATUS,
          errorLabel: DEFAULTS.API_ERROR_MESSAGES.INVALID.LABEL,
        };

      case 401:
        return {
          kind: 'error',
          iconName: 'error',
          text: DEFAULTS.API_ERROR_MESSAGES.UNAUTHORIZED.MESSAGE,
          title: 'Ooops!',
          errorCode: DEFAULTS.API_ERROR_MESSAGES.UNAUTHORIZED.STATUS,
          errorLabel: DEFAULTS.API_ERROR_MESSAGES.UNAUTHORIZED.LABEL,
        };

      case 403:
        return {
          kind: 'error',
          iconName: 'error',
          text: DEFAULTS.API_ERROR_MESSAGES.FORBIDDEN.MESSAGE,
          title: 'Alto lá!',
          errorCode: DEFAULTS.API_ERROR_MESSAGES.FORBIDDEN.STATUS,
          errorLabel: DEFAULTS.API_ERROR_MESSAGES.FORBIDDEN.LABEL,
        };

      case 404:
        return {
          kind: 'error',
          iconName: 'error',
          text: DEFAULTS.API_ERROR_MESSAGES.NOT_FOUND.MESSAGE,
          title: 'Ooops!',
          errorCode: DEFAULTS.API_ERROR_MESSAGES.NOT_FOUND.STATUS,
          errorLabel: DEFAULTS.API_ERROR_MESSAGES.NOT_FOUND.LABEL,
        };

      case 500:
        return {
          kind: 'error',
          iconName: 'error',
          text: DEFAULTS.API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR.MESSAGE,
          title: 'Ooops!',
          errorCode: DEFAULTS.API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR.STATUS,
          errorLabel: DEFAULTS.API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR.LABEL,
        };

      case 504:
        return {
          kind: 'error',
          iconName: 'error',
          text: DEFAULTS.API_ERROR_MESSAGES.SERVER_TIMEOUT.MESSAGE,
          title: 'Ooops!',
          errorCode: DEFAULTS.API_ERROR_MESSAGES.SERVER_TIMEOUT.STATUS,
          errorLabel: DEFAULTS.API_ERROR_MESSAGES.SERVER_TIMEOUT.LABEL,
        };

      default:
        return {
          kind: 'error',
          iconName: 'error',
          text: DEFAULTS.API_ERROR_MESSAGES.UNKNOWN.MESSAGE,
          title: 'Macacos me mordam, Batman!',
          errorCode: DEFAULTS.API_ERROR_MESSAGES.UNKNOWN.STATUS,
          errorLabel: DEFAULTS.API_ERROR_MESSAGES.UNKNOWN.LABEL,
        };
    }
  }




  /**
   * @public
   * @example API.getMOCK('competicoes/', [{ id: 1, nome: 'Competição 1', valor: 2, data_criacao: '2019-11-01' }, { id: 2, nome: 'Competição 2', valor: 5, data_criacao: '2019-11-2' }])
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {*} retorno Objeto de exemplo que é esperado
   * @return {Promise<{}>}
   */
  static getMOCK(endpoint = '', retorno = {}) {
    return new Promise(resolve => setTimeout(() => resolve(retorno), 2000));
  }


  /**
   * @public
   * @example API.postMOCK('competicoes/', { nome: 'Nova Competição', valor: 2 }, { id: 123, nome: 'Nova Competição', valor: 2, data_criacao: '2019-11-01' })
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {*} json Objeto de exemplo que é enviado
   * @param {*} retorno Objeto de exemplo que é esperado
   * @return {Promise<{}>}
   */
  static postMOCK(endpoint = '', json = {}, retorno = {}) {
    return new Promise(resolve => setTimeout(() => resolve(retorno), 2000));
  }


  /**
   * @public
   * @example API.patchMOCK('competicoes/123', { nome: 'Nome Atualizado' }, { id: 123, nome: 'Nome Atualizado', valor: 2, data_criacao: '2019-11-01' })
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {*} json Objeto de exemplo que é enviado
   * @param {*} retorno Objeto de exemplo que é esperado
   * @return {Promise<{}>}
   */
  static patchMOCK(endpoint = '', json = {}, retorno = {}) {
    return new Promise(resolve => setTimeout(() => resolve(retorno), 2000));
  }


  /**
   * @public
   * @example API.putMOCK('competicoes/123', { id: 123, nome: 'Nome Atualizado', valor: 3, data_criacao: '2019-11-01' }, { id: 123, nome: 'Nome Atualizado', valor: 3, data_criacao: '2019-11-01' })
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {*} json Objeto de exemplo que é enviado
   * @param {*} retorno Objeto de exemplo que é esperado
   * @return {Promise<{}>}
   */
  static putMOCK(endpoint = '', json = {}, retorno = {}) {
    return new Promise(resolve => setTimeout(() => resolve(retorno), 2000));
  }


  /**
   * @public
   * @example API.deleteMOCK('competicoes/123', {}, {})
   * @param {string} endpoint Endereço após o caminho base (sem a primeira /)
   * @param {*} json Objeto de exemplo que é enviado
   * @param {*} retorno Objeto de exemplo que é esperado
   * @return {Promise<{}>}
   */
  static deleteMOCK(endpoint = '', json = {}, retorno = {}) {
    return new Promise(resolve => setTimeout(() => resolve(retorno), 2000));
  }
}

/* eslint-enable */