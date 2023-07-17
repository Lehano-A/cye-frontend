import React from "react"
import { styled } from "@mui/material/styles"
import InputSearch from "./InputSearch/InputSearch"
import ButtonSearch from "./ButtonSearch/ButtonSearch"
import { useSelector} from "react-redux";

const Form = styled('form')`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
  margin: 0 25px;
   & > :first-of-type {
    margin-right: 25px;
  }
`

function FormSearch() {

  const inputValue = useSelector(state => state.inputSearch.inputValue)


  const handleSubmit = (e) => {
    console.log('FormSearch', inputValue);
    e.preventDefault()
  }


  return (

    <Form onSubmit={handleSubmit} >
      <InputSearch />
      <ButtonSearch />
    </Form>

  )
}

export default FormSearch