import React from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

/* --------------------------------- slices --------------------------------- */
import { toggleVisiblePopper, setValueInterpretation } from "../../../../../redux/reducers/slices/popperInterpretationSlice";


const StyledTypography = styled(Typography)(({ color, interpretation, theme }) => {

  return {
    display: 'inline-block',
    color: color && theme.palette[`${color}`].main,
    cursor: interpretation && 'pointer',
    fontStyle: 'italic',
    fontWeight: interpretation && 'bold',
    margin: '0 20px 0 0',
    '&:hover': {
      textDecoration: interpretation && 'underline dashed'
    }
  }
})



function Ingredient({ data, setRefSelectedIngredient }) {

  const dispatch = useDispatch()


  const handleClickIngredient = (e, value) => {
    setRefSelectedIngredient(e.currentTarget)

    dispatch(setValueInterpretation(value))
    dispatch(toggleVisiblePopper())
  }


  /*
    Здесь отображается два типа односоставных ингредиента:
    1. Строка с определением
    2. Простая строка
  */

  return (
    <>
      {data.ingredient ? <StyledTypography
        onClick={(e) => data.ingredient.interpretation && handleClickIngredient(e, data.ingredient.interpretation)}
        variant="body2"
        interpretation={data.ingredient.interpretation}
        color={data.ingredient.type}
      >
        {data.ingredient.title}
      </StyledTypography>

        :

        <Typography sx={{ display: 'inline-block', margin: '0 20px 0 0px' }} variant="body2">
          {data}
        </Typography>
      }
    </>
  )
}

export default Ingredient