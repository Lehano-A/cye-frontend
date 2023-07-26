import { createSlice } from "@reduxjs/toolkit";


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    inputValue: '',
    isSubmitting: false,
    isOpenedDropdownWindow: false,
    apiFoundProductsBySubstr: [],
    apiFoundProductsForDroplist: [],
  },
  reducers: {
    setInputValue: (state, action) => { state.inputValue = action.payload },
    setSubmitting: (state, action) => { state.isSubmitting = action.payload },
    setShowDropdownWindow: (state, action) => { state.isOpenedDropdownWindow = action.payload },
    setApiFoundProductsBySubstr: (state, action) => { state.apiFoundProductsBySubstr = action.payload },
    setApiFoundProductsForDroplist: (state, action) => { state.apiFoundProductsForDroplist = action.payload }
  }
})

export const { setInputValue, setSubmitting, setShowDropdownWindow, setApiFoundProductsBySubstr, setApiFoundProductsForDroplist } = inputSearchSlice.actions

export default inputSearchSlice.reducer