/**
 * @Singleton
 * @implements {AbstractTemplate}
 */
class Template extends AbstractTemplate {
  constructor({ ids }) {
    if (!instance) {
      instance = super({ ids });
      this.TABLE_ID = randomId();
    }

    return instance;
  }

  async render(possuiPermissao) {
    return `
      <section id="${this.id}" class="page">
        <h1 id="home" class="page-title uppercase">Home Hexablau</h1>      
      </section>
    `;
  }
}

export const HomeTemplate = new Template({ ids: IDS });
