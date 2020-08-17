export default class NewsCard {
  constructor(moment) {
    this.moment = moment;
  }
  renderIcon(article) {
    const icon = `<div class="article" name="${article._id}">
    <div class="article__container">
      <a href="${article.link}" target="_blank"><img class="article__image" src="${article.image}"></a>
      <div class="article__key-word">${article.keyword}</div>
      <div class="article__delete">Убрать из сохранённых</div>
      <button class="button article__button article__button_deleted"></button>
    </div>
    <div>
      <h4 class="article__date">${this.moment(article.date).locale('ru').format("LL")}</h4>
      <h2 class="article__title">${article.title}</h2>
      <p class="article__text">${article.text}</p>
      <h3 class="article__source">${article.source}</h3>
    </div>
  </div>`;
  return icon;
  }
}

