import React from "react";
import { Stack, Typography, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MEDIA_XS_MODAL_PRODUCT } from "../../../../utils/constants";


const StyledMainStack = styled(Stack)(() => {
  return {
    alignItems: 'center',

    [MEDIA_XS_MODAL_PRODUCT]: {
      margin: '40px 20px 10px'
    }
  }
})



function NoResultSearch({ searchValueWithoutResult, apiFoundProductsAfterSubmit }) {

  const { search } = apiFoundProductsAfterSubmit
  const { searchBy } = search

  const searchByValue = searchBy === 'brand' ? 'бренда' : searchBy === 'category' && 'категории'
  const textFailedSearch = searchBy === 'brand' ? 'такой бренд' : searchBy === 'category' ? ' такую категорию' : 'такой продукт'


  return (
    <StyledMainStack>

      <Typography
        variant="h6"
        sx={{ textAlign: 'center' }}
      >
        Находились в {!searchByValue ? 'поисках: ' : `поисках ${searchByValue}: `}
        <span style={{ display: 'inline', fontWeight: '700' }}>
          {searchValueWithoutResult}
        </span>
      </Typography>

      <Typography sx={{ textAlign: 'center', margin: '20px 0 0' }}>
        К сожалению, {textFailedSearch} не получилось найти 😕
      </Typography>

    </StyledMainStack>
  )
}

export default NoResultSearch