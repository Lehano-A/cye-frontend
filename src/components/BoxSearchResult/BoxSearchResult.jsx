import React from "react";
import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CardProduct from "../CardProduct/CardProduct";

const BoxSearchResult = () => {

  const foundProducts = [
    { title: 'Сухой завтрак Хрутка шоколадные шарики', id: 'zds42fdsfs42' },
    { title: 'Сухой завтрак Хрутка ванильные шарики', id: 'fshdsasfvd1z' },
    { title: 'Сухой завтрак Хрутка банановые шарики', id: 'ytj432er96gd' },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '1000px',
        margin: '130px auto 0',
      }}>
      <Grid
        container
        spacing={4}
        rowSpacing={3}
        columnSpacing={3}
        columns={4}
      >

        {foundProducts.map((product) => {
          return (
            <Grid key={product.id}>
              <CardProduct title={product.title} />
            </Grid>
          )
        })}

      </Grid>
    </Box>
  )
}

export default BoxSearchResult