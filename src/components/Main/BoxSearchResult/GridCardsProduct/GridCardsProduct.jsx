import React from "react";
import { Grid } from "@mui/material";
import CardProduct from "../../CardProduct/CardProduct";


function GridCardsProduct({ arrForShowSearchResultProducts }) {

  return (

    <Grid
      container
      columnSpacing={{ xs: 0, sm: 5 }}
      rowSpacing={5}
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
    >
      {
        arrForShowSearchResultProducts.map((product) => {
          return (

            <Grid xs={8} sm={6} md={4} lg={3} key={product._id} item sx={{padding: 0}}>
              <CardProduct dataProduct={product} />
            </Grid>

          )
        })
      }
    </Grid>

  )
}

export default GridCardsProduct