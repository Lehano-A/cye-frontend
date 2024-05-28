import { combineReducers } from "@reduxjs/toolkit";
import inputSearchSlice from "./slices/inputSearchSlice";
import searchRequestProductSlice from "./slices/searchRequestProductSlice";
import modalProductSlice from "./slices/modalProductSlice";
import popperInterpretationSlice from "./slices/popperInterpretationSlice";
import checkUserDeviceSlice from "./slices/checkUserDeviceSlice";
import filterCategoriesSlice from "./slices/filterCategoriesSlice";
import boxSearchResultSlice from "./slices/boxSearchResultSlice";
import cardProductSlice from "./slices/cardProductSlice"
import dropListPreSearchResultSlice from "./slices/dropListPreSearchResultSlice";
import paginationSlice from "./slices/paginationSlice";
import navigationSlice from "./slices/navigationSlice";
import modalSlice from "./slices/modalSlice";
import errorsAppSlice from "./slices/errorsAppSlice";

const rootReducer = combineReducers({
  inputSearch: inputSearchSlice,
  searchRequestProduct: searchRequestProductSlice,
  modalProduct: modalProductSlice,
  popperInterpretation: popperInterpretationSlice,
  checkUserDevice: checkUserDeviceSlice,
  filterCategories: filterCategoriesSlice,
  boxSearchResult: boxSearchResultSlice,
  cardProduct: cardProductSlice,
  dropListPreSearchResult: dropListPreSearchResultSlice,
  pagination: paginationSlice,
  navigation: navigationSlice,
  modal: modalSlice,
  errorsApp: errorsAppSlice,
})

export default rootReducer;