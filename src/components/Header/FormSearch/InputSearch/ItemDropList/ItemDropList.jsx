import React from "react";
import { ListItem, Typography, Box } from "@mui/material";

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

  return (
    <ListItem  {...props} sx={{ height: '64px' }}>

      {(option.brand || option.categories) && (
        <Box sx={styleBrandAndCategoryBox}>

          <Typography sx={styleBrandAndCategoryText}>
            {option.brand ? 'БРЕНД:' : 'КАТЕГОРИЯ:'}
          </Typography>

          <Typography sx={{ fontWeight: 700 }}>
            {option.brand ? option.brand : option.categories}
          </Typography>

        </Box>
      )}

      {option.imagesUrl && (
        <>
          <Box sx={styleImageBox}>
            <img src={option.imagesUrl} alt="" />
          </Box>
          <Typography>{option.title}</Typography>
        </>

      )}

    </ListItem>
  )
}

export default ItemDropList