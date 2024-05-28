import constructLocationConfig from "../../../../helpers/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { ACTIONS_NAVIGATION } from "../../../../helpers/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleAfterClosingModalProduct(data) {
  log.debug(`
  Метод: pushPathHistory
  Произошёл вызов функции: handleAfterClosingModalProduct

  data: `, data)

  // если возникла ошибка (таймаут ответа от сервера, отсутствие интернета и т.п.) при открытом модале окна продукта
  if (data.errorAppHasOccurred) {
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