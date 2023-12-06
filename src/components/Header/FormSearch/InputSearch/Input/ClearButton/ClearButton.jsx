import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import log from 'loglevel'

/* --------------------------------- slices --------------------------------- */
import { setInputValueBeforeClear, setIsPressedClearButton } from "../../../../../../redux/reducers/slices/inputSearchSlice"
import { setApiFoundProductsForDropList } from "../../../../../../redux/reducers/slices/dropListPreSearchResultSlice"
import { setInputValue } from "../../../../../../redux/reducers/slices/inputSearchSlice"

/* -------------------------------- selectors ------------------------------- */
import { selectInputValue } from "../../../../../../redux/reducers/selectors/inputSearchSelectors";

/* ---------------------------------- hooks --------------------------------- */
import useHistorySubmit from "../../../../../../hooks/useHistorySubmit";




function ClearButton() {

  const dispatch = useDispatch()
  const inputValue = useSelector(selectInputValue)
  const { getAndSaveHistorySubmit } = useHistorySubmit()


  useEffect(() => {
    return () => {
      dispatch(setIsPressedClearButton(false))
    }
  }, [])


  // обработчик кнопки очищения поля ввода
  function handleClickClearButton() {
    log.debug('Нажали на кнопку очищения инпута');

    dispatch(setIsPressedClearButton(true))
    dispatch(setInputValueBeforeClear(inputValue))
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