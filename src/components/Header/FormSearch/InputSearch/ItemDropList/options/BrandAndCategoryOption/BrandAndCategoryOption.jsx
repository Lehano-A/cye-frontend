import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XSPLUS_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../../../../utils/constants";


const styleBoxBrandAndCategory = {
  display: 'flex',
  alignItems: 'center'
}


const styleTextBrandAndCategory = {
  marginRight: '18px',
  fontSize: '14px',
  color: '#9c9c9c',
  fontFamily: 'Comfortaa Variable',
  lineHeight: '14px',

  [MEDIA_XS_MODAL_PRODUCT]: {
    fontSize: '12px',
    'WebkitLineClamp': 4,
  },

  [MEDIA_XSPLUS_MODAL_PRODUCT]: {
    fontSize: '14px',
    'WebkitLineClamp': 3,
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    'WebkitLineClamp': 2,
  }
}



function BrandAndCategoryOption({ option }) {

  const theme = useTheme()
  const styleTextOption = theme.customStyles.Autocomplete.textOption


  return (
    <Box sx={styleBoxBrandAndCategory}>

      <Typography sx={styleTextBrandAndCategory}>
        {option.brand ? 'БРЕНД:' : 'КАТЕГОРИЯ:'}
      </Typography>

      <Typography sx={{ ...styleTextOption, fontWeight: 700 }}>
        {option.brand ? option.brand : option.category}
      </Typography>

    </Box>
  )
}

export default BrandAndCategoryOption