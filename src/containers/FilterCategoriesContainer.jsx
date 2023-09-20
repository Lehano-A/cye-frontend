import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCountLoadedImagesCards } from "../redux/reducers/slices/cardProductSlice";
import FilterCategories from "../components/Main/BoxSearchResult/FilterCategories/FilterCategories";

/* --------------------------------- slices --------------------------------- */
import {
  setUniqueCategories,
  setActiveButtonInFilter,
  setIsActiveButtonShowAllProducts,
  incrementCountFilteredCards,
  clearCountFilteredCards,
  clearUniqueCategories,
} from "../redux/reducers/slices/filterCategoriesSlice";

import {
  setArrForShowSearchResultProducts,
  saveTimerIdDelayStartLoadingIndicator as saveTimerIdDelayStartLoadingIndicatorBoxSearchResult
} from "../redux/reducers/slices/boxSearchResultSlice";


/* -------------------------------- selectors ------------------------------- */
import {
  selectActiveButtonInFilter,
  selectUniqueCategories,
  selectIsActiveButtonShowAllProducts
} from "../redux/reducers/selectors/filterCategoriesSelectors";


/* --------------------------------- actions -------------------------------- */
import { startLoadingIndicatorBoxSearchResult } from "../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions";


/* ---------------------------------- hooks --------------------------------- */
import useSaveTimerId from "../hooks/useSaveTimerId";
import useDelayStartLoadingIndicator from "../hooks/useDelayStartLoadingIndicator";


function FilterCategoriesContainer({ apiFoundProductsAfterSubmit, searchBy }) {


  const dispatch = useDispatch()

  const uniqueCategories = useSelector(selectUniqueCategories)
  const activeButtonInFilter = useSelector(selectActiveButtonInFilter)
  const isActiveButtonShowAllProducts = useSelector(selectIsActiveButtonShowAllProducts)
  const delayStartLoadingIndicatorBoxSearchResult = useDelayStartLoadingIndicator(startLoadingIndicatorBoxSearchResult, 300)
  const { saveTimerId } = useSaveTimerId()

  useEffect(() => {
    // определение коллекции имён кнопок для фильтра
    const collectionCategories = searchUniqueCategories(apiFoundProductsAfterSubmit)
    dispatch(setUniqueCategories(collectionCategories))

    return () => { dispatch(clearUniqueCategories()) }
  }, [apiFoundProductsAfterSubmit])




  useEffect(() => {

    // если нажата кнопка "показать все продукты"
    if (activeButtonInFilter === 'showAllProducts') {
      dispatch(setIsActiveButtonShowAllProducts(true))
      dispatch(setArrForShowSearchResultProducts(apiFoundProductsAfterSubmit))
      return
    }

    // если нажата "любая другая кнопка категории"
    if (activeButtonInFilter !== null) {
      const filteredProducts = filterProductsByTargetCategory(activeButtonInFilter)
      dispatch(setArrForShowSearchResultProducts(filteredProducts))
      dispatch(setIsActiveButtonShowAllProducts(false))
    }

  }, [activeButtonInFilter])




  //  Поиск уникальных категорий из входящего массива продуктов
  function searchUniqueCategories(apiFoundProductsAfterSubmit) {
    const box = {}

    apiFoundProductsAfterSubmit.forEach((product) => {
      if (searchBy !== "categories") {
        box[product.categories.main] = true
      }

      if (product.categories.sub) {
        product.categories.sub.forEach((titleSub) => {
          box[titleSub] = true
        })
      }
    });

    return Object.keys(box)
  }



  // обработка данных при изменении активной кнопки в фильтре
  function handleOnChange(e, nameButton) {

    // эти правила, чтобы кнопка не отжималась
    // а всегда, было одна из всех - активная, и повторные нажатия на активную кнопку игнорировались
    if (nameButton === activeButtonInFilter || nameButton === null || (nameButton === 'showAllProducts' && activeButtonInFilter === null)) {
      return
    }

    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearCountLoadedImagesCards())
    dispatch(clearCountFilteredCards())
    dispatch(setActiveButtonInFilter(nameButton))

    const timerId = delayStartLoadingIndicatorBoxSearchResult.createTimer()
    saveTimerId(saveTimerIdDelayStartLoadingIndicatorBoxSearchResult, timerId)
  }


  // фильтрация продуктов по целевой категории (при нажатии на соответствующую кнопку фильтра)
  function filterProductsByTargetCategory(nameButton) {
    const filteredProduct = apiFoundProductsAfterSubmit.filter((product) => {

      // если ранее запрос на поиск продуктов НЕ был по "категории"
      // тогда нужно отобразить дополнительную кнопку фильтра с "основной" категорией продукта
      // (а если БЫЛ запрос по "категории" - тогда этой кнопки не будет)
      if (searchBy !== "categories") {
        if (nameButton === product.categories.main) {
          return true
        }
      }

      return product.categories?.sub.some((titleSubCategory) => {
        return nameButton === titleSubCategory
      })
    })

    dispatch(incrementCountFilteredCards(filteredProduct.length))
    return filteredProduct
  }

  return (
    <FilterCategories
      handleOnChange={handleOnChange}
      activeButtonInFilter={activeButtonInFilter}
      uniqueCategories={uniqueCategories}
      isActiveButtonShowAllProducts={isActiveButtonShowAllProducts}

    />
  )
}

export default FilterCategoriesContainer