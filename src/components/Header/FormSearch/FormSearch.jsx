import React from "react"
import log from 'loglevel'
import { styled } from "@mui/material/styles"
import InputSearch from "./InputSearch/InputSearch"
import ButtonSearch from "./ButtonSearch/ButtonSearch"
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setInputValueAfterSubmit, setSubmitting, setWasFirstSubmit, setShowDropdownWindow, setApiFoundProductsForDroplist } from "../../../redux/reducers/inputSearchSlice";
import { setApiFoundProductsAfterSubmit } from "../../../redux/reducers/searchRequestProductSlice"
import { setArrForShowSearchResultProducts } from "../../../redux/reducers/boxSearchResultSlice"
import api from "../../../api/api";
import { clearCountLoadedImagesCards } from "../../../redux/reducers/cardProduct";
import { clearCountFilterCards } from "../../../redux/reducers/filterCategoriesSlice";

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

function checkValidInputValue(eventType, targetValue, inputValue, inputValueAfterSubmit) {
  // если значение не изменилось, после сабмита, тогда новый не отправляем
  // (в том числе, когда сначала выбрали вариант из списка, стёрли символ и опять нажали на этот же вариант в списке)
  // "keydown":
  // 1) поиск через ENTER, по введённой подстроке
  // 2) или по выбранному варианту стрелками на клавиатуре + ENTER (в этом случае -  targetValue имеет объект {title: ..., imagesUrl: ...})
  if (eventType === 'keydown') {
    log.warn('Тип события: keydown');
    // убеждаемся, что выбран вариант из выпадающего списка
    // и что этот вариант совпадает с предыдущим значением сабмита
    if (targetValue.title && targetValue.title === inputValueAfterSubmit) {
      log.warn('Выбран вариант из выпадающего списка и этот вариант совпадает с предыдущим значением сабмита');
      return false
    }

    // если значение в строке совпадает со значением, после сабмита
    if (inputValue === inputValueAfterSubmit && (inputValue === targetValue.title || inputValueAfterSubmit === targetValue.title)) {
      log.warn('Значение в строке совпадает со значением, после сабмита, а также с выбранным вариантом из выпадающего списка');
      return false
    }

    if (inputValue === inputValueAfterSubmit && targetValue.title === undefined) {
      log.warn('Значение в строке совпадает со значением, после сабмита, а варианты из выпадающего списка не задействовали');
      return false
    }
  }

  // "submit" - поиск по клику на кнопке поиска (только подстрока)
  if (eventType === 'submit') {
    log.warn('Тип события: submit');
    if (inputValue === inputValueAfterSubmit) {
      log.warn('Значение в строке совпадает со значением, после сабмита');
      return false
    }
  }

  // "click" - поиск по клику на вариант из выпадающего списка
  if (eventType === 'click') {
    log.warn('Тип события: click');
    if (targetValue.title && targetValue.title === inputValueAfterSubmit) {
      log.warn('Выбран вариант из выпадающего списка и этот вариант совпадает с предыдущим значением сабмита');
      return false
    }
  }

  return true
}





function FormSearch() {

  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.inputSearch.inputValue)
  const inputValueAfterSubmit = useSelector(state => state.inputSearch.inputValueAfterSubmit)
  const wasFirstSubmit = useSelector(state => state.inputSearch.wasFirstSubmit)


  // вызывается при сабмите введённой строки или при выборе опции (стрелкой или курсором) из выпадающего списка
  const handleOnChange = (e, targetValue) => {

    // если длина значения в строке поиска < 2, тогда запрос не отправляется
    if (targetValue.length < 2) {
      return
    }

    // проверка валидности данных в строке поиска
    if (!checkValidInputValue(e.type, targetValue, inputValue, inputValueAfterSubmit)) {
      return
    }


    if (e.type === 'keydown' || e.type === 'submit') {
      dispatch(setShowDropdownWindow(false))
    }

    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearCountLoadedImagesCards())
    dispatch(clearCountFilterCards())
    // "keydown":
    // 1) поиск через ENTER, по введённой подстроке
    // 2) или по выбранному варианту стрелками на клавиатуре + ENTER
    // "submit" - поиск по клику на кнопке поиска (только подстрока)
    // "click" - поиск по клику на вариант из выпадающего списка
    if (e.type === 'keydown' || e.type === 'submit' || e.type === 'click') {
      dispatch(setSubmitting(true))

      !wasFirstSubmit && dispatch(setWasFirstSubmit(true))

      const searchValue = targetValue.title ? targetValue : { title: targetValue }

      api.findProductBySubmit(searchValue)
        .then((res) => {
          dispatch(setInputValueAfterSubmit(searchValue.title))
          dispatch(setShowDropdownWindow(false))
          dispatch(setApiFoundProductsForDroplist([]))
          dispatch(setApiFoundProductsAfterSubmit(res))
          dispatch(setArrForShowSearchResultProducts(res))
        })
        .catch(() => { new Error('Возникла ошибка во время сабмита поиска продукта') })
    }

    dispatch(setInputValue(targetValue.title ? targetValue.title : targetValue))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    handleOnChange(e, inputValue)
  }

  return (

    <Form onSubmit={handleSubmit} >
      <InputSearch handleOnChange={handleOnChange} />
      <ButtonSearch lengthValue={inputValue.length} />
    </Form>

  )
}

export default FormSearch