import { combineReducers } from "@reduxjs/toolkit";
import InputSearchSlice from "./InputSearchSlice";


const rootReducer = combineReducers({
  inputSearch: InputSearchSlice
})

export default rootReducer;