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
    clearCountFilterCards: (state) => {
      state.countFilterCards = 0
    },
    clearUniqueCategories: (state) => {
      state.uniqueCategories = []
    },
    resetDefaultButtonsFilter: (state) => {
      state.activeButtonInGroup = null
      state.isActiveButtonShowAllProducts = true
    },
  }
})

export const {
  setUniqueCategories,
  setActiveButtonInGroup,
  setIsActiveButtonShowAllProducts,
  incrementCountFilterCards,
  clearCountFilterCards,
  clearUniqueCategories,
  resetDefaultButtonsFilter
} = filterCategoriesSlice.actions

export default filterCategoriesSlice.reducer