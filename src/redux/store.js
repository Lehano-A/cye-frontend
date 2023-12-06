import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./reducers/rootReducer"

const store = configureStore({ reducer: rootReducer })


function getSlicesFromStore() {

  const {
    searchRequestProduct,
    filterCategories,
    inputSearch,
    boxSearchResult,
    cardProduct,
    pagination,
  } = store.getState()

  const buttonPaginationWithReplaceState = { ...pagination }
  buttonPaginationWithReplaceState.isPressedButtonPagination = false


  const currentStore = {
    store: {
      inputSearch,
      cardProduct,
      filterCategories,
      docTitle: inputSearch.inputValueAfterSubmit ? inputSearch.inputValueAfterSubmit : inputSearch.inputValue,
      apiFoundProductsAfterSubmit: searchRequestProduct.apiFoundProductsAfterSubmit,
      arrForShowSearchResultProducts: boxSearchResult.arrForShowSearchResultProducts,
      buttonPagination: buttonPaginationWithReplaceState,
    }
  }

  return currentStore
}


export default store;
export { getSlicesFromStore };