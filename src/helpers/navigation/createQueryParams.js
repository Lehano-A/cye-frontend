import logLevel from "loglevel";
import queryString from "query-string"
import { CONSTRUCTION_LOCATION_CONFIG, PERMALINK, PRODUCT_TITLE } from "../constants";

const log = logLevel.getLogger(CONSTRUCTION_LOCATION_CONFIG)



// создать поисковые параметры запроса
function createQueryParams(data) {
  log.debug(`
  Была вызвана функция: createQueryParams

  data: `, data);

  if (data === null) {
    return window.location.search
  }

  if (data === '') {
    return ''
  }

  const {
    noTransform = null,
    fullReplace = null,
    titleProductWithBG = null,
    queryParams = null,
    openingModalProductByLink = null,
  } = data

  if (openingModalProductByLink) {
    const { dataForBG, permalinkProductTitle } = data

    const config = {
      searchBy: PERMALINK,
      type: PRODUCT_TITLE,
      permalink: permalinkProductTitle,
      navPop: true,
      bgPage: dataForBG.page,
      bgSearchBy: dataForBG.searchBy,
      bgType: dataForBG.type,
      bgSearchValue: dataForBG.searchValue,
    }

    return stringifyQueryParams(config)
  }


  // при открытии модального окна продукта по ссылке
  // если есть флаг "название продукта с бэкграундом"
  if (titleProductWithBG) {
    const { dataForBG, permalinkProductTitle } = data

    const config = {
      searchBy: PERMALINK,
      type: PRODUCT_TITLE,
      permalink: permalinkProductTitle,
      navPop: true,
      bgPage: dataForBG.page,
      bgSearchBy: dataForBG.searchBy,
      bgType: dataForBG.type,
      bgSearchValue: dataForBG.searchValue,
    }

    const checkedConfigWithPermalink = checkPermalink(dataForBG, config)
    return stringifyQueryParams(checkedConfigWithPermalink)
  }


  // при открытии модального окна продукта по ссылке
  // если есть флаг "полностью заменить" поисковые параметры запроса (в случае, если URI - битый)
  if (fullReplace) {
    const { search, pagination } = data
    const { searchBy, searchValue, permalink } = search
    const { brand, category } = permalink
    const { page } = pagination


    return stringifyQueryParams({
      searchBy,
      page,
      searchValue,
      permalinkBrand: brand,
      permalinkCategory: category,
    })
  }


  // если есть флаг "без преобразования", значит - параметры уже в виде строки
  if (noTransform) {
    return queryParams
  }

  return stringifyQueryParams(data)
}



function checkPermalink(dataForBG, config) {
  const { permalink = null, permalinkBrand = null, permalinkCategory = null } = dataForBG

  if (permalinkBrand && permalinkCategory) {
    config.bgPermalinkBrand = permalinkBrand
    config.bgPermalinkCategory = permalinkCategory
  } else {
    config.bgPermalink = permalink
  }

  return config
}



function stringifyQueryParams(data) {
  return queryString.stringify(data)
}


export default createQueryParams