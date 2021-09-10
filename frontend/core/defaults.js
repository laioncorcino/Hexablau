/**
 * @global
 * @description Configuração de variáveis e constantes utilizadas pelo `core` e aplicação
 */
const DEFAULTS = {
  TITLE: 'Projeto',


  /**
   * @description Elemento HTML padrão que envolve as páginas
   * @default 'main'
   */
  PAGE_WRAPPER: 'main',


  /**
   * @description Tempo de transição para navegação entre páginas
   * @default 0.5s
   */
  HIDE_PAGE_TIME: 500,


  /**
   * @description Nome da classe CSS que ativa uma página
   * @default 'page--active'
   */
  ACTIVE_PAGE_CLASSNAME: 'page--active',


  MOBILE_BREAKPOINT: 768,

  /**
   * @description Informa se a API padrão precisa de autenticação (usuário logado)
   * @default false
   */
  API_AUTHENTICATION: false,


  /**
   * @description Tempo limite para a API retornar erro de conexão
   * @default 1min
   */
  API_TIMEOUT: 60000,


  /**
   * @description Informa qual o cabeçalho utilizado pela aplicação para validar as requisições
   * @example 'Authorization'
   * @example 'OAuth 2.0'
   * @example 'Bearer Token'
   * @example 'Basic Auth'
   * @default 'Authorization'
   */
  API_AUTHORIZATION_HEADER: 'Authorization',


  /**
   * @description Informa qual o padrão de autenticação utlizado
   * @example 'JWT'
   * @example 'Bearer'
   * @default 'JWT'
   */
  API_TOKEN_PATTERN: 'JWT',


  /**
   * @description Caminho padrão para redirecionar usuário não autenticado
   * @example 'login'
   * @example 'entrar'
   * @default 'login'
   */
  UNAUTHENTICATED_ROUTE: 'login',


  /**
   * @abstract
   * @description Função responsável por retornar o token do usuário logado
   * @example const token = DEFAULTS.TOKEN();
   * @return {string|null}
   */
  TOKEN: () => null,


  /** @description Mensagens padrão de erro de API */
  API_ERROR_MESSAGES: {
    UNKNOWN: {
      STATUS: -1,
      MESSAGE: 'Algo muito estranho está acontecendo',
      LABEL: 'desconhecido',
    },
    INVALID: {
      STATUS: 400,
      MESSAGE: 'No hablo tu idioma señor Ó_Ò',
      LABEL: 'requisição inválida',
    },
    UNAUTHORIZED: {
      STATUS: 401,
      MESSAGE: 'Parece que sua credencial expirou, entre novamente',
      LABEL: 'não autorizado',
    },
    FORBIDDEN: {
      STATUS: 403,
      MESSAGE: 'Parece que você não tem permissão para acessar esse recurso',
      LABEL: 'proibido',
    },
    NOT_FOUND: {
      STATUS: 404,
      MESSAGE: 'Parece que esse elemento não existe mais no servidor',
      LABEL: 'não encontrado',
    },
    CLIENT_TIMEOUT: {
      STATUS: 408,
      MESSAGE: 'Parece que a sua requisição demorou demais para responder, verifique sua conexão ou tente novamente mais tarde',
      LABEL: 'tempo limite',
    },
    INTERNAL_SERVER_ERROR: {
      STATUS: 500,
      MESSAGE: 'Parece que o servidor está com dificuldades internas. Tente novamente mais tarde',
      LABEL: 'erro interno no servidor',
    },
    SERVER_TIMEOUT: {
      STATUS: 504,
      MESSAGE: 'Parece que o servidor demorou demais para responder, tente novamente mais tarde',
      LABEL: 'tempo limite',
    },
  }
};

export default DEFAULTS;