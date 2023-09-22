import React from "react"
import { Box, Typography, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material'
import { styled } from "@mui/material/styles";
import { grey } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(() => {
  return {
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
})

const styleMainBox = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px 0',
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
            <StyledTableCell align="center">Белки</StyledTableCell>
            <StyledTableCell align="center">Жиры</StyledTableCell>
            <StyledTableCell align="center">Углеводы</StyledTableCell>
            <StyledTableCell align="center">Калорийность</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="center">{protein} г</TableCell>
            <TableCell align="center">{fats} г</TableCell>
            <TableCell align="center">{carbs} г</TableCell>
            <TableCell align="center">{calories} ккал</TableCell>
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