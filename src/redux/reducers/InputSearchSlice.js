import { createSlice } from "@reduxjs/toolkit";


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    inputValue: '',
    inputValueAfterSendReq: null,
    isSubmitting: false,
    isOpenedDropList: false,
    isLoadingInDropList: false,
    isCursorInsideDropList: null,
    wasFirstSubmit: false,
    apiFoundProductsForDropList: null,
    gotResFromServer: null,
  },

  reducers: {
    setInputValue: (state, action) => { state.inputValue = action.payload },
    setInputValueAfterSendReq: (state, action) => { state.inputValueAfterSendReq = action.payload },
    setIsSubmitting: (state, action) => { state.isSubmitting = action.payload },
    setIsOpenedDropList: (state, action) => { state.isOpenedDropList = action.payload },
    setIsLoadingInDropList: (state, action) => {
      state.isLoadingInDropList = action.payload
    },
    setIsCursorInsideDropList: (state, action) => { state.isCursorInsideDropList = action.payload },
    setWasFirstSubmit: (state, action) => { state.wasFirstSubmit = action.payload },
    setApiFoundProductsForDropList: (state, action) => { state.apiFoundProductsForDropList = action.payload },
    setGotResFromServer: (state, action) => { state.gotResFromServer = action.payload },
  }
})

export const {
  setInputValue,
  setInputValueAfterSendReq,
  setIsSubmitting,
  setIsOpenedDropList,
  setIsLoadingInDropList,
  setIsCursorInsideDropList,
  setWasFirstSubmit,
  setApiFoundProductsForDropList,
  setGotResFromServer,
} = inputSearchSlice.actions

export default inputSearchSlice.reducer