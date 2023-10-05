import React from "react";
import { Box, Stack, Fade } from "@mui/material";
import GridCardsProductsContainer from "../../../containers/GridCardsProductsContainer";
import { styled } from "@mui/material/styles";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import FilterCategoriesContainer from "../../../containers/FilterCategoriesContainer";
import ButtonPagination from "./ButtonPagination/ButtonPagination";
import NoResultSearch from "./NoResultSearch/NoResultSearch";

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
    margin: "30px 0 0 0"
  }
})

const StyledBoxGridCardsProducts = styled(Stack)(({ params }) => {
  const { isDisplayedButtonPagination } = params

  return {
    margin: `80px 0 ${isDisplayedButtonPagination ? '38px' : '88px'} 0`,
  }
})


function BoxSearchResult({
  apiFoundProductsAfterSubmit,
  activeButtonInFilter,
  searchBy,
  arrForShowSearchResultProducts,
  isLoadingBoxSearchResult,
  searchValueWithoutResult,
  isDisplayedButtonPagination,
}) {


  return (
    <Stack sx={{ alignItems: 'center' }}>
      {
        /* если после сабмита в ответе от сервера продуктов > 1 или нажимается кнопка фильтра (тогда фильтр должен отображаться)
       */
      }
      {((apiFoundProductsAfterSubmit?.result.length > 1) || activeButtonInFilter) &&
        <Fade in={true}>
          <StyledBoxFilter>
            <FilterCategoriesContainer
              apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit?.result}
              searchBy={searchBy}
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
          <Box sx={{ margin: '0 0 50px' }}>
            <ButtonPagination />
          </Box>
        </Fade>
      }


      {
        (apiFoundProductsAfterSubmit?.result.length === 0 && !isLoadingBoxSearchResult) &&
        <Fade in={true}>
          <Box>
            <NoResultSearch searchValueWithoutResult={searchValueWithoutResult} />
          </Box>
        </Fade>
      }


      {
        isLoadingBoxSearchResult &&
        <StyledBoxLoadingIndicator>
          <LoadingIndicator />
        </StyledBoxLoadingIndicator>
      }

    </Stack>
  )
}

export default BoxSearchResult
