export class Api {
  constructor({address, headers, notAuthorizedHandler}) {
    this._address = address;
    this._headers = headers;
    this._notAuthorizedHandler = notAuthorizedHandler;
  }

  _handleResponse = (res) => {
    if (res.status === 401) {
      this._notAuthorizedHandler();
    }
    if (res.ok) {
      return res.json()
    } 
      return Promise.reject(`Ошибка: ${res.status}`)
  };

  getUserInfoApi() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(this._handleResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._handleResponse);
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(this._handleResponse);
  }

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(this._handleResponse)
  }

  updateUserAvatar(avatarLink) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
    .then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._handleResponse)
  }
}