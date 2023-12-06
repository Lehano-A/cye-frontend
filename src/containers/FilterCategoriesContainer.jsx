import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterCategories from "../components/Main/BoxSearchResult/FilterCategories/FilterCategories";

/* --------------------------------- slices --------------------------------- */
import {
  setUniqueCategories,
  setActiveButtonFilter,
  setIsActiveButtonShowAllProducts,
  clearUniqueCategories,
  setWasUsedFilter,
} from "../redux/reducers/slices/filterCategoriesSlice";

import {
  setArrForShowSearchResultProducts,
} from "../redux/reducers/slices/boxSearchResultSlice";

/* -------------------------------- selectors ------------------------------- */
import {
  selectNameActiveButtonInFilter,
  selectUniqueCategories,
  selectIsActiveButtonShowAllProducts
} from "../redux/reducers/selectors/filterCategoriesSelectors";



function FilterCategoriesContainer({ foundProducts, searchBy }) {

  const dispatch = useDispatch()

  const uniqueCategories = useSelector(selectUniqueCategories)
  const activeButtonFilter = useSelector(selectNameActiveButtonInFilter)
  const isActiveButtonShowAllProducts = useSelector(selectIsActiveButtonShowAllProducts)
  const wasUsedFilter = useSelector((state) => state.filterCategories.wasUsedFilter)


  useEffect(() => {
    // определение коллекции имён кнопок для фильтра
    const collectionCategories = searchUniqueCategories(foundProducts)
    dispatch(setUniqueCategories(collectionCategories))

    return () => { dispatch(clearUniqueCategories()) }
  }, [foundProducts])



  useEffect(() => {

    if (wasUsedFilter) {
      // если нажата кнопка "показать все продукты"
      if (activeButtonFilter === 'showAllProducts') {
        dispatch(setIsActiveButtonShowAllProducts(true))
        dispatch(setArrForShowSearchResultProducts(foundProducts))

      } else if (activeButtonFilter !== null) { // если нажата "любая другая кнопка категории"

        const filteredProducts = filterProductsByTargetCategory(activeButtonFilter)

        dispatch(setArrForShowSearchResultProducts(filteredProducts))
        dispatch(setIsActiveButtonShowAllProducts(false))
      }
    }

    return () => { dispatch(setWasUsedFilter(false)) }

  }, [wasUsedFilter])



  //  Поиск уникальных категорий из входящего массива продуктов
  function searchUniqueCategories(dataProducts) {
    const box = {}

    dataProducts.forEach((product) => {
      if (searchBy !== "category") {
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
    if (nameButton === activeButtonFilter || nameButton === null || (nameButton === 'showAllProducts' && activeButtonFilter === null)) {
      return
    }

    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(setActiveButtonFilter(nameButton))
    dispatch(setWasUsedFilter(true))
  }



  // фильтрация продуктов по целевой категории (при нажатии на соответствующую кнопку фильтра)
  function filterProductsByTargetCategory(nameButton) {
    const filteredProduct = foundProducts.filter((product) => {

      // если запрос на поиск продуктов НЕ был по "категории"
      // тогда нужно отобразить дополнительную кнопку фильтра с "основной" категорией продукта
      // (а если БЫЛ запрос по "категории" - тогда этой кнопки не будет)
      if (searchBy !== "category") {
        if (nameButton === product.categories.main) {
          return true
        }
      }

      return product.categories?.sub.some((titleSubCategory) => {
        return nameButton === titleSubCategory
      })
    })

    return filteredProduct
  }



  return (
    <FilterCategories
      handleOnChange={handleOnChange}
      activeButtonFilter={activeButtonFilter}
      uniqueCategories={uniqueCategories}
      isActiveButtonShowAllProducts={isActiveButtonShowAllProducts}
    />
  )
}

export default FilterCategoriesContainer