import { createSlice } from "@reduxjs/toolkit";


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    inputValue: '',
    savedInputValueAfterSubmit: null,
    isSubmitting: false,
    wasFirstSubmit: false,
    hasResFromServerAfterLiveChange: null,
    isHistorySubmitDisplayed: null,
    searchValueLastFoundProduct: null,
    isNoResultLivingSearch: null,
    isPressedClearButton: null
  },

  reducers: {
    setInputValue: (state, action) => { state.inputValue = action.payload },

    setSavedInputValueAfterSubmit: (state, action) => { state.savedInputValueAfterSubmit = action.payload },

    setIsSubmitting: (state, action) => { state.isSubmitting = action.payload },

    setWasFirstSubmit: (state, action) => { state.wasFirstSubmit = action.payload },

    setHasResFromServerAfterLiveChange: (state, action) => { state.hasResFromServerAfterLiveChange = action.payload },

    setIsHistorySubmitDisplayed: (state, action) => { state.isHistorySubmitDisplayed = action.payload },

    setSearchValueLastFoundProduct: (state, action) => { state.searchValueLastFoundProduct = action.payload },

    setIsNoResultLivingSearch: (state, action) => { state.isNoResultLivingSearch = action.payload },

    setIsPressedClearButton: (state, action) => { state.isPressedClearButton = action.payload },
  }
})

export const {
  setInputValue,
  setSavedInputValueAfterSubmit,
  setIsSubmitting,
  setWasFirstSubmit,
  setHasResFromServerAfterLiveChange,
  setIsHistorySubmitDisplayed,
  setSearchValueLastFoundProduct,
  setIsNoResultLivingSearch,
  setIsPressedClearButton,
} = inputSearchSlice.actions

export default inputSearchSlice.reducer