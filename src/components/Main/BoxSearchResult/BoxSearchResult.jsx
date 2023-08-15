import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Container, CircularProgress } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CardProduct from "../CardProduct/CardProduct";
import FilterCategories from "./FilterCategories/FilterCategories";

const styleBoxLoader = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
}

function BoxSearchResult() {

  const apiFoundProductsAfterSubmit = useSelector(state => state.searchRequestProduct.apiFoundProductsAfterSubmit)
  const isSubmitting = useSelector(state => state.inputSearch.isSubmitting)
  const [timer, setTimer] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isSubmitting) {
      setTimer(setTimeout(() => { setLoading(true) }, 300))
    }
  }, [isSubmitting])

  useEffect(() => {
    if (!loading && timer) {
      clearTimeout(timer)
    }
  }, [loading])

  return (
    <Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '0 0 15px 0'}}>
        {apiFoundProductsAfterSubmit.length > 1 &&

          <FilterCategories apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit} />

        }
      </Box>

      <Container>
        <Grid
          container
          columnSpacing={{ xs: 0, sm: 5 }}
          rowSpacing={5}
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
          maxWidth='lg'
        >
          {apiFoundProductsAfterSubmit.length > 0 ?
            (
              apiFoundProductsAfterSubmit.map((product) => {

                return (
                  <Grid xs={8} sm={6} md={4} lg={3} key={product._id}>
                    <CardProduct dataProduct={product} />
                  </Grid>
                )
              })
            )

            :

            (
              loading &&
              <Box sx={styleBoxLoader}>
                <CircularProgress />
              </Box>
            )

          }
        </Grid>
      </Container>
    </Box>
  )
}

export default BoxSearchResult