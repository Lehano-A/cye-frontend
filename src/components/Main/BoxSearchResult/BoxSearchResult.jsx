import React from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CardProduct from "../CardProduct/CardProduct";


function BoxSearchResult() {

  const apiFoundProductsAfterSubmit = useSelector(state => state.searchRequestProduct.apiFoundProductsAfterSubmit)

  return (
    <Container>

      <Grid
        container
        columnSpacing={{ xs: 0, sm: 5 }}
        rowSpacing={5}
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
        maxWidth='lg'
      >
        {apiFoundProductsAfterSubmit && apiFoundProductsAfterSubmit.map((product) => {

          return (
            <Grid xs={8} sm={6} md={4} lg={3} key={product._id}>
              <CardProduct dataProduct={product} />
            </Grid>
          )
        })}

      </Grid>
    </Container>
  )
}

export default BoxSearchResult