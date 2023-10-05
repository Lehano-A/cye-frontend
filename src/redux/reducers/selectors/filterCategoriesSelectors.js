const selectUniqueCategories = state => state.filterCategories.uniqueCategories;

const selectActiveButtonInFilter = state => state.filterCategories.activeButtonInFilter;

const selectIsActiveButtonShowAllProducts = state => state.filterCategories.isActiveButtonShowAllProducts;

const selectIsFilterDisplayed = state => state.filterCategories.isFilterDisplayed;


export {
  selectUniqueCategories,
  selectActiveButtonInFilter,
  selectIsActiveButtonShowAllProducts,
  selectIsFilterDisplayed,
}