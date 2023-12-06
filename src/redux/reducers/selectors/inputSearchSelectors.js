const selectInputValue = state => state.inputSearch.inputValue;

const selectInputValueAfterSubmit = state => state.inputSearch.inputValueAfterSubmit;

const selectIsSubmitting = state => state.inputSearch.isSubmitting;

const selectWasFirstSubmit = state => state.inputSearch.wasFirstSubmit;

const selectHasResFromServerAfterLiveChange = state => state.inputSearch.hasResFromServerAfterLiveChange;

const selectIsHistorySubmitDisplayed = state => state.inputSearch.isHistorySubmitDisplayed;


export {
  selectInputValue,
  selectInputValueAfterSubmit,
  selectIsSubmitting,
  selectWasFirstSubmit,
  selectHasResFromServerAfterLiveChange,
  selectIsHistorySubmitDisplayed,
}