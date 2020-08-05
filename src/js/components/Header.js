export default class Header {
  constructor(headerUser, headerAutho, headerName) {
    this.headerUser = headerUser;
    this.headerAutho = headerAutho;
    this.headerName = headerName;
  }
  render(isLoggedIn, userName) {
    if(isLoggedIn) {
      this.headerUser.setAttribute('style', 'display: flex;');
      this.headerAutho.setAttribute('style', 'display: none');
      this.headerName.textContent = userName;
    }
    return this.headerUser;
  }
}