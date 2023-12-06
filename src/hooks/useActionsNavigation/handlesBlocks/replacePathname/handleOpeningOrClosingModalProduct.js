import constructLocationConfig from "../../../../utils/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { ACTIONS_NAVIGATION } from "../../../../utils/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleOpeningOrClosingModalProduct(data) {
  log.debug(`
  Метод: replacePathname
  Произошёл вызов функции: handleOpeningOrClosingModalProduct

  data: `, data)
  const { settings } = data
  const { savedPathDataBeforeOpeningModalProduct, notFoundModalAndBGProducts } = settings


  if (savedPathDataBeforeOpeningModalProduct) {
    return constructLocationConfig({ savedPathDataBeforeOpeningModalProduct })
  }


  if (notFoundModalAndBGProducts) {
    return constructLocationConfig({
      dataForPathname: '/',
      dataForQueryParams: '',
      withoutLocationState: true,
      withoutDocTitle: true,
    })
  }


  const { dataProduct, dataForQueryParams, apiFoundProductsAfterSubmit } = settings
  const { searchBy } = apiFoundProductsAfterSubmit.search
  const { title } = dataProduct

  return constructLocationConfig({
    dataForPathname: { searchBy, dataProduct },
    dataForQueryParams: dataForQueryParams,
    dataForDocTitle: title
  })

}

export default handleOpeningOrClosingModalProduct