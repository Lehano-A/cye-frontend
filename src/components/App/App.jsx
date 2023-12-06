import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import log from 'loglevel';
import useChangeDocTitle from "../../hooks/useChangeDocTitle";
import checkUserDevice from "../../utils/checkUserDevice";
import { useDispatch, useSelector } from "react-redux";
import { setUserDevice } from "../../redux/reducers/slices/checkUserDeviceSlice";
import { incrementCountPathnames, resetPageWithError } from "../../redux/reducers/slices/navigationSlice";
import { selectIsLoadingIndicatorBoxSearchResult } from "../../redux/reducers/selectors/boxSearchResultSelectors";
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
} from "../../utils/constants";


/* trace, debug, info, warn, error, silent */
if (process.env.NODE_ENV === 'development') {
  log.getLogger(CONSTRUCTION_LOCATION_CONFIG).setLevel(SILENT)
  log.getLogger(ACTIONS_NAVIGATION).setLevel(SILENT)
  log.getLogger(CHANGE_STATE_IN_LOCATION_STORE).setLevel(SILENT)
  log.getLogger(OPENED_MODAL_PRODUCT_PAGE).setLevel(SILENT)
  log.getLogger(NAVIGATION).setLevel(SILENT)
  log.getLogger(CHANGING_DOC_TITLE).setLevel(SILENT)
  log.getLogger(SEND_TO_API).setLevel(SILENT)
  log.getLogger(MODAL_PRODUCT).setLevel(SILENT)
  log.getLogger(OPENING_MODAL_PRODUCT_BY_LINK).setLevel(SILENT)
  log.getLogger(CREATE_REQ_CONFIG_SEARCH_PRODUCT).setLevel(SILENT)
  log.getLogger(SEARCH_PRODUCT_RESULT_PAGE).setLevel(SILENT)
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
  const pageWithError = useSelector((state) => state.navigation.pageWithError)
  const isLoadingIndicatorBoxSearchResult = useSelector(selectIsLoadingIndicatorBoxSearchResult)


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


  useEffect(() => {
    if (pageWithError.status) {
      dispatch(resetPageWithError())
    }
  }, [location.pathname, location.search, isLoadingIndicatorBoxSearchResult])



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