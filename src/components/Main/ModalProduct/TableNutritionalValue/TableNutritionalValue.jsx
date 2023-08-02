import React from "react"
import { Box, Typography, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material'
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => {
  return {
    fontWeight: 'bold'
  }
})


function TableNutritionalValue({ data }) {

  const { protein, fats, carbs, calories } = data

  return (
    <Box sx={{ padding: '8px 0' }}>
      <Typography variant="h6" fontSize="16px" fontWeight={700}>Пищевая ценность на 100 г</Typography>
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
    </Box>
  )
}

export default TableNutritionalValue