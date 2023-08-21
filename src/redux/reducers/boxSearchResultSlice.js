import { createSlice } from "@reduxjs/toolkit";


const boxSearchResultSlice = createSlice({
  name: 'boxSearchResult',
  initialState: {
    arrForShowSearchResultProducts: [],
  },
  reducers: {
    setArrForShowSearchResultProducts: (state, action) => { state.arrForShowSearchResultProducts = action.payload },
  }
})

export const { setArrForShowSearchResultProducts } = boxSearchResultSlice.actions

export default boxSearchResultSlice.reducer