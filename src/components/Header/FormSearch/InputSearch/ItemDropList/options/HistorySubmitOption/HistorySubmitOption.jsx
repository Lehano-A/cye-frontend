import React from "react";
import { Box, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';

function HistorySubmitOption({ option }) {
  return (
    <Box sx={{ display: "flex" }}>
      <SearchIcon sx={{ color: grey[400], marginRight: '10px' }}></SearchIcon>
      <Typography>{option.title || option.brand || option.categories}</Typography>
    </Box>
  )
}

export default HistorySubmitOption