import React from "react";
import { Box } from "@mui/material";
import FormSearch from "../FormSearch/FormSearch";
import BoxSearchResult from "../BoxSearchResult/BoxSearchResult";


function Main() {

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '150px',
      }}>
        <FormSearch />
      </Box>

      <BoxSearchResult />


    </>
  )
}

export default Main