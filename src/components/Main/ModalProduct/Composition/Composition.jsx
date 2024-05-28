import React from "react"
import Ingredients from "../Ingredients/Ingredients"
import { Typography, List, Box } from "@mui/material"
import { styled } from "@mui/material/styles";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../helpers/constants"


const styleTitle = {
  fontWeight: 700,
  textTransform: 'uppercase',

  [MEDIA_XS_MODAL_PRODUCT]: {
    fontSize: '14px'
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    fontSize: '16px',
  },
}

const StyledList = styled(List)(() => {
  return {
    padding: 0
  }
})



function Composition({ data, setRefSelectedIngredient }) {

  return (
    <Box>

      <Typography
        variant="h6"
        sx={styleTitle}
      >
        Состав
      </Typography>

      <StyledList>

        <Ingredients
          data={data}
          setRefSelectedIngredient={setRefSelectedIngredient}
        />

      </StyledList>
    </Box>
  )
}

export default Composition