import { createSlice } from "@reduxjs/toolkit";


const filterCategoriesSlice = createSlice({
  name: 'filterCategories',
  initialState: {
    uniqueCategories: [],
    activeButtonInFilter: null,
    isActiveButtonShowAllProducts: true,
    countFilterCards: 0,
    isFadeFirstDisplay: false,

  },
  reducers: {
    setUniqueCategories: (state, action) => { state.uniqueCategories = action.payload },
    setActiveButtonInFilter: (state, action) => { state.activeButtonInFilter = action.payload },
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
      state.activeButtonInFilter = null
      state.isActiveButtonShowAllProducts = true
    },
    setIsFadeFirstDisplay: (state, action) => {
      state.isFadeFirstDisplay = action.payload
    },
  }
})

export const {
  setUniqueCategories,
  setActiveButtonInFilter,
  setIsActiveButtonShowAllProducts,
  incrementCountFilterCards,
  clearCountFilterCards,
  clearUniqueCategories,
  resetDefaultButtonsFilter,
  setIsFadeFirstDisplay
} = filterCategoriesSlice.actions

export default filterCategoriesSlice.reducer