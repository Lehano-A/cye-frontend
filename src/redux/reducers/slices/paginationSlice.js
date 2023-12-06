import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paginationData: null,
  isDisplayedButtonPagination: null,
  isPressedButtonPagination: null,
}


const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPaginationData: (state, action) => { state.paginationData = action.payload },

    setIsDisplayedButtonPagination: (state, action) => { state.isDisplayedButtonPagination = action.payload },

    setIsPressedButtonPagination: (state, action) => { state.isPressedButtonPagination = action.payload },

    resetStatesByDefaultButtonPagination: () => { return initialState }
  },
})


export const {
  setIsDisplayedButtonPagination,
  setPaginationData,
  setIsPressedButtonPagination,
  resetStatesByDefaultButtonPagination,
} = paginationSlice.actions

export default paginationSlice.reducer

