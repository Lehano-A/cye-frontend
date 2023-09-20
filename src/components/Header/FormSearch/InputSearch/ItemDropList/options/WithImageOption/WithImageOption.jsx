import React from "react";
import { Box, Typography } from "@mui/material";

const styleImageBox = {
  width: '64px',
  marginRight: '5px',
  display: 'flex',
  alignItems: 'center'
}

function WithImageOption({ option }) {
  return (
    <>
      <Box sx={styleImageBox}>
        <img src={option.imagesUrl} alt="" />
      </Box>
      <Typography>{option.title}</Typography>
    </>
  )
}

export default WithImageOption