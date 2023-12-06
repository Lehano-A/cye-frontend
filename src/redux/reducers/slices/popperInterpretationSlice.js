import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  value: ''
}


const popperInterpretationSlice = createSlice({
  name: 'popperInterpretation',
  initialState,
  reducers: {
    toggleVisiblePopper: (state) => { state.visible = !state.visible },

    setValueInterpretation: (state, action) => { state.value = action.payload }
  }
})

export const {
  toggleVisiblePopper,
  setValueInterpretation
} = popperInterpretationSlice.actions

export default popperInterpretationSlice.reducer

