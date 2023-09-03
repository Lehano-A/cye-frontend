import React, { useState, useCallback, useEffect } from "react";
import { Box, Autocomplete } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setIsSubmitting, setIsOpenedDropList, setApiFoundProductsForDropList, setGotResFromServer, setIsCursorInsideDropList, setIsLoadingInDropList } from "../../../../redux/reducers/inputSearchSlice";
import { debounce as debounceInputChange } from "../../../../utils/debounce"
import api from "../../../../api/api";
import ItemDropList from "./ItemDropList/ItemDropList";
import Input from "./Input/Input";
import LoadingInDropList from "./LoadingInDropList/LoadingInDropList";
import NoResultSearch from "./NoResultSearch/NoResultSearch";


const styleMainBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '250px',
  maxWidth: '600px',
  margin: '0 20px'
}


function InputSearch({ handleOnChange }) {
  const dispatch = useDispatch();

  const inputValue = useSelector(state => state.inputSearch.inputValue)
  const isSubmitting = useSelector(state => state.inputSearch.isSubmitting)
  const isOpenedDropList = useSelector(state => state.inputSearch.isOpenedDropList)
  const apiFoundProductsForDropList = useSelector(state => state.inputSearch.apiFoundProductsForDropList)
  const isLoadingInDropList = useSelector(state => state.inputSearch.isLoadingInDropList)
  const isCursorInsideDropList = useSelector(state => state.inputSearch.isCursorInsideDropList)

  const [value, setValue] = useState(null);

  const timeoutReqApiAfterInputLiveChange = useCallback(debounceInputChange(reqApiInputLiveChange, 300), [])


  useEffect(() => {
    if (inputValue.length === 0 && isOpenedDropList) {
      dispatch(setIsOpenedDropList(false))
    }

    if (inputValue.length >= 1 && !isOpenedDropList && !isSubmitting) {
      dispatch(setIsOpenedDropList(true))
    }
  }, [inputValue])



  // запрос к api, после изменения значения в строке поиска
  function reqApiInputLiveChange(e, newValue) {
    if (e.target.value !== '' && e.type === 'change') {
      dispatch(setGotResFromServer(false))
      dispatch(setIsOpenedDropList(true))

      api.findProductBySubstr({ substr: newValue }) // поиск по подстроке
        .then((arrData) => {
          dispatch(setApiFoundProductsForDropList(arrData))
        })
        .catch(() => { new Error('Возникла ошибка во время поиска продукта') })
        .finally(() => { dispatch(setGotResFromServer(true)) })

    } else {
      dispatch(setIsOpenedDropList(false))
    }
  }


  function changeStatesAfterInputLiveChange(newValue, isSubmitting) {
    handleLoadingInDropList(true)
    dispatch(setInputValue(newValue))
    dispatch(setApiFoundProductsForDropList(null))

    // если был сабмит (отправка запроса на поиск продукта), то при изменении значения в строке поиска, состояние сабмита сбрасывается
    isSubmitting && dispatch(setIsSubmitting(false))
  }


  // обработчик стэйта индикатора загрузки в выпадающем окне
  function handleLoadingInDropList(state) {
    dispatch(setIsLoadingInDropList(state))
  }


  // вызывается при каждом изменении значения (с учётом debounce)
  function handleInputLiveChange(e, newValue) {

    // если курсор на опции в выпадающем окне и нажимается "Enter"
    // тогда запоминаем введённое значение в поле ввода и прерываемся
    // дальше обработка будет происходить в handleOnChange, поскольку произошло нажатие "Enter"
    if (e.type === 'keydown' && isCursorInsideDropList) {
      dispatch(setInputValue(inputValue))
      return
    }

    if (e.type === "change") {
      changeStatesAfterInputLiveChange(newValue, isSubmitting)
      timeoutReqApiAfterInputLiveChange(e, newValue)
    }
  }


  // обработчик закрытия выпадающего окна
  function handleCloseDropList(e) {

    // если работает индикатор загрузки данных
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


  // если был ввод, появился предварительный результат в выпадающем окне, а потом произошёл клик вне выпадающего окна (оно закрылось), то при следующем клике в строку поиска, предыдущий результат вновь отобразится
  function handleOpenDropListWithData(e) {
    if (e.type === 'mousedown') {
      if (inputValue?.length > 0 && !isOpenedDropList && apiFoundProductsForDropList?.length > 0) {
        dispatch(setIsOpenedDropList(true))
      }
    }
  }


  // обработчик слежения за курсором мыши относительно выпадающего окна
  // (нужно для того, чтобы корректно обрабатывался сабмит, если курсор находится на опции из выпадающего списка - в этом случае (в корректном) произойдёт запрос с значением из поля ввода)
  function handleMouseInsideListbox(e) {
    if (e.type === 'mouseenter') {
      dispatch(setIsCursorInsideDropList(true))
    }

    if (e.type === 'mouseleave') {
      dispatch(setIsCursorInsideDropList(false))
    }
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
        onInputChange={handleInputLiveChange} // вызывается при каждом изменении значения в поле ввода (с учётом debounce)
        open={isOpenedDropList}
        onClose={handleCloseDropList}
        onOpen={handleOpenDropListWithData}
        loadingText={
          apiFoundProductsForDropList?.length === 0 ?
            <NoResultSearch />
            :
            <LoadingInDropList
              handleLoadingInDropList={handleLoadingInDropList}
            />
        }
        options={apiFoundProductsForDropList === null ? [] : apiFoundProductsForDropList} // принимает только массив
        getOptionLabel={(option) => {
          return (
            option.brand ? option.brand :
              option.categories ? option.categories :
                option.title ? option.title : option
          )
        }} // нужно вернуть только строку (вызывается для каждой опции выпадающего окна)
        ListboxProps={
          {
            sx: { maxHeight: '100%' },
            onMouseEnter: (e) => { handleMouseInsideListbox(e) },
            onMouseLeave: (e) => { handleMouseInsideListbox(e) }
          }
        } // сам элемент - "выпадающее окно"
        renderOption={(props, option) => <ItemDropList key={props.key} props={props} option={option} />
        } // вызывается для каждой опции выпадающего окна
        renderInput={(params) => <Input params={params} />
        }
      />
    </Box>
  )
}


export default InputSearch;