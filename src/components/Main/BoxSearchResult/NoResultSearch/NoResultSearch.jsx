import React from "react";
import { Box, Container, Stack, Typography, } from "@mui/material";



function NoResultSearch({ searchValueWithoutResult, apiFoundProductsAfterSubmit }) {

  const { search } = apiFoundProductsAfterSubmit
  const { searchBy } = search

  const searchByValue = searchBy === 'brand' ? 'бренда' : searchBy === 'category' && 'категории'
  const textFailedSearch = searchBy === 'brand' ? 'такой бренд' : searchBy === 'category' ? ' такую категорию' : 'такой продукт'


  return (
    <Container>
      <Stack>

        <Box sx={{ display: 'flex', marginBottom: '10px' }}>
          <Typography
            variant="h6"
            sx={{ marginRight: '10px' }}>
            Находились в поисках {searchByValue}
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: '700' }}
          >
            {searchValueWithoutResult}
          </Typography>
        </Box>

        <Typography>
          К сожалению, {textFailedSearch} не получилось найти 😕
        </Typography>

      </Stack>
    </Container>
  )
}

export default NoResultSearch