import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFetchFoundProducts } from "../../redux/reducers/searchQueryProductSlice";
import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CardProduct from "../CardProduct/CardProduct";
import api from "../../api/api";

const styleBox = {
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '1000px',
  margin: '130px auto 0',
}


function BoxSearchResult() {

  const dispatch = useDispatch()
  const foundProducts = useSelector(state => state.searchQueryProduct.foundProducts)

  // Временно тут - инициирует работу поиска продукта
  useEffect(() => {
    const getProducts = api.getProducts()

    getProducts.then((res) => { dispatch(setFetchFoundProducts(res)) })
  }, [])


  return (
    <Box sx={styleBox}>
      <Grid
        container
        spacing={4}
        rowSpacing={3}
        columnSpacing={3}
        columns={4}
      >
        {foundProducts && foundProducts.map((product) => {

          return (
            <Grid key={product.id}>
              <CardProduct title={product.title} image={product.image} product={product} />
            </Grid>
          )
        })}

      </Grid>
    </Box>
  )
}

export default BoxSearchResult