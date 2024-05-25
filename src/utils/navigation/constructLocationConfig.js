import logLevel from "loglevel";
import { getSlicesFromStore } from "../../redux/store"
import createPathname from "./createPathname"
import createQueryParams from "./createQueryParams"
import getValueForDocTitle from "./getValueForDocTitle";
import { CONSTRUCTION_LOCATION_CONFIG } from "../constants";

const log = logLevel.getLogger(CONSTRUCTION_LOCATION_CONFIG)



function constructLocationConfig(data) {
  log.debug(`
  Была вызвана функция: constructLocationConfig

  data: `, data);

  const {
    dataForPathname = null,
    dataForQueryParams = null,
    dataForDocTitle = null,
    dataForLocationState = null,
    withoutLocationState = null,
    withoutDocTitle = null,
    withoutSearch = null,
    savedPathDataBeforeOpeningModalProduct: savedPathData = null,
  } = data || {}


  if (savedPathData) {
    const { pathname, search, hash = '', state } = savedPathData

    return {
      pathname,
      search,
      hash,
      state,
    }
  }

  const locationData = {
    pathname: createPathname(dataForPathname),
    search: createQueryParams(dataForQueryParams),
    hash: '',
  }

  if (withoutSearch) {
    locationData.search = ''
  }

  // если нет флага "без локального стэйта"
  if (!withoutLocationState) {
    locationData.state = buildLocationState(dataForLocationState)
    locationData.state.store.docTitle = getValueForDocTitle(dataForDocTitle)
  }

  if (!withoutDocTitle) {
    locationData.state = {}
    locationData.state.store = {}
    locationData.state.store.docTitle = getValueForDocTitle(dataForDocTitle)
  }


  log.debug(`
  Результат выполнения функции: constructLocationConfig

  locationData: `, locationData)

  return locationData
}



function buildLocationState(data) {
  const store = getSlicesFromStore()

  const { toState = null } = data || {}

  // если нужно добавить именно в "state" (а не в "state.store")
  if (toState) {
    return {
      ...store,
      ...toState,
    }
  }

  return store
}


export default constructLocationConfig