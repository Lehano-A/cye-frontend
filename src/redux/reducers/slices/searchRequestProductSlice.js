import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiFoundProductsAfterSubmit: null,
  searchBy: null,
}


const searchRequestProductSlice = createSlice({
  name: 'searchRequestProduct',
  initialState,
  reducers: {
    setApiFoundProductsAfterSubmit: (state, action) => { state.apiFoundProductsAfterSubmit = action.payload },

    setSearchBy: (state, action) => { state.searchBy = action.payload },

    resetStatesByDefaultSearchRequestProduct: () => { return initialState },
  }
})


export const {
  setApiFoundProductsAfterSubmit,
  setSearchBy,
  resetStatesByDefaultSearchRequestProduct,
} = searchRequestProductSlice.actions

export default searchRequestProductSlice.reducer