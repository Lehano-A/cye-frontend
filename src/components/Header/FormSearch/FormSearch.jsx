import React from "react"
import log from 'loglevel'
import { styled } from "@mui/material/styles"
import InputSearch from "./InputSearch/InputSearch"
import ButtonSearch from "./ButtonSearch/ButtonSearch"
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setInputValueAfterSendReq, setIsSubmitting, setWasFirstSubmit, setIsOpenedDropList, setApiFoundProductsForDropList } from "../../../redux/reducers/inputSearchSlice";
import { setApiFoundProductsAfterSubmit, setSearchBy } from "../../../redux/reducers/searchRequestProductSlice"
import { setArrForShowSearchResultProducts } from "../../../redux/reducers/boxSearchResultSlice"
import api from "../../../api/api";
import { clearCountLoadedImagesCards } from "../../../redux/reducers/cardProduct";
import { clearCountFilterCards, clearUniqueCategories, resetDefaultButtonsFilter } from "../../../redux/reducers/filterCategoriesSlice";
import { setIsCursorInsideDropList } from "../../../redux/reducers/inputSearchSlice"

const Form = styled('form')`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  width: 100%;
  margin: 0 25px;
   & > :first-of-type {
    margin-right: 25px;
  }
`

// проверка валидации значения в поле ввода перед дальнейшими действиями
function checkValidInputValue(params) {
  const { eventType, targetValue, inputValue, inputValueAfterSendReq, apiFoundProductsForDroplist } = params

  // если длина значения в строке поиска < 2, тогда запрос не отправляется
  if (targetValue?.length < 2) {
    return
  }

  // если ответ от сервера для выпадающего окна получен, но "ничего не было найдено", тогда
  // блокируем возможность повторного запроса сабмитом или кликом на кнопку поиска
  if (apiFoundProductsForDroplist?.length === 0) {
    return
  }

  // если значение не изменилось, после сабмита, тогда новый не отправляем
  // (в том числе, когда сначала выбрали вариант из списка, стёрли символ и опять нажали на этот же вариант в списке)
  // "keydown":
  // 1) поиск через ENTER, по введённой подстроке
  // 2) или по выбранному варианту стрелками на клавиатуре + ENTER (в этом случае -  targetValue имеет объект {title: ..., imagesUrl: ...})
  if (eventType === 'keydown') {
    log.debug('********** Тип события: keydown **********');
    // убеждаемся, что выбран вариант из выпадающего списка
    // и что этот вариант совпадает с предыдущим значением сабмита
    if (targetValue.title && targetValue.title === inputValueAfterSendReq) {
      log.debug('Выбран вариант из выпадающего списка и этот вариант совпадает с предыдущим значением сабмита. Новый запрос к серверу не производим.');
      return false
    }

    // если значение в строке совпадает со значением, после сабмита
    if (inputValue === inputValueAfterSendReq && (inputValue === targetValue.title || inputValueAfterSendReq === targetValue.title)) {
      log.debug('Значение в строке совпадает со значением, после сабмита, а также с выбранным вариантом из выпадающего списка. Новый запрос к серверу не производим.');
      return false
    }

    if (inputValue === inputValueAfterSendReq && targetValue.title === undefined) {
      log.debug('Значение в строке совпадает со значением, после сабмита, а варианты из выпадающего списка не задействовали. Новый запрос к серверу не производим.');
      return false
    }
  }

  // "submit" - поиск по клику на кнопке поиска (только подстрока)
  if (eventType === 'submit') {
    log.debug('********** Тип события: submit **********');
    if (inputValue === inputValueAfterSendReq) {
      log.debug('Значение в строке совпадает со значением, после сабмита. Новый запрос к серверу не производим.');
      return false
    }
  }

  // "click" - поиск по клику на вариант из выпадающего списка
  if (eventType === 'click') {
    log.debug('********** Тип события: click **********');
    if (targetValue.title && targetValue.title === inputValueAfterSendReq) {
      log.debug('Выбран вариант из выпадающего списка и этот вариант совпадает с предыдущим значением сабмита. Новый запрос к серверу не производим.');
      return false
    }
  }

  log.debug('Значение и событие - валидны. Всё хорошо, производится отправка запроса на сервер.');
  return true
}



