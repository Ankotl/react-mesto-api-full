import { BASE_URL } from "./auth";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} - ${res.statusText}`);
    }
  }

  getUserInfo() {
    const requestUrl = this._baseUrl + "/users/me";
    return fetch(requestUrl, { headers: this._getHeaders() }).then(
      this._checkResponse
    );
  }

  getInitialCards() {
    const requestUrl = this._baseUrl + "/cards";
    return fetch(requestUrl, { headers: this._getHeaders() }).then(
      this._checkResponse
    );
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateUserInfo(body) {
    const requestUrl = this._baseUrl + "/users/me";
    return fetch(requestUrl, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  addNewCard(body) {
    const requestUrl = this._baseUrl + "/cards";
    return fetch(requestUrl, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    const requestUrl = this._baseUrl + `/cards/${cardId}`;
    return fetch(requestUrl, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  addLikeCard(cardId) {
    const requestUrl = this._baseUrl + `/cards/${cardId}/likes`;
    return fetch(requestUrl, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  deleteLikeCard(cardId) {
    const requestUrl = this._baseUrl + `/cards/${cardId}/likes`;
    return fetch(requestUrl, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, status) {
    if (status) {
      return this.addLikeCard(cardId);
    } else {
      return this.deleteLikeCard(cardId);
    }
  }

  updateAvatar(body) {
    const requestUrl = this._baseUrl + "/users/me/avatar";
    return fetch(requestUrl, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export default api;
