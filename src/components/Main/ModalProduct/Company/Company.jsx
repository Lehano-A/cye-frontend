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
    whiteSpace: 'nowrap',

    '&:not(:last-of-type)': {
      marginRight: '50px',
    }
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

  const { brand, manufacture, countryManufacture } = data
  const { title } = brand

  return (
    <Box>
      <List sx={styleList}>

        <StyledListItem>
          <StyledTitle variant="h6">Бренд</StyledTitle>
          <StyledValue variant="body2" >{title}</StyledValue>
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