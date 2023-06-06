import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material"
import { styled } from "@mui/material/styles";

const styleList = {
  display: 'flex',
  justifyContent: 'space-between'
}

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

const StyledTitle = styled(Typography)(() => {
  return {
    fontSize: "16px",
    fontWeight: 700,
  }
})

const StyledValue = styled(Typography)(() => {
  return {
    paddingTop: '8px'
  }
})


function Company({ data }) {

  const { brand, manufacture, countryManufacture } = data;

  return (
    <Box>
      <List sx={styleList}>

        <StyledListItem>
          <StyledTitle variant="h6" >Бренд</StyledTitle>
          <StyledValue variant="body2" >{brand}</StyledValue>
        </StyledListItem>


        <StyledListItem>
          <StyledTitle variant="h6" >Производитель</StyledTitle>
          <StyledValue variant="body2" >{manufacture}</StyledValue>
        </StyledListItem>


        <StyledListItem>
          <StyledTitle variant="h6" >Страна производства</StyledTitle>
          <StyledValue variant="body2">{countryManufacture}</StyledValue>
        </StyledListItem>

      </List>
    </Box>
  )
}

export default Company