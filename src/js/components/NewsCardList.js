export default class NewsCardList {
  constructor(container, preloader, results, notFound, articlesButton) {
    this.container = container;
    this.preloader = preloader;
    this.results = results;
    this.notFound = notFound;
    this.articlesButton = articlesButton;
  }
  renderResults(icon) {
    this.results.setAttribute('style', 'display: block;');
    this.container.insertAdjacentHTML('beforeend', icon);
  }
  clearResults() {
    this.notFound.setAttribute('style', 'display: none;');
    this.results.setAttribute('style', 'display: none;');
    if(document.querySelector('.article')) {
      while (this.container.querySelector('.article')) {
        this.container.removeChild(document.querySelector('.article'));
      }
    }
  }
  clearShowMore() {
    this.articlesButton.setAttribute('style', 'display: none;')
  }
  showMore() {
    this.articlesButton.setAttribute('style', 'display: block;')
  }
  renderLoader() {
    this.preloader.setAttribute('style', 'display: flex;');
  }
  clearLoader() {
    this.preloader.removeAttribute('style');
  }
  renderNotFound() {
    this.notFound.setAttribute('style', 'display: flex;')
  }
}