import React from "react";
import { Box, Paper } from "@mui/material";
import InputSearch from "./InputSearch/InputSearch";

const styleHeader = {
  backgroundColor: 'rgba(92, 112, 200, 0.1)',
  padding: '120px 0',
  marginBottom: '80px',
}

const styleBoxForm = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


function Header() {
  return (
    <Paper variant='header'>
      <header style={styleHeader}>

        <Box sx={styleBoxForm}>
          <InputSearch />
        </Box>

      </header>
    </Paper>
  )
}

export default Header