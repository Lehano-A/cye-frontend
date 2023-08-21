import React from "react"
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

function FormSearch() {

  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.inputSearch.inputValue)
  const inputValueAfterSubmit = useSelector(state => state.inputSearch.inputValueAfterSubmit)
  const wasFirstSubmit = useSelector(state => state.inputSearch.wasFirstSubmit)



  // вызывается при сабмите введённой строки или при выборе опции (стрелкой или курсором) из выпадающего списка
  const handleOnChange = (e, targetValue) => {

    // если значение не изменилось, после сабмита, тогда новый не отправляем
    // (в том числе, когда сначала выбрали вариант из списка, стёрли символ и опять нажали на этот же вариант в списке)
    if (inputValue === inputValueAfterSubmit || targetValue.title === inputValueAfterSubmit) {
      return
    }

    // если длина значения в строке поиска < 2, тогда запрос не отправляется
    if (targetValue.length < 2) {
      return
    }

    if (e.type === 'keydown' || e.type === 'submit') {
      dispatch(setShowDropdownWindow(false))
    }

    dispatch(setArrForShowSearchResultProducts([]))
    dispatch(clearCountLoadedImagesCards())
    dispatch(clearCountFilterCards())
    // "keydown" - поиск через ENTER, по введённой подстроке или выбранному варианту стрелками на клавиатуре + ENTER
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
      <ButtonSearch />
    </Form>

  )
}

export default FormSearch