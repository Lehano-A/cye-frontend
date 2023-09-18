import { createSlice } from "@reduxjs/toolkit";


const filterCategoriesSlice = createSlice({
  name: 'filterCategories',
  initialState: {
    uniqueCategories: [],
    activeButtonInFilter: null,
    isActiveButtonShowAllProducts: true,
    countFilteredCards: 0,
    isFadeFirstDisplay: false,
    isFilterDisplayed: null,
  },
  reducers: {
    setUniqueCategories: (state, action) => { state.uniqueCategories = action.payload },

    setActiveButtonInFilter: (state, action) => { state.activeButtonInFilter = action.payload },

    setIsActiveButtonShowAllProducts: (state, action) => { state.isActiveButtonShowAllProducts = action.payload },

    incrementCountFilteredCards: (state, action) => { state.countFilteredCards += action.payload },

    clearCountFilteredCards: (state) => { state.countFilteredCards = 0 },

    clearUniqueCategories: (state) => { state.uniqueCategories = [] },

    resetDefaultButtonsFilter: (state) => {
      state.activeButtonInFilter = null
      state.isActiveButtonShowAllProducts = true
    },

    setIsFadeFirstDisplay: (state, action) => { state.isFadeFirstDisplay = action.payload },

    setIsFilterDisplayed: (state, action) => { state.isFilterDisplayed = action.payload },
  }
})

export const {
  setUniqueCategories,
  setActiveButtonInFilter,
  setIsActiveButtonShowAllProducts,
  incrementCountFilteredCards,
  clearCountFilteredCards,
  clearUniqueCategories,
  resetDefaultButtonsFilter,
  setIsFadeFirstDisplay,
  setIsFilterDisplayed,
} = filterCategoriesSlice.actions

export default filterCategoriesSlice.reducer