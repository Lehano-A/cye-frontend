import { combineReducers } from "@reduxjs/toolkit";
import inputSearchSlice from "./inputSearchSlice";
import searchRequestProductSlice from "./searchRequestProductSlice";
import modalCardProductSlice from "./modalCardProductSlice";
import selectedCardProductSlice from "./selectedCardProductSlice";
import popperInterpretationSlice from "./popperInterpretationSlice";
import checkUserDeviceSlice from "./checkUserDeviceSlice";
import filterCategoriesSlice from "./filterCategoriesSlice";
import boxSearchResultSlice from "./boxSearchResultSlice";
import cardProductSlice from "./cardProduct"


const rootReducer = combineReducers({
  inputSearch: inputSearchSlice,
  searchRequestProduct: searchRequestProductSlice,
  modalCardProduct: modalCardProductSlice,
  selectedCardProduct: selectedCardProductSlice,
  popperInterpretation: popperInterpretationSlice,
  checkUserDevice: checkUserDeviceSlice,
  filterCategories: filterCategoriesSlice,
  boxSearchResult: boxSearchResultSlice,
  cardProduct: cardProductSlice,
})

export default rootReducer;