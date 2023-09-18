import { combineReducers } from "@reduxjs/toolkit";
import inputSearchSlice from "./slices/inputSearchSlice";
import searchRequestProductSlice from "./slices/searchRequestProductSlice";
import modalCardProductSlice from "./slices/modalCardProductSlice";
import popperInterpretationSlice from "./slices/popperInterpretationSlice";
import checkUserDeviceSlice from "./slices/checkUserDeviceSlice";
import filterCategoriesSlice from "./slices/filterCategoriesSlice";
import boxSearchResultSlice from "./slices/boxSearchResultSlice";
import cardProductSlice from "./slices/cardProductSlice"
import dropListPreSearchResultSlice from "./slices/dropListPreSearchResultSlice";


const rootReducer = combineReducers({
  inputSearch: inputSearchSlice,
  searchRequestProduct: searchRequestProductSlice,
  modalCardProduct: modalCardProductSlice,
  popperInterpretation: popperInterpretationSlice,
  checkUserDevice: checkUserDeviceSlice,
  filterCategories: filterCategoriesSlice,
  boxSearchResult: boxSearchResultSlice,
  cardProduct: cardProductSlice,
  dropListPreSearchResult: dropListPreSearchResultSlice,
})

export default rootReducer;