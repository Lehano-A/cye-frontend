import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCard: {
    data: null,
    status: null,
    message: null,
  }
}


const cardProductSlice = createSlice({
  name: 'cardProduct',
  initialState,
  reducers: {
    setSelectedCard: (state, action) => { state.selectedCard = action.payload },

    resetStatesByDefaultCardProduct: () => { return initialState }
  }
})


export const {
  setSelectedCard,
  resetStatesByDefaultCardProduct,
} = cardProductSlice.actions

export default cardProductSlice.reducer