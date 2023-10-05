import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles"
import CardProduct from "../../CardProduct/CardProduct";

const Grid = styled(Box)(({ params }) => {
  const { columnsGridCards } = params

  return {
    display: 'grid',
    gridTemplateColumns: columnsGridCards,
    gridTemplateRows: '320px',
    gridAutoRows: "320px",
    gap: '30px',
  }
})



function GridCardsProducts({ arrForShowSearchResultProducts, columnsGridCards }) {

  return (

    <Grid params={{ columnsGridCards }}>

      {
        arrForShowSearchResultProducts.map((product) => {
          return (
            <CardProduct key={product.id} dataProduct={product} />
          )
        })
      }

    </Grid>
  )
}

export default GridCardsProducts


