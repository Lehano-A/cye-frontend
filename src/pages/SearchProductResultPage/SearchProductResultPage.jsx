import { useEffect } from "react"
import queryString from 'query-string'
import loglevel from 'loglevel'
import { Outlet, createSearchParams, useLocation, useNavigationType, useParams } from "react-router-dom"
import useSendingReqToApi from "../../hooks/useSendingReqToApi"
import { useDispatch, useSelector } from "react-redux"
import { startLoadingIndicatorBoxSearchResult } from "../../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions"
import api from "../../api/api"
import { setIsRedirectionFromModalProductPage } from "../../redux/reducers/slices/navigationSlice"
import { BRAND_AND_CATEGORY, MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK, SEARCH_PRODUCT_RESULT_PAGE } from "../../utils/constants"
import BoxSearchResult from "../../components/Main/BoxSearchResult/BoxSearchResult"


const log = loglevel.getLogger(SEARCH_PRODUCT_RESULT_PAGE)



function SearchProductResultPage() {

  const location = useLocation()
  const params = useParams()
  const sendingReqToApi = useSendingReqToApi()
  const dispatch = useDispatch()
  const navigationType = useNavigationType()

  const isRedirectionFromModalProductPage = useSelector((state) => state.navigation.isRedirectionFromModalProductPage)


  useEffect(() => {
    // когда произошло движение по истории НАЗАД или ВПЕРЁД, или ОБНОВИЛАСЬ страница, или страница ОТКРЫЛАСЬ ПО ССЫЛКЕ
    if (navigationType === 'POP' || (navigationType === 'REPLACE' && isRedirectionFromModalProductPage)) {
      log.debug(`
      Открылась страница "SearchProductResultPage"

      navigationType: ${navigationType}
      search: ${location.search}
      params: `, params)

      dispatch(startLoadingIndicatorBoxSearchResult())

      if (isRedirectionFromModalProductPage) {
        dispatch(setIsRedirectionFromModalProductPage(false))
      }


      const parsedQueryParams = queryString.parse(location.search)

      sendingReqToApi.findProduct({
        stage: MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK,
        apiMethod: api.findProduct,
        searchData: createSearchParams({
          ...parsedQueryParams,
          ...params,
          totalPages: null,
          navPop: true,
        }),
        segmentSearch: params.searchBy || BRAND_AND_CATEGORY
      })
    }

  }, [window.history.state.idx])



  return (
    <>
      <BoxSearchResult />

      <Outlet />
    </>
  )
}

export default SearchProductResultPage