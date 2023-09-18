import { createSlice } from "@reduxjs/toolkit";


const dropListPreSearchResultSlice = createSlice({
  name: 'dropListPreSearchResult',
  initialState: {
    isOpenedDropList: false,
    isCursorInsideDropList: null,
    apiFoundProductsForDropList: null,
    /*
    отдельное сохранение предварительного результата, чтобы не делать лишнего запроса, а отобразить сразу же предыдущий результат с той же "поисковой строкой"
    это происходит, когда выпадающий список был скрыт
    */
    saveboxDropListBeforeSubmit: null,
  },
  reducers: {
    setIsOpenedDropList: (state, action) => { state.isOpenedDropList = action.payload },

    setIsCursorInsideDropList: (state, action) => { state.isCursorInsideDropList = action.payload },

    setApiFoundProductsForDropList: (state, action) => { state.apiFoundProductsForDropList = action.payload },

    setSaveboxDropListBeforeSubmit: (state, action) => { state.saveboxDropListBeforeSubmit = action.payload },
  },
})

export const {
  setIsOpenedDropList,
  setIsCursorInsideDropList,
  setApiFoundProductsForDropList,
  setSaveboxDropListBeforeSubmit
} = dropListPreSearchResultSlice.actions

export default dropListPreSearchResultSlice.reducer