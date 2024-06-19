import React from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { grey } from '@mui/material/colors';
import { calculateColorIngredient } from "../../../../../helpers/components/Ingredient/calculateColor";
import { checkAttentionIconsFoodAdditive } from "../../../../../helpers/components/Ingredient/checkAttentionIconsFoodAdditive";

/* --------------------------------- slices --------------------------------- */
import { toggleVisiblePopper, setDataInterpretation } from "../../../../../redux/reducers/slices/popperInterpretationSlice";


const CommonBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}))


const StyledValueWithInterpretation = styled(Typography)(({ color, interpretation, theme }) => {
  const typeAttentionIcon = checkAttentionIconsFoodAdditive(color)
  const { textColor, bgColor } = calculateColorIngredient(theme, color, typeAttentionIcon)

  return {
    display: 'inline-block',
    color: color.length > 0 && typeAttentionIcon ? textColor : grey[600],
    cursor: interpretation && 'pointer',
    background: color.length > 0 && bgColor,
    padding: '5px',
    borderRadius: '5px',
    fontWeight: !color && 'bold',
    margin: '0 20px 0 0',
    transition: 'background-color 0.2s',
    lineHeight: 0.8,

    '&:hover': {
      color: color.length > 0 ? theme.palette[typeAttentionIcon].main : grey[600],
      background: color.length > 0 ? theme.palette.getAlphaColor(typeAttentionIcon, 'light', 0.2) : grey[300]
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


  function handleClickIngredient(e, data) {
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
        data.ingredient ? // если строка с интерпретацией

          <CommonBox>
            <StyledValueWithInterpretation
              onClick={(e) => data.ingredient.interpretation && handleClickIngredient(e, data.ingredient)}
              variant="body2"
              interpretation={data.ingredient.interpretation}
              color={data.ingredient.type}
            >
              {data.ingredient.title}
            </StyledValueWithInterpretation>
          </CommonBox>


          : // иначе


          <StyledSimpleValue variant="body2">
            {data}
          </StyledSimpleValue>
      }
    </>
  )
}

export default Ingredient