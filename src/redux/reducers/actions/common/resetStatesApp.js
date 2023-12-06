import { resetStatesByDefaultBoxSearchResult } from "../../slices/boxSearchResultSlice";
import { resetStatesByDefaultButtonPagination } from "../../slices/paginationSlice";
import { resetStatesByDefaultCardProduct } from "../../slices/cardProductSlice";
import { resetStatesByDefaultDropListPreSearchResult } from "../../slices/dropListPreSearchResultSlice";
import { resetStatesByDefaultFilterCategories } from "../../slices/filterCategoriesSlice";
import { resetStatesByDefaultInputSearch } from "../../slices/inputSearchSlice";
import { resetStatesByDefaultModalProduct } from "../../slices/modalProductSlice";
import { resetStatesByDefaultSearchRequestProduct } from "../../slices/searchRequestProductSlice";


const resetStatesApp = () => (dispatch) => {
  dispatch(resetStatesByDefaultBoxSearchResult())
  dispatch(resetStatesByDefaultButtonPagination())
  dispatch(resetStatesByDefaultCardProduct())
  dispatch(resetStatesByDefaultDropListPreSearchResult())
  dispatch(resetStatesByDefaultFilterCategories())
  dispatch(resetStatesByDefaultInputSearch())
  dispatch(resetStatesByDefaultSearchRequestProduct())
  dispatch(resetStatesByDefaultModalProduct())
}


export {
  resetStatesApp
}