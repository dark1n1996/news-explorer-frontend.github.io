export default class Popap {
  constructor() {

  }

  open(event) {
    if (event.target.classList.contains('header__open')) {
      return document.querySelector('.popup__open2_active').classList.add('popup__open');
    }
  }

  close(event, status) {
    if (event.target.classList.contains('popup__close_white')) {
      event.target.closest('.popup').classList.remove('popup__open');
    }
  }
}
