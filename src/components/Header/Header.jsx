import React from "react";
import { useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import FormSearch from "./FormSearch/FormSearch";

const styleBoxForm = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


function Header() {
  const isVisibleFilterCategories = useSelector((state) => state.filterCategories.isVisible)


  return (
    <Paper variant='header'>

      <Box
        component="header"
        sx={{
          'backgroundColor': '#eef0f9',
          padding: '120px 0',
          margin: !isVisibleFilterCategories ? `0 0 80px 0` : `0 0 31px 0`,
        }}
      >

        <Box sx={styleBoxForm}>
          <FormSearch />
        </Box>

      </Box>
    </Paper>
  )
}

export default Header