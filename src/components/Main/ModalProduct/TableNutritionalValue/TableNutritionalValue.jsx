import React from "react"
import { Box, Typography, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material'
import { styled } from "@mui/material/styles";
import { grey } from '@mui/material/colors';
import { MEDIA_XL_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../utils/constants";


const StyledTableCellHead = styled(TableCell)(() => {
  return {
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',

    [MEDIA_XS_MODAL_PRODUCT]: {
      padding: '8px'
    },

    [MEDIA_XL_MODAL_PRODUCT]: {
      padding: '16px'
    },

  }
})


const StyledTableCellBody = styled(TableCell)(() => {
  return {
    [MEDIA_XS_MODAL_PRODUCT]: {
      padding: '8px'
    },

    [MEDIA_XL_MODAL_PRODUCT]: {
      padding: '16px'
    }
  }
})


const styleMainBox = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px 0',
  maxWidth: '350px'
}


const styleTextNutritionalValue = {
  margin: '10px 0 0 0',
  color: grey[400],
  fontSize: "13px",
}



function TableNutritionalValue({ data }) {

  const { protein, fats, carbs, calories } = data


  return (
    <Box sx={styleMainBox}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCellHead align="center">Белки</StyledTableCellHead>
            <StyledTableCellHead align="center">Жиры</StyledTableCellHead>
            <StyledTableCellHead align="center">Углеводы</StyledTableCellHead>
            <StyledTableCellHead align="center">Калорийность</StyledTableCellHead>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <StyledTableCellBody align="center">{protein} г</StyledTableCellBody>
            <StyledTableCellBody align="center">{fats} г</StyledTableCellBody>
            <StyledTableCellBody align="center">{carbs} г</StyledTableCellBody>
            <StyledTableCellBody align="center">{calories} ккал</StyledTableCellBody>
          </TableRow>
        </TableBody>
      </Table>

      <Typography sx={styleTextNutritionalValue}>
        пищевая ценность на 100 г
      </Typography>
    </Box>
  )
}

export default TableNutritionalValue