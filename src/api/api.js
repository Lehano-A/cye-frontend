class Api {

  constructor() {
    this.baseUrl = 'http://чтояем.рф/api/'
  }

  getAllProducts() {
    return fetch(this.baseUrl)
      .then((res) => {
        return this._getResponse(res)
      })
  }


  findProductById(id) {
    return fetch(`${this.baseUrl}products/${id}`)
      .then((res) => { return this._getResponse(res) })
  }


  findProductBySubstr(substr) {
    return fetch(`${this.baseUrl}products`, {
      method: 'POST',
      body: JSON.stringify({ substr }),
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