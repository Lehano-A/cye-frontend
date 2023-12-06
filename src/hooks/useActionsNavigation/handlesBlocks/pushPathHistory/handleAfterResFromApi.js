import constructLocationConfig from "../../../../utils/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { ACTIONS_NAVIGATION, BRAND, BRAND_AND_CATEGORY, CATEGORY, PERMALINK, TEXT } from "../../../../utils/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleAfterResFromApi(data) {
  log.debug(`
  Метод: pushPathHistory
  Произошёл вызов функции: handleAfterResFromApi

  data: `, data)

  const { dataForSavingLocationState } = data
  const { search, pagination, result } = dataForSavingLocationState
  const { searchValue, searchBy, permalink } = search
  const { page } = pagination


  if (result.length === 0) {
    return constructLocationConfig({
      dataForPathname: { searchBy },
      dataForQueryParams: { searchValue },
      dataForDocTitle: searchValue
    })
  }


  if (searchBy === PERMALINK || searchBy === BRAND || searchBy === CATEGORY || searchBy === BRAND_AND_CATEGORY) {
    return constructLocationConfig({
      dataForPathname: { searchBy, permalink },
      dataForQueryParams: { page },
      dataForDocTitle: searchValue
    })
  }


  if (searchBy === TEXT) {
    return constructLocationConfig({
      dataForPathname: { searchBy },
      dataForQueryParams: { searchValue, page },
      dataForDocTitle: searchValue
    })
  }
}

export default handleAfterResFromApi