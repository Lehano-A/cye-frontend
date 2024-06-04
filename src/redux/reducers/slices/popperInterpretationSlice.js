import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  data: ''
}


const popperInterpretationSlice = createSlice({
  name: 'popperInterpretation',
  initialState,
  reducers: {
    toggleVisiblePopper: (state) => { state.visible = !state.visible },

    setVisiblePopper: (state, action) => { state.value = action.payload },
    setDataInterpretation: (state, action) => { state.value = action.payload }
  }
})

export const {
  toggleVisiblePopper,
  setVisiblePopper,
  setDataInterpretation
} = popperInterpretationSlice.actions

export default popperInterpretationSlice.reducer
