import img1 from './../images/hrutka.webp'
import img2 from './../images/hrutka.webp'
import img3 from './../images/hrutka-vanil.png'

class Api {

  constructor() {
    this.baseUrl = 'http://localhost:3000'
    this.foundProducts = [
      {
        'title': 'Сухой завтрак Хрутка шоколадные шарики',
        id: 'zds42fdsfs42',
        image: img1,
        description: 'Пшеница (содержит глютен), сахар, крупа кукурузная, какао-порошок алкализованный, карбонат кальция, масло подсолнечное, соль, ароматизатор натуральный (ваниль), карамельный сироп.',
        nutritionalValue: {
          protein: 24, fats: 12, carbs: 78, calories: 241
        }
      },
      {
        'title': 'Сухой завтрак Хрутка ванильные, банановые и шоколадные шарики',
        id: 'fsxjsd25fdsgh',
        image: img2,
        description: 'Пшеница (содержит глютен), сахар, крупа кукурузная, какао-порошок алкализованный, карбонат кальция, масло подсолнечное, соль, ароматизатор натуральный (ваниль), карамельный сироп.',
        nutritionalValue: {
          protein: 23, fats: 13, carbs: 75, calories: 238
        }
      },
      {
        'title': 'Сухой завтрак Хрутка ванильные шарики',
        id: 'ytj432er96gd',
        image: img3,
        description: 'Пшеница (содержит глютен), сахар, крупа кукурузная, пшеничная мука (содержит глютен), рисовая крупа, патока, масло подсолнечное, какао-порошок алкализованный, карбонат кальция, молоко сухое обезжиренное, соль, эмульгатор (лецитины), ароматизаторы натуральные, карамельный сироп.',
        nutritionalValue: {
          protein: 23, fats: 15, carbs: 80, calories: 243
        }
      },

    ]
  }

  getProducts() {
    return fetch(this.baseUrl)
      .then((res) => { return this._getResponse(this.foundProducts) })
      .then((res) => { return res })
  }

  _getResponse(res) {
    if (res.ok === undefined) {
      return res
    }
    return res.json()
  }
}

const api = new Api()

export default api