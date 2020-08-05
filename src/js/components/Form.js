export default class Form {
  constructor(errors, api, signupForm, signinForm) {
    this.errors = errors;
    this.api = api;
    this.signupForm = signupForm;
    this.signinForm = signinForm;
  }
  _validateInputElement(input, errorPlace) {
    if (input.validity.valueMissing) {
      return errorPlace.textContent = this.errors.requiredText;
    }
    if (input.validity.typeMismatch) {
      return errorPlace.textContent = this.errors.requiredEmail;
    }
    if (input.name === 'password' && input.validity.tooShort) {
      return errorPlace.textContent = this.errors.validationLengthPass;
    }
    if (input.name === 'name' && input.validity.tooShort) {
      return errorPlace.textContent = this.errors.validationLengthName;
    }
    if (input.name === 'name' && input.validity.tooLong) {
      return errorPlace.textContent = this.errors.validationLengthName;
    }
    return errorPlace.textContent = '';
  }
  _validateForm(form, button) {
    button.disabled = !form.checkValidity();
    if(form.checkValidity()) {
      button.classList.remove('popup__button_disabled');
    } else {
      button.classList.add('popup__button_disabled');
    }
  }
  _getInfo() {
    return {
      signupEmail: this.signupForm.elements.email.value,
      signupName: this.signupForm.elements.name.value,
      signupPassword: this.signupForm.elements.password.value,
    }
  }
  setEventListerners(form) {
    const button = form.querySelector('.popup__button');
    form.addEventListener('input', (e) => {
      this._validateInputElement(e.target, e.target.closest('div').querySelector('.popup__error'));
      this._validateForm(form, button);
    })
  }
  setServerError(errBlock, err) {
    errBlock.textContent = err;
  }
}