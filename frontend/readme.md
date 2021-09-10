# Website Hexablau
Interface gerenciadora dos dados do sistema Hexablau

## Quickstart

##### Requisitos
* [NPM](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm "Instalar Node.JS e NPM") - Ambiente para desenvolvimento
* [ES6](https://github.com/mbeaudru/modern-js-cheatsheet "Guia de bolso") - Padrão JavaScript
* [SCSS](http://sass-lang.com/ "SASS") - Pré-processador de CSS
* [WebStorm](https://www.jetbrains.com/webstorm/ "Instalar Webstorm") - IDE Recomendada
* [Paciência](http://i0.kym-cdn.com/photos/images/facebook/001/149/512/709.jpg "Paciência"), muita paciência


##### Comandos básicos
> Em um terminal, ir até a raíz do projeto `Hexablau\frontend\`

- `npm install`: Instala todas as dependências do projeto

- `npm start`: Inicia o [`webpack`](https://webpack.js.org/ "Empacotador de código") para desenvolvimento local

- `npm run build`: Cria a pasta dist, gerando `index.html`, `main.css` e `bundle.js` finais e minificados

---

## Organização de pastas

- `core\`: Camada responsável pela integração e fluxo do código, criado seguindo o padrão [Template Method](https://refactoring.guru/design-patterns/template-method "Design Pattern")

    - `..\actions`: Interface responsável pelas ações genéricas das páginas (código padrão para CREATE, RETRIEVE, UPDATE, DELETE)

    - `..\api`: Interface responsável pela comunicação com o webservice via requisições [AJAX](https://www.w3schools.com/xml/ajax_intro.asp "AJAX")

    - `..\defaults`: Definição de variáveis e constantes reutilizadas pelo `core` (e páginas)

    - `..\defaultPages`: Páginas genéricas pré prontas e já plugadas ao core (página 404, home, etc)

    - `..\index`: Responsável por exportar os demais módulos do `core` (porta de acesso ao mesmo)

    - `..\main`: Responsável pelo fluxo inicial genérico da aplicação (entrada da aplicação)

    - `..\router`: Responsável pela identificação da página corrente e navegação entre páginas da aplicação

    - `..\routes`: Objeto padrão para as rotas da aplicação (inicialmente apenas com rota 404 e home)

    - `..\template`: Interface responsável pelos templates genéricos das páginas (define o fluxo e a marcação do HTML)

    - `..\tools`: Funções auxiliares usadas pelo `core` (e aplicação)


- `src\`: Camada responsável pela implementação da aplicação (estende do core)

    - `..\components`: Componentes reaproveitáveis pela aplicação

    - `..\pages`: Código específico para cada página da aplicação (implementação dos templates HTML e CSS, ações de comportamento JS e regras de negócio específicas)
        - Cada página pode ser composta por `templates`, `estilos`, `ações` e `manejador de estado`

    - `..\scipts`: Responsável por agrupar scripts compartilhados pela aplicação (constantes, manejador de estado do cliente e funções auxiliares)

    - `..\styles`: Código SCSS genérico global da aplicação (cores, breakpoints, tipografia, mixins, etc)

    - `index.js`: Ponto de entrada JS da aplicação

    - `index.pug`: Ponto de entrada HTML da aplicação

---

## Exemplo de uso de funcionalidades do core

- `src\scripts\main`: Exemplo de utilização

  ```javascript
  /**
  * Cria o ponto de entrada de sua aplicação
  * @Singleton
  * @implements {AbstractMain}
  */  
  export default class Main extends AbstractMain {
    /** Use para definir e iniciar as rotas da sua aplicação */
    static async assembleRoutes() {
      ROUTES.home = { routes: ['', 'home'], pageActions: HomeActions }; // Sobrescreve a rota da Home
      ROUTES.login = { routes: ['login'], pageActions: LoginActions }; // Insere uma rota 'login' gerenciada por LoginActions
      ...
    }
  
    /** Use para iniciar suas rotinas antes do roteador iniciar */
    static async beforeInit() {
      DEFAULTS.TITLE = 'Nome do Projeto'; // Sobrescreve o título da aplicação (visível na aba do navegador)
      ...    
    }
  
  
    /** Use para iniciar as demais rotinas após o roteador */
    static async afterInit() {
      Header.init('Nome do usuário logado');
      ...
    }
  }
  
  // Inicia a sua aplicação
  Main.init();
  ```

- `src\pages\usuarios\usuariosActions`: Exemplo de utilização

  ```javascript
  import UsuariosTemplate from '...';
  import UsuariosReducer from '...';
  
  let instance = null;

  /**
   * @Singleton
   * @implements {AbstractActions}
   */
  class Actions extends AbstractActions {
    constructor({ title, template, reducer }) {
      if (!instance) {
        instance = super({ title, template, reducer });
      }
    
      return instance;
    }
  
    ...
  }
  
  const UsuariosActions = new Actions({
    title: 'Usuários',
    template: UsuariosTemplate, // Template específico
    reducer: UsuariosReducer, // Reducer específico
  });
  
  export default UsuariosActions;
  ```

- `src\pages\usuarios\templates\template`: Exemplo de utilização

  ```javascript
    let instance = null;
  
    // ids de elementos HTML no DOM utilizados pelo template
    const IDS = {
      abrirModalInserir: '',
      abrirModalAtualizar: '',
    };
    
   /**
    * @Singleton
    * @implements {AbstractTemplate}
    */
    class Template extends AbstractTemplate {
      constructor({ ids }) {
        if (!instance) {
          instance = super({ ids }); // inicia os demais ids de forma automática
          this.TABLE_ID = randomId(); // id extra específico (fora da chave `ids`)
        }
      
        return instance;
      }
    
      
      /** @override AbstractTemplate.render */
      async render(extradata) {
        return `
          <section id="${this.id}" class="page page--usuarios">
            <h1 class="page-title uppercase">Usuários</h1>
            <div id="${this.TABLE_ID}" class="table">
              <div class="table-menu-header">
                ${Button({ // Utilizando o componente Button no template
                  id: this.ids.abrirModalInserir,
                  extraClass: BUTTON_CLASSNAMES.PRIMARY,
                  label: 'Inserir',
                  onClick: Modal.openAdd,
                })}
                
                ${Searchable({ // Utilizando o componente Searchable no template
                  placeholder: 'Buscar por nome ou email do usuário' 
                })}
              </div>
              <div class="table-row table-header">
                 ${... /* Utilizando demais componentes */}
              </div>
              <ul class="table-section table-section-active list"></ul>
            </div>
          </section>
        `;
      }
    }
  
    const UsuariosTemplate = new Template({ ids: IDS });
    export default UsuariosTemplate;
  ```


- `src\pages\usuarios\reducer`: Exemplo de utilização

  ```javascript
    let instance = null;
    
    /**
     * @typedef Usuario
     * @type {{password: string, role: null, name: string, id: null, login: string, email: string, enabled: boolean}}
     */
    const attributes = {
      id: null,
      name: '',
      login: '',
      email: '',
      enabled: true,
      password: '',
      role: null,
    };
    
  
    /**
     * @Singleton
     * @implements {AbstractReducer}
     */
    class Reducer extends AbstractReducer {
      constructor({ storageName, initialState, attributes: attrs }) {
        if (!instance) {
          instance = super().constructor({ storageName, initialState, attributes: attrs });
        }
    
        return instance;
      }
    }
    
    const UsuariosReducer = new Reducer({
      storageName: 'usuarios', // Define o nome do manejador
      initialState: [], // Define o estado inicial do manejador
      attributes, // define quais os atributos do manejador
    });
    
    export default UsuariosReducer;
  ```

---


### Diagramas de fluxo do Core

![Main](core/diagramas/core-main.jpg?raw=true "Main")

![Router](core/diagramas/core-router.jpg?raw=true "Router")

![API](core/diagramas/core-api.jpg?raw=true "API")

![Actions](core/diagramas/core-actions.jpg?raw=true "Actions")

![Template](core/diagramas/core-template.jpg?raw=true "Template")
