import logLevel from "loglevel";
import { BRAND, CATEGORY, CONSTRUCTION_LOCATION_CONFIG, PERMALINK, START_URN_SEARCH_PRODUCT, TEXT } from "../constants"

const log = logLevel.getLogger(CONSTRUCTION_LOCATION_CONFIG)



/*
   Сюда могут придти данные в виде:
    1) распарсенных параметров поисковой строки (OpenedModalProductPage)
       - это означает, что permalink не будет иметь ключей
    2) стандартные данные из ответа сервера
       - permalink будет иметь ключ
 */
function createPathname(data) {
  log.debug(`
  Была вызвана функция: createPathname

  data: `, data);

  if (data === null) {
    return window.location.pathname
  }

  if (data === '/') {
    return '/'
  }

  const { brokenURI = null } = data
  const processedPathnameData = preparePathnameData(data)
  const {
    searchBy = null,
    permalink = null,
    links: titlePermalink = null,
  } = processedPathnameData

  let resultURN
  const startURN = START_URN_SEARCH_PRODUCT


  if (permalink) { // если есть permalink
    const { brand = null, category = null } = permalink;

    // для модала продукта
    if ((brand && category) || brokenURI) {
      resultURN = startURN.concat(`brand/${brand}/category/${category}/`)

      if (titlePermalink && !brokenURI) { // если есть ещё и 'permalink названия продукта' (значит нужно создать ссылку для модала продукта)
        resultURN = resultURN.concat(`${titlePermalink}/`)
      }
    } else


      // или для 'permalink.brand', или для 'permalink.category'
      if (brand || category) {
        resultURN = startURN.concat(`${searchBy}/${permalink[searchBy]}/`)
      } else


        // или для распарсенных параметров поисковой строки (permalink: 'kashi')
        // (когда модал продукта открывется по ссылке, и нужно создать путь, который будет ПОСЛЕ закрытия модала)
        if (searchBy === BRAND || searchBy === CATEGORY) {
          resultURN = startURN.concat(`${searchBy}/${permalink}/`)
        }
  }

  // для text
  if (searchBy === TEXT) {
    resultURN = startURN.concat(`${searchBy}/`)
  }


  log.debug(`
  Результат работы функции: createPathname

  resultURN: `, resultURN)
  return resultURN
}



function preparePathnameData(data) {
  const {
    searchBy = null,
    dataProduct = null,
    permalink = null,
    option = null,
  } = data


  if (option) {
    const {
      brand = null,
      category = null,
      text = null,
      title = null
    } = option


    if (brand || category) {
      return {
        searchBy: brand ? BRAND : CATEGORY,
        permalink: option.permalink,
      }
    }


    if (text || title) {
      return {
        searchBy: TEXT,
      }
    }
  }


  // данные модала продукта
  if (dataProduct) {
    const { company, links, categories } = dataProduct

    return {
      searchBy: PERMALINK,
      permalink: {
        brand: company.brand.permalink,
        category: categories.permalink
      },
      links: links.permalink
    }
  }


  // если есть permalink и она не имеет ключа (в случае, если были переданы распарсенные параметры поисковой строки)
  if (permalink && !permalink[searchBy]) {
    return {
      searchBy,
      permalink, // permalink: 'kashi'
    }
  }

  return data
}


export default createPathname