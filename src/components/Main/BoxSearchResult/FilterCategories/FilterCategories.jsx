
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


//  Поиск уникальных категорий из входящиего массива продуктов
function searchUniqueCategories(apiFoundProductsAfterSubmit) {
  const box = {}

  apiFoundProductsAfterSubmit.forEach((product) => Object.assign(box, product.category));
  return Object.keys(box)
}



function FilterCategories({ apiFoundProductsAfterSubmit }) {

  const dispatch = useDispatch()
  const uniqueCategories = useSelector((state) => state.filterCategories.uniqueCategories)
  const activeButtonInFilter = useSelector((state) => state.filterCategories.activeButtonInFilter)
  const isActiveButtonShowAllProducts = useSelector((state) => state.filterCategories.isActiveButtonShowAllProducts)



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
      const productsTargetCategory = getProductsTargetCategory(activeButtonInFilter)
      dispatch(setArrForShowSearchResultProducts(productsTargetCategory))
      dispatch(setIsActiveButtonShowAllProducts(false))
    }
  }, [activeButtonInFilter])




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


  function getProductsTargetCategory(nameButton) {
    const filterProduct = apiFoundProductsAfterSubmit.filter((product) => {
      return product.category[nameButton]
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