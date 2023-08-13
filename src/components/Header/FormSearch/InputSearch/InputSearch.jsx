import React, { useState, useCallback } from "react";
import { Box, TextField, Autocomplete, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setSubmitting, setShowDropdownWindow, setApiFoundProductsBySubstr, setApiFoundProductsForDroplist } from "../../../../redux/reducers/inputSearchSlice";
import { setApiFoundProductsAfterSubmit } from "../../../../redux/reducers/searchRequestProductSlice"
import { styled } from "@mui/material/styles";
import api from "../../../../api/api";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';


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


function InputSearch() {

  const inputValue = useSelector(state => state.inputSearch.inputValue)
  const [value, setValue] = useState(null);

  const dispatch = useDispatch();
  const isOpenedDropdownWindow = useSelector(state => state.inputSearch.isOpenedDropdownWindow)

  const apiFoundProductsForDroplist = useSelector(state => state.inputSearch.apiFoundProductsForDroplist)
  const timeoutInputChange = useCallback(debounceInputChange(reqApiInputChange, 100), [])


  // запрос к api, после изменения значения в строке поиска
  function reqApiInputChange(event, newValue) {
    if (event.target.value !== '' && event.type === 'change') {

      api.findProductBySubstr(newValue) // поиск по подстроке
        .then((list) => {
          dispatch(setApiFoundProductsForDroplist(list))
        })
        .catch(() => { new Error('Возникла ошибка во время поиска продукта') })

      dispatch(setShowDropdownWindow(true))
    } else {
      dispatch(setShowDropdownWindow(false))
    }
  }


  // вызывается при каждом изменении значения (с учётом debounce)
  function handleInputChange(e, newValue) {
    dispatch(setInputValue(newValue))
    timeoutInputChange(e, newValue)
  }


  const handleClose = (e) => {
    if (e.target.textContent.length >= 2) {
      resetStates()
    }
  }

  const handleClearButtonClick = () => {
    dispatch(setInputValue(''))
    resetStates()
  }

  const resetStates = () => {
    dispatch(setShowDropdownWindow(false))
    dispatch(setApiFoundProductsBySubstr([]))
  }


  // вызывается при сабмите введённой строки или при выборе опции из выпадающего списка
  const handleOnChange = (e, targetValue) => {

    // если подстрока или выбран вариант из выпадающего списка
    if (e.type === 'keydown' || e.type === 'click') {
      if (targetValue.length >= 2 || targetValue.title) {
        dispatch(setSubmitting(true))

        api.findProductBySubmit(targetValue)
          .then((res) => {
            dispatch(setShowDropdownWindow(false))
            dispatch(setApiFoundProductsForDroplist([]))
            dispatch(setApiFoundProductsAfterSubmit(res))
          })
          .catch(() => { new Error('Возникла ошибка во время сабмита поиска продукта') })
      }
    }
    dispatch(setInputValue(targetValue.title ? targetValue.title : targetValue))
  }




  return (
    <Box sx={styleMainBox}>
      <Autocomplete
        loading
        loadingText={
          <Box sx={{ display: 'flex', 'justifyContent': 'center' }}>
            <CircularProgress size={20} color='primary' />
          </Box>
        }
        options={apiFoundProductsForDroplist}
        freeSolo
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => {
          return (
            <Box {...props}>
              <img style={{ marginRight: '15px' }} src={option.imagesUrl} alt=""></img>
              {option.title}
            </Box>
          )
        }}
        disableClearable
        sx={{ width: 3500, }}
        clearOnEscape
        noOptionsText="Такой продукт не найден :("
        forcePopupIcon={false}
        renderInput={(params) => <StyledTextField placeholder="Например: Хрутка" {...params} InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {inputValue !== '' && (
                <IconButton title="Очистить" sx={{ marginRight: '5px' }} onClick={handleClearButtonClick}>
                  <ClearIcon sx={{ fontSize: "18px" }} />
                </IconButton>
              )}
              {params.InputProps.endAdornment}
            </>
          ),
        }} />}
        blurOnSelect // сброс фокуса, после сабмита или выбора варианта
        value={value} // текущее значение выбранной опции
        onChange={handleOnChange} // вызывается при выборе опции из выпадающего списка
        inputValue={inputValue} // текущее значение поля ввода
        onInputChange={handleInputChange} // вызывается при каждом изменении значения в поле ввода (с учётом debounce)
        open={isOpenedDropdownWindow}
        onClose={handleClose}
      />
    </Box>
  )
}


export default InputSearch;