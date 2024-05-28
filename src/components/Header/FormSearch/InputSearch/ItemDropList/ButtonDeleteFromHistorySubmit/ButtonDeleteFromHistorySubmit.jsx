import React from "react";
import { useDispatch } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material";
import { getValueFromOption } from "../../../../../../helpers/containers/FormSearchContainer/getValueFromOption";
import { removeByValueFromHistory } from "../../../../../../helpers/localStorage/HistorySubmit/historySubmit";

/* --------------------------------- slices --------------------------------- */
import { setApiFoundProductsForDropList } from "../../../../../../redux/reducers/slices/dropListPreSearchResultSlice";

import { setIsOpenedDropList } from "../../../../../../redux/reducers/slices/dropListPreSearchResultSlice";



function ButtonDeleteFromHistorySubmit({ option }) {

  const dispatch = useDispatch()


  // обработчик клика кнопки удаления значения из "истории сабмитов"
  function handleOnClickButtonDelete(e) {
    e.stopPropagation() // останавливаем распространение, иначе будет выбрана опция

    const onlyValue = getValueFromOption(option)
    const newStorageData = removeByValueFromHistory(onlyValue)


    // если ещё данные какие-то в "истории сабмитов" ещё остались, после удаления значения
    // тогда обновим выпадающее окно
    if (newStorageData) {
      dispatch(setApiFoundProductsForDropList(newStorageData))
    } else {
      dispatch(setApiFoundProductsForDropList(null))
      dispatch(setIsOpenedDropList(false))
    }
  }


  return (
    <IconButton onClick={handleOnClickButtonDelete}>
      <ClearIcon sx={{ width: '15px', height: '15px' }} />
    </IconButton>
  )
}

export default ButtonDeleteFromHistorySubmit