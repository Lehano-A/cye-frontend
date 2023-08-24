import React from "react"
import log from 'loglevel'
import { styled } from "@mui/material/styles"
import InputSearch from "./InputSearch/InputSearch"
import ButtonSearch from "./ButtonSearch/ButtonSearch"
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setInputValueAfterSubmit, setSubmitting, setWasFirstSubmit, setIsOpenedDropList, setApiFoundProductsForDropList } from "../../../redux/reducers/inputSearchSlice";
import { setApiFoundProductsAfterSubmit } from "../../../redux/reducers/searchRequestProductSlice"
import { setArrForShowSearchResultProducts } from "../../../redux/reducers/boxSearchResultSlice"
import api from "../../../api/api";
import { clearCountLoadedImagesCards } from "../../../redux/reducers/cardProduct";
import { clearCountFilterCards, clearUniqueCategories, resetDefaultButtonsFilter } from "../../../redux/reducers/filterCategoriesSlice";


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


function checkValidInputValue(params) {
  const { eventType, targetValue, inputValue, inputValueAfterSubmit, apiFoundProductsForDroplist } = params

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
    if (targetValue.title && targetValue.title === inputValueAfterSubmit) {
      log.debug('Выбран вариант из выпадающего списка и этот вариант совпадает с предыдущим значением сабмита. Новый запрос к серверу не производим.');
      return false
    }

    // если значение в строке совпадает со значением, после сабмита
    if (inputValue === inputValueAfterSubmit && (inputValue === targetValue.title || inputValueAfterSubmit === targetValue.title)) {
      log.debug('Значение в строке совпадает со значением, после сабмита, а также с выбранным вариантом из выпадающего списка. Новый запрос к серверу не производим.');
      return false
    }

    if (inputValue === inputValueAfterSubmit && targetValue.title === undefined) {
      log.debug('Значение в строке совпадает со значением, после сабмита, а варианты из выпадающего списка не задействовали. Новый запрос к серверу не производим.');
      return false
    }
  }

  // "submit" - поиск по клику на кнопке поиска (только подстрока)
  if (eventType === 'submit') {
    log.debug('********** Тип события: submit **********');
    if (inputValue === inputValueAfterSubmit) {
      log.debug('Значение в строке совпадает со значением, после сабмита. Новый запрос к серверу не производим.');
      return false
    }
  }

  // "click" - поиск по клику на вариант из выпадающего списка
  if (eventType === 'click') {
    log.debug('********** Тип события: click **********');
    if (targetValue.title && targetValue.title === inputValueAfterSubmit) {
      log.debug('Выбран вариант из выпадающего списка и этот вариант совпадает с предыдущим значением сабмита. Новый запрос к серверу не производим.');
      return false
    }
  }

  log.debug('Значение и событие - валидны. Всё хорошо');
  return true
}




function FormSearch() {

  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.inputSearch.inputValue)
  const inputValueAfterSubmit = useSelector(state => state.inputSearch.inputValueAfterSubmit)
  const wasFirstSubmit = useSelector(state => state.inputSearch.wasFirstSubmit)
  const apiFoundProductsForDroplist = useSelector(state => state.inputSearch.apiFoundProductsForDroplist)


  // вызывается при сабмите введённой строки или при выборе опции (стрелкой или курсором) из выпадающего списка
  const handleOnChange = (e, targetValue) => {

    // проверка валидности данных и событий в строке поиска
    if (!checkValidInputValue({ eventType: e.type, targetValue, inputValue, inputValueAfterSubmit, apiFoundProductsForDroplist })) {
      return
    }


    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearCountLoadedImagesCards())
    dispatch(clearCountFilterCards())
    dispatch(clearUniqueCategories())
    dispatch(resetDefaultButtonsFilter())

    // "keydown":
    // 1) поиск через ENTER, по введённой подстроке
    // 2) или по выбранному варианту стрелками на клавиатуре + ENTER
    // "submit" - поиск по клику на кнопке поиска (только подстрока)
    // "click" - поиск по клику на вариант из выпадающего списка
    if (e.type === 'keydown' || e.type === 'submit' || e.type === 'click') {
      dispatch(setSubmitting(true))
      dispatch(setIsOpenedDropList(false))


      !wasFirstSubmit && dispatch(setWasFirstSubmit(true))

      const searchValue = targetValue.title ? targetValue : { title: targetValue }

      api.findProductBySubmit(searchValue)
        .then((res) => {
          dispatch(setInputValueAfterSubmit(searchValue.title))
          dispatch(setApiFoundProductsForDropList(null))
          dispatch(setApiFoundProductsAfterSubmit(res))
          dispatch(setArrForShowSearchResultProducts(res))
        })
        .catch(() => { new Error('Возникла ошибка во время сабмита поиска продукта') })
    }

    // если выбирается вариант из выпадающего окна, то ".title", иначе - "подстрока"
    dispatch(setInputValue(targetValue.title ? targetValue.title : targetValue))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    handleOnChange(e, inputValue)
  }

  return (

    <Form onSubmit={handleSubmit} >
      <InputSearch handleOnChange={handleOnChange} />
      <ButtonSearch />
    </Form>

  )
}

export default FormSearch