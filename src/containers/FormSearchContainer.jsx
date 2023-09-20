import React from "react"
import { useSelector, useDispatch } from "react-redux";
import log from 'loglevel'
import api from "../api/api";
import FormSearch from "../components/Header/FormSearch/FormSearch"
import { clearCountLoadedImagesCards } from "../redux/reducers/slices/cardProductSlice";
import { saveToHistorySubmit } from "../utils/localStorage/HistorySubmit/historySubmit"
import forcedBlur from "../utils/forcedBlur";
import { checkValidInputValue } from "../validation/formSearchValidation";
import { checkActionByValue } from "../utils/FormSearch/checkActionByValue";
import { getValueFromOption } from "../utils/FormSearch/getValueFromOption";

/* --------------------------------- slices --------------------------------- */
import {
  setIsOpenedDropList,
  setSaveboxDropListBeforeSubmit,
} from "../redux/reducers/slices/dropListPreSearchResultSlice";

import {
  setInputValue,
  setSavedInputValueAfterSubmit,
  setIsSubmitting,
  setWasFirstSubmit,
} from "../redux/reducers/slices/inputSearchSlice";

import { setApiFoundProductsAfterSubmit, setSearchBy } from "../redux/reducers/slices/searchRequestProductSlice";

import {
  setArrForShowSearchResultProducts,
  saveTimerIdDelayStartLoadingIndicator as saveTimerIdDelayStartLoadingIndicatorBoxSearchResult,
  setSearchValueWithoutResult,
} from "../redux/reducers/slices/boxSearchResultSlice";

import {
  clearCountFilteredCards,
  clearUniqueCategories,
  resetDefaultButtonsFilter,
} from "../redux/reducers/slices/filterCategoriesSlice";


/* -------------------------------- selectors ------------------------------- */
import {
  selectInputValue,
  selectSavedInputValueAfterSubmit,
  selectWasFirstSubmit,
} from "../redux/reducers/selectors/inputSearchSelectors";


/* --------------------------------- actions -------------------------------- */
import { startLoadingIndicatorBoxSearchResult } from "../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions";


/* ---------------------------------- hooks --------------------------------- */
import useDelayStartLoadingIndicator from "../hooks/useDelayStartLoadingIndicator";
import useSaveTimerId from "../hooks/useSaveTimerId";


function FormSearchContainer() {

  const dispatch = useDispatch();

  const inputValue = useSelector(selectInputValue)
  const savedInputValueAfterSubmit = useSelector(selectSavedInputValueAfterSubmit)
  const wasFirstSubmit = useSelector(selectWasFirstSubmit)

  const { saveTimerId } = useSaveTimerId()

  const delayStartLoadingIndicatorBoxSearchResult = useDelayStartLoadingIndicator(startLoadingIndicatorBoxSearchResult, 300)



  // отправление запроса на сервер
  function sendReqToServer(searchValue, endpoint) {
    const endpointSubmit = endpoint === 'submit'
    const endpointBrand = endpoint === 'brands'
    const endpointCategory = endpoint === 'categories'

    if (endpointSubmit) {
      api.findProductBySubmit(searchValue)
        .then((res) => {
          const { searchBy, result } = res

          saveDataAndUpdateStateAfterResApi(searchBy, result, searchValue.title)
        })
        .catch(new Error('Возникла ошибка во время сабмита поиска продукта'))

      return
    }

    if (endpointBrand || endpointCategory) {
      api.findProductByBrandOrCategory(searchValue, endpoint)
        .then((res) => {
          const { searchBy, result } = res
          saveDataAndUpdateStateAfterResApi(searchBy, result, endpointBrand ? searchValue.brands : searchValue.categories)
        })
        .catch(new Error('Возникла ошибка во время запроса поиска продукта по названию категории'))

      return
    }
  }



  // изменение стэйтов перед запросом на сервер
  function changeStatesBeforeReqApi() {
    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearCountLoadedImagesCards())
    dispatch(clearCountFilteredCards())
    dispatch(clearUniqueCategories())
    dispatch(resetDefaultButtonsFilter())
    dispatch(setIsSubmitting(true))
    dispatch(setIsOpenedDropList(false))
    dispatch(setSaveboxDropListBeforeSubmit(null))
    forcedBlur() // если строка с пробелом в конце, тогда "выпадающий список" уже будет закрытым, поэтому обработчик handleCloseDropList, в котором находится необходимая логика, не сработает

    const timerId = delayStartLoadingIndicatorBoxSearchResult.createTimer()
    saveTimerId(saveTimerIdDelayStartLoadingIndicatorBoxSearchResult, timerId)

    !wasFirstSubmit && dispatch(setWasFirstSubmit(true))
  }


  // сохранение данных от сервера и обновление стэйтов, после ответа
  function saveDataAndUpdateStateAfterResApi(searchBy, result, searchValue) {
    if (result.length === 0) {
      dispatch(setSearchValueWithoutResult(searchValue))
    }

    dispatch(setApiFoundProductsAfterSubmit(result))
    dispatch(setArrForShowSearchResultProducts(result))
    dispatch(setSearchBy(searchBy))
    dispatch(setSavedInputValueAfterSubmit(searchValue))
  }


  /*
    e.type === "click " - выбор опции кликом
    e.type === "keydown" - "поиск по подстроке через ENTER" или "выбор опции стрелками + ENTER"
    option - может быть объектом или строкой:
      { brand: "Nestle" } или "nes"
    action - "createOption"
    ---
    вызывается при сабмите введённой строки или при выборе опции (стрелками или курсором) из выпадающего списка
  */
  const handleOnChange = (e, option, action) => {

    if (action === "createOption") {
      log.debug(`
      Обработчик: handleOnChange

      Сработало условие:
      action === "createOption"

      Что делаем:
      - останавливаем дальнейшее выполнение обработчика, т.к. следом сработает событие "submit", которое мы и ожидаем
      `)
      return
    }

    const onlyValueWithoutTrim = getValueFromOption(option)
    const onlyValueTrim = onlyValueWithoutTrim.trim()

    dispatch(setInputValue(onlyValueWithoutTrim))

    // inputValue и onlyValueTrim будут отличаться,
    // если в инпут введена подстрока и выбрано значение из выпадающего списка
    const isValidInputValue = checkValidInputValue({
      eventType: e.type,
      option,
      inputValue,
      savedInputValueAfterSubmit,
      onlyValueTrim,
    })

    // проверка валидности данных и событий в строке поиска
    if (!isValidInputValue) {
      dispatch(setIsOpenedDropList(false))
      return
    }

    changeStatesBeforeReqApi()

    const { searchValue, endpoint } = checkActionByValue({ e, option })
    sendReqToServer(searchValue, endpoint)

    const isSubStr = !option?.title && !option.brand && !option.categories
    saveToHistorySubmit(isSubStr ? { title: onlyValueTrim } : option, onlyValueTrim)
  }


  function handleSubmit(e) {
    e.preventDefault()

    handleOnChange(e, inputValue)
  }




  return (
    <FormSearch
      handleSubmit={handleSubmit}
      handleOnChange={handleOnChange}
    />
  )
}

export default FormSearchContainer
