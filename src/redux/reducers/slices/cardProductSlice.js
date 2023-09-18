import { createSlice } from "@reduxjs/toolkit";


const cardProductSlice = createSlice({
  name: 'cardProduct',
  initialState: {
    countLoadedImagesCards: 0,
    selectedCard: null,
  },
  reducers: {
    incrementCountLoadedImagesCards: (state, action) => {
      state.countLoadedImagesCards += action.payload
    },

    clearCountLoadedImagesCards: (state) => {
      state.countLoadedImagesCards = 0
    },

    setSelectedCard: (state, action) => { state.selectedCard = action.payload },
  }
})

export const {
  incrementCountLoadedImagesCards,
  clearCountLoadedImagesCards,
  setSelectedCard,
} = cardProductSlice.actions

export default cardProductSlice.reducer