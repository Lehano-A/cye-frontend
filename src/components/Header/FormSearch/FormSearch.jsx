import React from "react"
import { styled } from "@mui/material/styles"
import InputSearchContainer from "../../../containers/InputSearchContainer"
import ButtonSearch from "./ButtonSearch/ButtonSearch"

const Form = styled('form')`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  width: 100%;
  padding: 0 10px;
`


function FormSearch({ handleSubmit, handleOnChange }) {

  return (
    <Form onSubmit={handleSubmit} >
      <InputSearchContainer handleOnChange={handleOnChange} />
      <ButtonSearch />
    </Form>
  )
}

export default FormSearch