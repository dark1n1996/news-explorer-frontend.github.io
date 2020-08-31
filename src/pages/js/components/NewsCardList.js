export default class NewsCardList {
  constructor(container) {
    this.container = container;
  }

  renderResults(icon) {
    this.container.insertAdjacentHTML('afterbegin', icon);
  }

  deleteArticle(event) {
    event.target.closest('.article').remove();
  }
}
