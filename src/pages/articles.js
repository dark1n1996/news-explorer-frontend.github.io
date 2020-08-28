import './articles.css';
import './images/favicon.png';
import moment from 'moment';
import Cookies from 'js-cookie';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import Popup from './js/components/Popup';
import {
  headerName, articlesName,
  articlesNotFoundName, articlesNumber,
  popupName, articlesList,
} from './js/constants/DOM';
import { IS_DEV, CONFIG } from './js/constants/const';

const mainApiObj = new MainApi(CONFIG);

const headerObj = new Header(headerName, articlesName,
  articlesNotFoundName, articlesNumber, popupName);

const newsCardObj = new NewsCard(moment);

const newsCardlistObj = new NewsCardList(articlesList);

const popupObj = new Popup();

let clicks = 1;

// login
mainApiObj.getUser()
  .then((res) => {
    if (res.status === 401) {
      document.location.href = './index.html';
    }
    return res.json();
  }).then((data) => {
    headerObj.render(data, data.user.name);
  });

// logout
document.querySelector('.popup__button_user').addEventListener('click', (e) => {
  Cookies.remove('jwt', { domain: IS_DEV ? 'localhost' : 'thenewsexplorer.tk' });
  window.location.reload();
  document.location.href = './index.html';
});

const array = [];

mainApiObj.getArticles().then((res) => res.json()).then((data) => {
  localStorage.setItem('savedArticles', JSON.stringify(data.articles));
  if (data.articles.length === 0) {
    document.querySelector('.articles__not-found').setAttribute('style', 'display: block');
    document.querySelector('.articles__found').setAttribute('style', 'display: none');
  }
  for (const article of data.articles) {
    array.push(article.keyword);
    newsCardlistObj.renderResults(newsCardObj.renderIcon(article));
    headerObj.renderArticlesNumber(data.articles.length);
  }
  const array2 = array.join(', ').toLowerCase().split(', ');
  const uniq = [...new Set(array2)];
  const str = array.join(', ').toLowerCase();
  const array3 = [];
  for (let i = 0; i < uniq.length; i++) {
    array3.push([uniq[i].toUpperCase(), str.match(new RegExp(uniq[i], 'g')).length]);
  }
  array3.sort((a, b) => b[1] - a[1]);
  if (array3.length === 3) {
    document.querySelector('.articles__key-word_first').textContent = `${array3[0][0]}, `;
    document.querySelector('.articles__key-word_second').textContent = `${array3[1][0]}, `;
    document.querySelector('.articles__key-word_third').textContent = `${array3[2][0]}`;
  }
  if (array3.length === 2) {
    document.querySelector('.articles__key-word_first').textContent = `${array3[0][0]}, `;
    document.querySelector('.articles__key-word_second').textContent = `${array3[1][0]}`;
  }
  if (array3.length === 1) {
    document.querySelector('.articles__key-word_first').textContent = `${array3[0][0]}`;
  }
  if (array3.length > 3) {
    document.querySelector('.articles__key-word_first').textContent = `${array3[0][0]}, `;
    document.querySelector('.articles__key-word_second').textContent = `${array3[1][0]} и еще `;
    document.querySelector('.articles__key-word_third').textContent = `${+(array3.length - 2)}`;
  }
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('article__button_deleted')) {
      headerObj.renderArticlesNumber(data.articles.length - clicks);
      if (data.articles.length - clicks === 0) {
        document.querySelector('.articles__not-found').setAttribute('style', 'display: block');
        document.querySelector('.articles__found').setAttribute('style', 'display: none');
      }
      clicks++;
      const id = event.target.closest('.article').getAttribute('name');
      newsCardlistObj.deleteArticle(event);
      mainApiObj.deleteArticle(id).then((res) => res.json()).then((data) => {

      });
    }
    popupObj.open(event);
    popupObj.close(event);
  });
});
