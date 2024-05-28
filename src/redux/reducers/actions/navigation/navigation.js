import loglevel from "loglevel"
import { setArrForShowSearchResultProducts } from "../../slices/boxSearchResultSlice";
import { setSelectedCard } from "../../slices/cardProductSlice";
import { setInputValue, setInputValueAfterSubmit } from "../../slices/inputSearchSlice";
import { setPathDataBeforeOpeningModalProduct } from "../../slices/navigationSlice"
import { setApiFoundProductsAfterSubmit } from "../../slices/searchRequestProductSlice";
import updateStatePagination from "../pagination/updateStatePagination";
import { getSlicesFromStore } from "../../../store";
import { NAVIGATION, OPENING_MODAL_PRODUCT_BY_LINK } from "../../../../helpers/constants";

const log = loglevel.getLogger(NAVIGATION)


// сохранить данные текущего пути перед открытием модала продукта
const saveCurrentPathDataBeforeOpeningModalProduct = (settings) => (dispatch) => {
  log.debug(`
  Вызвали action: saveCurrentPathDataBeforeOpeningModalProduct

  Сохраняем данные текущего пути перед открытием модала продукта
  settings: `, settings)

  let locationData = {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: { ...getSlicesFromStore() },
  }


  if (settings?.stage === OPENING_MODAL_PRODUCT_BY_LINK) {
    const { inputValue, pathname, search, hash } = settings.dataForSavingLocationState

    locationData.state.store.docTitle = inputValue
    locationData.pathname = pathname
    locationData.search = search
    locationData.hash = hash
  }

  const { params } = settings.dataForSavingLocationState
  locationData.state.params = params

  dispatch(setPathDataBeforeOpeningModalProduct(locationData))
  return locationData
}



// обновить состояния (стора), когда страница открылась по ссылке
const updateStatesWhenPageOpenedByLink = (data, { settings }) => (dispatch) => {
  log.debug(`
  Вызвали action: updateStatesWhenPageOpenedByLink

  Обновляем состояния, когда страница открылась по ссылке
  settings: `, settings)

  const { result, search, pagination } = data
  const { searchValue, foundProductForModal = null } = search
  const { stage, dataForSavingInStore = null } = settings

  // если происходит открытие модала продукта по ссылке
  if (stage === OPENING_MODAL_PRODUCT_BY_LINK) {
    const { searchValue } = dataForSavingInStore

    dispatch(setSelectedCard({
      data: foundProductForModal.data,
      status: foundProductForModal.status,
      message: foundProductForModal.message
    }))
    dispatch(setInputValueAfterSubmit(searchValue))
  }

  dispatch(setInputValue(searchValue))
  dispatch(setArrForShowSearchResultProducts(result))
  dispatch(setApiFoundProductsAfterSubmit(data))
  dispatch(updateStatePagination(pagination))
}



export {
  saveCurrentPathDataBeforeOpeningModalProduct,
  updateStatesWhenPageOpenedByLink
}
