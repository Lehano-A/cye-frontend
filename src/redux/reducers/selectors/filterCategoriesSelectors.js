const selectUniqueCategories = state => state.filterCategories.uniqueCategories;

const selectNameActiveButtonInFilter = state => state.filterCategories.activeButtonFilter;

const selectIsActiveButtonShowAllProducts = state => state.filterCategories.isActiveButtonShowAllProducts;

const selectIsFilterDisplayed = state => state.filterCategories.isFilterDisplayed;


export {
  selectUniqueCategories,
  selectNameActiveButtonInFilter,
  selectIsActiveButtonShowAllProducts,
  selectIsFilterDisplayed,
}