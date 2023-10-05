import { createSlice } from "@reduxjs/toolkit";


const filterCategoriesSlice = createSlice({
  name: 'filterCategories',
  initialState: {
    uniqueCategories: [],
    activeButtonInFilter: null,
    isActiveButtonShowAllProducts: true,
    isFilterDisplayed: null,
  },
  reducers: {
    setUniqueCategories: (state, action) => { state.uniqueCategories = action.payload },

    setActiveButtonInFilter: (state, action) => { state.activeButtonInFilter = action.payload },

    setIsActiveButtonShowAllProducts: (state, action) => { state.isActiveButtonShowAllProducts = action.payload },

    clearUniqueCategories: (state) => { state.uniqueCategories = [] },

    resetDefaultButtonsFilter: (state) => {
      state.activeButtonInFilter = null
      state.isActiveButtonShowAllProducts = true
    },
    setIsFilterDisplayed: (state, action) => { state.isFilterDisplayed = action.payload },
  }
})

export const {
  setUniqueCategories,
  setActiveButtonInFilter,
  setIsActiveButtonShowAllProducts,
  clearUniqueCategories,
  resetDefaultButtonsFilter,
  setIsFilterDisplayed,
} = filterCategoriesSlice.actions

export default filterCategoriesSlice.reducer