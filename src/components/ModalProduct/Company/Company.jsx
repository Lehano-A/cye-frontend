import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material"
import styled from "styled-components";

const StyledListItem = styled(ListItem)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    marginRight: '50px',
    whiteSpace: 'nowrap',
  }
})



function Company({ data }) {

  const { brand, manufacture, countryManufacture } = data;

  return (
    <Box>
      <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledListItem>

          <Typography
            variant="h6"
            fontSize="16px"
            fontWeight={700}
          >
            Бренд
          </Typography>

          <Typography
            variant="body2"
            pt={'8px'}
          >
            {brand}
          </Typography>
        </StyledListItem>


        <StyledListItem>
          <Typography
            variant="h6"
            fontSize="16px"
            fontWeight={700}
          >
            Производитель
          </Typography>

          <Typography
            variant="body2"
            pt={'8px'}
          >
            {manufacture}
          </Typography>
        </StyledListItem>


        <StyledListItem>
          <Typography
            variant="h6"
            fontSize="16px"
            fontWeight={700}
          >
            Страна производства
          </Typography>

          <Typography
            variant="body2"
            pt={'8px'}
          >
            {countryManufacture}
          </Typography>
        </StyledListItem>
      </List>
    </Box>
  )
}

export default Company