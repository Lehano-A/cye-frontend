import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";

/* -------------------------------- selectors ------------------------------- */
import { selectInputValue } from "../../../../redux/reducers/selectors/inputSearchSelectors";


const StyledButton = styled(Button)(({ theme }) => {
  const primaryLight = theme.palette.primary.light;

  return {
    width: '64px',
    height: '64px',
    boxShadow: 'none',
    backgroundColor: primaryLight,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: primaryLight,
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

  const inputValue = useSelector(selectInputValue)


  return (
    <StyledButton disabled={inputValue.length <= 1 || inputValue.trim() === ""} type="submit" variant="contained">
      <SearchIcon sx={styleIcon} fontSize="large" />
    </StyledButton>
  )
}

export default ButtonSearch