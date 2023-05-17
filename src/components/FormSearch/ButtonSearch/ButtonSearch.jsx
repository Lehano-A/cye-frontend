import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';

const StyledButton = styled(Button)(({ theme }) => {
  const primaryLight = theme.palette.primary.light;

  return {
    width: '65px',
    height: '65px',
    backgroundColor: primaryLight,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: primaryLight
    },

    '&:active': {
      transform: 'scale(0.9)'
    },
  }
});



function ButtonSearch() {

  return (
    <StyledButton
      type='submit'
      variant="contained"
    >
      <SearchIcon fontSize="large" />
    </StyledButton>

  )
}

export default ButtonSearch