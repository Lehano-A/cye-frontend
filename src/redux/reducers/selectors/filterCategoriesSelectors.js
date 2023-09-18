const selectUniqueCategories = state => state.filterCategories.uniqueCategories;

const selectActiveButtonInFilter = state => state.filterCategories.activeButtonInFilter;

const selectIsActiveButtonShowAllProducts = state => state.filterCategories.isActiveButtonShowAllProducts;

const selectCountFilteredCards = state => state.filterCategories.countFilteredCards;

const selectIsFadeFirstDisplay = state => state.filterCategories.isFadeFirstDisplay;

const selectIsFilterDisplayed = state => state.filterCategories.isFilterDisplayed;


export {
  selectUniqueCategories,
  selectActiveButtonInFilter,
  selectIsActiveButtonShowAllProducts,
  selectCountFilteredCards,
  selectIsFadeFirstDisplay,
  selectIsFilterDisplayed,
}