import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentErrorApp: {
    status: null,
    name: null,
    isError: null,
    message: null,
  }
}


const errorsAppSlice = createSlice({
  name: 'errorsApp',
  initialState,

  reducers: {
    setCurrentErrorApp: (state, action) => {
      const updatedState = { ...state.currentErrorApp }
      updatedState.status = action.payload.status
      updatedState.name = action.payload.name
      updatedState.isError = true
      updatedState.message = action.payload.message

      state.currentErrorApp = updatedState
    },

    resetCurrentErrorApp: (state) => {
      state.currentErrorApp = {
        status: null,
        name: null,
        isError: null,
        message: null,
      }
    },

    resetStatesByDefaultErrorsApp: () => {
      return initialState
    }
  }
})

export const {
  setCurrentErrorApp,
  resetCurrentErrorApp,
  resetStatesByDefaultErrorsApp,
} = errorsAppSlice.actions

export default errorsAppSlice.reducer

