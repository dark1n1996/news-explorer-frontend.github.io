


export default class NewsCard {
  constructor(moment) {
    this.moment = moment;
  }
  renderIcon(articles, number) {
    const icon = `<div class="article" name="${number}">
    <div class="article__image" style="background-image: url(${articles.urlToImage})">
      <div class="article__autho">Войдите, чтобы сохранять статьи</div>
      <button class="button article__button"></button>
    </div>
    <div>
      <h4 class="article__date">${this.moment(articles.publishedAt).locale('ru').format("LL")}</h4>
      <h2 class="article__title">${articles.title}</h2>
      <p class="article__text">${articles.description}</p>
      <h3 class="article__source">${articles.source.name}</h3>
    </div>
  </div>`
  return icon;
  }
}