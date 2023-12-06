import constructLocationConfig from "../../../../utils/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { ACTIONS_NAVIGATION } from "../../../../utils/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleAfterClosingModalProduct(data) {
  log.debug(`
  Метод: pushPathHistory
  Произошёл вызов функции: handleAfterResFromApi

  data: `, data)

  const { dataForSavingLocationState } = data
  const { pathDataBeforeOpeningModalProduct } = dataForSavingLocationState.location.state


  return constructLocationConfig({
    savedPathDataBeforeOpeningModalProduct: pathDataBeforeOpeningModalProduct
  })
}

export default handleAfterClosingModalProduct