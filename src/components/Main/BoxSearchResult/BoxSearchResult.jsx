import React from "react";
import { useSelector } from "react-redux";
import { Box, Container, Fade } from "@mui/material";
import FilterCategories from "./FilterCategories/FilterCategories";
import GridCardsProduct from "./GridCardsProduct/GridCardsProduct";
import { styled } from "@mui/material/styles";

const StyledBoxFilter = styled(Box)(({ datafordisplay }) => {

  const { activeButtonInGroup, isCardsComletedForDisplay } = datafordisplay;

  return {
    display: isCardsComletedForDisplay || activeButtonInGroup ? 'flex' : 'none',
    justifyContent: 'center',
    margin: '0 0 80px 0',
  }
})



function BoxSearchResult() {

  const apiFoundProductsAfterSubmit = useSelector(state => state.searchRequestProduct.apiFoundProductsAfterSubmit)
  const arrForShowSearchResultProducts = useSelector(state => state.boxSearchResult.arrForShowSearchResultProducts)
  const countLoadedImagesCards = useSelector(state => state.cardProduct.countLoadedImagesCards)
  const countFilterCards = useSelector(state => state.filterCategories.countFilterCards)
  const activeButtonInGroup = useSelector(state => state.filterCategories.activeButtonInGroup)


  // готовы ли карточки для отображения? (ожидаем загрузки изображений карточек)
  const isCardsComletedForDisplay = ((arrForShowSearchResultProducts.length === countFilterCards && countLoadedImagesCards === countFilterCards) || (countLoadedImagesCards === arrForShowSearchResultProducts.length))


  return (
    <Fade in={isCardsComletedForDisplay || activeButtonInGroup}>
      <Container>

        <StyledBoxFilter
          datafordisplay={{ activeButtonInGroup, isCardsComletedForDisplay }}
        >
          {apiFoundProductsAfterSubmit.length > 1 &&
            <FilterCategories apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit} />
          }
        </StyledBoxFilter>



        <Container sx={{ display: isCardsComletedForDisplay ? 'block' : 'none' }}>
          <GridCardsProduct
            arrForShowSearchResultProducts={arrForShowSearchResultProducts}
          />
        </Container>


      </Container>
    </Fade>
  )
}

export default BoxSearchResult
