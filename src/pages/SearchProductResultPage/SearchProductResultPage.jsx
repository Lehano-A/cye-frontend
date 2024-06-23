import { useEffect } from "react"
import queryString from 'query-string'
import loglevel from 'loglevel'
import { Outlet, createSearchParams, useLocation, useNavigationType, useParams } from "react-router-dom"
import useSendingReqToApi from "../../hooks/useSendingReqToApi"
import { useDispatch, useSelector } from "react-redux"
import { startLoadingIndicatorBoxSearchResult } from "../../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions"
import api from "../../api/api"
import { setIsRedirectionFromModalProductPage } from "../../redux/reducers/slices/navigationSlice"
import BoxSearchResult from "../../components/Main/BoxSearchResult/BoxSearchResult"
import { BRAND_AND_CATEGORY, MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK, SEARCH_PRODUCT_RESULT_PAGE } from "../../helpers/constants"
import useQueryParams from "../../hooks/useQueryParams"


const log = loglevel.getLogger(SEARCH_PRODUCT_RESULT_PAGE)



function SearchProductResultPage({ ErrorComponent }) {

  const location = useLocation()
  const params = useParams()
  const sendingReqToApi = useSendingReqToApi()
  const dispatch = useDispatch()
  const navigationType = useNavigationType()
  const { queryParams } = useQueryParams()

  const isRedirectionFromModalProductPage = useSelector((state) => state.navigation.isRedirectionFromModalProductPage)
  const isVisibleModalProduct = useSelector((state) => state.modalProduct.isVisibleModalProduct)
  const apiFoundProductsAfterSubmit = useSelector((state) => state.searchRequestProduct.apiFoundProductsAfterSubmit)

  useEffect(() => {
    // когда произошло движение по истории НАЗАД или ВПЕРЁД, или ОБНОВИЛАСЬ страница, или страница ОТКРЫЛАСЬ ПО ССЫЛКЕ
    if (navigationType === 'POP' || (navigationType === 'REPLACE' && isRedirectionFromModalProductPage)) {
      log.debug(`
      Открылась страница "SearchProductResultPage"
      Тип действия: движение по истории НАЗАД или ВПЕРЁД, или ОБНОВИЛАСЬ страница, или страница ОТКРЫЛАСЬ ПО ССЫЛКЕ

      navigationType: ${navigationType}
      search: ${location.search}
      params: `, params)

      dispatch(startLoadingIndicatorBoxSearchResult())

      if (isRedirectionFromModalProductPage) {
        dispatch(setIsRedirectionFromModalProductPage(false))
      }

      const parsedQueryParams = queryString.parse(location.search)
      let createdQueryParams

      // если в поисковых параметрах есть "searchBy" с значением - "text", "brand" или "category"
      // тогда поиск нужно производить исключительно по этим параметрам
      if (
        parsedQueryParams.searchBy === "text" ||
        parsedQueryParams.searchBy === "brand" ||
        parsedQueryParams.searchBy === "category"
      ) {
        createdQueryParams = queryParams.create({ withoutDynamicParams: true })
      } else {
        createdQueryParams = queryParams.create()
      }

      sendingReqToApi.findProduct({
        stage: MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK,
        apiMethod: api.findProduct,
        searchData: createdQueryParams,
        segmentSearch: parsedQueryParams.searchBy || params.searchBy || BRAND_AND_CATEGORY
      })
      return


      console.log('createdQueryParams', createdQueryParams);
      sendingReqToApi.findProduct({
        stage: MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK,
        apiMethod: api.findProduct,
        searchData: createdQueryParams,
        segmentSearch: params.searchBy || BRAND_AND_CATEGORY
      })
      return
    }

    // если происходит "классический поиск" через поле поиска
    log.debug(`
      Открылась страница "SearchProductResultPage"
      Тип действия: "классический поиск" через поле поиска

      navigationType: ${navigationType}
      search: ${location.search}
      params: `, params
    )
  }, [window.history.state.idx])



  return (
    <>
      {
        ErrorComponent && apiFoundProductsAfterSubmit?.result.length === 0 && !isVisibleModalProduct ?
          <ErrorComponent />

          :

          <>
            <BoxSearchResult />

            <Outlet />
          </>
      }
    </>
  )
}

export default SearchProductResultPage