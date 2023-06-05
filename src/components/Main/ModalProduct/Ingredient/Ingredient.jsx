import React from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleVisiblePopper, setValueInterpretation } from "../../../../redux/reducers/popperInterpretationSlice";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)`
display: 'inline-block';
cursor: ${(props) => (props.interpretation && 'pointer')};
font-weight: ${(props) => (props.interpretation && 'bold')};

&:hover {
  text-decoration: ${(props) => (props.interpretation && 'underline dashed')};
}
`

function Ingredient({ item, setRefSelectedIngredient }) {

  const dispatch = useDispatch()

  const handleClickIngredient = (e, value) => {
    setRefSelectedIngredient(e.currentTarget)

    dispatch(setValueInterpretation(value))
    dispatch(toggleVisiblePopper())
  }

  return (
    <StyledTypography
      onClick={(e) => item.interpretation && handleClickIngredient(e, item.interpretation)}
      variant="body2"
      interpretation={item.interpretation}
    >
      {item.ingredient ? item.ingredient : item}
    </StyledTypography>
  )
}

export default Ingredient