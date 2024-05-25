class Api {

  constructor() {
    this.baseUrl = 'https://чтояем.рф/api/'
  }



  // поиск по бренду, категории или тексту
  findProduct = (querySearchParams, segmentSearch) => {
    return fetch(`${this.baseUrl}search/products${segmentSearch ? `/${segmentSearch}` : '/'}?${querySearchParams}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => { return this._getResponse(res) })
  }



  // "живой" поиск по подстроке
  findProductBySubstr = (querySearchParams) => {
    return fetch(`${this.baseUrl}search/live/products/?${querySearchParams}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => { return this._getResponse(res) })
  }



  // поиск по permalink названия продукта
  findProductByTitlePermalink = (querySearchParams) => {
    return fetch(`${this.baseUrl}search/products/permalink/?${querySearchParams}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
    )
      .then((res) => { return this._getResponse(res) })
  }



  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.json())
    }
    return res.json()
  }
}


const api = new Api()

export default api