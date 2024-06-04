import React from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { grey } from '@mui/material/colors';

/* --------------------------------- slices --------------------------------- */
import { toggleVisiblePopper, setDataInterpretation } from "../../../../../redux/reducers/slices/popperInterpretationSlice";


const StyledValueWithDefinition = styled(Typography)(({ color, interpretation, theme }) => {

  return {
    display: 'inline-block',
    color: color ? theme.palette[`${color}`].main : grey[600],
    cursor: interpretation && 'pointer',
    backgroundColor: color && theme.palette[`${color}`].light,
    padding: '0 5px',
    borderRadius: '5px',
    fontWeight: !color && 'bold',
    margin: '0 20px 0 0',
    transition: 'background-color 0.2s',

    '&:hover': {
      backgroundColor: color ? theme.palette.getAlphaColor(color, 'light', 0.2) : grey[300]
    }
  }
})

const StyledSimpleValue = styled(Typography)(() => {

  return {
    display: 'inline-block',
    margin: '0 25px 0 0px',
    color: grey[500]
  }
})



function Ingredient({ data, setRefSelectedIngredient }) {

  const dispatch = useDispatch()

  const handleClickIngredient = (e, data) => {
    setRefSelectedIngredient(e.currentTarget)

    dispatch(setDataInterpretation(data))
    dispatch(toggleVisiblePopper())
  }


  /*
    Здесь отображается два типа односоставных ингредиента:
    1. Строка с определением
    2. Простая строка
  */

  return (
    <>
      {
        data.ingredient ? // если строка с определением

          <StyledValueWithDefinition
            onClick={(e) => data.ingredient.interpretation && handleClickIngredient(e, data.ingredient)}
            variant="body2"
            interpretation={data.ingredient.interpretation}
            color={data.ingredient.type}
          >
            {data.ingredient.title}
          </StyledValueWithDefinition>

          : // иначе

          <StyledSimpleValue variant="body2">
            {data}
          </StyledSimpleValue>
      }
    </>
  )
}

export default Ingredient