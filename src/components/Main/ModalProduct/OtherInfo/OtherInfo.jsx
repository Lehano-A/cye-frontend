import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledList = styled(List)(() => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
  }
})

const StyledListItem = styled(ListItem)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    width: '50%',
    '&:nth-of-type(n+3)': { paddingTop: '20px' },
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
    pt: '8px',
  }
})



function OtherInfo({ data }) {

  const { typePackage, weight, shelfLife } = data

  return (
    <Box>
      <StyledList>

        <StyledListItem>
          <StyledTitle variant="h6">Тип упаковки</StyledTitle>
          <StyledValue variant="body2">{typePackage}</StyledValue>
        </StyledListItem>


        <StyledListItem>
          <StyledTitle variant="h6">Срок хранения</StyledTitle>
          <StyledValue variant="body2">{shelfLife}</StyledValue>
        </StyledListItem>


        <StyledListItem>
          <StyledTitle variant="h6">Вес</StyledTitle>
          <StyledValue variant="body2">{weight}</StyledValue>
        </StyledListItem>

      </StyledList>
    </Box>
  )
}

export default OtherInfo