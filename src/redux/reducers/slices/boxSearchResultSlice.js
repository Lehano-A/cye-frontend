import { createSlice } from "@reduxjs/toolkit";


const boxSearchResultSlice = createSlice({
  name: 'boxSearchResult',
  initialState: {
    arrForShowSearchResultProducts: [],
    isLoadingIndicator: null,
    timerIdDelayStartLoadingIndicator: null,
    searchValueWithoutResult: null, // значение поиска, которое не было найдено в БД
    columnsGridCards: null // количество колонок грида карточек в зависимости от размера экрана
  },
  reducers: {
    setArrForShowSearchResultProducts: (state, action) => { state.arrForShowSearchResultProducts = action.payload },

    setIsLoadingIndicator: (state, action) => { state.isLoadingIndicator = action.payload },

    saveTimerIdDelayStartLoadingIndicator: (state, action) => { state.timerIdDelayStartLoadingIndicator = action.payload },

    setSearchValueWithoutResult: (state, action) => { state.searchValueWithoutResult = action.payload },

    setColumnsGridCards: (state, action) => { state.columnsGridCards = action.payload },
  }
})

export const {
  setArrForShowSearchResultProducts,
  setIsLoadingIndicator,
  // saveTimerIdDelayStartLoadingIndicator,
  setSearchValueWithoutResult,
  setColumnsGridCards,
} = boxSearchResultSlice.actions

export default boxSearchResultSlice.reducer

