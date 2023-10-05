import React from "react";
import { useSelector } from "react-redux";
import BoxSearchResult from "../components/Main/BoxSearchResult/BoxSearchResult";

/* -------------------------------- selectors ------------------------------- */
import { selectIsDisplayedButtonPagination } from "../redux/reducers/selectors/buttonPaginationSelectors";

import {
  selectArrForShowSearchResultProducts,
  selectIsLoadingIndicatorBoxSearchResult,
  selectSearchValueWithoutResult,
} from "../redux/reducers/selectors/boxSearchResultSelectors";

import {
  selectApiFoundProductsAfterSubmit,
} from "../redux/reducers/selectors/searchRequestProductSelectors";

import {
  selectActiveButtonInFilter,
} from "../redux/reducers/selectors/filterCategoriesSelectors";




function BoxSearchResultContainer() {

  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)
  const arrForShowSearchResultProducts = useSelector(selectArrForShowSearchResultProducts)
  const activeButtonInFilter = useSelector(selectActiveButtonInFilter)
  const isLoadingBoxSearchResult = useSelector(selectIsLoadingIndicatorBoxSearchResult)
  const searchValueWithoutResult = useSelector(selectSearchValueWithoutResult)
  const isDisplayedButtonPagination = useSelector(selectIsDisplayedButtonPagination)



  return (
    <BoxSearchResult
      apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit}
      activeButtonInFilter={activeButtonInFilter}
      searchBy={apiFoundProductsAfterSubmit?.searchBy}
      arrForShowSearchResultProducts={arrForShowSearchResultProducts}
      isLoadingBoxSearchResult={isLoadingBoxSearchResult}
      searchValueWithoutResult={searchValueWithoutResult}
      isDisplayedButtonPagination={isDisplayedButtonPagination}
    />

  )
}

export default BoxSearchResultContainer
