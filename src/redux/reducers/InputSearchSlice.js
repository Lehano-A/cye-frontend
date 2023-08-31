import { createSlice } from "@reduxjs/toolkit";


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    inputValue: '',
    inputValueAfterSendReq: null,
    isSubmitting: false,
    wasFirstSubmit: false,
    isOpenedDropList: false,
    isLoadingInDropList: false,
    apiFoundProductsForDropList: null,
    isCursorInsideDropList: null,
    gotResFromServer: null,
    isApiReqByCategory: null,
  },

  reducers: {
    setInputValue: (state, action) => { state.inputValue = action.payload },
    setInputValueAfterSendReq: (state, action) => { state.inputValueAfterSendReq = action.payload },
    setSubmitting: (state, action) => { state.isSubmitting = action.payload },
    setWasFirstSubmit: (state, action) => { state.wasFirstSubmit = action.payload },
    setIsOpenedDropList: (state, action) => { state.isOpenedDropList = action.payload },
    setIsLoadingInDropList: (state, action) => {
      state.isLoadingInDropList = action.payload
    },
    setApiFoundProductsForDropList: (state, action) => { state.apiFoundProductsForDropList = action.payload },
    setIsCursorInsideDropList: (state, action) => { state.isCursorInsideDropList = action.payload },
    setGotResFromServer: (state, action) => { state.gotResFromServer = action.payload },
    setIsApiReqByCategory: (state, action) => { state.isApiReqByCategory = action.payload },
  }
})

export const {
  setInputValue,
  setInputValueAfterSendReq,
  setSubmitting,
  setWasFirstSubmit,
  setIsOpenedDropList,
  setApiFoundProductsForDropList,
  setIsLoadingInDropList,
  setGotResFromServer,
  setIsApiReqByCategory,
  setIsCursorInsideDropList
} = inputSearchSlice.actions

export default inputSearchSlice.reducer