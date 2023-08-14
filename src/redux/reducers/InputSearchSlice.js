import { createSlice } from "@reduxjs/toolkit";


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    inputValue: '',
    inputValueAfterSubmit: '',
    isSubmitting: false,
    wasFirstSubmit: false,
    isOpenedDropdownWindow: false,
    apiFoundProductsBySubstr: [],
    apiFoundProductsForDroplist: [],
  },
  reducers: {
    setInputValue: (state, action) => { state.inputValue = action.payload },
    setInputValueAfterSubmit: (state, action) => { state.inputValueAfterSubmit = action.payload },
    setSubmitting: (state, action) => { state.isSubmitting = action.payload },
    setWasFirstSubmit: (state, action) => { state.wasFirstSubmit = action.payload },
    setShowDropdownWindow: (state, action) => { state.isOpenedDropdownWindow = action.payload },
    setApiFoundProductsBySubstr: (state, action) => { state.apiFoundProductsBySubstr = action.payload },
    setApiFoundProductsForDroplist: (state, action) => { state.apiFoundProductsForDroplist = action.payload }
  }
})

export const { setInputValue, setInputValueAfterSubmit, setSubmitting, setWasFirstSubmit, setShowDropdownWindow, setApiFoundProductsBySubstr, setApiFoundProductsForDroplist } = inputSearchSlice.actions

export default inputSearchSlice.reducer