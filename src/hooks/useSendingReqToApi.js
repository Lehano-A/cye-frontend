import { useDispatch } from "react-redux"
import { endLoadingIndicatorBoxSearchResult } from "../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions.js"
import useActionsNavigation from "./useActionsNavigation/useActionsNavigation.js"
import { setIsPressedButtonPagination } from "../redux/reducers/slices/paginationSlice.js"
import useSaveDataAndUpdateState from "./useSaveDataAndUpdateState.js"
import api from "../api/api.js"
import loglevel from 'loglevel'
import useHandlers from "./useHandlers.js"
import { AFTER_RES_FROM_API, MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK, SEND_TO_API } from "../helpers/constants.js"
import { setIsSubmitting } from "../redux/reducers/slices/inputSearchSlice.js"


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

          if (stage !== MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK) {
            actionsNavigation.pushPathInHistory({
              stage: AFTER_RES_FROM_API,
              dataForSavingLocationState: response
            })
          }
        })
        .catch((err) => {
          handler.handleError(err)
        })
        .finally(() => {
          dispatch(endLoadingIndicatorBoxSearchResult())
          dispatch(setIsSubmitting(false))
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
          handler.handleError(err)
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
          handler.handleError(err)
        })
        .finally(() => {
          dispatch(endLoadingIndicatorBoxSearchResult())
        })
    }
  }
}

export default useSendingReqToApi