import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";

/* -------------------------------- selectors ------------------------------- */
import { selectInputValue } from "../../../../redux/reducers/selectors/inputSearchSelectors";


const StyledButton = styled(Button)(({ theme }) => {

  const primaryLight = theme.palette.primary.light;

  return {
    height: '55px',
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderColor: primaryLight,
    borderRadius: "0 4px 4px 0",
    border: `5px solid ${primaryLight}`,
    borderLeft: `none`,

    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#fff',
    },

    "&:active": {
      "& > svg": { // трансформирем иконку в кнопке
        transform: "scale(0.8)"
      }
    },
  }
});


const StyledSearchIcon = styled(SearchIcon)(({ theme, params }) => {
  const { isButtonDisabled } = params

  return {
    width: '28px',
    height: '28px',
    fill: isButtonDisabled ? '#d9d9d9' : theme.palette.primary.light,
    transition: 'transform  0.2s ease',
  }
})


function ButtonSearch() {

  const inputValue = useSelector(selectInputValue)

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)


  useEffect(() => {
    if (inputValue.length <= 1 || inputValue.trim() === "") {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  }, [inputValue])


  return (
    <StyledButton
      disabled={isButtonDisabled}
      type="submit"
      disableRipple={true}
      params={{ inputValue }}
    >

      <StyledSearchIcon
        params={{ isButtonDisabled }}
        fontSize="large"
      />

    </StyledButton>
  )
}

export default ButtonSearch