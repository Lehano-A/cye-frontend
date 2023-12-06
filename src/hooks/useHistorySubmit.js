import { useSelector, useDispatch } from "react-redux";
import { getDataLocalStorage } from "../utils/localStorage/localStorage";
import log from 'loglevel';

/* --------------------------------- slices --------------------------------- */
import { setIsOpenedDropList, setApiFoundProductsForDropList } from "../redux/reducers/slices/dropListPreSearchResultSlice";
import { setIsHistorySubmitDisplayed } from "../redux/reducers/slices/inputSearchSlice";

/* -------------------------------- selectors ------------------------------- */
import { selectIsOpenedDropList } from "../redux/reducers/selectors/dropListPreSearchResultSelectors";



function useHistorySubmit() {

  const dispatch = useDispatch()

  const isOpenedDropList = useSelector(selectIsOpenedDropList)


  function getAndSaveHistorySubmit() {
    const historySubmitData = getDataLocalStorage("historySubmit")

    if (historySubmitData) {
      log.debug(`
      Вызывается хук получения истории сабмитов

      Результат: история сабмитов - СУЩЕСТВУЕТ.`)
      if (!isOpenedDropList) {
        dispatch(setIsOpenedDropList(true))
      }
      dispatch(setIsHistorySubmitDisplayed(true))
      dispatch(setApiFoundProductsForDropList(historySubmitData))
      return
    }


    if (!historySubmitData) {
      log.debug(`
      Вызывается хук получения истории сабмитов

      Результат: история сабмитов - ОТСУТСТВУЕТ.`)
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