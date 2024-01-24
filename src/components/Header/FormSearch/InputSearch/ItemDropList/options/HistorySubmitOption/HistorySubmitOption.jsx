import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';



function HistorySubmitOption({ option }) {

  const theme = useTheme()


  return (

    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', }}>

      <SearchIcon sx={{ color: grey[400], marginRight: '10px' }} />

      <Typography sx={theme.customStyles.Autocomplete.textOption}>
        {option.text || option.brand || option.category || option.title}
      </Typography>

    </Box>

  )
}

export default HistorySubmitOption
