import React from "react"
import Ingredients from "../Ingredients/Ingredients"
import { Typography, List, Box } from "@mui/material"
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../utils/constants"


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



function Composition({ data, setRefSelectedIngredient }) {

  return (
    <Box>

      <Typography
        variant="h6"
        sx={styleTitle}
      >
        Состав
      </Typography>

      <List>

        <Ingredients
          data={data}
          setRefSelectedIngredient={setRefSelectedIngredient}
        />

      </List>
    </Box>
  )
}

export default Composition