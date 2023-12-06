import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import loglevel from 'loglevel'
import handleAfterResFromApi from "./handlesBlocks/pushPathHistory/handleAfterResFromApi"
import handleAfterClosingModalProduct from "./handlesBlocks/pushPathHistory/handleAfterClosingModalProduct"
import handleOpeningModalProductByLink from "./handlesBlocks/replacePathname/handleOpeningModalProductByLink"
import handleMovementByHistoryUpdatePageOrFollowedLink from "./handlesBlocks/replacePathname/handleMovementByHistoryUpdatePageOrFollowedLink"
import handleOpeningOrClosingModalProduct from "./handlesBlocks/replacePathname/handleOpeningOrClosingModalProduct"
import handleRedirectionFromModalProductPage from "./handlesBlocks/replacePathname/handleRedirectionFromModalProductPage"
import handleBeforeReqToApi from "./handlesBlocks/replacePathname/handleBeforeReqToApi"
import handleAfterErrorPage from "./handlesBlocks/pushPathHistory/handleAfterErrorPage"
import {
  AFTER_CLOSING_MODAL_PRODUCT,
  AFTER_RES_FROM_API,
  BEFORE_REQ_TO_API,
  CLOSING_MODAL_PRODUCT,
  MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK,
  OPENING_MODAL_PRODUCT,
  OPENING_MODAL_PRODUCT_BY_LINK,
  REDIRECTION_FROM_MODAL_PRODUCT_PAGE,
  ACTIONS_NAVIGATION,
  AFTER_ERROR_PAGE,
} from "../../utils/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function useActionsNavigation() {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  return {

    // добавить в историю новый путь
    pushPathInHistory: function ({ stage, dataForSavingLocationState, pathData = null }) {
      log.debug(`
      Вызвали хук: useActionsNavigation
      Метод: pushPathInHistory
      stage: ${stage}

      dataForSavingLocationState: `, dataForSavingLocationState)

      let locationData

      // при классическом поиске продукта, или когда страница открывается по ссылке, или при нажатии на пагинацию
      if (stage === AFTER_RES_FROM_API) {
        locationData = handleAfterResFromApi({ dataForSavingLocationState })
      } else


        // закрытие модала продукта, после действий пользователя
        if (stage === AFTER_CLOSING_MODAL_PRODUCT) {
          locationData = handleAfterClosingModalProduct({ dataForSavingLocationState })
        } else


          if (stage === AFTER_ERROR_PAGE) {
            locationData = handleAfterErrorPage({ pathData })
          }


      this._goNavigation({ locationData })
    },



    // заменить текущий путь
    replacePathname: function (settings) {
      log.debug(`
      Вызвали хук: useActionsNavigation
      Метод: replacePathname

      pathname: ${window.location.pathname},
      search: ${window.location.search},
      stage: ${settings?.stage}
      settings: `, settings
      )

      let locationData

      const {
        stage = null,
        savedPathDataBeforeOpeningModalProduct = null,
        dataForSavingLocationState = null,
      } = settings


      // перед тем, как отправить запрос поиска продукта к api
      if (stage === BEFORE_REQ_TO_API) {
        locationData = handleBeforeReqToApi({ dataForSavingLocationState })
      } else


        // когда происходит открытие модала продукта по ссылке
        if (stage === OPENING_MODAL_PRODUCT_BY_LINK) {
          locationData = handleOpeningModalProductByLink({
            dispatch,
            ...settings
          })
        } else


          // если "движение по истории", "обновление страницы" или "открытие страницы по ссылке", то после получения данных от сервера, нужно обновить URI, т.к. он может быть изначально некорректным, например: "page=-100500"
          if (stage === MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK) {
            locationData = handleMovementByHistoryUpdatePageOrFollowedLink({ dataForSavingLocationState })
          } else


            if (stage === OPENING_MODAL_PRODUCT || stage === CLOSING_MODAL_PRODUCT) {
              locationData = handleOpeningOrClosingModalProduct({ settings })
            } else


              if (stage === REDIRECTION_FROM_MODAL_PRODUCT_PAGE) {
                locationData = handleRedirectionFromModalProductPage({ savedPathDataBeforeOpeningModalProduct })
              }


      this._goNavigation({ locationData, needReplaced: true })
    },



    _goNavigation: (data) => {
      const { locationData, needReplaced = null } = data
      const { pathname, search, hash, state = null } = locationData

      navigate(
        {
          pathname: pathname ? pathname : window.location.pathname,
          search: search || search === '' ? search : window.location.search,
          hash: hash ? hash : window.location.hash,
        },
        {
          replace: needReplaced ? true : false,
          state: state || null,
        }
      )
    }

  }
}


export default useActionsNavigation