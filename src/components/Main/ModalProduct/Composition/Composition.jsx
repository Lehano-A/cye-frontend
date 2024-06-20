import React from "react"
import Ingredients from "../Ingredients/Ingredients"
import { Box, Typography, List } from "@mui/material"
import { styled } from "@mui/material/styles";


const CommonBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  wordBreak: 'break-word',
}))


const Title = styled(Typography)(() => ({
  fontWeight: 700,
  textTransform: 'uppercase',
  display: 'inline-block',
  borderBottom: '1px dashed #d9d9d9',
  width: '100%',
  textAlign: 'center',
  marginBottom: '13px',
  fontSize: '16px',
}))


const StyledList = styled(List)(() => {
  return {
    padding: 0
  }
})



function Composition({ data, setRefSelectedIngredient }) {

  return (
    <CommonBox>

      <Title variant="h6">Состав</Title>

      <StyledList>
        <Ingredients
          data={data}
          setRefSelectedIngredient={setRefSelectedIngredient}
        />
      </StyledList>
    </CommonBox>
  )
}

export default Composition