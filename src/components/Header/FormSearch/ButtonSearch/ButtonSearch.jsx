import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';

const StyledButton = styled(Button)(({ theme }) => {
  const primaryLight = theme.palette.primary.light;

  return {
    width: '64px',
    height: '64px',
    backgroundColor: primaryLight,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: primaryLight
    },

    '&:active': {
      transform: 'scale(0.88)'
    },
  }
});

const styleIcon = {
  width: '32px',
  height: '32px',
}


function ButtonSearch() {

  return (
    <StyledButton
      type='submit'
      variant="contained"
    >
      <SearchIcon sx={styleIcon} fontSize="large" />
    </StyledButton>

  )
}

export default ButtonSearch