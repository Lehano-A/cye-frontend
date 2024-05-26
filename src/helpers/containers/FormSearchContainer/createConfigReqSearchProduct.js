import logger from "loglevel"
import api from "../../../api/api"
import { createSearchParams } from "react-router-dom";
import { BRAND, BRAND_AND_CATEGORY, CATEGORY, CREATE_REQ_CONFIG_SEARCH_PRODUCT, PRESSED_BUTTON_PAGINATION, TEXT } from "../../constants";

const log = logger.getLogger(CREATE_REQ_CONFIG_SEARCH_PRODUCT)


// "keydown":
// 1) поиск через ENTER, по введённой подстроке
// 2) или по выбранному варианту стрелками на клавиатуре + ENTER
// "submit" - поиск по клику на кнопке поиска (только подстрока)
// "click" - поиск по клику на вариант из выпадающего списка
function createReqConfigSearchProduct({
  e,
  option,
  otherEventType,
  page = null,
  totalPages = null,
}) {

  const { searchBy = null } = option


  const createConfig = ({ searchBy, type, permalink, searchValue }) => {
    let box = {
      searchBy: searchBy,
      type: type,
      searchValue: searchValue,
      page: page || 0,
      totalPages: totalPages,
    }

    if (typeof permalink === 'string') {
      box.permalink = permalink
    }

    if (typeof permalink === 'object' && permalink !== null) {
      box = { ...box, ...permalink }
    }

    const queryParams = createSearchParams(box)

    return {
      searchData: queryParams,
      apiMethod: api.findProduct,
      segmentSearch: searchBy
    }
  }



  if ((e?.type === 'click' || e?.type === 'keydown' || otherEventType === PRESSED_BUTTON_PAGINATION)) {

    if (searchBy === BRAND_AND_CATEGORY) {
      return createConfig({
        searchBy,
        permalink: {
          permalinkBrand: option.permalink.brand,
          permalinkCategory: option.permalink.category,
        },
        searchValue: option.searchValue
      })
    }


    /* ----------------------------------------------------------------------- */


    if (option.brand || searchBy === BRAND) {
      log.debug(`
        В выпадающем списке выбрана опция - ${BRAND}:
        ${option.brand}
      `)

      return createConfig({
        searchBy: BRAND,
        permalink: option.permalink,
        searchValue: option.brand
      })
    }


    /* ----------------------------------------------------------------------- */


    if (option.category || searchBy === CATEGORY) {
      log.debug(`
        В выпадающем списке выбрана опция - ${CATEGORY}:
        ${option.category}
      `)

      return createConfig({
        searchBy: CATEGORY,
        type: 'main',
        permalink: option.permalink,
        searchValue: option.category
      })
    }


    /* ----------------------------------------------------------------------- */


    if (option.text || option.fullestTextSearch) {
      log.debug(`
        В выпадающем списке выбрана опция - ${TEXT}:
        ${option.text}
      `)

      return createConfig({
        searchBy: TEXT,
        type: option.type || null,
        permalink: option.permalink,
        searchValue: option.text
      })
    }
  }


  log.debug(`-
    Запрос осуществлён через:
    1) 'стрелки + Enter' (keydown)
      или
    2) 'подстрока + Enter' (keydown)
      или
    3) 'подстрока + клик по кнопке поиска' (submit)

     Значение: ${option}
  `)


  /*
    - если option не имеет ключа, значит введена "подстрока" + "Enter"
    - если option.title (+ .id и .imagesUrl), значит выбран предварительно отобранный продукт
  */
  return createConfig({
    searchBy: TEXT,
    searchValue: option.title || option
  })
}


export default createReqConfigSearchProduct