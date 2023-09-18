import React from "react";
import { useSelector } from "react-redux";
import { Box, ListItem, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';

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



function ItemDropList({ props, option }) {

  const inputValue = useSelector(selectInputValue)
  const isHistorySubmitDisplayed = useSelector(selectIsHistorySubmitDisplayed)

  return (
    <ListItem {...props} sx={{ height: '64px' }}>

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
          <SearchIcon sx={{ color: grey[400], marginRight: '10px' }}></SearchIcon>
          <Typography>{option.title || option.brand || option.categories}</Typography>
        </>
      )}

    </ListItem>
  )
}

export default ItemDropList