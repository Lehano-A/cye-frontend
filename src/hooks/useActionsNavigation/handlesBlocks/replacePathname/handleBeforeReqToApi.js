import changeStateInLocationStore from "../../../../helpers/navigation/changeStateInLocationStore"
import constructLocationConfig from "../../../../helpers/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { ACTIONS_NAVIGATION } from "../../../../helpers/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleBeforeReqToApi(data) {
  log.debug(`
  Метод: replacePathname
  Произошёл вызов функции: handleBeforeReqToApi

  data: `, data)

  const { dataForSavingLocationState } = data
  const { inputValue } = dataForSavingLocationState


  const locationData = constructLocationConfig({
    dataForDocTitle: inputValue,
  })

  locationData.state.store = changeStateInLocationStore({
    locationData,
    replacedData: [{ sliceName: 'inputSearch', states: { inputValue } }]
  })

  return locationData
}

export default handleBeforeReqToApi