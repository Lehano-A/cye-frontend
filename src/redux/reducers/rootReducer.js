import { combineReducers } from "@reduxjs/toolkit";
import inputSearchSlice from "./inputSearchSlice";
import searchQueryProductSlice from "./searchQueryProductSlice";
import modalCardProductSlice from "./modalCardProductSlice";
import selectedCardProductSlice from "./selectedCardProductSlice";
import popperInterpretationSlice from "./popperInterpretationSlice";


const rootReducer = combineReducers({
  inputSearch: inputSearchSlice,
  searchQueryProduct: searchQueryProductSlice,
  modalCardProduct: modalCardProductSlice,
  selectedCardProduct: selectedCardProductSlice,
  popperInterpretation: popperInterpretationSlice,
})

export default rootReducer;