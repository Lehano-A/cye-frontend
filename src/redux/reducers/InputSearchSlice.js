import { createSlice } from "@reduxjs/toolkit";


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    inputValue: '',
    inputValueAfterSubmit: '',
    isSubmitting: false,
    wasFirstSubmit: false,
    isOpenedDropList: false,
    isLoadingInDropList: false,
    apiFoundProductsForDropList: null,
    gotResFromServer: null,
  },
  reducers: {
    setInputValue: (state, action) => { state.inputValue = action.payload },
    setInputValueAfterSubmit: (state, action) => { state.inputValueAfterSubmit = action.payload },
    setSubmitting: (state, action) => { state.isSubmitting = action.payload },
    setWasFirstSubmit: (state, action) => { state.wasFirstSubmit = action.payload },
    setIsOpenedDropList: (state, action) => { state.isOpenedDropList= action.payload },
    setIsLoadingInDropList: (state, action) => {
      state.isLoadingInDropList = action.payload
    },
    setApiFoundProductsForDropList: (state, action) => { state.apiFoundProductsForDropList = action.payload },
    setGotResFromServer: (state, action) => { state.gotResFromServer = action.payload }
  }
})

export const { setInputValue, setInputValueAfterSubmit, setSubmitting, setWasFirstSubmit, setIsOpenedDropList, setApiFoundProductsForDropList, setIsLoadingInDropList, setGotResFromServer } = inputSearchSlice.actions

export default inputSearchSlice.reducer