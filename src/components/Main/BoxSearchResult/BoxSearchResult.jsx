import React from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CardProduct from "../CardProduct/CardProduct";
import SkeletonCard from "../../Skeleton/SkeletonCard/SkeletonCard";
import { arrCardForSkeletonCard } from "../../../utils/constants";

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
        {apiFoundProductsAfterSubmit.length > 0 ? (apiFoundProductsAfterSubmit.map((product) => {

          return (
            <Grid xs={8} sm={6} md={4} lg={3} key={product._id}>
              <CardProduct dataProduct={product} />
            </Grid>
          )
        }))
          :
          (arrCardForSkeletonCard.map((item, id) => {
            return (
              <Grid key={id} xs={8} sm={6} md={4} lg={3}>
                <SkeletonCard />
              </Grid>
            )
          })
          )
        }
      </Grid>
    </Container>
  )
}

export default BoxSearchResult