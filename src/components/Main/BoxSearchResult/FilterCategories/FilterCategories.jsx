
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUniqueCategories,
  setActiveButtonInGroup,
  setIsActiveButtonShowAllProducts,
  incrementCountFilterCards,
  clearCountFilterCards
} from "../../../../redux/reducers/filterCategoriesSlice";
import { setArrForShowSearchResultProducts } from "../../../../redux/reducers/boxSearchResultSlice";
import { Box, ToggleButton, ToggleButtonGroup, } from "@mui/material";
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
  const activeButtonInGroup = useSelector((state) => state.filterCategories.activeButtonInGroup)
  const isActiveButtonShowAllProducts = useSelector((state) => state.filterCategories.isActiveButtonShowAllProducts)


  useEffect(() => {
    // определение коллекции имён кнопок для фильтра
    const collectionCategories = searchUniqueCategories(apiFoundProductsAfterSubmit)

    dispatch(setUniqueCategories(collectionCategories))
  }, [])


  useEffect(() => {
    // если нажата кнопка "показать все продукты"
    if (activeButtonInGroup === 'showAllProducts') {
      dispatch(setIsActiveButtonShowAllProducts(true))
      dispatch(setArrForShowSearchResultProducts(apiFoundProductsAfterSubmit))
      return
    }

    // если нажата "любая другая кнопка категории"
    if (activeButtonInGroup !== null) {
      const productsTargetCategory = getProductsTargetCategory(activeButtonInGroup)
      dispatch(setArrForShowSearchResultProducts(productsTargetCategory))
      dispatch(setIsActiveButtonShowAllProducts(false))
    }
  }, [activeButtonInGroup])




  // обработка данных при изменении активной кнопки в фильтре
  function handleOnChange(e, nameButton) {

    // это правило, чтобы кнопка не отжималась
    // а всегда, было одна из всех активная
    if (nameButton === activeButtonInGroup || nameButton === null) {
      return
    }

    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearCountLoadedImagesCards())
    dispatch(clearCountFilterCards())
    dispatch(setActiveButtonInGroup(nameButton))
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
        value={activeButtonInGroup}
      >
        <ToggleButton
          value="showAllProducts"
          sx={{ marginRight: '40px' }}
          selected={isActiveButtonShowAllProducts}
        >
          Всё подряд
        </ToggleButton>

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