import React from "react"
import Ingredients from "../Ingredients/Ingredients"
import { Typography, List, Box } from "@mui/material"

const styleTitle = {
  fontSize: '16px',
  fontWeight: 700,
  textTransform: 'uppercase',
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