import React from "react";
import { Typography } from "@mui/material";

const titleProps = {
  variant: 'h4',
  marginBottom: '10px',
  fontSize: '16px',
  fontWeight: 700,
}

const styleTitleProduct = {
  marginBottom: '35px',
}



function TitleContainer({ title }) {

  return (

    <Typography
      {...titleProps}
      id="modal-title"
      sx={styleTitleProduct}
    >

      {title}

    </Typography>

  )
}

export default TitleContainer