import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: '',
  inputValueAfterSubmit: null, // для useActionsPagination.
  isSubmitting: false,
  wasFirstSubmit: false,
  hasResFromServerAfterLiveChange: null,
  isHistorySubmitDisplayed: null,
  searchValueLastFoundProduct: null,
  isPressedClearButton: null,
  inputValueBeforeClear: null,
}


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState,

  reducers: {
    setInputValue: (state, action) => { state.inputValue = action.payload },

    setInputValueAfterSubmit: (state, action) => { state.inputValueAfterSubmit = action.payload },

    setIsSubmitting: (state, action) => { state.isSubmitting = action.payload },

    setWasFirstSubmit: (state, action) => { state.wasFirstSubmit = action.payload },

    setHasResFromServerAfterLiveChange: (state, action) => { state.hasResFromServerAfterLiveChange = action.payload },

    setIsHistorySubmitDisplayed: (state, action) => { state.isHistorySubmitDisplayed = action.payload },

    setSearchValueLastFoundProduct: (state, action) => { state.searchValueLastFoundProduct = action.payload },

    setIsPressedClearButton: (state, action) => { state.isPressedClearButton = action.payload },

    setInputValueBeforeClear: (state, action) => { state.inputValueBeforeClear = action.payload },

    resetStatesByDefaultInputSearch: () => { return initialState }
  }
})


export const {
  setInputValue,
  setInputValueAfterSubmit,
  setIsSubmitting,
  setWasFirstSubmit,
  setHasResFromServerAfterLiveChange,
  setIsHistorySubmitDisplayed,
  setSearchValueLastFoundProduct,
  setIsPressedClearButton,
  setInputValueBeforeClear,
  resetStatesByDefaultInputSearch,
} = inputSearchSlice.actions

export default inputSearchSlice.reducer