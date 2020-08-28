export default class NewsApi {
  constructor(apiKey, sevenDaysAgo, now, pageSize) {
    this.apiKey = apiKey;
    this.sevenDaysAgo = sevenDaysAgo;
    this.now = now;
    this.pageSize = pageSize;
  }

  getNews(keyWord) {
    return fetch(`https://nomoreparties.co/news/v2/everything?q=${keyWord}&from=${this.sevenDaysAgo}&to=${this.now}&sortBy=publishedAt&pageSize=${this.pageSize}&apiKey=${this.apiKey}`);
  }
}
