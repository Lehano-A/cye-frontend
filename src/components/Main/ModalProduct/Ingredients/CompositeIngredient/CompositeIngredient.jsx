import React from "react";
import { Box, Paper, Typography } from "@mui/material"
import Ingredient from "../Ingredient/Ingredient"
import { styled } from "@mui/material/styles";
import { PRESERVING_AGENTS_TYPE_ATTENTION_ICON } from "../../../../../helpers/constants";

const StyledMainBox = styled(Paper, { shouldForwardProp: (prop) => prop !== 'isPreservingAgents' })(({ isPreservingAgents, theme }) => {
  return {
    margin: '15px 0',
    padding: '15px 20px',
    borderRadius: '15px',
    backgroundColor: isPreservingAgents ? theme.palette.getAlphaColor(PRESERVING_AGENTS_TYPE_ATTENTION_ICON, "light", 0.15) : 'rgba(0, 0, 0, 0.03)'
  }
})


const StyledTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isPreservingAgents' })(({ isPreservingAgents, theme }) => {
  return {
    fontWeight: 700,
    fontStyle: 'italic',
    margin: '0 0 5px 0',
    color: isPreservingAgents ? theme.palette.preservingAgents.main : 'initial'
  }
})



function CompositeIngredient({ data, setRefSelectedIngredient }) {

  const isPreservingAgents = data.composition[0].ingredient?.type.includes(PRESERVING_AGENTS_TYPE_ATTENTION_ICON)


  return (
    <StyledMainBox
      elevation={1}
      isPreservingAgents={isPreservingAgents}
    >
      <StyledTitle
        variant="body2"
        isPreservingAgents={isPreservingAgents}
      >
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
