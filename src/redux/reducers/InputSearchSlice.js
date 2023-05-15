import { createSlice } from "@reduxjs/toolkit";


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    value: ''
  },
  reducers: {
    setInputValue: (state, action) => { state.value = action.payload },
    resetInputValue: (state, action) => { state.value = action.payload }
  }
})

export const { setInputValue, resetInputValue } = inputSearchSlice.actions

export default inputSearchSlice.reducer