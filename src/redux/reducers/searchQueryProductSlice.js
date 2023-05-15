import { createSlice } from "@reduxjs/toolkit";


const searchQueryProductSlice = createSlice({
  name: 'searchQueryProduct',
  initialState: {
    foundProducts: []
  },
  reducers: {
    setFetchFoundProducts: (state, action) => { state.foundProducts = action.payload },
  }
})

export const { setFetchFoundProducts } = searchQueryProductSlice.actions

export default searchQueryProductSlice.reducer