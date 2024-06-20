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
    flexDirection: 'column',
    alignItems: 'end',
    paddingLeft: 0,
    paddingRight: 0,

    '&:last-child': {
      paddingBottom: 0,
    },
  }
})


const StyledTitle = styled(Typography)(() => {
  return {
    display: 'flex',
    width: '100%',
    fontSize: "12px",
    fontWeight: 700,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    borderBottom: '1px dashed #d9d9d9',
  }
})


const StyledValue = styled(Typography)(() => {
  return {
    fontSize: "14px",
    display: 'inline-block',
    textAlign: 'right',
    whiteSpace: 'normal',
    maxWidth: '58%',
    width: '100%',
    wordBreak: 'break-word',
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
          <StyledValue variant="span" >{title}</StyledValue>
        </StyledListItem>


        <StyledListItem>
          <StyledTitle variant="h6" >Производитель</StyledTitle>
          <StyledValue variant="span" >{manufacture}</StyledValue>
        </StyledListItem>

        <StyledListItem>
          <StyledTitle variant="h6" >Страна производства</StyledTitle>
          <StyledValue variant="span">{countryManufacture}</StyledValue>
        </StyledListItem>

        <StyledListItem>
          <StyledTitle variant="h6">Срок хранения</StyledTitle>
          <StyledValue variant="span">{shelfLife}</StyledValue>
        </StyledListItem>

        <StyledListItem>
          <StyledTitle variant="h6">Тип упаковки</StyledTitle>
          <StyledValue variant="span">{typePackage}</StyledValue>
        </StyledListItem>

        <StyledListItem>
          <StyledTitle variant="h6">Вес</StyledTitle>
          <StyledValue variant="span">{weight}</StyledValue>
        </StyledListItem>

      </StyledList>
    </StyledMainBox>
  )
}

export default OtherInfo