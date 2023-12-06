import constructLocationConfig from "../../../../utils/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { ACTIONS_NAVIGATION, BRAND, BRAND_AND_CATEGORY, CATEGORY, TEXT } from "../../../../utils/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleMovementByHistoryUpdatePageOrFollowedLink(data) {
  log.debug(`
  Метод: replacePathname
  Произошёл вызов функции: handleMovementByHistoryUpdatePageOrFollowedLink

  data: `, data)

  const { dataForSavingLocationState } = data


  if (dataForSavingLocationState.search) {
    const { pagination, search } = dataForSavingLocationState
    const { page } = pagination
    const { searchBy, searchValue } = search


    if (searchBy === BRAND || searchBy === CATEGORY || searchBy === BRAND_AND_CATEGORY) {
      return constructLocationConfig({
        dataForQueryParams: { page },
        dataForDocTitle: searchValue
      })
    }

    if (searchBy === TEXT) {
      return constructLocationConfig({
        dataForPathname: { searchBy },
        dataForQueryParams: { searchValue, page },
        dataForDocTitle: searchValue,
      })
    }
  }
}

export default handleMovementByHistoryUpdatePageOrFollowedLink