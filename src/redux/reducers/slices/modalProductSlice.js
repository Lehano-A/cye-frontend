import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisibleModalProduct: false,
}


const modalProductSlice = createSlice({
  name: 'modalProduct',
  initialState,

  reducers: {
    changeVisibleModalProduct: (state, action) => { state.isVisibleModalProduct = action.payload },

    resetStatesByDefaultModalProduct: () => {
      return initialState
    }
  }
})


export const {
  changeVisibleModalProduct,
  resetStatesByDefaultModalProduct
} = modalProductSlice.actions

export default modalProductSlice.reducer

