import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BoxSearchResultContainer from "../../containers/BoxSearchResultContainers";
import ModalProduct from "./ModalProduct/ModalProduct";
import Welcome from "./ModalProduct/Welcome/Welcome";
import checkerUserDevice from "../../utils/checkerUserDevice";

/* --------------------------------- slices --------------------------------- */
import { setUserDevice } from "../../redux/reducers/slices/checkUserDeviceSlice";


const styleMainBox = {
  maxWidth: '1280px',
  margin: '0 auto'
}



function Main() {
  const dispatch = useDispatch()

  const isVisible = useSelector(state => state.modalCardProduct.visible)
  const wasFirstSubmit = useSelector(state => state.inputSearch.wasFirstSubmit)

  useEffect(() => {
    const device = checkerUserDevice()
    dispatch(setUserDevice(device))

  }, [])


  return (
    <main style={styleMainBox}>

      {wasFirstSubmit ? <BoxSearchResultContainer /> : <Welcome />}

      {isVisible && <ModalProduct />}

    </main>
  )
}

export default Main