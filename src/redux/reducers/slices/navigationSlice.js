import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedPathDataBeforeOpeningModalProduct: {
    pathname: null,
    search: null,
    hash: null,
    locationState: null
  },
  isRedirectionFromModalProductPage: null,
  countPathnames: 0,
  pageWithError: {
    status: null,
    name: null,
    isError: null,
    message: null,
  }
}


const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {

    setPathDataBeforeOpeningModalProduct: (state, action) => { state.savedPathDataBeforeOpeningModalProduct = action.payload },

    resetByDefaultSavedPathDataBeforeOpeningModalProduct: (state) => {
      state.savedPathDataBeforeOpeningModalProduct = initialState.savedPathDataBeforeOpeningModalProduct
    },

    setIsRedirectionFromModalProductPage: (state, action) => { state.isRedirectionFromModalProductPage = action.payload },

    incrementCountPathnames: (state) => { state.countPathnames = state.countPathnames + 1 },

    setPageWithError: (state, action) => {
      const updatedState = { ...state.pageWithError }
      updatedState.status = action.payload.status
      updatedState.name = action.payload.name
      updatedState.isError = true
      updatedState.message = action.payload.message

      state.pageWithError = updatedState
    },

    resetPageWithError: (state) => {
      state.pageWithError = {
        status: null,
        name: null,
        isError: null,
        message: null,
      }
    },

    resetStatesByDefaultNavigate: () => { return initialState },
  }
})


export const {
  setPathDataBeforeOpeningModalProduct,
  resetByDefaultSavedPathDataBeforeOpeningModalProduct,
  setIsRedirectionFromModalProductPage,
  incrementCountPathnames,
  decrementCountPathnames,
  setPageWithError,
  resetPageWithError,
  reseStatesByDefaultNavigate,
} = navigationSlice.actions

export default navigationSlice.reducer
