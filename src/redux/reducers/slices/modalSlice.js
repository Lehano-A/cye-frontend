import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisibleModal: true,
  isVisibleModalInterpretation: false,
}


const modalSlice = createSlice({
  name: 'modal',
  initialState,

  reducers: {

    setIsVisibleModal: (state, action) => {
      state.isVisibleModal = action.payload
    },

    setIsVisibleModalInterpretation: (state, action) => {
      state.isVisibleModalInterpretation = action.payload
    },

    resetStatesByDefaultModal: () => {
      return initialState
    }
  }
})


export const {
  setIsVisibleModal,
  setIsVisibleModalInterpretation,
  resetStatesByDefaultModal
} = modalSlice.actions

export default modalSlice.reducer
