class Api {

  constructor() {
    this.baseUrl = 'http://localhost:3000/api/'
    // this.baseUrl = 'https://чтояем.рф/api/'
  }

  getAllProducts() {
    return fetch(this.baseUrl)
      .then((res) => {
        return this._getResponse(res)
      })
  }


  findProductById(id) {
    return fetch(`${this.baseUrl}search/products/${id}`)
      .then((res) => { return this._getResponse(res) })
  }


  // "живой" поиск по подстроке
  findProductBySubstr(substr) {
    return fetch(`${this.baseUrl}search/products`, {
      method: 'POST',
      body: JSON.stringify({ substr }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => { return this._getResponse(res) })
  }

  // поиск по сабмиту или выбору варианта из списка
  findProductBySubmit(value) {
    return fetch(`${this.baseUrl}search/products`, {
      method: 'POST',
      body: JSON.stringify({ title: value.title }),
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