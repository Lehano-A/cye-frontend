import { createSlice } from "@reduxjs/toolkit";


const cardProductSlice = createSlice({
  name: 'cardProduct',
  initialState: {
    countLoadedImagesCards: 0,
  },
  reducers: {
    incrementCountLoadedImagesCards: (state, action) => {
      state.countLoadedImagesCards += action.payload
    },
    clearCountLoadedImagesCards: (state) => {
      state.countLoadedImagesCards = 0
    },
  }
})

export const {incrementCountLoadedImagesCards, clearCountLoadedImagesCards } = cardProductSlice.actions

export default cardProductSlice.reducer