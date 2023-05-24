import React from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleVisiblePopper, setValueInterpretation } from "../../../redux/reducers/popperInterpretationSlice";



function Ingredient({ item, setRefSelectedIngredient }) {

  const dispatch = useDispatch()

  const handleClickIngredient = (e, value) => {
    setRefSelectedIngredient(e.currentTarget)

    dispatch(setValueInterpretation(value))
    dispatch(toggleVisiblePopper())
  }

  return (
    <Typography
      sx={{ display: 'inline-block', cursor: item.interpretation && 'pointer' }}
      onClick={(e) => item.interpretation && handleClickIngredient(e, item.interpretation)}
      variant="body2"
    >
      {item.ingredient ? item.ingredient : item}
    </Typography>
  )
}

export default Ingredient