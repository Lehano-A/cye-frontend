import { createSlice } from "@reduxjs/toolkit";


export const modalCardProductSlice = createSlice({
  name: 'modalCardProduct',
  initialState: {
    visible: false
  },
  reducers: {
    changeVisibleModal: (state, action) => { state.visible = action.payload },
  }
})

export const { changeVisibleModal } = modalCardProductSlice.actions

export default modalCardProductSlice.reducer

