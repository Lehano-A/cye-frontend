import React from "react";
import { Box, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';



function HistorySubmitOption({ option }) {

  return (
    <Box sx={{ display: "flex", maxWidth: "90%" }}>

      <SearchIcon sx={{ color: grey[400], marginRight: '10px' }} />

      <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        {option.text || option.brand || option.category || option.title}
      </Typography>

    </Box>
  )
}

export default HistorySubmitOption