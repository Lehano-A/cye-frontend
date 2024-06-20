import React from "react";
import { Typography } from "@mui/material";


const styleTitleProduct = {
  fontWeight: 700,
  fontSize: '16px',
  display: 'inline-block',
  marginBottom: '30px',
  maxWidth: '450px',
  wordBreak: 'break-word',
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