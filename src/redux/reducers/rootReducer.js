import { combineReducers } from "@reduxjs/toolkit";
import inputSearchSlice from "./inputSearchSlice";
import searchRequestProductSlice from "./searchRequestProductSlice";
import modalCardProductSlice from "./modalCardProductSlice";
import selectedCardProductSlice from "./selectedCardProductSlice";
import popperInterpretationSlice from "./popperInterpretationSlice";


const rootReducer = combineReducers({
  inputSearch: inputSearchSlice,
  searchRequestProduct: searchRequestProductSlice,
  modalCardProduct: modalCardProductSlice,
  selectedCardProduct: selectedCardProductSlice,
  popperInterpretation: popperInterpretationSlice,
})

export default rootReducer;