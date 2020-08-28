export default class Header {
  constructor(headerUser, headerAutho, headerName, popupOpen, popupOpen2) {
    this.headerUser = headerUser;
    this.headerAutho = headerAutho;
    this.headerName = headerName;
    this.popupOpen = popupOpen;
    this.popupOpen2 = popupOpen2;
  }

  render(isLoggedIn, userName) {
    if (isLoggedIn) {
      this.headerUser.setAttribute('style', 'display: flex;');
      this.headerAutho.setAttribute('style', 'display: none');
      this.headerName.textContent = userName;
      this.popupOpen.remove();
      this.popupOpen2.querySelector('.popup__name').textContent = userName;
    } else {
      this.popupOpen2.remove();
    }
    return this.headerUser;
  }
}
