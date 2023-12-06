import constructLocationConfig from "../../../../utils/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { ACTIONS_NAVIGATION } from "../../../../utils/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleChangingActiveButtonFiler(data) {
  log.debug(`
  Метод: replacePathname
  Произошёл вызов функции: handleChangingActiveButtonFiler

  data: `, data)

  const { location } = data.settings


  return constructLocationConfig({
    dataForQueryParams: {
      queryParams: location.search,
      noTransform: true
    }
  })
}

export default handleChangingActiveButtonFiler