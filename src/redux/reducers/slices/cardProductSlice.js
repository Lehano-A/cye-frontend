import { createSlice } from "@reduxjs/toolkit";


const cardProductSlice = createSlice({
  name: 'cardProduct',
  initialState: {
    selectedCard: null,
  },
  reducers: {
    setSelectedCard: (state, action) => { state.selectedCard = action.payload },
  }
})

export const {
  setSelectedCard,
} = cardProductSlice.actions

export default cardProductSlice.reducer