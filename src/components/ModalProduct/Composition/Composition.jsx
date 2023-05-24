import React from "react"
import Ingredient from "../Ingredient/Ingredient"
import { Typography } from "@mui/material"


function Composition({ data, setRefSelectedIngredient }) {

  return (
    <>
      <Typography
        variant="h6"
        fontSize="16px"
        fontWeight={700}
      >
        Состав
      </Typography>

      {data.map((item, id) => {
        return (
          <Ingredient key={id} item={item} setRefSelectedIngredient={setRefSelectedIngredient} />
        )
      })}
    </>
  )
}

export default Composition