import { createSlice } from "@reduxjs/toolkit";


const searchRequestProductSlice = createSlice({
  name: 'searchRequestProduct',
  initialState: {
    apiFoundProductsAfterSubmit: null ,
    searchBy: null,
  },
  reducers: {
    setApiFoundProductsAfterSubmit: (state, action) => { state.apiFoundProductsAfterSubmit = action.payload },

    setSearchBy: (state, action) => { state.searchBy = action.payload }
  }
})

export const {
  setApiFoundProductsAfterSubmit,
  setSearchBy,
} = searchRequestProductSlice.actions

export default searchRequestProductSlice.reducer