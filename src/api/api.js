class Api {

  constructor() {
    // this.baseUrl = 'http://localhost:3000/api/'
    this.baseUrl = 'https://чтояем.рф/api/'
  }


  findProductById(id) {
    return fetch(`${this.baseUrl}search/products/${id}`)
      .then((res) => { return this._getResponse(res) })
  }


  // поиск по "бренду" или "категории"
  findProductByBrandOrCategory(data, endpoint) {
    return fetch(`${this.baseUrl}search/products/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => { return this._getResponse(res) })
  }


  // "живой" поиск по подстроке
  findProductBySubstr(data) {
    return fetch(`${this.baseUrl}search/live/products/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => { return this._getResponse(res) })
  }


  // поиск по нажатию "Enter" или выбору варианта из выпадающего окна
  findProductBySubmit(data) {
    return fetch(`${this.baseUrl}search/products`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => { return this._getResponse(res) })
  }

  _getResponse(res) {

    if (!res.ok) {
      throw (new Error('res.ok <== undefined'))
    }
    return res.json()
  }
}

const api = new Api()

export default api