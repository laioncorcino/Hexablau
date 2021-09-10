import { AbstractActions, API } from '@core';
import ProfessoresTemplate from './templates/template';
import { ProfessoresReducer } from '@pages/professores';
import LoginReducer from '@pages/login/loginReducer';
import { PRIVILEGES, TOOLTIPSTER_OPTIONS } from '@constants';
import { Modal } from '@components';

let instance = null;

class Actions extends AbstractActions {
  constructor({ title, template, reducer }) {
    if (!instance) {
      instance = super({ title, template, reducer });
    }

    return instance;
  }

  async showPage(params) {
    console.log('showpage professores', { params }); // eslint-disable-line
    const hasAdminPrivileges = LoginReducer.getPrivileges.find(autho => autho.id === PRIVILEGES.ADMIN.id);

    await this.template.load(hasAdminPrivileges);
    await this.template.afterLoad(hasAdminPrivileges);
    $('.tooltip').tooltipster(TOOLTIPSTER_OPTIONS);
  }

  async refresh() {
    $(`#${this.template.TABLE_ID} .list`).contents().remove();
    await this.retrieve();
    Modal.closeModal(); // TODO atualizar o reducer manualmente
  }

  async get(data) { // eslint-disable-line
    return API.get('v1/professores');
  }

  async afterGet({ data }) {
    this.reducer.set(data);
    this.template.updateList(data);
  }

  //   try {
  //     const professores = await API.get(endpoints.PROFESSORES, tableIDNames.PROFESSORES);
  //     const sorted = professores.sort((a, b) => a.nome.localeCompare(b.nome));
  //     ProfessoresReducer.set(sorted);
  //     updateTotal();
  //     updateTableProfessores(sorted);
  //     $('.tooltip').tooltipster(tooltipsterOptions);
  //   } catch (error) {
  //     console.error(error); // eslint-disable-line
  //     AJAX.defaultFail(error, pageIDNames.PROFESSORES);
  //   }
  //   AJAX.defaultAlways(tableIDNames.PROFESSORES);
  // }

  async post(data) { // eslint-disable-line
    return API.post('v1/professores', data);
  }

  async afterPost({ data }) {
    super.afterPost({ message: 'Professor criado com sucesso!' });

    console.log('afterpost professores', { data }); // eslint-disable-line
    await this.refresh(); // TODO atualizar o reducer manualmente
  }

  async put(data) { // eslint-disable-line
    return API.put('v1/professores', data);
  }

  async afterPut({ data }) {
    super.afterPut({ message: 'Professor atualizado com sucesso!' });

    console.log('afterput professores', { data }); // eslint-disable-line
    await this.refresh(); // TODO atualizar o reducer manualmente
  }

  async delete(id) { // eslint-disable-line
    return API.delete(`v1/professores/${id}`, null, { dataType: 'html' });
  }

  async afterDelete({ data }) {
    await super.afterDelete({ message: 'Professor removido com sucesso!' });

    console.log('afterdelete professor', { data }); // eslint-disable-line
    await this.refresh(); // TODO atualizar o reducer manualmente
  }
}

const HomeActions = new Actions({
  title: 'Home',
  template: HomeTemplate,
  reducer: HomeReducer,
});
