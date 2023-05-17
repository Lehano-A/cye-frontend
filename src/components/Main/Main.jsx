import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import FormSearch from "../FormSearch/FormSearch";
import BoxSearchResult from "../BoxSearchResult/BoxSearchResult";
import ModalProduct from "../ModalProduct/ModalProduct";

const styleBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '120px',
}


function Main() {

  const isVisible = useSelector(state => state.modalCardProduct.visible)

  return (
    <>
      <Box sx={styleBox}>
        <FormSearch />
      </Box>

      <BoxSearchResult />

      {isVisible && <ModalProduct />}
    </>
  )
}

export default Main