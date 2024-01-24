import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisibleModal: true,
}


const modalSlice = createSlice({
  name: 'modal',
  initialState,

  reducers: {

    setIsVisibleModal: (state, action) => {
      state.isVisibleModal = action.payload
    },

    resetStatesByDefaultModal: () => {
      return initialState
    }
  }
})


export const {
  setIsVisibleModal,
  resetStatesByDefaultModal
} = modalSlice.actions

export default modalSlice.reducer

