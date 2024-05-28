import { useEffect } from "react"
import loglevel from 'loglevel'
import ModalProduct from "../../components/Main/ModalProduct/ModalProduct"
import { useLocation, useNavigationType, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setIsRedirectionFromModalProductPage } from "../../redux/reducers/slices/navigationSlice"
import { changeVisibleModalProduct } from "../../redux/reducers/slices/modalProductSlice"
import { resetStatesByDefaultCardProduct, setSelectedCard } from "../../redux/reducers/slices/cardProductSlice"
import { saveCurrentPathDataBeforeOpeningModalProduct } from "../../redux/reducers/actions/navigation/navigation"
import useActionsNavigation from "../../hooks/useActionsNavigation/useActionsNavigation"
import queryString from "query-string"
import createQueryParams from "../../helpers/navigation/createQueryParams"
import constructLocationConfig from "../../helpers/navigation/constructLocationConfig"
import useSendingReqToApi from "../../hooks/useSendingReqToApi"
import { startLoadingIndicatorBoxSearchResult } from "../../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions"
import {
  OPENED_MODAL_PRODUCT_PAGE,
  OPENING_MODAL_PRODUCT_BY_LINK,
  REDIRECTION_FROM_MODAL_PRODUCT_PAGE
} from "../../helpers/constants"


const log = loglevel.getLogger(OPENED_MODAL_PRODUCT_PAGE)



function OpenedModalProductPage({ ErrorComponent }) {

  const dispatch = useDispatch()
  const navigationType = useNavigationType()
  const params = useParams()
  const location = useLocation()
  const actionsNavigation = useActionsNavigation()
  const sendingReqToApi = useSendingReqToApi()

  const selectedCard = useSelector((state) => state.cardProduct.selectedCard)
  const savedPathDataBeforeOpeningModalProduct = useSelector((state) => state.navigation.savedPathDataBeforeOpeningModalProduct)
  const countPathnames = useSelector((state) => state.navigation.countPathnames)
  const hasApiTimeoutError = useSelector((state) => state.searchRequestProduct.hasApiTimeoutError)


  useEffect(() => {
    log.debug(`
    Открылась страница - OpenedModalProductPage

    navigationType: ${navigationType}
    countPathnames: ${countPathnames}
    location: `, location)

    /*
    Если осуществился переход по истории на страницу с модалом продукта.
    Так может произойти, когда пользователь находится на странице с модалом продукта, нажимает кнопку "назад" в истории и возвращается обратно, нажав кнопку "вперёд".
    */
    if (navigationType === 'POP' && countPathnames !== 0) {
      dispatch(setIsRedirectionFromModalProductPage(true)) // сообщает о переадресации со страницы модала продукта
      dispatch(changeVisibleModalProduct(false))

      actionsNavigation.replacePathname({
        stage: REDIRECTION_FROM_MODAL_PRODUCT_PAGE,
        savedPathDataBeforeOpeningModalProduct
      })
      return
    }


    // когда открывается модальное окно продукта по ссылке
    if (!selectedCard.data) {
      const { permalinkProductTitle } = params
      dispatch(startLoadingIndicatorBoxSearchResult())
      sendReqToApiWhenFirstOpeneningModalProduct(permalinkProductTitle)
    }

    dispatch(changeVisibleModalProduct(true))


    return () => {
      dispatch(resetStatesByDefaultCardProduct())
      dispatch(changeVisibleModalProduct(false))
    }
  }, [])



  function preHandleLocationConfig(parsedQueryParams) {
    const { searchBy = null, page = null, searchValue = null } = parsedQueryParams

    const dataForConfig = {
      withoutLocationState: true,
      dataForPathname: {},
      dataForQueryParams: {
        page: page ? page : 1, // если по какой-то причине не была передана нумерация страницы
      },
    }

    dataForConfig.dataForPathname.searchBy = searchBy


    if (searchBy === 'brand') {
      dataForConfig.dataForPathname.permalink = { brand: params.permalinkBrand }
    } else

      if (searchBy === 'category') {
        dataForConfig.dataForPathname.permalink = {
          category: params.permalinkCategory
        }
      } else

        if (searchBy === 'text') {
          dataForConfig.dataForQueryParams.searchValue = searchValue
        } else

          if (params.permalinkBrand && params.permalinkCategory) {
            dataForConfig.dataForPathname.permalink = {
              brand: params.permalinkBrand,
              category: params.permalinkCategory,
            }
          }

    return dataForConfig
  }



  function sendReqToApiWhenFirstOpeneningModalProduct(permalinkProductTitle) {
    const parsedQueryParams = queryString.parse(location.search)

    const dataForPathConfig = preHandleLocationConfig(parsedQueryParams)
    const pathConfig = constructLocationConfig(dataForPathConfig)
    const pathDataBeforeOpeningModalProduct = dispatch(saveCurrentPathDataBeforeOpeningModalProduct({
      stage: OPENING_MODAL_PRODUCT_BY_LINK,
      dataForSavingLocationState: {
        params,
        ...pathConfig,
        inputValue: parsedQueryParams.searchValue || '',

      }
    }))

    dispatch(setSelectedCard({
      data: null,
      status: 'loading',
      message: null,
    }))

    const querySearchParams = createQueryParams({
      titleProductWithBG: true,
      dataForBG: parsedQueryParams,
      permalinkProductTitle,
    })

    sendingReqToApi.findProductForModalOpenedByLink(querySearchParams, pathDataBeforeOpeningModalProduct)
  }

  useEffect(() => {
    if (hasApiTimeoutError) {
      dispatch(setSelectedCard({
        data: null,
        status: null,
        message: null,
      }))
    }
  }, [hasApiTimeoutError])


  return (
    <ModalProduct ErrorComponent={ErrorComponent} />
  )
}

export default OpenedModalProductPage