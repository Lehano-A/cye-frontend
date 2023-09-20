import React from "react";
import { useSelector } from "react-redux";
import { Box, ListItem, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { styled } from "@mui/material/styles"
import ButtonDeleteFromHistorySubmit from "./ButtonDeleteFromHistorySubmit/ButtonDeleteFromHistorySubmit";

/* -------------------------------- selectors ------------------------------- */
import {
  selectInputValue,
  selectIsHistorySubmitDisplayed,
} from "../../../../../redux/reducers/selectors/inputSearchSelectors";


const styleImageBox = {
  width: '64px',
  marginRight: '5px',
  display: 'flex',
  alignItems: 'center'
}

const styleBrandAndCategoryBox = {
  display: 'flex',
  alignItems: 'center'
}

const styleBrandAndCategoryText = {
  marginRight: '18px',
  fontSize: '14px',
  color: '#9c9c9c',
  fontFamily: 'Comfortaa Variable',
  lineHeight: '14px'
}


const StyledListItem = styled(ListItem)(({ params }) => {
  const { isHistorySubmitDisplayed } = params

  return {
    height: '64px',

    '&.MuiAutocomplete-option': {
      display: "flex",
      justifyContent: isHistorySubmitDisplayed ? 'space-between' : 'flex-start',
    }

  }
})



function ItemDropList({ props, option }) {

  const inputValue = useSelector(selectInputValue)
  const isHistorySubmitDisplayed = useSelector(selectIsHistorySubmitDisplayed)



  return (
    <StyledListItem {...props} params={{ isHistorySubmitDisplayed }}>

      {((inputValue.length >= 2 && !isHistorySubmitDisplayed) && (option.brand || option.categories)) && (
        <Box sx={styleBrandAndCategoryBox}>

          <Typography sx={styleBrandAndCategoryText}>
            {option.brand ? 'БРЕНД:' : 'КАТЕГОРИЯ:'}
          </Typography>

          <Typography sx={{ fontWeight: 700 }}>
            {option.brand ? option.brand : option.categories}
          </Typography>

        </Box>
      )}

      {(inputValue.length >= 2 && !isHistorySubmitDisplayed) && option.imagesUrl && (
        <>
          <Box sx={styleImageBox}>
            <img src={option.imagesUrl} alt="" />
          </Box>
          <Typography>{option.title}</Typography>
        </>
      )}

      {isHistorySubmitDisplayed && (
        <>
          <Box sx={{ display: "flex" }}>
            <SearchIcon sx={{ color: grey[400], marginRight: '10px' }}></SearchIcon>
            <Typography>{option.title || option.brand || option.categories}</Typography>
          </Box>

          <ButtonDeleteFromHistorySubmit option={option} />
        </>
      )}


    </StyledListItem>
  )
}

export default ItemDropList