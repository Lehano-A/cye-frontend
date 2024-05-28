import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import log from 'loglevel';
import useChangeDocTitle from "../../hooks/useChangeDocTitle";
import checkUserDevice from "../../helpers/checkUserDevice";
import { useDispatch, useSelector } from "react-redux";
import { setUserDevice } from "../../redux/reducers/slices/checkUserDeviceSlice";
import { incrementCountPathnames } from "../../redux/reducers/slices/navigationSlice";
import {
  ACTIONS_NAVIGATION,
  CHANGE_STATE_IN_LOCATION_STORE,
  CONSTRUCTION_LOCATION_CONFIG,
  NAVIGATION,
  CHANGING_DOC_TITLE,
  SILENT,
  TRACE,
  OPENED_MODAL_PRODUCT_PAGE,
  SEND_TO_API,
  MODAL_PRODUCT,
  OPENING_MODAL_PRODUCT_BY_LINK,
  CREATE_REQ_CONFIG_SEARCH_PRODUCT,
  SEARCH_PRODUCT_RESULT_PAGE,
  HISTORY_SUBMIT,
} from "../../helpers/constants";


/* trace, debug, info, warn, error, silent */
if (process.env.NODE_ENV === 'development') {
  const level = SILENT

  log.getLogger(CONSTRUCTION_LOCATION_CONFIG).setLevel(level)
  log.getLogger(ACTIONS_NAVIGATION).setLevel(level)
  log.getLogger(CHANGE_STATE_IN_LOCATION_STORE).setLevel(level)
  log.getLogger(OPENED_MODAL_PRODUCT_PAGE).setLevel(level)
  log.getLogger(NAVIGATION).setLevel(level)
  log.getLogger(CHANGING_DOC_TITLE).setLevel(level)
  log.getLogger(SEND_TO_API).setLevel(level)
  log.getLogger(MODAL_PRODUCT).setLevel(level)
  log.getLogger(OPENING_MODAL_PRODUCT_BY_LINK).setLevel(level)
  log.getLogger(CREATE_REQ_CONFIG_SEARCH_PRODUCT).setLevel(level)
  log.getLogger(SEARCH_PRODUCT_RESULT_PAGE).setLevel(level)
  log.getLogger(HISTORY_SUBMIT).setLevel(level)
} else {
  log.setLevel(SILENT)
}


const styleMainBox = {
  maxWidth: '1280px',
  margin: '0 auto'
}



function App() {

  const dispatch = useDispatch()
  const location = useLocation()
  const changeDocTitle = useChangeDocTitle()
  const selectedCard = useSelector((state) => state.cardProduct.selectedCard)
  const countPathname = useSelector((state) => state.navigation.countPathname)


  useEffect(() => {
    const device = checkUserDevice()
    dispatch(setUserDevice(device))
  }, [])



  useEffect(() => {
    if (countPathname === 0) {
      dispatch(incrementCountPathnames())
    }
    changeDocTitle()
  }, [location.pathname, location.search, location.state?.store?.docTitle, selectedCard])


  return (
    <>
      <Header />

      <main style={styleMainBox}>
        <Outlet />
      </main>
    </>
  )
}

export default App;