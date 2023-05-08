import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "../../redux/reducers/InputSearchSlice";


const StyledTextField = styled(TextField)(() => {
  return {
    width: '500px',
    marginRight: '25px',
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
      placeholder="Например: Nesquik"
      focused={false}
      onChange={handleInputChange}
      value={inputValue}
    >
    </StyledTextField>
  )
}


export default InputSearch;