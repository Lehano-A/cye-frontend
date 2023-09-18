import { useSelector, useDispatch } from "react-redux";
import { getDataLocalStorage } from "../utils/localStorage/localStorage";
import { setIsHistorySubmitDisplayed } from "../redux/reducers/slices/inputSearchSlice";
import { setIsOpenedDropList, setApiFoundProductsForDropList } from "../redux/reducers/slices/dropListPreSearchResultSlice";
import log from 'loglevel';


function useHistorySubmit() {

  const dispatch = useDispatch()

  const isOpenedDropList = useSelector((state) => state.inputSearch.isOpenedDropList)


  function getAndSaveHistorySubmit() {
    const historySubmitData = getDataLocalStorage("historySubmit")

    if (historySubmitData) {
      log.debug('Вызывается хук получения истории сабмитов: история сабмитов - существует.')
      if (!isOpenedDropList) {
        dispatch(setIsOpenedDropList(true))
      }
      dispatch(setIsHistorySubmitDisplayed(true))
      dispatch(setApiFoundProductsForDropList(historySubmitData))
      return
    }

    if (!historySubmitData) {
      log.debug('Вызывается хук получения истории сабмитов: история сабмитов - отсутствует.')
      if (isOpenedDropList) {
        dispatch(setIsOpenedDropList(false))
      }
      dispatch(setIsHistorySubmitDisplayed(false))
    }
  }



  function removeHistorySubmit() {
    log.debug('Вызывается хук демонтажа истории сабмитов.')
    dispatch(setIsHistorySubmitDisplayed(false))
    dispatch(setApiFoundProductsForDropList([]))
  }

  return { getAndSaveHistorySubmit, removeHistorySubmit }
}


export default useHistorySubmit