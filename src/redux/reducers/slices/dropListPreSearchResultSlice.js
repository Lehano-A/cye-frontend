import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenedDropList: false,
  isCursorInsideDropList: null,
  apiFoundProductsForDropList: null,
  /*
    отдельное сохранение предварительного результата, чтобы не делать лишнего запроса, а отобразить сразу же предыдущий результат с той же "поисковой строкой"
    это происходит, когда выпадающий список был скрыт
  */
  saveboxDropListBeforeSubmit: null,
}


const dropListPreSearchResultSlice = createSlice({
  name: 'dropListPreSearchResult',
  initialState,
  reducers: {
    setIsOpenedDropList: (state, action) => { state.isOpenedDropList = action.payload },

    setIsCursorInsideDropList: (state, action) => { state.isCursorInsideDropList = action.payload },

    setApiFoundProductsForDropList: (state, action) => { state.apiFoundProductsForDropList = action.payload },

    setSaveboxDropListBeforeSubmit: (state, action) => { state.saveboxDropListBeforeSubmit = action.payload },

    resetStatesByDefaultDropListPreSearchResult: () => { return initialState }
  },
})


export const {
  setIsOpenedDropList,
  setIsCursorInsideDropList,
  setApiFoundProductsForDropList,
  setSaveboxDropListBeforeSubmit,
  resetStatesByDefaultDropListPreSearchResult,
} = dropListPreSearchResultSlice.actions

export default dropListPreSearchResultSlice.reducer