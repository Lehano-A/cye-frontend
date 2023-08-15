import { createSlice } from "@reduxjs/toolkit";


const filterCategoriesSlice = createSlice({
  name: 'filterCategories',
  initialState: {
    isVisible: false,
    uniqueCategories: [],
  },
  reducers: {
    setIsVisible: (state, action) => { state.isVisible = action.payload },
    setUniqueCategories: (state, action) => { state.uniqueCategories = action.payload },
  }
})

export const { setIsVisible, setUniqueCategories } = filterCategoriesSlice.actions

export default filterCategoriesSlice.reducer