export default class Header {
  constructor(headerName, articlesName, articlesNotFoundName, articlesNumber, popupName) {
    this.headerName = headerName;
    this.articlesName = articlesName;
    this.articlesNotFoundName = articlesNotFoundName;
    this.articlesNumber = articlesNumber;
    this.popupName = popupName;
  }

  render(isLoggedIn, userName) {
    if (isLoggedIn) {
      this.headerName.textContent = userName;
      this.articlesName.textContent = userName;
      this.articlesNotFoundName.textContent = userName;
      this.popupName.textContent = userName;
    }
  }

  renderKeyWords() {

  }

  renderArticlesNumber(number) {
    this.articlesNumber.textContent = number;
  }
}
