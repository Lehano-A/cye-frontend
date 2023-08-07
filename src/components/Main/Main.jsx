import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BoxSearchResult from "./BoxSearchResult/BoxSearchResult";
import ModalProduct from "./ModalProduct/ModalProduct";
import Welcome from "./Welcome/Welcome";
import { setUserDevice } from "../../redux/reducers/checkUserDeviceSlice";
import checkerUserDevice from "../../utils/checkerUserDevice";

const styleMainBox = {
  maxWidth: '1280px',
  margin: '0 auto'
}


function Main() {
  const dispatch = useDispatch()

  const isVisible = useSelector(state => state.modalCardProduct.visible)
  const isSubmitting = useSelector(state => state.inputSearch.isSubmitting)
  const userDevice = useSelector(state => state.checkUserDevice.userDevice)

  useEffect(() => {

    const device = checkerUserDevice()
    dispatch(setUserDevice(device))

  }, [])


  return (

    <main style={styleMainBox}>

      {isSubmitting ? <BoxSearchResult /> : <Welcome />}

      {isVisible && <ModalProduct />}

    </main>

  )
}

export default Main