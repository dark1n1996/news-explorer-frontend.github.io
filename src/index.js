import './style.css';
import Cookies from 'js-cookie';
import moment from 'moment';
import img from './images/image-03.png';
import favicon from './images/favicon.png';
import Popap from './js/components/Popup';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import {
  VALIDATION_ERRORS, IS_DEV, CONFIG, NOW, SEVEN_DAYS_AGO, API_KEY, PIC,
} from './js/constants/const';

import {
  popupSigninActive, popupSignupActive, popupSigninForm,
  popupSignupForm, searchForm, headerUser, headerAutho, headerName,
  articlesList, preloader, articles, notFound, articlesButton,
  popupOpen, popupOpen2, popupSuccessActive,
} from './js/constants/DOM';

let clicks = 1;

const mainApiObj = new MainApi(CONFIG);

const headerObj = new Header(headerUser, headerAutho, headerName, popupOpen, popupOpen2);

const popupObj = new Popap(popupSigninActive, popupSignupActive,
  popupOpen, popupOpen2, popupSuccessActive);

const newsApiObj = new NewsApi(API_KEY, SEVEN_DAYS_AGO, NOW, 100);

const newsCardObj = new NewsCard(moment);

const newsCardlistObj = new NewsCardList(articlesList, preloader,
  articles, notFound, articlesButton);

const formObj = new Form(VALIDATION_ERRORS, mainApiObj, popupSignupForm, popupSigninForm);

formObj.setEventListeners(document.querySelector('.popup__signin_active').querySelector('form'));

formObj.setEventListeners(document.querySelector('.popup__signup_active').querySelector('form'));

popupSignupForm.addEventListener('submit', (event) => {
  mainApiObj.signup(popupSignupForm.elements.email.value,
    popupSignupForm.elements.password.value, popupSignupForm.elements.name.value)
    .then((res) => {
      if (res.ok) {
        popupObj.close(event, res.status);
        popupObj.setContent(event, res.status);
        popupObj.clearContent(res.status, popupSignupForm.elements, popupSigninForm.elements);
      }
      if (res.status === 409) {
        return Promise.reject('Пользователь с такой электронной почтой уже существует');
      }
      if (res.status === 500) {
        return Promise.reject('Ошибка на сервере');
      }
      return res.json();
    })
    .catch((err) => {
      formObj.setServerError(popupSignupForm.querySelector('.popup__error_server'), err);
    });
  event.preventDefault();
});

popupSigninForm.addEventListener('submit', (event) => {
  mainApiObj.signin(popupSigninForm.elements.email.value, popupSigninForm.elements.password.value)
    .then((res) => {
      if (res.ok) {
        popupObj.close(event, res.status);
        popupObj.clearContent(res.status, popupSignupForm.elements, popupSigninForm.elements);
      }
      if (res.status === 401) {
        return Promise.reject('Неправильные почта или пароль');
      }
      if (res.status === 500) {
        return Promise.reject('Ошибка на сервере');
      }
      return res.json();
    })
    .then((data) => {
      headerObj.render(true, data.name);
    })
    .catch((err) => {
      formObj.setServerError(popupSigninForm.querySelector('.popup__error_server'), err);
    });
  event.preventDefault();
});

// login
mainApiObj.getUser().then((res) => {
  if (res.status === 500) {
    return Promise.reject('Ошибка на сервере');
  }
  if (res.status === 404) {
    return Promise.reject('Ошибка 404');
  }
  if (res.status === 401) {
    return Promise.reject('Требуется аутентификация');
  }
  return res.json();
}).then((data) => {
  headerObj.render(data, data.user.name);
}).catch((err) => err);

// logout
document.querySelector('.header__button_user').addEventListener('click', (e) => {
  Cookies.remove('jwt', { domain: IS_DEV ? 'localhost' : 'thenewsexplorer.tk' });
  window.location.reload();
});

document.querySelector('.popup__button_user').addEventListener('click', (e) => {
  Cookies.remove('jwt', { domain: IS_DEV ? 'localhost' : 'thenewsexplorer.tk' });
  window.location.reload();
});

document.addEventListener('click', (event) => {
  // реализация попапов
  popupObj.close(event);
  popupObj.open(event);
  popupObj.setContent(event);

  if (event.target.classList.contains('search__button')) {
    event.preventDefault();
    newsCardlistObj.showMore();
    clicks = 1;
    const searchValue = searchForm.elements.search.value;
    localStorage.setItem('keyWord', searchValue);
    // Вытаскиваем данные с сервера
    newsApiObj.getNews(searchValue).then((res) => {
      // Если все ок, ставим лоадер
      if (res.ok) {
        newsCardlistObj.renderLoader();
      }
      if (res.status === 400) {
        return Promise.reject('Необходимо ввести ключевое слово');
      }
      return res.json();
    }).then((data) => {
      // Отрисовываем первые три карточки
      newsCardlistObj.clearResults();
      new Promise((resolve, reject) => {
        // Таймаут на прогрузку лоадера
        setTimeout(() => {
          newsCardlistObj.clearLoader();
          resolve(data);
          reject('Что-то пошло не так');
        }, 1000);
      }).then((data) => {
        localStorage.setItem('data', JSON.stringify(data));
        if (data.articles.length === 0) {
          newsCardlistObj.renderNotFound();
        } else if (data.articles.length <= 3) {
          newsCardlistObj.clearShowMore();
        }
        for (let i = 0; i <= 2; i++) {
          newsCardlistObj.renderResults(newsCardObj.renderCard(data.articles[i], i));
        }
      }).catch((err) => err);
    }).catch((err) => {
      formObj.setServerError(searchForm.querySelector('.popup__error_server'), err);
    });
  }
  // Отрисовываем по три карточки при нажатии кнопки "Показать еще"
  if (event.target.classList.contains('articles__button')) {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data.articles.length - 3 * clicks < 4) {
      for (let i = 3 * clicks; i < data.articles.length; i++) {
        newsCardlistObj.renderResults(newsCardObj.renderCard(data.articles[i], i));
      }
      newsCardlistObj.clearShowMore();
    } else {
      for (let i = 3 * clicks; i < 3 * (clicks + 1); i++) {
        newsCardlistObj.renderResults(newsCardObj.renderCard(data.articles[i], i));
      }
      newsCardlistObj.showMore();
    }
    clicks++;
  }
  // Сохраняем карточки по нажатию кнопки
  if (event.target.classList.contains('article__button')) {
    const data = JSON.parse(localStorage.getItem('data'));
    const article = data.articles[event.target.closest('.article').getAttribute('name')];
    if (!article.urlToImage || article.urlToImage === 'https: ') {
      article.urlToImage = PIC;
    }
    mainApiObj.createArticle(localStorage.getItem('keyWord'), article.title, article.description, article.publishedAt, article.source.name, article.url, article.urlToImage)
      .then((res) => {
        if (res.status === 401) {
          if (event.target.classList.contains('article__button')) {
            event.target.closest('div').querySelector('.article__autho').setAttribute('style', 'display: block;');
          }
        }
        if (res.ok) {
          event.target.classList.add('article__button_saved');
        }
        if (!res.ok) {
          return Promise.reject('Произошла ошибка');
        }
        return res.json();
      }).catch((err) => err);
  }
});
