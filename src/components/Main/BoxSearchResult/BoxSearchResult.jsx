import React from "react";
import { Box, Typography, Container, Fade } from "@mui/material";
import GridCardsProduct from "./GridCardsProduct/GridCardsProduct";
import { styled } from "@mui/material/styles";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import FilterCategoriesContainer from "../../../containers/FilterCategoriesContainer";

const StyledBoxFilter = styled(Box)(({ datafordisplay }) => {

  const { isCardsReadyForDisplay, activeButtonInFilter } = datafordisplay;

  return {
    display: isCardsReadyForDisplay || activeButtonInFilter ? 'flex' : 'none',
    justifyContent: 'center',
    margin: "80px 0 0 0"
  }
})


function BoxSearchResult({
  apiFoundProductsAfterSubmit,
  isCardsReadyForDisplay,
  activeButtonInFilter,
  isFadeFirstDisplay,
  searchBy,
  arrForShowSearchResultProducts,
  isLoadingBoxSearchResult,
  searchValueWithoutResult,
}) {


  return (
    <Container>
      {
        /* если после сабмита в ответе от сервера продуктов > 1 и карточки готовы к отображению,
          или нажимается кнопка фильтра (тогда фильтр должен отображаться)
       */
      }
      {((apiFoundProductsAfterSubmit?.length > 1 && isCardsReadyForDisplay) || activeButtonInFilter) &&

        <Fade in={isFadeFirstDisplay}>
          <StyledBoxFilter
            datafordisplay={{
              isCardsReadyForDisplay,
              activeButtonInFilter,
            }}
          >

            <FilterCategoriesContainer
              apiFoundProductsAfterSubmit={apiFoundProductsAfterSubmit}
              searchBy={searchBy}
            />

          </StyledBoxFilter>
        </Fade>
      }


      {
        arrForShowSearchResultProducts?.length > 0 &&
        <Fade in={isCardsReadyForDisplay}>

          <Container sx={{
            display: isCardsReadyForDisplay ? 'block' : 'none',
            margin: "80px 0 0 0"
          }}>
            <GridCardsProduct
              arrForShowSearchResultProducts={arrForShowSearchResultProducts}
            />
          </Container>

        </Fade>
      }


      {
        (apiFoundProductsAfterSubmit?.length === 0 && !isLoadingBoxSearchResult) &&
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>

            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <Typography variant="h6" sx={{ marginRight: '10px' }}>Находились в поисках: </Typography>
              <Typography variant="h6" sx={{ fontWeight: '700' }}>{searchValueWithoutResult}</Typography>
            </Box>

            <Typography>
              К сожалению, такой продукт не получилось найти 😕
            </Typography>
          </Box>

        </Box>
      }


      {
        isLoadingBoxSearchResult &&
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: "80px 0 0 0" }}>
          <LoadingIndicator />
        </Box>
      }


    </Container>
  )
}

export default BoxSearchResult
