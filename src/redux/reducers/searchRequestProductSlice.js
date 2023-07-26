import { createSlice } from "@reduxjs/toolkit";


const searchRequestProductSlice = createSlice({
  name: 'searchRequestProduct',
  initialState: {
    apiFoundProductsAfterSubmit: []
  },
  reducers: {
    setApiFoundProductsAfterSubmit: (state, action) => { state.apiFoundProductsAfterSubmit = action.payload },
  }
})

export const { setApiFoundProductsAfterSubmit } = searchRequestProductSlice.actions

export default searchRequestProductSlice.reducer