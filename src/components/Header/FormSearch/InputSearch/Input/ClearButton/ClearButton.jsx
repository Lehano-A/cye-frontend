import React from "react"
import { useDispatch } from "react-redux"
import { IconButton } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import log from 'loglevel'

/* --------------------------------- slices --------------------------------- */
import { setIsPressedClearButton } from "../../../../../../redux/reducers/slices/inputSearchSlice"
import { setApiFoundProductsForDropList } from "../../../../../../redux/reducers/slices/dropListPreSearchResultSlice"
import { setInputValue } from "../../../../../../redux/reducers/slices/inputSearchSlice"


/* ---------------------------------- hooks --------------------------------- */
import useHistorySubmit from "../../../../../../hooks/useHistorySubmit";



function ClearButton() {

  const dispatch = useDispatch()
  const { getAndSaveHistorySubmit } = useHistorySubmit()


  // обработчик кнопки очищения поля ввода
  function handleClickClearButton() {
    log.debug('Нажали на кнопку очищения инпута');

    dispatch(setIsPressedClearButton(true))
    dispatch(setInputValue(''))
    dispatch(setApiFoundProductsForDropList(null))

    getAndSaveHistorySubmit()
  }


  return (
    <IconButton
      title="Очистить"
      sx={{ marginRight: '5px' }}
      onClick={handleClickClearButton}
    >
      <ClearIcon sx={{ fontSize: "18px" }} />
    </IconButton>
  )
}

export default ClearButton