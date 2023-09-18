const selectInputValue = state => state.inputSearch.inputValue;

const selectSavedInputValueAfterSubmit = state => state.inputSearch.savedInputValueAfterSubmit;

const selectIsSubmitting = state => state.inputSearch.isSubmitting;

const selectWasFirstSubmit = state => state.inputSearch.wasFirstSubmit;

const selectHasResFromServerAfterLiveChange = state => state.inputSearch.hasResFromServerAfterLiveChange;

const selectIsHistorySubmitDisplayed = state => state.inputSearch.isHistorySubmitDisplayed;

const selectIsNoResultLivingSearch = state => state.inputSearch.isNoResultLivingSearch;


export {
  selectInputValue,
  selectSavedInputValueAfterSubmit,
  selectIsSubmitting,
  selectWasFirstSubmit,
  selectHasResFromServerAfterLiveChange,
  selectIsHistorySubmitDisplayed,
  selectIsNoResultLivingSearch,
}