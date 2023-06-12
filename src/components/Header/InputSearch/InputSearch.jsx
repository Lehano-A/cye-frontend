import React, { useState, useEffect } from "react";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setSubmitting, setShowDropdownWindow, setApiFilterProducts } from "../../../redux/reducers/inputSearchSlice";
import { styled } from "@mui/material/styles";
import api from "../../../api/api";
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


function InputSearch() {

  const inputValue = useSelector(state => state.inputSearch.inputValue)
  const isOpenedDropdownWindow = useSelector(state => state.inputSearch.isOpenedDropdownWindow)
  const isSubmitting = useSelector(state => state.inputSearch.isSubmitting)
  const [apiData, setApiData] = useState([])
  const apiFilterProducts = useSelector(state => state.inputSearch.apiFilterProducts)
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();


  // при изменении значения в поле ввода и после получения новых данных
  // проводится фильтрация по подстроке
  // фильтрация здесь временно, потом уйдёт в бэкенд
  useEffect(() => {
    const filter = apiData.filter((product) => {
      return product.title.toLowerCase().includes(inputValue.toLowerCase())
    })
    dispatch(setApiFilterProducts(filter))
  }, [apiData, inputValue])


  // срабатывает, после выбора пользоваталем элемента в выпадающем окне и
  // изменения состояния isSubmitting на true
  useEffect(() => {
    if (isSubmitting) {
      console.log('Выполняется загрузка данных выбранного продукта')
      dispatch(setSubmitting(false))
    }
  }, [isSubmitting, dispatch])


  // вызывается при каждом изменении значения
  const handleInputChange = (e, newValue) => {

    if (e.target.value !== '') {
      console.log('Выполняется поиск совпадения подстроки')
      const products = api.getProducts()

      products.then((list) => {
        setApiData(list)
      })

      dispatch(setShowDropdownWindow(true))
    } else {
      dispatch(setShowDropdownWindow(false))
    }

    dispatch(setInputValue(newValue))
  }


  const handleClose = () => {
    resetStates()
  }

  const handleClearButtonClick = () => {
    dispatch(setInputValue(''))
    resetStates()
  }

  const resetStates = () => {
    dispatch(setShowDropdownWindow(false))
    dispatch(setApiFilterProducts([]))
  }

  // вызывается при выборе опции из выпадающего списка
  const handleOnChange = () => {
    dispatch(setSubmitting(true))
  }

  
  return (
    <Box sx={styleMainBox}>
      <Autocomplete
        options={apiFilterProducts}
        groupBy={((option) => { return option.category })}
        getOptionLabel={(option) => {
          return option.title
        }}
        disableClearable
        sx={{ width: 3500, }}
        autoHighlight
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
        clearOnBlur={false}
        selectOnFocus
        value={value} // текущее значение выбранной опции
        onChange={handleOnChange} // вызывается при выборе опции из выпадающего списка
        inputValue={inputValue} // текущее значение поля ввода
        onInputChange={handleInputChange} // вызывается при каждом изменении значения в поле ввода
        open={isOpenedDropdownWindow}
        onClose={handleClose}
      />
    </Box>
  )
}


export default InputSearch;