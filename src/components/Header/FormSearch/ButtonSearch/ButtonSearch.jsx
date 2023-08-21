import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';

const StyledButton = styled(Button)(({ theme, lengthvalue: lengthValue }) => {
  const primaryLight = theme.palette.primary.light;

  return {
    width: '64px',
    height: '64px',
    boxShadow: 'none',
    backgroundColor: lengthValue < 2 ? grey[400] : primaryLight,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: lengthValue < 2 ? grey[400] : primaryLight,
      boxShadow: 'none',
    },

    '&:active': {
      transform: 'scale(0.88)',
      boxShadow: 'none',
    },
  }
});

const styleIcon = {
  width: '32px',
  height: '32px',
}


function ButtonSearch({ lengthValue }) {


  return (
    <StyledButton type="submit" variant="contained" lengthvalue={lengthValue}>
      <SearchIcon sx={styleIcon} fontSize="large" />
    </StyledButton>
  )
}

export default ButtonSearch