import queryString from "query-string"
import { BRAND_AND_CATEGORY, PRESSED_BUTTON_PAGINATION, TEXT } from "../../constants"


// создать опцию для ПОСЛЕДУЮЩЕГО создания конфига поиска продукта, когда используется пагинация
function createOptionForPagination(apiFoundProductsAfterSubmit, paginationData, location, params) {

  const { search } = apiFoundProductsAfterSubmit
  const { searchBy, type = null, permalink = null, searchValue = null } = search
  const { page = null, totalPages = null } = paginationData

  const parsedQueryParams = queryString.parse(location.search)


  if (searchBy === BRAND_AND_CATEGORY) {
    return {
      totalPages,
      option: { searchBy, permalink, searchValue },
      otherEventType: PRESSED_BUTTON_PAGINATION,
      ...parsedQueryParams
    }
  }


  if (searchBy === TEXT) {
    return {
      option: {
        type,
        text: searchValue,
      },
      totalPages,
      otherEventType: PRESSED_BUTTON_PAGINATION,
      ...parsedQueryParams
    }
  }


  const configOptionPagination = {
    page,
    totalPages,
    option: {
      permalink: permalink[searchBy],
    },
    otherEventType: PRESSED_BUTTON_PAGINATION,
    ...parsedQueryParams,
  }


  // если есть поисковое значение
  if (searchValue) {
    configOptionPagination.option = {
      ...configOptionPagination.option,
      [searchBy]: search.searchValue,
    }
  } else { // если нет поискового значения (в случае, если страница была открыта по ссылке, тогда будет известен только permalink)
    configOptionPagination.option = {
      ...configOptionPagination.option,
      searchBy: params.searchBy
    }
  }

  return configOptionPagination
}


export default createOptionForPagination