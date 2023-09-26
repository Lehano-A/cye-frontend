import React from "react";
import { Typography } from "@mui/material";

const styleTitle =  {
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'upperCase',
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

      <Typography sx={{ pt: 1 }} variant="body2">{data}</Typography>
    </>
  )
}

export default NoteToComposition