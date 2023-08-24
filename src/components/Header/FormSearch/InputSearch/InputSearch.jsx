import React, { useState, useCallback, useEffect } from "react";
import { Typography, Box, TextField, Autocomplete, ListItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setSubmitting, setIsOpenedDropList, setApiFoundProductsForDropList, setGotResFromServer, setIsLoadingInDropList } from "../../../../redux/reducers/inputSearchSlice";
import { styled } from "@mui/material/styles";
import api from "../../../../api/api";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Loading from "../../../Loading/Loading";


const StyledTextField = styled(TextField)(() => {
  return {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    borderRadius: '4px',
  }
});

const styleMainBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '250px',
  maxWidth: '600px',
  margin: '0 20px'
}


function debounceInputChange(callback, delay) {
  let timeout

  return function (e, newValue) {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(e, newValue), delay)
  }
}


function InputSearch({ handleOnChange }) {
  const dispatch = useDispatch();

  const inputValue = useSelector(state => state.inputSearch.inputValue)
  const isSubmitting = useSelector(state => state.inputSearch.isSubmitting)
  const isOpenedDropList = useSelector(state => state.inputSearch.isOpenedDropList)
  const apiFoundProductsForDropList = useSelector(state => state.inputSearch.apiFoundProductsForDropList)
  const isLoadingInDropList = useSelector(state => state.inputSearch.isLoadingInDropList)

  const [value, setValue] = useState(null);

  const timeoutInputChange = useCallback(debounceInputChange(reqApiInputChange, 300), [])


  useEffect(() => {
    if (inputValue.length === 0 && isOpenedDropList) {
      dispatch(setIsOpenedDropList(false))
    }

    if (inputValue.length >= 1 && !isOpenedDropList && !isSubmitting) {
      dispatch(setIsOpenedDropList(true))
    }
  }, [inputValue])



  // запрос к api, после изменения значения в строке поиска
  function reqApiInputChange(event, newValue) {
    if (event.target.value !== '' && event.type === 'change') {
      dispatch(setGotResFromServer(false))

      api.findProductBySubstr({ substr: newValue }) // поиск по подстроке
        .then((arrData) => {
          dispatch(setApiFoundProductsForDropList(arrData))
        })
        .catch(() => { new Error('Возникла ошибка во время поиска продукта') })
        .finally(() => { dispatch(setGotResFromServer(true)) })

      dispatch(setIsOpenedDropList(true))
    } else {
      dispatch(setIsOpenedDropList(false))
    }
  }


  // вызывается при каждом изменении значения (с учётом debounce)
  function handleInputChange(e, newValue) {
    dispatch(setInputValue(newValue))
    timeoutInputChange(e, newValue)
    handleLoadingInDropList(true)
    dispatch(setApiFoundProductsForDropList(null))
    // если был сабмит (отправка запроса на поиск продукта), то при изменении значения в строке поиска, состояние сабмита сбрасывается
    isSubmitting && dispatch(setSubmitting(false))
  }


  // обработчик закрытия выпадающего окна
  const handleCloseDropList = (e) => {
    // Если работает индикатор загрузки данных
    if (isLoadingInDropList) {
      e.target.focus()
      return
    }

    // когда получили результат от сервера, но "таких продуктов не нашлось"
    if (apiFoundProductsForDropList?.length === 0) {
      return
    }

    dispatch(setIsOpenedDropList(false))
  }


  // обработчик кнопки очищения поля ввода
  const handleClickClearButton = () => {
    dispatch(setInputValue(''))
    dispatch(setIsOpenedDropList(false))
    dispatch(setApiFoundProductsForDropList(null))
  }


  // если был ввод, появился предварительный результат в выпадающем окне, а потом произошёл клик вне выпадающего окна (оно закрылось), то при следующем клике в строку поиска, предыдущий результат вновь отобразится
  function handleOpenDropListWithData(e) {

    if (e.type === 'mousedown') {
      if (inputValue?.length > 0 && !isOpenedDropList && apiFoundProductsForDropList?.length > 0) {
        dispatch(setIsOpenedDropList(true))
      }
    }
  }


  // обработчик стэйта индикатора загрузки в выпдающем окне
  function handleLoadingInDropList(state) {
    dispatch(setIsLoadingInDropList(state))
  }



  return (
    <Box sx={styleMainBox}>
      <Autocomplete
        freeSolo
        loading
        blurOnSelect // сброс фокуса, после сабмита или выбора варианта
        clearOnEscape
        disableClearable
        sx={{ width: 3500 }}
        forcePopupIcon={false}
        value={value} // текущее значение выбранной опции
        onChange={handleOnChange} // вызывается при выборе опции из выпадающего списка
        inputValue={inputValue} // текущее значение поля ввода
        onInputChange={handleInputChange} // вызывается при каждом изменении значения в поле ввода (с учётом debounce)
        open={isOpenedDropList}
        onClose={handleCloseDropList}
        onOpen={handleOpenDropListWithData}
        loadingText={
          apiFoundProductsForDropList?.length === 0 ? <Typography>К сожалению, такой продукт не получилось найти 😕</Typography>
            :
            <Box sx={{ display: 'flex', 'justifyContent': 'center' }}>
              <Loading handleLoading={handleLoadingInDropList} size={20} color='primary' />
            </Box>
        }
        options={apiFoundProductsForDropList === null ? [] : apiFoundProductsForDropList}
        getOptionLabel={(option) => option.title ?? option}
        renderOption={(props, option) => {
          return (
            (<ListItem sx={{ height: '64px' }} {...props}>
              <Box sx={{ width: '64px', marginRight: '5px' }}>
                <img src={option.imagesUrl} alt="" />
              </Box>
              <Typography>{option.title}</Typography>
            </ListItem>)
          )
        }}
        renderInput={(params) => <StyledTextField placeholder="Например: Хрутка" {...params} InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {inputValue !== '' && (
                <IconButton title="Очистить" sx={{ marginRight: '5px' }} onClick={handleClickClearButton}>
                  <ClearIcon sx={{ fontSize: "18px" }} />
                </IconButton>
              )}
              {params.InputProps.endAdornment}
            </>
          ),
        }} />}
      />
    </Box>
  )
}


export default InputSearch;