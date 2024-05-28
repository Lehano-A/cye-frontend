import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

import { MEDIA_SM_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../helpers/constants";


const styleToggleButtonGroup = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  maxWidth: '1000px',
}


const StyledToggleButton = styled(ToggleButton)(() => {
  return {
    transition: 'all 0.25s ease',

    [MEDIA_XS_MODAL_PRODUCT]: {
      padding: '0 6px',

      '&.MuiToggleButton-root': {
        height: '40px',
      },
    },

    [MEDIA_SM_MODAL_PRODUCT]: {
      padding: '0 11px',

      '&.MuiToggleButton-root': {
        height: '45px',
      },
    }
  }
})


const StyledMainToggleButton = styled(StyledToggleButton)(() => {
  return {
    margin: '5px 25px 15px 15px',
  }
})


const StyledOtherToggleButton = styled(StyledToggleButton)(() => {
  return {
    margin: '5px 10px 5px',
  }
})



function FilterCategories({
  handleOnChange,
  activeButtonFilter,
  uniqueCategories,
  isActiveButtonShowAllProducts,
  searchBy,
  categoryName,
}) {

  return (
    <>
      <ToggleButtonGroup
        exclusive
        onChange={handleOnChange}
        value={activeButtonFilter}
        sx={styleToggleButtonGroup}
      >

        <StyledMainToggleButton
          value="showAllProducts"
          selected={isActiveButtonShowAllProducts}
        >
          {
            searchBy === 'category' && uniqueCategories.length === 0 ?
              categoryName : 'Всё подряд'
          }
        </StyledMainToggleButton>


        {uniqueCategories.length > 0 && uniqueCategories.map((category, id) => {
          return (
            <StyledOtherToggleButton
              value={category}
              key={id}
            >
              {category}
            </StyledOtherToggleButton>
          )

        })}
      </ToggleButtonGroup>
    </>
  )
}

export default FilterCategories;