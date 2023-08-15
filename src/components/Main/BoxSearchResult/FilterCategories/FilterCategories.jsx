
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsVisible, setUniqueCategories } from "../../../../redux/reducers/filterCategoriesSlice";
import { Box, ToggleButton } from "@mui/material";

function FilterCategories({ apiFoundProductsAfterSubmit }) {

  const dispatch = useDispatch()
  const uniqueCategories = useSelector((state) => state.filterCategories.uniqueCategories)


  useEffect(() => {
    const collectionCategories = createCollectionCategories()
    const uniqueCategories = findUniqueCategories(collectionCategories)

    dispatch(setUniqueCategories(uniqueCategories))
    dispatch(setIsVisible(true))
  }, [])


  function createCollectionCategories() {
    const box = []
    apiFoundProductsAfterSubmit.forEach((product) => box.push(...product.category));

    return box
  }


  const findUniqueCategories = (arr) => {
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


  return (
    <Box>
      <ToggleButton
        value="main"
        selected
        sx={{ marginRight: '40px' }}
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
    </Box>
  )
}

export default FilterCategories;