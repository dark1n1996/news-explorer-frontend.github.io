import './articles.css';
import './images/favicon.png';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import Cookies from 'js-cookie'
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import moment from 'moment';


const headerName = document.querySelector('.header__name');

const articlesName = document.querySelector('.articles__found').querySelector('.articles__name');

const articlesNotFoundName = document.querySelector('.articles__not-found').querySelector('.articles__name');

const articlesNumber = document.querySelector('.articles__number');

const mainApiObj = new MainApi();

const headerObj = new Header(headerName, articlesName, articlesNotFoundName, articlesNumber);

const articlesList = document.querySelector('.articles-list');

const newsCardObj = new NewsCard(moment);

const newsCardlistObj = new NewsCardList(articlesList);

// login
mainApiObj.getUser()
.then(res => {
  if(res.status === 401) {
    document.location.href = './index.html';
  }
  return res.json();
}).then(data => {
  headerObj.render(data, data.user.name)
})

// logout
document.querySelector('.header__button_user').addEventListener('click', (e) => {
  Cookies.remove('jwt');
  window.location.reload();
  document.location.href = './index.html';
})

let array = [];

mainApiObj.getArticles().then(res => {
  return res.json();
}).then(data => {
  localStorage.setItem('savedArticles', JSON.stringify(data.articles));
  if(data.articles.length === 0) {
    document.querySelector('.articles__not-found').setAttribute('style', 'display: block');
    document.querySelector('.articles__found').setAttribute('style', 'display: none');
  }
  for(let article of data.articles) {
    array.push(article.keyword);
    newsCardlistObj.renderResults(newsCardObj.renderIcon(article));
    headerObj.renderArticlesNumber(data.articles.length);
  }
  let array2 = array.join(', ').toLowerCase().split(', ');
  let uniq = [...new Set(array2)];
  let str = array.join(', ').toLowerCase();
  let array3 = []
  for(let i = 0; i < uniq.length; i++) {
    array3.push([uniq[i].toUpperCase(), str.match(new RegExp(uniq[i], 'g')).length])
  }
  array3.sort(function(a, b) {
    return b[1] - a[1];
});
  if(array3.length === 3) {
    document.querySelector('.articles__key-word_first').textContent = array3[0][0] + ', ';
    document.querySelector('.articles__key-word_second').textContent = array3[1][0] + ', ';
    document.querySelector('.articles__key-word_third').textContent = array3[2][0];
  }
  if(array3.length === 2) {
    document.querySelector('.articles__key-word_first').textContent = array3[0][0] + ', ';
    document.querySelector('.articles__key-word_second').textContent = array3[1][0];
  }
  if(array3.length === 1) {
    document.querySelector('.articles__key-word_first').textContent = array3[0][0];
  }
  if(array3.length > 3) {
    document.querySelector('.articles__key-word_first').textContent = array3[0][0] + ', ';
    document.querySelector('.articles__key-word_second').textContent = array3[1][0] + ' и еще ';
    document.querySelector('.articles__key-word_third').textContent = ' ' + +(array3.length - 2);
  }
  document.addEventListener('click', (event) => {
    if(event.target.classList.contains('article__button_deleted')) {
      headerObj.renderArticlesNumber(data.articles.length - clicks);
      if(data.articles.length - clicks === 0) {
        document.querySelector('.articles__not-found').setAttribute('style', 'display: block');
        document.querySelector('.articles__found').setAttribute('style', 'display: none');
      }
      clicks++;
      let id = event.target.closest('.article').getAttribute('name');
      newsCardlistObj.deleteArticle(event);
      mainApiObj.deleteArticle(id).then((res) => {
        return res.json();
      }).then((data) => {

      })
    }
  })
})

let clicks = 1;





