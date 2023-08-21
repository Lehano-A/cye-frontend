import { createSlice } from "@reduxjs/toolkit";


const filterCategoriesSlice = createSlice({
  name: 'filterCategories',
  initialState: {
    uniqueCategories: [],
    activeButtonInGroup: null,
    isActiveButtonShowAllProducts: true,
    countFilterCards: 0,
  },
  reducers: {
    setUniqueCategories: (state, action) => { state.uniqueCategories = action.payload },
    setActiveButtonInGroup: (state, action) => { state.activeButtonInGroup = action.payload },
    setIsActiveButtonShowAllProducts: (state, action) => { state.isActiveButtonShowAllProducts = action.payload },
    incrementCountFilterCards: (state, action) => {
      state.countFilterCards += action.payload
    },
    clearCountFilterCards: (state, action) => {
      state.countFilterCards = 0
    },
  }
})

export const {
  setUniqueCategories,
  setActiveButtonInGroup,
  setIsActiveButtonShowAllProducts,
  incrementCountFilterCards,
  clearCountFilterCards,
} = filterCategoriesSlice.actions

export default filterCategoriesSlice.reducer