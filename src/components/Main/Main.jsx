import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import FormSearch from "../FormSearch/FormSearch";
import BoxSearchResult from "../BoxSearchResult/BoxSearchResult";
import ModalProduct from "../ModalProduct/ModalProduct";


function Main() {

  const isVisible = useSelector(state => state.modalCardProduct.visible)

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

      {isVisible && <ModalProduct />}
    </>
  )
}

export default Main