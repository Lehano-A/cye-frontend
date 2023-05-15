import { createSlice } from "@reduxjs/toolkit";


const selectedCardProductSlice = createSlice({
  name: 'selectedCardProduct',
  initialState: {
    selectedCard: null
  },
  reducers: {
    setSelectedCard: (state, action) => { state.selectedCard = action.payload },
  }
})

export const { setSelectedCard } = selectedCardProductSlice.actions

export default selectedCardProductSlice.reducer