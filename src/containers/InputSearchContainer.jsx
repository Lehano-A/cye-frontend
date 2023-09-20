import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import forcedBlur from '../utils/forcedBlur';
import InputSearch from '../components/Header/FormSearch/InputSearch/InputSearch';
import api from "../api/api";
import log from "loglevel";
import { debounce as debounceInputChange } from "../utils/debounce";

/* --------------------------------- slices --------------------------------- */
import {
  setInputValue,
  setIsSubmitting,
  setHasResFromServerAfterLiveChange,
  setIsHistorySubmitDisplayed,
} from "../redux/reducers/slices/inputSearchSlice";

import {
  setIsOpenedDropList,
  setIsCursorInsideDropList,
  setApiFoundProductsForDropList,
  setSaveboxDropListBeforeSubmit,
} from "../redux/reducers/slices/dropListPreSearchResultSlice";


/* -------------------------------- selectors ------------------------------- */
import {
  selectInputValue,
  selectIsSubmitting,
  selectIsHistorySubmitDisplayed,
} from "../redux/reducers/selectors/inputSearchSelectors";

import {
  selectIsOpenedDropList,
  selectIsCursorInsideDropList,
  selectSaveboxDropListBeforeSubmit,
  selectApiFoundProductsForDropList
} from "../redux/reducers/selectors/dropListPreSearchResultSelectors";


/* ---------------------------------- hooks --------------------------------- */
import useHistorySubmit from "../hooks/useHistorySubmit";



