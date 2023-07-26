import React from "react"
import Ingredients from "../Ingredients/Ingredients"
import { Typography, List, Box } from "@mui/material"


function Composition({ data, setRefSelectedIngredient }) {

  return (
    <Box>

      <Typography
        variant="h6"
        fontSize="16px"
        fontWeight={700}
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