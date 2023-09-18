import { setIsLoadingIndicator } from "../../slices/boxSearchResultSlice";


const startLoadingIndicatorBoxSearchResult = () => (dispatch) => {
  dispatch(setIsLoadingIndicator(true))
}

const endLoadingIndicatorBoxSearchResult = () => (dispatch) => {
  dispatch(setIsLoadingIndicator(false))
}


export {
  startLoadingIndicatorBoxSearchResult,
  endLoadingIndicatorBoxSearchResult,
}
