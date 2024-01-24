import React from "react";
import { Box, Autocomplete } from "@mui/material";
import ItemDropList from "./ItemDropList/ItemDropList";
import Input from "./Input/Input";
import DropListbox from "./DropListbox/DropListbox";


const styleListboxProps = {
  sx: {
    maxHeight: '100%',
  }
}


const styleMainBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '219px',
  maxWidth: '600px',
}



function InputSearch({
  value,
  inputValue,
  isOpenedDropList,
  apiFoundProductsForDropList,
  handleOnChange,
  handleInputLiveChange,
  handleCloseDropList,
  handleOnOpen,
  handleMouseInsideListbox,
}) {

  return (
    <Box sx={styleMainBox}>
      <Autocomplete
        sx={{ width: 3500 }}
        freeSolo
        includeInputInList
        clearOnEscape
        disableClearable
        forcePopupIcon={false}
        value={value} // текущее значение выбранной опции
        onChange={handleOnChange} // вызывается при выборе опции из выпадающего списка
        inputValue={inputValue} // текущее значение поля ввода
        onInputChange={handleInputLiveChange} // вызывается при каждом изменении значения в поле ввода (с учётом debounce)
        open={isOpenedDropList}
        onClose={handleCloseDropList}
        onOpen={handleOnOpen}
        filterOptions={(option) => option}
        options={apiFoundProductsForDropList === null ? [] : apiFoundProductsForDropList} // принимает только массив
        getOptionLabel={(option) => {
          const { brand, category, text, title } = option

          return (
            brand || category || text || title || option
          )

        }} // нужно вернуть только строку (вызывается для каждой опции выпадающего окна)
        ListboxComponent={DropListbox}
        componentsProps={{
          popper: {
            sx: { maxHeight: '100%' },
            onMouseEnter: (e) => { handleMouseInsideListbox(e) },
            onMouseLeave: (e) => { handleMouseInsideListbox(e) },
          }
        }}
        ListboxProps={styleListboxProps} // сам элемент - "выпадающее окно"
        renderOption={(props, option) => <ItemDropList key={props.key} props={props} option={option} />
        } // вызывается для каждой опции выпадающего окна
        renderInput={(params) => <Input params={params} />
        }
      />
    </Box>
  )
}


export default InputSearch;