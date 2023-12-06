import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uniqueCategories: [],
  activeButtonFilter: null,
  isActiveButtonShowAllProducts: true,
  isFilterDisplayed: null,
  wasUsedFilter: null,
}


const filterCategoriesSlice = createSlice({
  name: 'filterCategories',
  initialState,
  reducers: {
    setUniqueCategories: (state, action) => { state.uniqueCategories = action.payload },

    setActiveButtonFilter: (state, action) => { state.activeButtonFilter = action.payload },

    setIsActiveButtonShowAllProducts: (state, action) => { state.isActiveButtonShowAllProducts = action.payload },

    clearUniqueCategories: (state) => { state.uniqueCategories = [] },

    setWasUsedFilter: (state, action) => { state.wasUsedFilter = action.payload },

    setIsFilterDisplayed: (state, action) => { state.isFilterDisplayed = action.payload },

    resetByDefaultButtonsFilter: (state) => {
      state.activeButtonFilter = null
      state.isActiveButtonShowAllProducts = true
    },

    replaceSliceFilterCategories: (state, action) => { return action.payload },

    resetStatesByDefaultFilterCategories: () => { return initialState },
  }
})


export const {
  setUniqueCategories,
  setActiveButtonFilter,
  setIsActiveButtonShowAllProducts,
  clearUniqueCategories,
  setIsFilterDisplayed,
  setWasUsedFilter,
  resetByDefaultButtonsFilter,
  replaceSliceFilterCategories,
  resetStatesByDefaultFilterCategories,
} = filterCategoriesSlice.actions

export default filterCategoriesSlice.reducer