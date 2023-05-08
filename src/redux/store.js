import { configureStore } from "@reduxjs/toolkit";
import InputSearchSlice from './reducers/InputSearchSlice'


const store = configureStore({
  reducer: {
    inputSearch: InputSearchSlice
  }
})

export default store;