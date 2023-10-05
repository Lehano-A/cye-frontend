import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";


function FilterCategories({
  handleOnChange,
  activeButtonInFilter,
  uniqueCategories,
  isActiveButtonShowAllProducts,
}) {

  return (
    <>
      <ToggleButtonGroup
        exclusive
        onChange={handleOnChange}
        value={activeButtonInFilter}
      >

        {uniqueCategories.length > 0 &&
          <ToggleButton
            value="showAllProducts"
            sx={{ marginRight: '40px', transition: 'all 0.25s ease' }}
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
              sx={{ marginRight: '10px', transition: 'all 0.25s ease' }}
            >
              {category}
            </ToggleButton>
          )

        })}
      </ToggleButtonGroup>
    </>
  )
}

export default FilterCategories;