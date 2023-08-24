import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { useSelector } from "react-redux";

const StyledButton = styled(Button)(({ theme, param }) => {
  const primaryLight = theme.palette.primary.light;
  const { inputValue } = param;

  return {
    width: '64px',
    height: '64px',
    boxShadow: 'none',
    backgroundColor: inputValue.length < 2 ? grey[400] : primaryLight,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: inputValue.length < 2 ? grey[400] : primaryLight,
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


function ButtonSearch() {

  const inputValue = useSelector((state) => state.inputSearch.inputValue)

  const param = {
    inputValue,
  }

  return (
    <StyledButton type="submit" variant="contained" param={param}>
      <SearchIcon sx={styleIcon} fontSize="large" />
    </StyledButton>
  )
}

export default ButtonSearch