import { createSlice } from "@reduxjs/toolkit";


const boxSearchResultSlice = createSlice({
  name: 'boxSearchResult',
  initialState: {
    arrForShowSearchResultProducts: [],
    isLoadingIndicator: null,
    isCardsReadyForDisplay: null,
    timerIdDelayStartLoadingIndicator: null,
    searchValueWithoutResult: null, // значение поиска, которое не было найдено в БД
  },
  reducers: {
    setArrForShowSearchResultProducts: (state, action) => { state.arrForShowSearchResultProducts = action.payload },

    setIsLoadingIndicator: (state, action) => { state.isLoadingIndicator = action.payload },

    setIsCardsReadyForDisplay: (state, action) => { state.isCardsReadyForDisplay = action.payload },

    saveTimerIdDelayStartLoadingIndicator: (state, action) => { state.timerIdDelayStartLoadingIndicator = action.payload },

    setSearchValueWithoutResult: (state, action) => { state.searchValueWithoutResult = action.payload },
  }
})

export const {
  setArrForShowSearchResultProducts,
  setIsLoadingIndicator,
  setIsCardsReadyForDisplay,
  saveTimerIdDelayStartLoadingIndicator,
  setSearchValueWithoutResult,
} = boxSearchResultSlice.actions

export default boxSearchResultSlice.reducer

