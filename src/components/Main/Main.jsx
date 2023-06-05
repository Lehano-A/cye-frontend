import React from "react";
import { useSelector } from "react-redux";
import BoxSearchResult from "./BoxSearchResult/BoxSearchResult";
import ModalProduct from "./ModalProduct/ModalProduct";
import Welcome from "./Welcome/Welcome";

const styleMainBox = {
  maxWidth: '1280px',
  margin: '0 auto'
}


function Main() {

  const isVisible = useSelector(state => state.modalCardProduct.visible)
  const isSubmitting = useSelector(state => state.inputSearch.isSubmitting)

  return (

    <main style={styleMainBox}>

      {isSubmitting ? <BoxSearchResult /> : <Welcome />}

      {isVisible && <ModalProduct />}

    </main>

  )
}

export default Main