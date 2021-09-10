export default class Header {
  static init(username) {
    Header.setUsername(username);
  }

  static setUsername(username = '') {
    document.getElementById('main-header__username').textContent = username;
  }
}