
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsVisible, setUniqueCategories, setActiveButtonInGroup, setIsActiveButtonShowAllProducts } from "../../../../redux/reducers/filterCategoriesSlice";
import { Box, ToggleButton, ToggleButtonGroup, } from "@mui/material";


function createCollectionCategories(apiFoundProductsAfterSubmit) {
  const box = []
  apiFoundProductsAfterSubmit.forEach((product) => box.push(...product.category));

  return box
}


function findUniqueCategories(arr) {
  const boxObj = {}
  const boxArr = []

  arr.forEach((category) => {
    if (!boxObj[category]) {
      boxObj[category] = true
      boxArr.push(category)
    }
  })
  return boxArr
}



function FilterCategories({ apiFoundProductsAfterSubmit }) {

  const dispatch = useDispatch()
  const uniqueCategories = useSelector((state) => state.filterCategories.uniqueCategories)
  const activeButtonInGroup = useSelector((state) => state.filterCategories.activeButtonInGroup)
  const isActiveButtonShowAllProducts = useSelector((state) => state.filterCategories.isActiveButtonShowAllProducts)


  useEffect(() => {
    const collectionCategories = createCollectionCategories(apiFoundProductsAfterSubmit)
    const uniqueCategories = findUniqueCategories(collectionCategories)

    dispatch(setUniqueCategories(uniqueCategories))
    dispatch(setIsVisible(true))
  }, [])



  const handleOnChange = (e, nameButton) => {
    if (nameButton === null) {
      return
    }
    if (nameButton === 'showAllProducts') {
      dispatch(setIsActiveButtonShowAllProducts(true))
    } else {
      dispatch(setIsActiveButtonShowAllProducts(false))
    }

    dispatch(setActiveButtonInGroup(nameButton))
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