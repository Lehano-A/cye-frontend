import React from "react"
import { useSelector, useDispatch } from "react-redux";
import log from 'loglevel'
import FormSearch from "../components/Header/FormSearch/FormSearch"
import { saveToHistorySubmit } from "../helpers/localStorage/HistorySubmit/historySubmit.js"
import forcedBlur from "../helpers/forcedBlur.js";
import { checkValidInputValue } from "../validation/formSearchValidation";
import { getValueFromOption } from "../helpers/containers/FormSearchContainer/getValueFromOption.js";
import createReqConfigSearchProduct from "../helpers/containers/FormSearchContainer/createConfigReqSearchProduct.js";
import { AFTER_ERROR_PAGE, BEFORE_REQ_TO_API, MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK } from "../helpers/constants.js";

/* --------------------------------- slices --------------------------------- */
import { resetStatesByDefaultButtonPagination, setIsDisplayedButtonPagination, setPaginationData } from "../redux/reducers/slices/paginationSlice.js";

import {
  setIsOpenedDropList,
  setSaveboxDropListBeforeSubmit,
} from "../redux/reducers/slices/dropListPreSearchResultSlice";

import {
  setInputValue,
  setIsSubmitting,
  setWasFirstSubmit,
} from "../redux/reducers/slices/inputSearchSlice";

import {
  setArrForShowSearchResultProducts,
  setIsLoadingIndicator,
} from "../redux/reducers/slices/boxSearchResultSlice";

import {
  clearUniqueCategories,
  resetByDefaultButtonsFilter,
} from "../redux/reducers/slices/filterCategoriesSlice";

import { resetStatesByDefaultErrorsApp } from "../redux/reducers/slices/errorsAppSlice.js";


/* -------------------------------- selectors ------------------------------- */
import {
  selectInputValue,
  selectInputValueAfterSubmit,
  selectWasFirstSubmit,
} from "../redux/reducers/selectors/inputSearchSelectors";

import { selectApiFoundProductsAfterSubmit } from "../redux/reducers/selectors/searchRequestProductSelectors";


/* --------------------------------- actions -------------------------------- */
import { startLoadingIndicatorBoxSearchResult } from "../redux/reducers/actions/BoxSearchResult/loadingIndicatorActions";


/* ---------------------------------- hooks --------------------------------- */
import useDelayStartLoadingIndicator from "../hooks/useDelayStartLoadingIndicator";
import useSendingReqToApi from "../hooks/useSendingReqToApi.js";
import useActionsNavigation from "../hooks/useActionsNavigation/useActionsNavigation.js";



function FormSearchContainer() {

  const dispatch = useDispatch();
  const sendingReqToApi = useSendingReqToApi()
  const actionsNavigation = useActionsNavigation()

  const inputValue = useSelector(selectInputValue)
  const inputValueAfterSubmit = useSelector(selectInputValueAfterSubmit)
  const wasFirstSubmit = useSelector(selectWasFirstSubmit)
  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)
  const delayStartLoadingIndicatorBoxSearchResult = useDelayStartLoadingIndicator(startLoadingIndicatorBoxSearchResult, [apiFoundProductsAfterSubmit?.result], 300)
  const inputValueBeforeClear = useSelector((state) => state.inputSearch.inputValueBeforeClear)
  const currentErrorApp = useSelector((state) => state.errorsApp.currentErrorApp)


  // изменение стэйтов перед запросом на сервер
  function changeStatesBeforeReqApi() {
    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearUniqueCategories())
    dispatch(setIsSubmitting(true))
    dispatch(setIsOpenedDropList(false))
    dispatch(setSaveboxDropListBeforeSubmit(null))
    dispatch(setIsDisplayedButtonPagination(false))
    dispatch(setPaginationData(null))
    dispatch(setIsLoadingIndicator(true))
    dispatch(resetByDefaultButtonsFilter())
    dispatch(resetStatesByDefaultErrorsApp())
    dispatch(resetStatesByDefaultButtonPagination())
    forcedBlur() // если строка с пробелом в конце, тогда "выпадающий список" уже будет закрытым, поэтому обработчик handleCloseDropList, в котором находится необходимая логика, не сработает

    delayStartLoadingIndicatorBoxSearchResult.createTimer()

    !wasFirstSubmit && dispatch(setWasFirstSubmit(true))
  }



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

    // inputValue и onlyValueTrim будут отличаться,
    // если в инпут введена подстрока и выбрано значение из выпадающего списка
    const isValidInputValue = checkValidInputValue({
      eventType: e.type,
      option,
      inputValue,
      inputValueAfterSubmit,
      onlyValueTrim,
    })

    // проверка валидности данных и событий в строке поиска
    if (!isValidInputValue) {
      dispatch(setIsOpenedDropList(false))
      return
    }


    if (currentErrorApp.status === 404) {

      actionsNavigation.pushPathInHistory({
        stage: AFTER_ERROR_PAGE,
        pathData: { option }
      })
    } else {

      actionsNavigation.replacePathname({
        stage: BEFORE_REQ_TO_API,
        dataForSavingLocationState: {
          inputValue: inputValueBeforeClear || onlyValueTrim
        }
      })
    }

    dispatch(setInputValue(onlyValueWithoutTrim))

    changeStatesBeforeReqApi()

    const { apiMethod, searchData, segmentSearch = null } = createReqConfigSearchProduct({ e, option, searchValuePagination: onlyValueTrim })


    if (currentErrorApp.status === 404) {
      sendingReqToApi.findProduct({ apiMethod, segmentSearch, searchData, stage: MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK })

    } else {
      sendingReqToApi.findProduct({ apiMethod, segmentSearch, searchData })
    }

    const isSubStr = !option?.text && !option.permalink && !option.title // .permalink - будет обязательно у 'brand' или у 'category'

    saveToHistorySubmit(isSubStr ? { text: onlyValueTrim } : option, onlyValueTrim)
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
