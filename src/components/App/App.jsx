import React from "react";
import { CssBaseline } from "@mui/material";
import Header from "../Header/Header";
import Main from "../Main/Main";
import log from 'loglevel';


if (process.env.NODE_ENV === 'development') {
  log.setLevel('debug')
}

function App() {

  return (
    <>
      <CssBaseline />
      <Header />
      <Main />
    </>

  )
}

export default App;