import React from "react";
import { Paper, Typography, styled } from "@mui/material";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../helpers/constants";


const BoxPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.getAlphaColor('primaryTint', '200', 1),
  padding: '20px 20px 20px 25px',
  borderRadius: '15px',

  [MEDIA_XS_MODAL_PRODUCT]: {
    top: '-75px',
    left: 0,
    minWidth: '280px',
    maxWidth: '500px',
    width: '100%',
    margin: '38px 0 0 0',
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    top: '-40px',
    left: '-70px',
    maxWidth: '440px',
    width: 'max-content',
    alignSelf: 'start',
    margin: '0',
  }
}))


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
    <BoxPaper elevation={3}>
      <Typography
        variant="p"
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
    </BoxPaper>
  )
}

export default NoteToComposition