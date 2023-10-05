import { createSlice } from "@reduxjs/toolkit";


const buttonPaginationSlice = createSlice({
  name: 'buttonPagination',
  initialState: {
    isDisplayedButtonPagination: null,
    paginationData: null,
  },
  reducers: {
    setIsDisplayedButtonPagination: (state, action) => { state.isDisplayedButtonPagination = action.payload },

    setPaginationData: (state, action) => { state.paginationData = action.payload },
  }
})

export const {
  setIsDisplayedButtonPagination,
  setPaginationData,
} = buttonPaginationSlice.actions

export default buttonPaginationSlice.reducer

