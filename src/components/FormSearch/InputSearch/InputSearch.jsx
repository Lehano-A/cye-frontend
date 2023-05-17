import React from "react";
import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "../../../redux/reducers/inputSearchSlice";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(() => {
  return {
    width: '100%',
  }
});


function InputSearch() {

  const inputValue = useSelector(state => state.inputSearch.value)
  const dispatch = useDispatch();


  const handleInputChange = (e) => {
    dispatch(setInputValue(e.target.value))
  }

  return (
    <StyledTextField
      autoComplete='off'
      placeholder="Например: Хрутка"
      focused={false}
      onChange={handleInputChange}
      value={inputValue}
    >
    </StyledTextField>
  )
}


export default InputSearch;