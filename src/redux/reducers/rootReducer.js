import { combineReducers } from "@reduxjs/toolkit";
import inputSearchSlice from "./inputSearchSlice";
import searchQueryProductSlice from "./searchQueryProductSlice";
import modalCardProductSlice from "./modalCardProductSlice";
import selectedCardProductSlice from "./selectedCardProductSlice";


const rootReducer = combineReducers({
  inputSearch: inputSearchSlice,
  searchQueryProduct: searchQueryProductSlice,
  modalCardProduct: modalCardProductSlice,
  selectedCardProduct: selectedCardProductSlice,
})

export default rootReducer;