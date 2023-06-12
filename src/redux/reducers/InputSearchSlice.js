import { createSlice } from "@reduxjs/toolkit";


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    inputValue: '',
    isSubmitting: false,
    isOpenedDropdownWindow: false,
    apiFilterProducts: [],
  },
  reducers: {
    setInputValue: (state, action) => { state.inputValue = action.payload },
    setSubmitting: (state, action) => { state.isSubmitting = action.payload },
    setShowDropdownWindow: (state, action) => { state.isOpenedDropdownWindow = action.payload },
    setApiFilterProducts: (state, action) => { state.apiFilterProducts = action.payload },
  }
})

export const { setInputValue, setSubmitting, setShowDropdownWindow, setApiFilterProducts } = inputSearchSlice.actions

export default inputSearchSlice.reducer