export default class MainApi {
  constructor() {

  }

  _getRequestUser(url, method) {
    return fetch(url, {
      method,
      credentials: 'include',
    })
  }
  _getRequestArticles(url, method) {
    return fetch(url, {
      method,
      credentials: 'include',
    })
  }
  _deleteRequestArticle(url, method, id) {
    return fetch(url, {
      method,
      credentials: 'include',
      body: {
        id,
      }
    })
  }
  getUser(){
    return this._getRequestUser('http://localhost:3000/users/me', 'GET');
  }
  getArticles(){
    return this._getRequestArticles('http://localhost:3000/articles', 'GET')
  }
  deleteArticle(id){
    return this._deleteRequestArticle(`http://localhost:3000/articles/${id}`, 'DELETE')
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