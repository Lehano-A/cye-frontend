import React from "react";
import { Box, Typography } from "@mui/material"
import Ingredient from "../Ingredient/Ingredient";


function CompositeIngredient({ data, setRefSelectedIngredient }) {

  return (
    <Box sx={{
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      margin: '15px 0',
      padding: '15px 20px',
      borderRadius: '15px'

    }}>
      <Typography sx={{ fontWeight: 'bold' }} variant="body2">
        {data.title + ':'}
      </Typography>

      <Box sx={{marginLeft: '20px'}}>
        {data.composition.map((item, id) => {
          return item.innerCompositeIngredient ?
            <CompositeIngredient data={item.innerCompositeIngredient} key={id} setRefSelectedIngredient={setRefSelectedIngredient} /> : <Ingredient data={item} key={id} setRefSelectedIngredient={setRefSelectedIngredient} />
        })}
      </Box>

    </Box>
  )

}

export default CompositeIngredient
