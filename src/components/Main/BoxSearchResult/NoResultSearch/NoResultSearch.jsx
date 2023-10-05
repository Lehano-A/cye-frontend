import React from "react";
import { Box, Container, Stack, Typography, } from "@mui/material";


function NoResultSearch({ searchValueWithoutResult }) {
  return (
    <Container>
      <Stack>

        <Box sx={{ display: 'flex', marginBottom: '10px' }}>
          <Typography
            variant="h6"
            sx={{ marginRight: '10px' }}>
            Находились в поисках:
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: '700' }}
          >
            {searchValueWithoutResult}
          </Typography>
        </Box>

        <Typography>
          К сожалению, такой продукт не получилось найти 😕
        </Typography>

      </Stack>
    </Container>
  )
}

export default NoResultSearch