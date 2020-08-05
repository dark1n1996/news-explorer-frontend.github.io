export default class Popap {
  constructor() {

  }
  open(event) {
    if(event.target.classList.contains('header__button_autho')) {
      document.querySelector('.popup__signin_active').classList.add('popup__signin');
    }
  }
  close(event, status) {
    if(event.target.classList.contains('popup__close_signin')) {
      return document.querySelector('.popup__signin_active').classList.remove('popup__signin');
    }
    if(event.target.classList.contains('popup__span_signin')) {
      return document.querySelector('.popup__signin_active').classList.remove('popup__signin');
    }
    if(event.target.classList.contains('popup__span_signup')) {
      return document.querySelector('.popup__signup_active').classList.remove('popup__signup');
    }
    if(event.target.classList.contains('popup__close_signup')) {
      return document.querySelector('.popup__signup_active').classList.remove('popup__signup');
    }
    if(event.target.classList.contains('popup__close_success')) {
      return document.querySelector('.popup__success_active').classList.remove('popup__success');
    }
    if(event.target.classList.contains('popup__entry')) {
      return document.querySelector('.popup__success_active').classList.remove('popup__success');
    }
    if(status === 201 && event.target.classList.contains('popup__button_signup')) {
      return document.querySelector('.popup__signup_active').classList.remove('popup__signup');
    }
    if(status === 201 && event.target.classList.contains('popup__button_signin')) {
      return document.querySelector('.popup__signin_active').classList.remove('popup__signin');
    }
  }
  setContent(event, status) {
    if(event.target.classList.contains('popup__span_signin')) {
      return document.querySelector('.popup__signup_active').classList.add('popup__signup');
    }
    if(event.target.classList.contains('popup__span_signup')) {
      return document.querySelector('.popup__signin_active').classList.add('popup__signin');
    }
    if(event.target.classList.contains('popup__entry')) {
      return document.querySelector('.popup__signin_active').classList.add('popup__signin');
    }
    if(status === 201) {
      return document.querySelector('.popup__success_active').classList.add('popup__success');
    }
  }

}