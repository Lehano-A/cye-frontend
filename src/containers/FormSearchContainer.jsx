import React from "react"
import { useSelector, useDispatch } from "react-redux";
import log from 'loglevel'
import api from "../api/api";
import FormSearch from "../components/Header/FormSearch/FormSearch"
import {
  ENDPOINT_SUBMIT,
  ENDPOINT_BRANDS,
  ENDPOINT_CATEGORIES,
} from "../utils/constants";

import { saveToHistorySubmit } from "../utils/localStorage/HistorySubmit/historySubmit"
import forcedBlur from "../utils/forcedBlur";
import { checkValidInputValue } from "../validation/formSearchValidation";
import { checkActionByValue } from "../utils/FormSearch/checkActionByValue";
import { getValueFromOption } from "../utils/FormSearch/getValueFromOption";

/* --------------------------------- slices --------------------------------- */
import { setIsDisplayedButtonPagination, setPaginationData } from "../redux/reducers/slices/buttonPaginationSlice";

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

import { setApiFoundProductsAfterSubmit, } from "../redux/reducers/slices/searchRequestProductSlice";

import {
  setArrForShowSearchResultProducts,
  setSearchValueWithoutResult,
} from "../redux/reducers/slices/boxSearchResultSlice";

import {
  clearUniqueCategories,
  resetDefaultButtonsFilter,
} from "../redux/reducers/slices/filterCategoriesSlice";


/* -------------------------------- selectors ------------------------------- */
import {
  selectInputValue,
  selectSavedInputValueAfterSubmit,
  selectWasFirstSubmit,
} from "../redux/reducers/selectors/inputSearchSelectors";

import { selectApiFoundProductsAfterSubmit } from "../redux/reducers/selectors/searchRequestProductSelectors";

/* --------------------------------- actions -------------------------------- */
import {
  startLoadingIndicatorBoxSearchResult,
  endLoadingIndicatorBoxSearchResult,
} from "../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions";


/* ---------------------------------- hooks --------------------------------- */
import useDelayStartLoadingIndicator from "../hooks/useDelayStartLoadingIndicator";




function FormSearchContainer() {

  const dispatch = useDispatch();

  const inputValue = useSelector(selectInputValue)
  const savedInputValueAfterSubmit = useSelector(selectSavedInputValueAfterSubmit)
  const wasFirstSubmit = useSelector(selectWasFirstSubmit)
  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)
  const delayStartLoadingIndicatorBoxSearchResult = useDelayStartLoadingIndicator(startLoadingIndicatorBoxSearchResult, [apiFoundProductsAfterSubmit?.result], 300)


  function sendReq(method, searchData) {
    api[method](searchData)
      .then((response) => {
        saveDataAndUpdateStateAfterResApi(response, searchData.value)
      })
      .catch(() => {
        throw new Error(`Возникла ошибка при запросе поиска продукта`)
      })
      .finally(() => {
        dispatch(endLoadingIndicatorBoxSearchResult())
      })
  }


  // отправление запроса на сервер
  function sendReqToServer(searchData, endpoint) {
    // сабмит
    if (ENDPOINT_SUBMIT === endpoint) {
      sendReq('findProductBySubmit', searchData)
      return
    }

    // бренд
    if (ENDPOINT_BRANDS === endpoint) {
      sendReq('findProductByBrand', searchData)
      return
    }

    // категории
    if (ENDPOINT_CATEGORIES === endpoint) {
      sendReq('findProductByCategory', searchData)
      return
    }
  }


  // изменение стэйтов перед запросом на сервер
  function changeStatesBeforeReqApi() {
    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearUniqueCategories())
    dispatch(resetDefaultButtonsFilter())
    dispatch(setIsSubmitting(true))
    dispatch(setIsOpenedDropList(false))
    dispatch(setSaveboxDropListBeforeSubmit(null))
    dispatch(setIsDisplayedButtonPagination(false))
    dispatch(setPaginationData(null))
    forcedBlur() // если строка с пробелом в конце, тогда "выпадающий список" уже будет закрытым, поэтому обработчик handleCloseDropList, в котором находится необходимая логика, не сработает

    delayStartLoadingIndicatorBoxSearchResult.createTimer()

    !wasFirstSubmit && dispatch(setWasFirstSubmit(true))
  }


  // сохранение данных от сервера и обновление стэйтов, после ответа
  function saveDataAndUpdateStateAfterResApi(response, searchValue) {
    const { result } = response

    dispatch(setApiFoundProductsAfterSubmit(response))
    dispatch(setArrForShowSearchResultProducts(result))
    dispatch(setSavedInputValueAfterSubmit(searchValue))

    if (result.length === 0) {
      dispatch(setSearchValueWithoutResult(searchValue))
      return
    }

    const { pagination } = response
    const { page, totalPages } = pagination

    totalPages - page > 0 && dispatch(setIsDisplayedButtonPagination(true))
    dispatch(setPaginationData(pagination))
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
