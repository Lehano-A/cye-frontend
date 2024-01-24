import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisibleModalProduct: false,
  isFullScreenModalProduct: null,
}


const modalProductSlice = createSlice({
  name: 'modalProduct',
  initialState,

  reducers: {
    changeVisibleModalProduct: (state, action) => { state.isVisibleModalProduct = action.payload },

    setIsFullScreenModalProduct: (state, action) => {
      state.isFullScreenModalProduct = action.payload
    },

    resetStatesByDefaultModalProduct: () => {
      return initialState
    }
  }
})


export const {
  changeVisibleModalProduct,
  setIsFullScreenModalProduct,
  resetStatesByDefaultModalProduct
} = modalProductSlice.actions

export default modalProductSlice.reducer

