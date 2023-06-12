import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFetchFoundProducts } from "../../../redux/reducers/searchQueryProductSlice";
import { Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CardProduct from "../CardProduct/CardProduct";
import api from "../../../api/api";


function BoxSearchResult() {

  const dispatch = useDispatch()
  const foundProducts = useSelector(state => state.searchQueryProduct.foundProducts)


  // Временно тут - инициирует работу поиска продукта
  useEffect(() => {
    const getProducts = api.getProducts()

    getProducts.then((res) => { dispatch(setFetchFoundProducts(res)) })
  }, [])


  return (
    <Container>
      <Grid
        container
        columnSpacing={{ xs: 0, sm: 5 }}
        rowSpacing={5}
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
        maxWidth='lg'
      >
        {foundProducts && foundProducts.map((product) => {

          return (
            <Grid xs={8} sm={6} md={4} lg={3} key={product.id}>
              <CardProduct title={product.title} image={product.image} dataProduct={product} />
            </Grid>
          )
        })}

      </Grid>
    </Container>
  )
}

export default BoxSearchResult