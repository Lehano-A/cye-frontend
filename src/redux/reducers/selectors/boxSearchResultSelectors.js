const selectArrForShowSearchResultProducts = state => state.boxSearchResult.arrForShowSearchResultProducts;

const selectIsLoadingIndicatorBoxSearchResult = state => state.boxSearchResult.isLoadingIndicator;

const selectTimerIdDelayStartLoadingIndicator = state => state.boxSearchResult.timerIdDelayStartLoadingIndicator;

const selectSearchValueWithoutResult = state => state.boxSearchResult.searchValueWithoutResult;

const selectСolumnsGridCards = state => state.boxSearchResult.columnsGridCards;


export {
  selectArrForShowSearchResultProducts,
  selectIsLoadingIndicatorBoxSearchResult,
  selectTimerIdDelayStartLoadingIndicator,
  selectSearchValueWithoutResult,
  selectСolumnsGridCards,
}