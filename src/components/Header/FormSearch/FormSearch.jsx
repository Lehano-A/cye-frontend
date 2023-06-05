import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { resetInputValue } from "../../../redux/reducers/inputSearchSlice"
import { styled } from "@mui/material/styles"
import InputSearch from "./InputSearch/InputSearch"
import ButtonSearch from "./ButtonSearch/ButtonSearch"

const Form = styled('form')`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
  margin: 0 25px;
   > :first-child {
    margin-right: 25px;
  }
`

function FormSearch() {
  const inputValue = useSelector(state => state.inputSearch.inputValue)
  const dispatch = useDispatch()

  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue) {
      dispatch(resetInputValue(''))
    }
  }


  return (

    <Form onSubmit={handleSubmit} >
      <InputSearch />
      <ButtonSearch />
    </Form>

  )
}

export default FormSearch