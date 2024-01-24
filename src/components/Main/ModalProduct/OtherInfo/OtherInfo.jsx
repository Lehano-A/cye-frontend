import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";


const StyledMainBox = styled(Box)(() => {
  return {
    width: '100%',
    minWidth: '250px',
    maxWidth: '500px',
  }
})


const StyledList = styled(List)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',

  }
})


const StyledListItem = styled(ListItem)(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0,
  }
})


const StyledTitle = styled(Typography)(() => {
  return {
    display: 'inline-flex',
    width: '100%',
    fontSize: "12px",
    fontWeight: 700,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',

    '&::after': {
      content: "''",
      display: 'inline',
      width: '100%',
      borderBottom: '1px dashed #d9d9d9',
      margin: '0 10px 5px'
    }
  }
})


const StyledValue = styled(Typography)(() => {
  return {
    whiteSpace: 'nowrap',
    fontSize: "14px",
  }
})



function OtherInfo({ data }) {

  const { company, otherInfo } = data

  const { brand, manufacture, countryManufacture } = company
  const { title } = brand

  const { typePackage, weight, shelfLife } = otherInfo


  return (
    <StyledMainBox>
      <StyledList>

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

        <StyledListItem>
          <StyledTitle variant="h6">Срок хранения</StyledTitle>
          <StyledValue variant="body2">{shelfLife}</StyledValue>
        </StyledListItem>

        <StyledListItem>
          <StyledTitle variant="h6">Тип упаковки</StyledTitle>
          <StyledValue variant="body2">{typePackage}</StyledValue>
        </StyledListItem>

        <StyledListItem>
          <StyledTitle variant="h6">Вес</StyledTitle>
          <StyledValue variant="body2">{weight}</StyledValue>
        </StyledListItem>

      </StyledList>
    </StyledMainBox>
  )
}

export default OtherInfo