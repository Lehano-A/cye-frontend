import img1 from './../images/hrutka.png'
import img2 from './../images/hrutka.png'
import img3 from './../images/hrutka-vanil.png'
import img4 from './../images/moloko.png'
import img5 from './../images/gerkules.png'
import img6 from './../images/tvorojok.png'
import img7 from './../images/icecream.png'

class Api {

  constructor() {
    this.baseUrl = 'http://localhost:3000'
    this.foundProducts = [
      {
        title: 'Сухой завтрак Хрутка шоколадные шарики',
        id: 'zds42fdsfs42',
        image: img1,
        composition: 'Пшеница (содержит глютен), сахар, крупа кукурузная, какао-порошок алкализованный, карбонат кальция, масло подсолнечное, соль, ароматизатор натуральный (ваниль), карамельный сироп.',
        nutritionalValue: {
          protein: 24, fats: 12, carbs: 78, calories: 241
        }
      },
      {
        title: 'Сухой завтрак Хрутка ванильные, банановые и шоколадные шарики',
        id: 'fsxjsd25fdsgh',
        image: img2,
        composition: 'Пшеница (содержит глютен), сахар, крупа кукурузная, какао-порошок алкализованный, карбонат кальция, масло подсолнечное, соль, ароматизатор натуральный (ваниль), карамельный сироп.',
        nutritionalValue: {
          protein: 23, fats: 13, carbs: 75, calories: 238
        }
      },
      {
        title: 'Сухой завтрак Хрутка ванильные шарики',
        id: 'ywetj432er96gd',
        image: img3,
        composition: 'Пшеница (содержит глютен), сахар, крупа кукурузная, пшеничная мука (содержит глютен), рисовая крупа, патока, масло подсолнечное, какао-порошок алкализованный, карбонат кальция, молоко сухое обезжиренное, соль, эмульгатор (лецитины), ароматизаторы натуральные, карамельный сироп.',
        nutritionalValue: {
          protein: 23, fats: 15, carbs: 80, calories: 243
        }
      },
      {
        title: 'Молоко 3,5% ультрапастеризованное 925 мл Домик в Деревне БЗМЖ',
        id: 'ytjfdsfdsds43d',
        image: img4,
        composition: 'Молоко нормализованное.',
        nutritionalValue: {
          protein: 2.9, fats: 3.5, carbs: 4.7, calories: 62
        }
      },
      {
        title: 'Хлопья Русский Продукт Геркулес Детский',
        id: 'ytj432qwxw32er96gd',
        image: img5,
        composition: 'Овсяные хлопья.',
        nutritionalValue: {
          protein: 12, fats: 6, carbs: 51, calories: 310
        }
      },
      {
        title: 'Творожок Простоквашино клубника-земляника 3,6% БЗМЖ',
        id: 'ytj432er96gsdfd',
        image: img6,
        composition: 'Творог обезжиренный, нормализованные сливки, наполнитель (клубника; сахарный сироп; вода; сахар; крахмал кукурузный; пюре земляники; натуральный ароматизатор; стабилизатор - пектины; концентрированные соки красной свеклы и лимона; краситель - кармины), сахар.',
        nutritionalValue: {
          protein: 6.1, fats: 3.6, carbs: 12.9, calories: 108
        }
      },
      {
        title: 'Мороженое пломбир Monterra ваниль БЗМЖ',
        id: 'ytj432322478fger96gd',
        image: img7,
        composition: 'Сливки натуральные, молоко коровье цельное, глюкозный сироп, сахар, молоко сухое обезжиренное, глюкоза, эмульгатор моно- и диглицериды жирных кислот, стабилизаторы: гуаровая камедь, камедь рожкового дерева; ароматизатор, сахар жженный карамелизованный, семена ванили.',
        nutritionalValue: {
          protein: 3.4, fats: 14.4, carbs: 27, calories: 251
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