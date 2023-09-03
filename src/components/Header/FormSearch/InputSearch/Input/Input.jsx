import React from "react";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import ClearButton from "./ClearButton/ClearButton";

const StyledTextField = styled(TextField)(() => {
  return {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    borderRadius: '4px',
  }
});


function Input({ params }) {

  const inputValue = useSelector(state => state.inputSearch.inputValue)


  return (
    <StyledTextField
      {...params}
      placeholder="Например: Хрутка"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {inputValue !== '' && <ClearButton />}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  )
}

export default Input