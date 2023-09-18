
import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";


function FilterCategories({
  handleOnChange,
  activeButtonInFilter,
  uniqueCategories,
  isActiveButtonShowAllProducts,
}) {

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