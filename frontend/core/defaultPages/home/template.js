import { AbstractTemplate } from '@core';

export default class Template extends AbstractTemplate {
  /**
   * @override AbstractTemplate.render
   * @private
   */
  static async render() {
    return `
      <section id="${this.id}" class="page">
        <h1 class="page-title uppercase">Home</h1>                     
      </section>
    `;
  }
}