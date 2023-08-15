import { createSlice } from "@reduxjs/toolkit";


const filterCategoriesSlice = createSlice({
  name: 'filterCategories',
  initialState: {
    isVisible: false,
    uniqueCategories: [],
    activeButtonInGroup: null,
    isActiveButtonShowAllProducts: true,
  },
  reducers: {
    setIsVisible: (state, action) => { state.isVisible = action.payload },
    setUniqueCategories: (state, action) => { state.uniqueCategories = action.payload },
    setActiveButtonInGroup: (state, action) => { state.activeButtonInGroup = action.payload },
    setIsActiveButtonShowAllProducts: (state, action) => { state.isActiveButtonShowAllProducts = action.payload },
  }
})

export const {
  setIsVisible,
  setUniqueCategories,
  setActiveButtonInGroup,
  setIsActiveButtonShowAllProducts,
} = filterCategoriesSlice.actions

export default filterCategoriesSlice.reducer