function FormSearch() {

  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.inputSearch.inputValue)
  const inputValueAfterSendReq = useSelector(state => state.inputSearch.inputValueAfterSendReq)
  const wasFirstSubmit = useSelector(state => state.inputSearch.wasFirstSubmit)
  const apiFoundProductsForDroplist = useSelector(state => state.inputSearch.apiFoundProductsForDroplist)
  const isCursorInsideDropList = useSelector(state => state.inputSearch.isCursorInsideDropList)


  // отправление запроса на сервер
  function sendReqToServer(searchValue, endpoint) {
    const endpointSubmit = endpoint === 'submit'
    const endpointBrand = endpoint === 'brands'
    const endpointCategory = endpoint === 'categories'

    if (endpointSubmit) {
      api.findProductBySubmit(searchValue)
        .then((res) => {
          const { searchBy, result } = res
          saveServerDataAndUpdateState(searchBy, result, searchValue.title)
        })
        .catch(() => { new Error('Возникла ошибка во время сабмита поиска продукта') })
      return
    }

    if (endpointBrand || endpointCategory) {
      api.findProductByBrandOrCategory(searchValue, endpoint)
        .then((res) => {
          const { searchBy, result } = res

          saveServerDataAndUpdateState(searchBy, result, endpointBrand ? searchValue.brands : searchValue.categories)
        })
        .catch(() => { console.log('Возникла ошибка во время запроса поиска продукта по названию категории') })
      return
    }
  }


  // обработка ответа от сервера и обновление стэйтов
  function saveServerDataAndUpdateState(searchBy, result, searchValue) {
    dispatch(setApiFoundProductsForDropList(null))
    dispatch(setApiFoundProductsAfterSubmit(result))
    dispatch(setArrForShowSearchResultProducts(result))
    dispatch(setSearchBy(searchBy))
    dispatch(setInputValueAfterSendReq(searchValue))
  }


  // изменение стэйтов перед запросом на сервер
  function changeStatesBeforeReqApi() {
    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearCountLoadedImagesCards())
    dispatch(clearCountFilterCards())
    dispatch(clearUniqueCategories())
    dispatch(resetDefaultButtonsFilter())
    dispatch(setIsSubmitting(true))
    dispatch(setIsOpenedDropList(false))
    !wasFirstSubmit && dispatch(setWasFirstSubmit(true))
  }


  function handleSubmit(e) {
    e.preventDefault()
    handleOnChange(e, inputValue)
  }


  // "keydown":
  // 1) поиск через ENTER, по введённой подстроке
  // 2) или по выбранному варианту стрелками на клавиатуре + ENTER
  // "submit" - поиск по клику на кнопке поиска (только подстрока)
  // "click" - поиск по клику на вариант из выпадающего списка
  function checkActionByValueAndSendReqApi({ eventType, targetValue, isCursorInsideDropList }) {

    // если курсор на опции в выпадающем окне и нажимается "Enter"
    // в этом случае, операция обрабатывается как "submit"
    if (eventType === 'keydown' && isCursorInsideDropList) {
      log.debug("Курсор внутри выпадающего списка и нажат 'Enter'")
      dispatch(setIsCursorInsideDropList(false))

      const searchValue = { title: inputValue }
      const endpoint = 'submit'

      sendReqToServer(searchValue, endpoint)
      return
    }

    // если в выпадающем списке выбран вариант "бренд"
    if (targetValue.brand) {
      log.debug("В выпадающем списке выбран вариант 'бренд'")
      const searchValue = { brand: targetValue.brand }
      const endpoint = 'brands'

      sendReqToServer(searchValue, endpoint)
      return
    }

    // если в выпадающем списке выбран вариант "категория"
    if (targetValue.categories) {
      log.debug("В выпадающем списке выбран вариант 'категория'")
      const searchValue = { categories: targetValue.categories }
      const endpoint = 'categories'

      sendReqToServer(searchValue, endpoint)
      return
    }

    log.debug(`Запрос через: \n 1) 'стрелки + Enter' (keydown) \n или \n 2) 'подстрока + Enter' (keydown) \n или \n 3) 'подстрока + клик по кнопке поиска' (submit)`)
    // если есть вариант .title, значит вариант выбран "стрелками" + "Enter"
    // иначе, введена "подстрока" + "Enter"
    const searchValue = targetValue.title ? targetValue : { title: targetValue }
    const endpoint = 'submit'

    // Enter
    sendReqToServer(searchValue, endpoint)
  }


  function getValueFromTargetValue(targetValue) {
    if (targetValue.title) {
      return targetValue.title
    }

    if (targetValue.brands || targetValue.categories) {
      return Object.values(targetValue)[0]
    }

    return targetValue // если была введена "строка"
  }


  // вызывается при сабмите введённой строки или при выборе опции (стрелкой или курсором) из выпадающего списка
  const handleOnChange = (e, targetValue) => {

    const isValidInputValue = checkValidInputValue({
      eventType: e.type,
      targetValue,
      inputValue,
      inputValueAfterSendReq,
      apiFoundProductsForDroplist
    })

    // проверка валидности данных и событий в строке поиска
    if (!isValidInputValue) {
      return
    }

    changeStatesBeforeReqApi()
    checkActionByValueAndSendReqApi({
      eventType: e.type,
      targetValue,
      isCursorInsideDropList
    })

    const value = getValueFromTargetValue(targetValue)

    // если выбирается вариант из выпадающего окна, то ".title",
    // иначе - "строка", ".brands" или ".categories"
    dispatch(setInputValue(value))
  }



  return (

    <Form onSubmit={handleSubmit} >
      <InputSearch handleOnChange={handleOnChange} />
      <ButtonSearch />
    </Form>

  )
}

export default FormSearch