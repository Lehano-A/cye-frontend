import React from "react";
import { Typography } from "@mui/material";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../helpers/constants";


const styleTitle = {
  fontWeight: 700,
  textTransform: 'upperCase',

  [MEDIA_XS_MODAL_PRODUCT]: {
    fontSize: '14px'
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    fontSize: '16px',
  }
}



function NoteToComposition({ data }) {

  return (
    <>
      <Typography
        variant="h6"
        sx={styleTitle}
      >
        Примечание к составу
      </Typography>

      <Typography
        sx={{ pt: 1 }}
        variant="body2"
      >
        {data}
      </Typography>
    </>
  )
}

export default NoteToComposition