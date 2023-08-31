
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUniqueCategories,
  setActiveButtonInFilter,
  setIsActiveButtonShowAllProducts,
  incrementCountFilterCards,
  clearCountFilterCards,
  clearUniqueCategories,
} from "../../../../redux/reducers/filterCategoriesSlice";
import { setArrForShowSearchResultProducts } from "../../../../redux/reducers/boxSearchResultSlice";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { clearCountLoadedImagesCards } from "../../../../redux/reducers/cardProduct";



function FilterCategories({ apiFoundProductsAfterSubmit }) {

  const dispatch = useDispatch()
  const uniqueCategories = useSelector((state) => state.filterCategories.uniqueCategories)
  const activeButtonInFilter = useSelector((state) => state.filterCategories.activeButtonInFilter)
  const isActiveButtonShowAllProducts = useSelector((state) => state.filterCategories.isActiveButtonShowAllProducts)
  const isApiReqByCategory = useSelector(state => state.inputSearch.isApiReqByCategory)



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
      const filterTargetCategory = filterProductsByTargetCategory(activeButtonInFilter)
      dispatch(setArrForShowSearchResultProducts(filterTargetCategory))
      dispatch(setIsActiveButtonShowAllProducts(false))
    }
  }, [activeButtonInFilter])




  //  Поиск уникальных категорий из входящего массива продуктов
  function searchUniqueCategories(apiFoundProductsAfterSubmit) {
    const box = {}

    apiFoundProductsAfterSubmit.forEach((product) => {

      if (!isApiReqByCategory) {
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
    // а всегда, было одна из всех активная и повторные нажатия на активную кнопку игнорировались
    if (nameButton === activeButtonInFilter || nameButton === null || (nameButton === 'showAllProducts' && activeButtonInFilter === null)) {
      return
    }

    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearCountLoadedImagesCards())
    dispatch(clearCountFilterCards())
    dispatch(setActiveButtonInFilter(nameButton))
  }


  // фильтрация продуктов по целевой категории (при нажатии на соответствующую кнопку фильтра)
  function filterProductsByTargetCategory(nameButton) {
    const filterProduct = apiFoundProductsAfterSubmit.filter((product) => {

      // если ранее запрос на поиск продуктов НЕ был по "категории"
      // тогда нужно отобразить дополнительную кнопку фильтра с "основной" категорией продукта
      // (а если БЫЛ запрос по "категории" - тогда этой кнопки не будет)
      if (!isApiReqByCategory) {
        if (nameButton === product.categories.main) {
          return true
        }
      }

      return product.categories?.sub.some((titleSubCategory) => {
        return nameButton === titleSubCategory
      })
    })

    dispatch(incrementCountFilterCards(filterProduct.length))
    return filterProduct
  }


  return (
    <Box>
      <ToggleButtonGroup
        exclusive
        onChange={handleOnChange}
        value={activeButtonInFilter}
      >

        {uniqueCategories.length > 0 &&
          <ToggleButton
            value="showAllProducts"
            sx={{ marginRight: '40px' }}
            selected={isActiveButtonShowAllProducts}
          >
            Всё подряд
          </ToggleButton>
        }

        {uniqueCategories.length > 0 && uniqueCategories.map((category, id) => {
          return (
            <ToggleButton
              value={category}
              key={id}
              sx={{ marginRight: '10px' }}
            >
              {category}
            </ToggleButton>
          )

        })}
      </ToggleButtonGroup>
    </Box>
  )
}

export default FilterCategories;