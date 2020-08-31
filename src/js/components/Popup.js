export default class Popap {
  constructor(popupSigninActive, popupSignupActive, popupOpenOne,
    popupOpenTwo, popupSuccessActive) {
    this.popupSigninActive = popupSigninActive;
    this.popupSignupActive = popupSignupActive;
    this.popupOpenOne = popupOpenOne;
    this.popupOpenTwo = popupOpenTwo;
    this.popupSuccessActive = popupSuccessActive;
  }

  open(event) {
    if (event.target.classList.contains('header__button_autho') || event.target.classList.contains('popup__button_res')) {
      return this.popupSigninActive.classList.add('popup__signin');
    }
    if (event.target.classList.contains('header__open') && document.querySelector('.popup__open_active')) {
      return this.popupOpenOne.classList.add('popup__open');
    }
    if (event.target.classList.contains('header__open') && document.querySelector('.popup__open2_active')) {
      return this.popupOpenTwo.classList.add('popup__open');
    }
  }

  close(event, status) {
    if (event.target.classList.contains('popup__close_signin')) {
      return this.popupSigninActive.classList.remove('popup__signin');
    }
    if (event.target.classList.contains('popup__span_signin')) {
      return this.popupSigninActive.classList.remove('popup__signin');
    }
    if (event.target.classList.contains('popup__span_signup')) {
      return this.popupSignupActive.classList.remove('popup__signup');
    }
    if (event.target.classList.contains('popup__close_signup')) {
      return this.popupSignupActive.classList.remove('popup__signup');
    }
    if (event.target.classList.contains('popup__close_success')) {
      return this.popupSuccessActive.classList.remove('popup__success');
    }
    if (event.target.classList.contains('popup__entry')) {
      return this.popupSuccessActive.classList.remove('popup__success');
    }
    if (event.target.classList.contains('popup__close_white')) {
      event.target.closest('.popup').classList.remove('popup__open');
    }
    if (event.target.classList.contains('popup__button_res')) {
      return this.popupOpenOne.classList.remove('popup__open');
    }
    if (status === 201) {
      return this.popupSignupActive.classList.remove('popup__signup');
    }
    if (status === 200) {
      return this.popupSigninActive.classList.remove('popup__signin');
    }
  }

  setContent(event, status) {
    if (event.target.classList.contains('popup__span_signin')) {
      return this.popupSignupActive.classList.add('popup__signup');
    }
    if (event.target.classList.contains('popup__span_signup')) {
      return this.popupSigninActive.classList.add('popup__signin');
    }
    if (event.target.classList.contains('popup__entry')) {
      return this.popupSigninActive.classList.add('popup__signin');
    }
    if (status === 201) {
      return this.popupSuccessActive.classList.add('popup__success');
    }
  }

  clearContent(status, formSignupElement, formSigninElement) {
    if (status === 200 || status === 201) {
      formSigninElement.email.value = '';
      formSigninElement.password.value = '';
      formSignupElement.email.value = '';
      formSignupElement.password.value = '';
      formSignupElement.name.value = '';
    }
  }
}
