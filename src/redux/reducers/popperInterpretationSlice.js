import { createSlice } from "@reduxjs/toolkit";


export const popperInterpretationSlice = createSlice({
  name: 'popperInterpretation',
  initialState: {
    visible: false,
    value: ''
  },
  reducers: {
    toggleVisiblePopper: (state) => { state.visible = !state.visible },
    setValueInterpretation: (state, action) => { state.value = action.payload }
  }
})

export const { toggleVisiblePopper, setValueInterpretation } = popperInterpretationSlice.actions

export default popperInterpretationSlice.reducer

