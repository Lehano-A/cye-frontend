import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isNull } from "../utils/isNull";
import BoxSearchResult from "../components/Main/BoxSearchResult/BoxSearchResult";

/* -------------------------------- selectors ------------------------------- */
import {
  selectArrForShowSearchResultProducts,
  selectIsLoadingIndicatorBoxSearchResult,
  selectIsCardsReadyForDisplay,
  selectTimerIdDelayStartLoadingIndicator,
  selectSearchValueWithoutResult,
} from "../redux/reducers/selectors/boxSearchResultSelectors";

import {
  selectInputValue,
  selectIsSubmitting,
} from "../redux/reducers/selectors/inputSearchSelectors";

import {
  selectApiFoundProductsAfterSubmit,
  selectSearchBy,
} from "../redux/reducers/selectors/searchRequestProductSelectors";

import {
  selectCountFilteredCards,
  selectActiveButtonInFilter,
  selectIsFadeFirstDisplay,
} from "../redux/reducers/selectors/filterCategoriesSelectors";

import { selectCountLoadedImagesCards } from "../redux/reducers/selectors/cardProductSelectors";


/* --------------------------------- actions -------------------------------- */
import { cardsReadyForDisplay, cardsNotReadyForDisplay } from "../redux/reducers/actions/BoxSearchResult/cardsWaitingDisplay";

import { endLoadingIndicatorBoxSearchResult } from "../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions";

import { setFadeFirstDisplay } from "../redux/reducers/actions/FilterCategories/filterCategoriesActions";



function BoxSearchResultContainer() {
  const dispatch = useDispatch()

  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)
  const searchBy = useSelector(selectSearchBy)
  const arrForShowSearchResultProducts = useSelector(selectArrForShowSearchResultProducts)
  const countLoadedImagesCards = useSelector(selectCountLoadedImagesCards)
  const countFilteredCards = useSelector(selectCountFilteredCards)
  const activeButtonInFilter = useSelector(selectActiveButtonInFilter)
  const isFadeFirstDisplay = useSelector(selectIsFadeFirstDisplay)
  const inputValue = useSelector(selectInputValue)
  const isLoadingBoxSearchResult = useSelector(selectIsLoadingIndicatorBoxSearchResult)
  const isCardsReadyForDisplay = useSelector(selectIsCardsReadyForDisplay)
  const timerIdDelayStartLoadingIndicator = useSelector(selectTimerIdDelayStartLoadingIndicator)
  const isSubmitting = useSelector(selectIsSubmitting)
  const searchValueWithoutResult = useSelector(selectSearchValueWithoutResult)


  useEffect(() => {
    if (!isFadeFirstDisplay) {
      dispatch(setFadeFirstDisplay())
    }
  }, [])


  useEffect(() => {
    const isReadyCardsForDisplay = checkReadinessCardsForDisplay(
      arrForShowSearchResultProducts,
      countFilteredCards,
      countLoadedImagesCards
    )

    if (isReadyCardsForDisplay) {
      dispatch(cardsReadyForDisplay())
    } else {
      dispatch(cardsNotReadyForDisplay())
    }
  }, [arrForShowSearchResultProducts, countFilteredCards, countLoadedImagesCards])



  useEffect(() => {

    if (isCardsReadyForDisplay && arrForShowSearchResultProducts?.length > 0) {
      dispatch(endLoadingIndicatorBoxSearchResult())
      clearTimeout(timerIdDelayStartLoadingIndicator)
    }

    if (apiFoundProductsAfterSubmit?.length === 0) {
      dispatch(endLoadingIndicatorBoxSearchResult())
      clearTimeout(timerIdDelayStartLoadingIndicator)
    }
  }, [isCardsReadyForDisplay, activeButtonInFilter, arrForShowSearchResultProducts, apiFoundProductsAfterSubmit])


  // проверка готовности карточек для отображения
  function checkReadinessCardsForDisplay(arrForShowSearchResultProducts, countFilteredCards, countLoadedImagesCards) {

    const lengthArrForShowSearchResultProducts = arrForShowSearchResultProducts?.length > 0 ? arrForShowSearchResultProducts?.length : null
    const quantityFilteredCards = countFilteredCards > 0 ? countFilteredCards : null
    const quantityLoadedImagesCards = countLoadedImagesCards > 0 ? countLoadedImagesCards : null


    return compareOperands(lengthArrForShowSearchResultProducts, quantityFilteredCards, quantityLoadedImagesCards)
  }


  // сравнить операнды
  function compareOperands(
    lengthArrForShowSearchResultProducts,
    quantityFilteredCards,
    quantityLoadedImagesCards
  ) {

    if (lengthArrForShowSearchResultProducts === quantityFilteredCards &&
      quantityLoadedImagesCards === quantityFilteredCards) {

      if (!isNull(lengthArrForShowSearchResultProducts) || !isNull(quantityFilteredCards) || !isNull(quantityLoadedImagesCards)) {
        return true
      }
    }


    if (quantityLoadedImagesCards === lengthArrForShowSearchResultProducts) {

      if (!isNull(quantityLoadedImagesCards) || !isNull(lengthArrForShowSearchResultProducts)) {
        return true
      }
    }
  }
  return (

    <BoxSearchResult
      apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit}
      isCardsReadyForDisplay={isCardsReadyForDisplay}
      activeButtonInFilter={activeButtonInFilter}
      isFadeFirstDisplay={isFadeFirstDisplay}
      searchBy={searchBy}
      arrForShowSearchResultProducts={arrForShowSearchResultProducts}
      isLoadingBoxSearchResult={isLoadingBoxSearchResult}
      searchValueWithoutResult={searchValueWithoutResult}
    />

  )
}

export default BoxSearchResultContainer
