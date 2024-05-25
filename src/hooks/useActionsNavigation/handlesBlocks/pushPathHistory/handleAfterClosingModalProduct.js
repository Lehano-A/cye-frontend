import constructLocationConfig from "../../../../utils/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { ACTIONS_NAVIGATION } from "../../../../utils/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleAfterClosingModalProduct(data) {
  log.debug(`
  Метод: pushPathHistory
  Произошёл вызов функции: handleAfterClosingModalProduct

  data: `, data)

  // если возникла ошибка таймаута ответа от сервера при открытом модале окна продукта
  if (data.apiTimeoutError) {
    return constructLocationConfig({
      dataForPathname: data.pathData.pathname,
      withoutSearch: true
    })
  }

  if (data.dataForSavingLocationState) {
    const { dataForSavingLocationState } = data
    const { pathDataBeforeOpeningModalProduct } = dataForSavingLocationState.location.state


    return constructLocationConfig({
      savedPathDataBeforeOpeningModalProduct: pathDataBeforeOpeningModalProduct
    })
  }
}

export default handleAfterClosingModalProduct