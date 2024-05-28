import constructLocationConfig from "../../../../helpers/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { ACTIONS_NAVIGATION } from "../../../../helpers/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleRedirectionFromModalProductPage(data) {
  log.debug(`
  Метод: replacePathname
  Произошёл вызов функции: handleedirectionFromModalProductPage

  data: `, data)

  const { savedPathDataBeforeOpeningModalProduct } = data


  return constructLocationConfig({ savedPathDataBeforeOpeningModalProduct })
}

export default handleRedirectionFromModalProductPage