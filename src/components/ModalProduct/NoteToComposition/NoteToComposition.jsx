import React from "react";
import { Box, Typography } from "@mui/material";

function NoteToComposition({ data }) {

  return (
    <Box>
      <Typography
        variant="h6"
        fontSize="16px"
        fontWeight={700}
      >
        Примечание к составу
      </Typography>

      <Typography sx={{ pt: 1 }} variant="body2">{data}</Typography>
    </Box>
  )
}

export default NoteToComposition