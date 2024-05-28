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

    resetStatesByDefaultNavigate: () => { return initialState },
  }
})


export const {
  setPathDataBeforeOpeningModalProduct,
  resetByDefaultSavedPathDataBeforeOpeningModalProduct,
  setIsRedirectionFromModalProductPage,
  incrementCountPathnames,
  decrementCountPathnames,
  reseStatesByDefaultNavigate,
} = navigationSlice.actions

export default navigationSlice.reducer
