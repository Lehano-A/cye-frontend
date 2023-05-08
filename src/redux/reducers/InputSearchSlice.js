import { createSlice } from "@reduxjs/toolkit";


export const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    value: ''
  },
  reducers: {
    setInputValue: (state, action) => { state.value = action.payload },
    resetInputValue: (state) => { state.value = '' }
  }
})

export const { setInputValue, resetInputValue } = inputSearchSlice.actions

export default inputSearchSlice.reducer