function InputSearchContainer({ handleOnChange }) {

  const dispatch = useDispatch();

  const inputValue = useSelector(selectInputValue)
  const isSubmitting = useSelector(selectIsSubmitting)
  const isOpenedDropList = useSelector(selectIsOpenedDropList)
  const isCursorInsideDropList = useSelector(selectIsCursorInsideDropList)
  const isHistorySubmitDisplayed = useSelector(selectIsHistorySubmitDisplayed)
  const saveboxDropListBeforeSubmit = useSelector(selectSaveboxDropListBeforeSubmit)
  const apiFoundProductsForDropList = useSelector(selectApiFoundProductsForDropList)


  const [value, setValue] = useState(null)

  const { getAndSaveHistorySubmit, removeHistorySubmit } = useHistorySubmit()

  const timeoutReqApiAfterInputLiveChange = useCallback(debounceInputChange(reqApiInputLiveChange, 120), [])


  useEffect(() => {

    if (!isOpenedDropList && isCursorInsideDropList) {
      log.debug(`
        useEffect:

        Выпадающий список - не отображён, а состояние местонахождения курсора "внутри выпадающего списка".

        Что делаем:
        - изменяем состояние местонахождения курсора на "невнутри"
      `
      );
      dispatch(setIsCursorInsideDropList(false))
    }

  }, [isOpenedDropList])



  // запрос к api, после изменения значения в строке поиска
  function reqApiInputLiveChange(e, liveChangeValue) {
    if (e.type === 'change') {
      dispatch(setHasResFromServerAfterLiveChange(false))

      api.findProductBySubstr({ substr: liveChangeValue }) // поиск по подстроке
        .then((arrData) => {
          saveServerDataAfterResApi(arrData)
          updateStateAfterResApi(arrData)
        })
        .catch(new Error('Возникла ошибка во время поиска продукта'))
        .finally(dispatch(setHasResFromServerAfterLiveChange(true)))
    }
  }


  // обновление данных, после ответа от сервера
  function saveServerDataAfterResApi(arrData) {

    if (arrData.length === 0) {
      dispatch(setIsOpenedDropList(false))
      dispatch(setIsHistorySubmitDisplayed(false))
    }

    if (arrData.length > 0) {
      dispatch(setIsOpenedDropList(true))
      dispatch(setIsHistorySubmitDisplayed(false))
    }
  }


  // обновление стэйтов, после ответа от сервера
  function updateStateAfterResApi(arrData) {
    dispatch(setSaveboxDropListBeforeSubmit(arrData))
    dispatch(setApiFoundProductsForDropList(arrData))
  }


  // вызывается при каждом изменении значения (с учётом debounce)
  function handleInputLiveChange(e, liveChangeValue) {

    dispatch(setInputValue(liveChangeValue))
    const liveChangeValueTrim = liveChangeValue.trim()


    if (liveChangeValueTrim === "") {
      log.warn(`
        Обработчик: handleInputLiveChange

        Действие:
        - попытка отправить пустую строку в качестве поискового запроса

        Что делаем:
        1) показываем "историю сабмитов" (если она есть)
        2) на сервер ничего не отправляем
      `)
      getAndSaveHistorySubmit()
      return
    }


    if (e.type === "change") {

      if (liveChangeValueTrim.length <= 1) {
        getAndSaveHistorySubmit()
        return
      }

      if (liveChangeValueTrim.length >= 2) {
        // если был сабмит (отправка запроса на поиск продукта), то при изменении значения в строке поиска, состояние сабмита сбрасывается
        isSubmitting && dispatch(setIsSubmitting(false))

        timeoutReqApiAfterInputLiveChange(e, liveChangeValueTrim)
        return
      }
    }


    // если курсор на опции в выпадающем окне и нажимается "Enter"
    // тогда запоминаем введённое значение в поле ввода и прерываемся
    // дальше обработка будет происходить в handleOnChange, поскольку произошло нажатие "Enter"
    if (e.type === 'keydown' && isCursorInsideDropList) {
      return
    }
  }



  /*
    Обработчик закрытия выпадающего окна: вызывается при изменении стэйта "openDropList" в inputSearch

    После того, как обработчик завершит своё выполнение,
    он будет вызван автоматически второй раз с другим "e.type" и "action"
    эта особенность из-за того, что для "handleCloseDropList" указан пропс "onClose".
    Если указать пропс "onBlur", тогда будет вызываться 1 раз, но с одним и тем же "e.type" - "blur" и без "action". Также, "onBlur" - не указан в спецификации.

    А с "onClose" - прилетают разнообразные "e.type" и "action", с которыми можно отследить выполняемые действия и корректно их обработать.
  */
  function handleCloseDropList(e, action) {

    const inputValueTrim = inputValue.trim()

    // если был ввод подстроки в инпут + Enter
    if (e.type === 'keydown') {
      if (action === 'createOption' && inputValueTrim.length > 1) {
        log.debug(`
          Обработчик: handleCloseDropList

          Действие: ввод подстроки в инпут + Enter

          Что делаем:
          - закрываем выпадающий список
          - убираем "историю сабмитов"
          - убираем фокус с инпута

          ---
          e.type: ${e.type}
          action: ${action}
          ---
        `);

        dispatch(setIsOpenedDropList(false))
        removeHistorySubmit()
        /*
          По-другому фокус не сбрасывается, только если в Autocomplete добавить пропс "blurOnSelect",
          но в этом случае, блюрится будет автоматически, и там где блюр не нужен - его не остановить.

          Поэтому в целях управляемости, выбран этот вариант решения
        */
        forcedBlur()
        return
      }
    }


    // клик на опции
    if (e.type === 'click') {
      if (action === 'selectOption') {

        log.debug(`
          Обработчик: handleCloseDropList

          Действие: в выпадающем списке выбрана опция

          Что делаем:
          - закрываем выпадающий список
          - убираем "историю сабмитов"
          - убираем фокус с инпута

          ---
          e.type: ${e.type}
          action: ${action}
          ---
        `);

        dispatch(setIsOpenedDropList(false))
        removeHistorySubmit()
        /*
          По-другому фокус не сбрасывается, только если в Autocomplete добавить пропс "blurOnSelect",
          но в этом случае, блюрится будет автоматически, и там где блюр не нужен - его не остановить.

          Поэтому в целях управляемости, выбран этот вариант решения
        */
        forcedBlur()
        return
      }


      // при нажатии на границу инпута
      if (action === 'toggleInput') {
        log.debug(`
          Обработчик: handleCloseDropList

          Действие: Выпадающий список - открыт, произошёл клик на границе инпута.

          Что делаем:
          - фокусируемся на инпуте.

          ---
          e.type: ${e.type}
          action: ${action}
          ---
        `);

        e.target.focus()
        return
      }
    }


    if (e.type === "blur") {

      // клик снаружи выпадающего списка
      if (isOpenedDropList && !isCursorInsideDropList) {
        log.debug(`
          Обработчик: handleCloseDropList

          Сработало условие:
          1) isOpenedDropList - открыт
          2) !isCursorInsideDropList - курсор находится вне области выпадающего списка

          Что делаем:
          - закрываем выпадающий список
          - изменяем состояние отображения "истории сабмитов"

          ---
          e.type: ${e.type}
          action: ${action}
          ---
        `);

        dispatch(setIsOpenedDropList(false))
        dispatch(setIsHistorySubmitDisplayed(false))
        return
      }



      // если "история сабмитов" - отражена, и курсор ВНЕ выпадающего списка
      if (isHistorySubmitDisplayed && !isCursorInsideDropList) {
        log.debug(`
          Обработчик: handleCloseDropList

          Действие: клик вне выпадающего списка

          Что делаем:
          1) Скрываем выпадающий список
          2) Изменяем состояние отображения "истории сабмитов"

          ---
          e.type: ${e.type}
          action: ${action}
          ---
        `)

        dispatch(setIsOpenedDropList(false))
        dispatch(setIsHistorySubmitDisplayed(false))
        return
      }


      // если "история сабмитов" - отражена, и курсор внутри выпадающего списка
      if (isHistorySubmitDisplayed && isCursorInsideDropList) {
        log.debug(`
          Обработчик: handleCloseDropList

          Действие: клик внутри выпадающего списка в области "Ваша история"

          Что делаем:
          - фокусируемся на инпуте

          ---
          e.type: ${e.type}
          action: ${action}
          ---
        `)

        e.target.focus()
        return
      }


      log.error(`
        Обработчик: handleCloseDropList

        Что произошло:
        - не обработалось какое-то действие

        e.type: ${e.type}
        inputValueTrim.length: ${inputValueTrim.length}
        isOpenedDropList: ${isOpenedDropList}
        isCursorInsideDropList: ${isCursorInsideDropList}
        isHistorySubmitDisplayed: ${isHistorySubmitDisplayed}
      `)

      dispatch(setIsOpenedDropList(false))
      dispatch(setIsHistorySubmitDisplayed(false))
      return
    }
  }



  // обработчик слежения за курсором мыши относительно выпадающего окна
  // (нужно для того, чтобы корректно обрабатывался сабмит, если курсор находится на опции из выпадающего списка - в этом случае (в корректном) произойдёт запрос с значением из поля ввода)
  function handleMouseInsideListbox(e) {
    if (e.type === 'mouseenter') {
      dispatch(setIsCursorInsideDropList(true))
    }

    if (e.type === 'mouseleave') {
      dispatch(setIsCursorInsideDropList(false))
    }
  }



  // обработчик клика (фокуса) на инпуте
  function handleOnOpen(e,) {

    const inputValueTrim = inputValue.trim()


    // если нажали на инпут
    // "mousedown" - когда нажали в инпут
    // "click" - когда нажали на границу инпута
    if (e.type === 'mousedown' || e.type === 'click') {
      log.debug(`
        Обработчик: handleOnOpen

        Сработало условие:
        - e.type === 'mousedown' || e.type === 'click'

        Действие:
        - кликнули на инпут

        ---
        e.type: ${e.type}
        ---

        ↓↓↓
      `);

      if (inputValueTrim.length <= 1) {
        log.debug(`
          ↑↑↑

          Сработало условие:
          1) inputValue.length <= 1

          Что делаем:
          - показываем "историю сабмитов" (если она есть)

          ---
          e.type: ${e.type}
          ---
        `)

        getAndSaveHistorySubmit()
        return
      }



      if (inputValueTrim.length >= 2) {

        if (saveboxDropListBeforeSubmit?.length === 0 || saveboxDropListBeforeSubmit === null) {
          log.debug(`
            ↑↑↑

            Сработало условие:
            1) inputValue.length >= 2
            2) saveboxDropList - пустой

            Что делаем:
            - делаем запрос на сервер в поисках предварительного результата с текущим значением инпута

            ---
            e.type: ${e.type}
            ---
          `)

          e.type = "change" // подменяем данные события, чтобы воспользоваться одним и тем же запросом
          e.target.value = inputValueTrim
          reqApiInputLiveChange(e, inputValueTrim)
          return
        }


        if (saveboxDropListBeforeSubmit?.length > 0) {
          log.debug(`
            ↑↑↑

            Сработало условие:
            1) inputValue.length >= 2
            2) saveboxDropList - имеет непустой сохранённый результат ответа от сервера

            Что делаем:
            - показываем saveboxDropList в "выпадающем списке"

            ---
            e.type: ${e.type}
            ---
          `)

          dispatch(setApiFoundProductsForDropList(saveboxDropListBeforeSubmit))
          dispatch(setIsOpenedDropList(true))
          return
        }
      }
    }


    // "change" - ввод значения в инпут
    if (e.type === "change") {
      log.debug(`
        Обработчик: handleOnOpen

        Сработало условие:
        - e.type === "change"

        ---
        e.type: ${e.type}
        ---

        ↓↓↓
      `)


      if (saveboxDropListBeforeSubmit?.length === 0) {
        log.debug(`
          ↑↑↑

          Сработало условие:
          1) e.type === "change"
          2) saveboxDropListBeforeSubmit.length - -=пустой=-

          Что делаем:
          - ничего, поскольку на сервере не было найдено ни одного результата по поисковому значению

          ---
          e.type: ${e.type}
          ---
        `)

        return
      }


      if (saveboxDropListBeforeSubmit === null && isHistorySubmitDisplayed === null) {
        log.debug(`
          ↑↑↑

          Действие:
          - Tab + "пробел"

          Сработало условие:
          1) e.type === "change"
          2) saveboxDropListBeforeSubmit === null && isHistorySubmitDisplayed === null

          Что делаем:
          - показываем "историю сабмитов" (если она есть)

          ---
          e.type: ${e.type}
          ---
        `)

        getAndSaveHistorySubmit()
        return
      }
    }


    log.error(`
      Обработчик: handleOnOpen

      Что произошло:
      - не обработалось какое-то действие

      e.type: ${e.type}
      inputValueTrim.length: ${inputValueTrim.length}
      saveboxDropListBeforeSubmit: ${saveboxDropListBeforeSubmit?.length === 0 ? "-=пусто=-" : saveboxDropListBeforeSubmit}
      isSubmitting: ${isSubmitting}
      isOpenedDropList: ${isOpenedDropList}
      isHistorySubmitDisplayed: ${isHistorySubmitDisplayed}
    `)
  }



  return (
    <InputSearch
      value={value}
      inputValue={inputValue}
      isOpenedDropList={isOpenedDropList}
      apiFoundProductsForDropList={apiFoundProductsForDropList}
      handleOnChange={handleOnChange}
      handleInputLiveChange={handleInputLiveChange}
      handleCloseDropList={handleCloseDropList}
      handleOnOpen={handleOnOpen}
      handleMouseInsideListbox={handleMouseInsideListbox}
    />
  )
}

export default InputSearchContainer