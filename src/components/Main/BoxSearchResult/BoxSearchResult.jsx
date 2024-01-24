import React from "react";
import { Box, Stack, Fade } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import FilterCategoriesContainer from "../../../containers/FilterCategoriesContainer";
import GridCardsProductsContainer from "../../../containers/GridCardsProductsContainer";
import ButtonPagination from "./ButtonPagination/ButtonPagination";
import NoResultSearch from "./NoResultSearch/NoResultSearch";

/* -------------------------------- selectors ------------------------------- */
import { selectApiFoundProductsAfterSubmit } from "../../../redux/reducers/selectors/searchRequestProductSelectors";
import { selectArrForShowSearchResultProducts, selectIsLoadingIndicatorBoxSearchResult, selectSearchValueWithoutResult } from "../../../redux/reducers/selectors/boxSearchResultSelectors";
import { selectNameActiveButtonInFilter } from "../../../redux/reducers/selectors/filterCategoriesSelectors";
import { selectIsDisplayedButtonPagination } from "../../../redux/reducers/selectors/paginationSelectors";
import { MEDIA_XS_MODAL_PRODUCT } from "../../../utils/constants";


const StyledBoxLoadingIndicator = styled(Box)(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    margin: "80px 0 0 0",
  }
})


const StyledBoxFilter = styled(Box)(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    margin: '31px 0 20px',
  }
})


const StyledBoxGridCardsProducts = styled(Stack)(({ params }) => {
  const { isDisplayedButtonPagination } = params

  return {
    margin: `80px 0 ${isDisplayedButtonPagination ? '38px' : '88px'} 0`,

    [MEDIA_XS_MODAL_PRODUCT]: {
      margin: `40px 0 ${isDisplayedButtonPagination ? '38px' : '88px'} 0`,
    }
  }
})



function BoxSearchResult() {

  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)
  const arrForShowSearchResultProducts = useSelector(selectArrForShowSearchResultProducts)
  const activeButtonFilter = useSelector(selectNameActiveButtonInFilter)
  const isLoadingBoxSearchResult = useSelector(selectIsLoadingIndicatorBoxSearchResult)
  const searchValueWithoutResult = useSelector(selectSearchValueWithoutResult)
  const isDisplayedButtonPagination = useSelector(selectIsDisplayedButtonPagination)
  const isVisibleModalProduct = useSelector((state) => state.modalProduct.isVisibleModalProduct)


  return (
    <Stack sx={{ alignItems: 'center', position: 'relative', zIndex: isVisibleModalProduct ? -1 : 0 }}>

      {
        isLoadingBoxSearchResult ?

          (
            <StyledBoxLoadingIndicator>
              <LoadingIndicator />
            </StyledBoxLoadingIndicator>
          )

          :

          /*
          если после сабмита в ответе от сервера продуктов > 1 или нажимается кнопка фильтра (тогда фильтр должен отображаться)
          */
          (
            <>
              {
                (apiFoundProductsAfterSubmit?.result?.length > 1 || activeButtonFilter) &&
                <Fade in={true}>
                  <StyledBoxFilter>
                    <FilterCategoriesContainer
                      apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit}
                      foundProducts={apiFoundProductsAfterSubmit.result}
                      searchBy={apiFoundProductsAfterSubmit?.searchBy}
                    />
                  </StyledBoxFilter>
                </Fade>
              }



              {
                arrForShowSearchResultProducts.length > 0 &&
                <Fade in={true}>
                  <StyledBoxGridCardsProducts params={{ isDisplayedButtonPagination }}>
                    <GridCardsProductsContainer
                      arrForShowSearchResultProducts={arrForShowSearchResultProducts}
                    />
                  </StyledBoxGridCardsProducts>
                </Fade>
              }



              {
                isDisplayedButtonPagination &&
                <Fade in={true}>
                  <Box sx={{ margin: '30px 0 80px' }}>
                    <ButtonPagination />
                  </Box>
                </Fade>
              }



              {
                apiFoundProductsAfterSubmit?.result.length === 0 && !isLoadingBoxSearchResult &&
                <Fade in={true}>
                  <Box>
                    <NoResultSearch
                      searchValueWithoutResult={searchValueWithoutResult}
                      apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit}
                    />
                  </Box>
                </Fade>
              }
            </>
          )
      }
    </Stack>
  )
}

export default BoxSearchResult
