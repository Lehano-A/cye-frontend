import { useDispatch } from "react-redux"
import { endLoadingIndicatorBoxSearchResult } from "../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions.js"
import useActionsNavigation from "./useActionsNavigation/useActionsNavigation.js"
import { setIsPressedButtonPagination } from "../redux/reducers/slices/paginationSlice.js"
import useSaveDataAndUpdateState from "./useSaveDataAndUpdateState.js"
import api from "../api/api.js"
import loglevel from 'loglevel'
import useHandlers from "./useHandlers.js"
import { AFTER_RES_FROM_API, MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK, SEND_TO_API } from "../utils/constants.js"
import { setHasApiTimeoutError } from "../redux/reducers/slices/searchRequestProductSlice.js"


const log = loglevel.getLogger(SEND_TO_API)



function useSendingReqToApi() {

  const dispatch = useDispatch()
  const actionsNavigation = useActionsNavigation()
  const saveDataAndUpdateState = useSaveDataAndUpdateState()

  const handler = useHandlers()


  return {

    async findProduct({ apiMethod, searchData, segmentSearch, stage = null }) {
      log.debug(`
      Вызвали хук: useSendingReqToApi
      Метод: findProduct

      searchData: ${searchData}
      segmentSearch: ${segmentSearch}
      stage: ${stage}
      `)

      apiMethod(searchData, segmentSearch)
        .then((response) => {

          saveDataAndUpdateState.afterResApi({ response, stage })


          if (stage === MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK) {

            actionsNavigation.replacePathname({
              stage,
              dataForSavingLocationState: response,
            })
          } else {

            actionsNavigation.pushPathInHistory({
              stage: AFTER_RES_FROM_API,
              dataForSavingLocationState: response
            })
          }
        })
        .catch((err) => {

          if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
            dispatch(setHasApiTimeoutError(true))
            return
          }

          handler.pageNotFound(err)
        })
        .finally(() => {
          dispatch(endLoadingIndicatorBoxSearchResult())
        })
    },


    /* ----------------------------------------------------------------------- */


    findProductForPagination(apiMethod, updatedPaginationData, segmentSearch) {
      log.debug(`
      Вызвали хук: useSendingReqToApi
      Метод: findProductForPagination

      segmentSearch: ${segmentSearch}
      updatedPaginationData: `, updatedPaginationData)

      apiMethod(updatedPaginationData, segmentSearch)
        .then((response) => {
          saveDataAndUpdateState.afterResApiForPagination(response)
        })
        .catch((err) => {
          handler.pageNotFound(err)
        })
        .finally(() => { dispatch(setIsPressedButtonPagination(false)) })
    },


    /* ----------------------------------------------------------------------- */


    findProductForModalOpenedByLink(querySearchParams, pathDataBeforeOpeningModalProduct) {

      api.findProductByTitlePermalink(querySearchParams)
        .then((response) => {
          saveDataAndUpdateState.afterResApiForModalProductOpenedByLink(response, pathDataBeforeOpeningModalProduct)
        })
        .catch((err) => {

          if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
            dispatch(setHasApiTimeoutError(true))
            return
          }

          handler.pageNotFound(err)
        })
        .finally(() => {
          dispatch(endLoadingIndicatorBoxSearchResult())
        })
    }
  }
}

export default useSendingReqToApi