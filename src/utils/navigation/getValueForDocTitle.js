import logLevel from "loglevel";
import { CONSTRUCTION_LOCATION_CONFIG } from "../constants";

const log = logLevel.getLogger(CONSTRUCTION_LOCATION_CONFIG)



function getValueForDocTitle(data) {

  log.debug(`
  Была вызвана функция: getValueForDocTitle

  data: `, data)


  if (data === null) {
    return ''
  }

  if (typeof data === 'string') {
    return data
  }


  const key = Object.keys(data)[0]

  return data[key]?.title ? data[key]?.title : ''
}


export default getValueForDocTitle