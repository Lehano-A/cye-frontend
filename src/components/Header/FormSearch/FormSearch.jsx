import React from "react"
import { styled } from "@mui/material/styles"
import InputSearch from "./InputSearch/InputSearch"
import ButtonSearch from "./ButtonSearch/ButtonSearch"
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setInputValueAfterSubmit, setSubmitting, setWasFirstSubmit, setShowDropdownWindow, setApiFoundProductsForDroplist } from "../../../redux/reducers/inputSearchSlice";
import { setApiFoundProductsAfterSubmit } from "../../../redux/reducers/searchRequestProductSlice"
import api from "../../../api/api";


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
    if (inputValue === inputValueAfterSubmit) {
      return
    }

    // "keydown" - поиск через ENTER, по введённой подстроке или выбранному варианту стрелками на клавиатуре + ENTER
    // "submit" - поиск по клику на кнопке поиска (только подстрока)
    // "click" - поиск по клику на вариант из выпадающего списка
    if (e.type === 'keydown' || e.type === 'submit' || e.type === 'click') {
      dispatch(setSubmitting(true))

      !wasFirstSubmit && dispatch(setWasFirstSubmit(true))

      const searchValue = targetValue.title ? targetValue : { title: targetValue }

      api.findProductBySubmit(searchValue)
        .then((res) => {
          dispatch(setInputValueAfterSubmit(inputValue))
          dispatch(setShowDropdownWindow(false))
          dispatch(setApiFoundProductsForDroplist([]))
          dispatch(setApiFoundProductsAfterSubmit(res))
        })
        .catch(() => { new Error('Возникла ошибка во время сабмита поиска продукта') })
        .finally(() => dispatch(setSubmitting(false)))
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