import { createSlice } from "@reduxjs/toolkit";


const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState: {
    inputValue: '',
    isSubmitting: false,
  },
  reducers: {
    setInputValue: (state, action) => { state.inputValue = action.payload },
    resetInputValue: (state, action) => { state.inputValue = action.payload },
    setSubmitting: (state, action) => { state.isSubmitting = action.payload },
  }
})

export const { setInputValue, resetInputValue, setSubmitting } = inputSearchSlice.actions

export default inputSearchSlice.reducer