import React from "react";
import { Box, Paper, Typography } from "@mui/material"
import Ingredient from "../Ingredient/Ingredient"
import { styled } from "@mui/material/styles";

const StyledMainBox = styled(Paper)(() => {
  return {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    margin: '15px 0',
    padding: '15px 20px',
    borderRadius: '15px'
  }
})


const StyledTitle = styled(Typography)(() => {
  return {
    fontWeight: 700,
    fontStyle: 'italic',
    margin: '0 0 5px 0'
  }
})



function CompositeIngredient({ data, setRefSelectedIngredient }) {

  return (
    <StyledMainBox elevation={1}>
      <StyledTitle variant="body2">
        {data.title + ':'}
      </StyledTitle>

      <Box sx={{ marginLeft: '20px' }}>
        {
          data.composition.map((item, id) => {

            return item.innerCompositeIngredient ?
              <CompositeIngredient
                data={item.innerCompositeIngredient}
                key={id}
                setRefSelectedIngredient={setRefSelectedIngredient}

              />

              :

              <Ingredient
                data={item}
                key={id}
                setRefSelectedIngredient={setRefSelectedIngredient}
              />
          })
        }
      </Box>
    </StyledMainBox>
  )
}

export default CompositeIngredient
