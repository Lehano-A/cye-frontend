import React from "react";
import { Typography } from "@mui/material";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../helpers/constants";


const styleTitleProduct = {
  fontWeight: 700,

  [MEDIA_XS_MODAL_PRODUCT]: {
    fontSize: '15px',
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    fontSize: '16px',
  }
}



function TitleContainer({ title }) {

  return (

    <Typography
      variant='h4'
      id="modal-title"
      sx={styleTitleProduct}
    >

      {title}

    </Typography>

  )
}

export default TitleContainer