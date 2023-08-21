import React from "react";
import { useSelector } from "react-redux";
import { Box, Container, Fade } from "@mui/material";
import FilterCategories from "./FilterCategories/FilterCategories";
import GridCardsProduct from "./GridCardsProduct/GridCardsProduct";

const styleBoxFilterCategories = {
  display: 'flex',
  justifyContent: 'center',
  margin: '0 0 80px 0'
}

function BoxSearchResult() {

  const apiFoundProductsAfterSubmit = useSelector(state => state.searchRequestProduct.apiFoundProductsAfterSubmit)
  const arrForShowSearchResultProducts = useSelector(state => state.boxSearchResult.arrForShowSearchResultProducts)
  const countLoadedImagesCards = useSelector(state => state.cardProduct.countLoadedImagesCards)
  const countFilterCards = useSelector(state => state.filterCategories.countFilterCards)


  // готовы ли карточки для отображения? (ожидаем загрузки изображений карточек)
  const isCardsComletedForDisplay = ((arrForShowSearchResultProducts.length === countFilterCards && countLoadedImagesCards === countFilterCards) || (countLoadedImagesCards === arrForShowSearchResultProducts.length))


  return (

    <Container>

      <Box sx={styleBoxFilterCategories}>
        {apiFoundProductsAfterSubmit.length > 1 &&
          <FilterCategories apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit} />
        }
      </Box>

      <Fade in={isCardsComletedForDisplay}>
        <Container sx={{ display: isCardsComletedForDisplay ? 'block' : 'none' }}>
          <GridCardsProduct
            arrForShowSearchResultProducts={arrForShowSearchResultProducts}
          />
        </Container>
      </Fade>
      
    </Container>

  )
}

export default BoxSearchResult
