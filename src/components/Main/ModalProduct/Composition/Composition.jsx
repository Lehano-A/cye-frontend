import React from "react"
import Ingredient from "../Ingredient/Ingredient"
import { Typography, List, ListItem, Box } from "@mui/material"


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
        {data.map((item, id) => {

          return (
            <ListItem sx={{ padding: 0 }} key={id}>
              <Ingredient item={item} setRefSelectedIngredient={setRefSelectedIngredient} />
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default Composition