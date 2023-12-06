import React from "react";
import { Box, Typography } from "@mui/material";


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



function BrandAndCategoryOption({ option }) {

  return (
    <Box sx={styleBrandAndCategoryBox}>

      <Typography sx={styleBrandAndCategoryText}>
        {option.brand ? 'БРЕНД:' : 'КАТЕГОРИЯ:'}
      </Typography>

      <Typography sx={{ fontWeight: 700 }}>
        {option.brand ? option.brand : option.category}
      </Typography>

    </Box>
  )
}

export default BrandAndCategoryOption