export default class NewsCard {
  constructor(moment) {
    this.moment = moment;
  }

  renderCard(articles, number) {
    if (!articles.urlToImage) {
      articles.urlToImage = 'https://sun9-53.userapi.com/t3ndc0TC2iy0Q8QiN0iD_xz82mVHSnBNMAi-eg/12oItprDwDk.jpg';
    }
    const icon = `<div class="article" name="${number}">
    <div class="article__container">
      <a href="${articles.url}" target="_blank"><img class="article__image" src="${articles.urlToImage}" alt="Тут должно быть изображение"></a>
      <div class="article__autho">Войдите, чтобы сохранять статьи</div>
      <button class="button article__button"></button>
    </div>
    <div>
      <h4 class="article__date">${this.moment(articles.publishedAt).locale('ru').format('LL')}</h4>
      <h2 class="article__title">${articles.title}</h2>
      <p class="article__text">${articles.description}</p>
      <h3 class="article__source">${articles.source.name}</h3>
    </div>
  </div>`;
    return icon;
  }
}
