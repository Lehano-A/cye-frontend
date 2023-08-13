import React from "react"
import { styled } from "@mui/material/styles"
import InputSearch from "./InputSearch/InputSearch"
import ButtonSearch from "./ButtonSearch/ButtonSearch"

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

  const handleSubmit = (e) => {
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