import React from "react"
import { useDispatch } from "react-redux"
import { setInputValue, setIsOpenedDropList, setApiFoundProductsForDropList } from "../../../../../../redux/reducers/inputSearchSlice"
import { IconButton } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';


function ClearButton() {

  const dispatch = useDispatch()


  // обработчик кнопки очищения поля ввода
  function handleClickClearButton() {
    dispatch(setInputValue(''))
    dispatch(setIsOpenedDropList(false))
    dispatch(setApiFoundProductsForDropList(null))
  }

  return (

    <IconButton title="Очистить" sx={{ marginRight: '5px' }} onClick={handleClickClearButton}>
      <ClearIcon sx={{ fontSize: "18px" }} />
    </IconButton>

  )
}

export default ClearButton