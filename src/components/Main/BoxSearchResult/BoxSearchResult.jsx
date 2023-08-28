import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Fade } from "@mui/material";
import FilterCategories from "./FilterCategories/FilterCategories";
import GridCardsProduct from "./GridCardsProduct/GridCardsProduct";
import { styled } from "@mui/material/styles";
import { setIsFadeFirstDisplay } from "../../../redux/reducers/filterCategoriesSlice";

const StyledBoxFilter = styled(Box)(({ datafordisplay }) => {

  const { activeButtonInFilter, isCardsComletedForDisplay } = datafordisplay;

  return {
    display: isCardsComletedForDisplay || activeButtonInFilter ? 'flex' : 'none',
    justifyContent: 'center',
    margin: '0 0 80px 0',
  }
})



function BoxSearchResult() {
  const dispatch = useDispatch()

  const apiFoundProductsAfterSubmit = useSelector(state => state.searchRequestProduct.apiFoundProductsAfterSubmit)
  const arrForShowSearchResultProducts = useSelector(state => state.boxSearchResult.arrForShowSearchResultProducts)
  const countLoadedImagesCards = useSelector(state => state.cardProduct.countLoadedImagesCards)
  const countFilterCards = useSelector(state => state.filterCategories.countFilterCards)
  const activeButtonInFilter = useSelector(state => state.filterCategories.activeButtonInFilter)
  const isFadeFirstDisplay = useSelector(state => state.filterCategories.isFadeFirstDisplay)

  useEffect(() => {
    if (!isFadeFirstDisplay) {
      dispatch(setIsFadeFirstDisplay(true))
    }

    return () => { dispatch(setIsFadeFirstDisplay(false)) }
  }, [])

  // готовы ли карточки для отображения? (ожидаем загрузки изображений карточек)
  const isCardsComletedForDisplay = ((arrForShowSearchResultProducts.length === countFilterCards && countLoadedImagesCards === countFilterCards) || (countLoadedImagesCards === arrForShowSearchResultProducts.length))


  return (

    <Container>

      <Fade in={isFadeFirstDisplay}>
        <StyledBoxFilter
          datafordisplay={{ activeButtonInFilter, isCardsComletedForDisplay }}
        >
          {apiFoundProductsAfterSubmit.length > 1 &&
            <FilterCategories apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit} />
          }
        </StyledBoxFilter>
      </Fade>

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
