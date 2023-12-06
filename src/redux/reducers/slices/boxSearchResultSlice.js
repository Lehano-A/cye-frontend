import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrForShowSearchResultProducts: [],
  isLoadingIndicator: null,
  searchValueWithoutResult: null, // значение поиска, которое не было найдено в БД
  columnsGridCards: null, // количество колонок грида карточек в зависимости от размера экрана
}


const boxSearchResultSlice = createSlice({
  name: 'boxSearchResult',
  initialState,
  reducers: {
    setArrForShowSearchResultProducts: (state, action) => { state.arrForShowSearchResultProducts = action.payload },

    setIsLoadingIndicator: (state, action) => { state.isLoadingIndicator = action.payload },

    setSearchValueWithoutResult: (state, action) => { state.searchValueWithoutResult = action.payload },

    setColumnsGridCards: (state, action) => { state.columnsGridCards = action.payload },

    resetStatesByDefaultBoxSearchResult: () => { return initialState }
  }
})


export const {
  setArrForShowSearchResultProducts,
  setIsLoadingIndicator,
  setSearchValueWithoutResult,
  setColumnsGridCards,
  resetStatesByDefaultBoxSearchResult,
} = boxSearchResultSlice.actions

export default boxSearchResultSlice.reducer

