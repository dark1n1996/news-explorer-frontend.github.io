import './style.css';
import img from './images/image-03.png';
import favicon from './images/favicon.png';
import Popap from './js/components/Popup';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import moment from 'moment';
import Cookies from 'js-cookie'

// В components/const
const validationErors = {
  validationLengthPass: 'Должно быть не менее 8 символов',
  validationLengthName: 'Должно быть от 2 до 30 символов',
  requiredText: 'Это обязательное поле',
  requiredEmail: 'Здесь должна быть электронная почта'
}

let now = moment().format("YYYY-MM-DD");

let sevenDaysAgo = moment().subtract(7, 'days').format("YYYY-MM-DD");

let clicks = 1;

const apiKey = 'b05767e2ad9f4d7cb8ee6cf778e5cfb4';

const popupSignupForm = document.querySelector('.popup__signup_active').querySelector('.popup__form');

const popupSigninForm = document.querySelector('.popup__signin_active').querySelector('.popup__form');

const searchForm = document.querySelector('.search__form');

const headerUser = document.querySelector('.header__user');

const headerAutho = document.querySelector('.header__autho');

const headerName = document.querySelector('.header__name');

const articlesList = document.querySelector('.articles-list');

const preloader = document.querySelector('.preloader');

const articles = document.querySelector('.articles');

const notFound = document.querySelector('.not-found');

const articlesButton = document.querySelector('.articles__button');

const articleButton = document.querySelector('.article__button');

const mainApiObj = new MainApi();

const headerObj = new Header(headerUser, headerAutho, headerName);

const popupObj = new Popap();

const newsApiObj = new NewsApi(apiKey, sevenDaysAgo, now, 7);

const newsCardObj = new NewsCard(moment);

const newsCardlistObj = new NewsCardList(articlesList, preloader, articles, notFound, articlesButton);

const formObj = new Form (validationErors, mainApiObj, popupSignupForm, popupSigninForm);

formObj.setEventListerners(document.querySelector('.popup__signin_active').querySelector('form'));

formObj.setEventListerners(document.querySelector('.popup__signup_active').querySelector('form'));

popupSignupForm.addEventListener('submit', (e) => {
  mainApiObj.signup(popupSignupForm.elements.email.value, popupSignupForm.elements.password.value, popupSignupForm.elements.name.value)
  .then((res) => {
    if(res.ok) {
      popupObj.close(e, res.status);
      popupObj.setContent(e, res.status);
      popupObj.clearContent(res.status, popupSignupForm.elements, popupSigninForm.elements);
    }
    if(res.status === 409) {
      return Promise.reject(`Пользователь с такой электронной почтой уже существует`);
    }
    if(res.status === 500) {
      return Promise.reject(`Ошибка на сервере`);
    }
    return res.json();
  })
  .catch((err) => {
    formObj.setServerError(popupSignupForm.querySelector('.popup__error_server'), err);
  })
  e.preventDefault();
})

popupSigninForm.addEventListener('submit', (event) => {
  mainApiObj.signin(popupSigninForm.elements.email.value, popupSigninForm.elements.password.value)
  .then((res) => {
    if(res.ok) {
      popupObj.close(event, res.status);
      popupObj.clearContent(res.status, popupSignupForm.elements, popupSigninForm.elements);
    }
    if(res.status === 401) {
      return Promise.reject('Неправильные почта или пароль');
    }
    if(res.status === 500) {
      return Promise.reject(`Ошибка на сервере`);
    }
    return res.json();
  })
  .then((data) => {
    headerObj.render(true, data.name);
  })
  .catch((err) => {
    formObj.setServerError(popupSigninForm.querySelector('.popup__error_server'), err);
  })
  event.preventDefault();
})

// login
mainApiObj.getUser()
.then(res => {
  return res.json()
}).then(data => {
  headerObj.render(data, data.user.name)
})

// logout
document.querySelector('.header__button_user').addEventListener('click', (e) => {
  Cookies.remove('jwt');
  window.location.reload();
})

document.addEventListener('click', (event) => {
  // реализация попапов
  popupObj.close(event);
  popupObj.open(event);
  popupObj.setContent(event);

  if(event.target.classList.contains('search__button')) {
    event.preventDefault();
    newsCardlistObj.showMore();
    clicks = 1;
    let searchValue = searchForm.elements.search.value;
    localStorage.setItem("keyWord", searchValue);
    // Вытаскиваем данные с сервера
    newsApiObj.getNews(searchValue).then((res) => {
      // Если все ок, ставим лоадер
      if(res.ok) {
        newsCardlistObj.renderLoader();
      }
      if(res.status === 400) {
        return Promise.reject(`Необходимо ввести ключевое слово`);
      }
      return res.json();
    }).then((data) => {
      // Отрисовываем первые три карточки
      newsCardlistObj.clearResults();
      new Promise((resolve, reject) => {
        // Таймаут на прогрузку лоадера
        setTimeout(function() {
          newsCardlistObj.clearLoader();
          resolve(data);
        }, 1000)
      }).then(data => {
        localStorage.setItem('data', JSON.stringify(data))
        if(data.articles.length === 0) {
          newsCardlistObj.renderNotFound();
        } else if(data.articles.length <= 3) {
          newsCardlistObj.clearShowMore();
        }
        for (let i = 0; i <= 2; i++) {
          newsCardlistObj.renderResults(newsCardObj.renderIcon(data.articles[i], i));
        }
      })
    }).catch((err) => {
      formObj.setServerError(searchForm.querySelector('.popup__error_server'), err);
    })
  }
  // Отрисовываем по три карточки при нажатии кнопки "Показать еще"
  if(event.target.classList.contains('articles__button')) {
    let data = JSON.parse(localStorage.getItem('data'));
    if(data.articles.length - 3 * clicks < 4) {
      for (let i = 3 * clicks; i < data.articles.length; i++) {
        newsCardlistObj.renderResults(newsCardObj.renderIcon(data.articles[i], i));
      }
      newsCardlistObj.clearShowMore();
     } else {
       for (let i = 3 * clicks; i < 3 * (clicks + 1); i++) {
        newsCardlistObj.renderResults(newsCardObj.renderIcon(data.articles[i], i));
      }
      newsCardlistObj.showMore();
    }
    console.log(clicks, data.articles.length - 3 * clicks, data.articles.length - 3 * clicks < 4)
    clicks++;
  }
  // Сохраняем карточки по нажатию кнопки
  if(event.target.classList.contains('article__button')) {
    let data = JSON.parse(localStorage.getItem('data'));
    let article = data.articles[event.target.closest('.article').getAttribute('name')];
    if(!article.urlToImage || article.urlToImage === 'https: ') {
      article.urlToImage = 'https://sun9-53.userapi.com/t3ndc0TC2iy0Q8QiN0iD_xz82mVHSnBNMAi-eg/12oItprDwDk.jpg';
    }
    mainApiObj.createArticle(localStorage.getItem('keyWord'), article.title, article.description, article.publishedAt, article.source.name, article.url, article.urlToImage)
    .then(res => {
      if(res.status === 401) {
        if(event.target.classList.contains('article__button')) {
          event.target.closest('div').querySelector('.article__autho').setAttribute('style', 'display: block;');
        }
      }
      if(res.ok) {
        event.target.classList.add('article__button_saved');
      }
    })
    .then(data => {
      console.log(data);
    })
  }
})





