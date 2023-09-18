const selectArrForShowSearchResultProducts = state => state.boxSearchResult.arrForShowSearchResultProducts;

const selectIsLoadingIndicatorBoxSearchResult = state => state.boxSearchResult.isLoadingIndicator;

const selectIsCardsReadyForDisplay = state => state.boxSearchResult.isCardsReadyForDisplay;

const selectTimerIdDelayStartLoadingIndicator = state => state.boxSearchResult.timerIdDelayStartLoadingIndicator;

const selectSearchValueWithoutResult= state => state.boxSearchResult.searchValueWithoutResult;


export {
  selectArrForShowSearchResultProducts,
  selectIsLoadingIndicatorBoxSearchResult,
  selectIsCardsReadyForDisplay,
  selectTimerIdDelayStartLoadingIndicator,
  selectSearchValueWithoutResult,
}