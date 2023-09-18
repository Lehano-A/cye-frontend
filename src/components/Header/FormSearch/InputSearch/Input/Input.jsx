import React from "react";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import ClearButton from "./ClearButton/ClearButton";

/* -------------------------------- selectors ------------------------------- */
import { selectInputValue } from "../../../../../redux/reducers/selectors/inputSearchSelectors";


const StyledTextField = styled(TextField)(() => {
  return {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    borderRadius: '4px',
  }
});



function Input({ params }) {

  const inputValue = useSelector(selectInputValue)


  return (
    <StyledTextField
      {...params}
      placeholder="Например: Хрутка"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {inputValue.length > 0 && <ClearButton />}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  )
}

export default Input