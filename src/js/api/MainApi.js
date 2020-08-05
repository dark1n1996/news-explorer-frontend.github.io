export default class MainApi {
  constructor() {

  }
  _postRequestSignup(url, method, email, password, name) {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
  }
  _postRequestSignin(url, method, email, password) {
    return fetch(url, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  }
  _getRequestUser(url, method) {
    return fetch(url, {
      method,
      credentials: 'include',
    })
  }
  _postRequestCreateArticle(url, method, keyword, title, text, date, source, link, image) {
    return fetch(url, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword, title, text, date, source, link, image,
      }),
    })
  }
  signup(email, password, name){
    return this._postRequestSignup('http://localhost:3000/signup', 'POST', email, password, name);
  }
  signin(email, password){
    return this._postRequestSignin('http://localhost:3000/signin', 'POST', email, password);
  }
  getUser(){
    return this._getRequestUser('http://localhost:3000/users/me', 'GET');
  }
  createArticle(keyword, title, text, date, source, link, image){
    return this._postRequestCreateArticle('http://localhost:3000/articles', 'POST', keyword, title, text, date, source, link, image)
  }
}





    /*.then((res) => {
      console.log(res.status)
      if(res.status === 409) {
        return Promise.reject(`Пользователь с такой электронной почтой уже существует`);
      }
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка на сервере`);
    })
    .then((data) => {
      console.log(data)
    })
    .catch(err => console.log(err))*/