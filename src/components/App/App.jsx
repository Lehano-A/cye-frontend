import React from "react";
import { CssBaseline, Box } from "@mui/material";
import Header from "../Header/Header";
import Main from "../Main/Main";
import log from 'loglevel';

if (process.env.NODE_ENV === 'development') {
  log.setLevel("debug")
} else {
  log.setLevel("silent")
}

function App() {

  return (
    <Box>
      <CssBaseline />
      <Header />
      <Main />
    </Box>

  )
}

export default App;