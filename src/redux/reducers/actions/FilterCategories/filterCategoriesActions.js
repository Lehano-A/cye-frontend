import { setIsFadeFirstDisplay } from "../../slices/filterCategoriesSlice";

const setFadeFirstDisplay = () => (dispatch) => {
  dispatch(setIsFadeFirstDisplay(true))
}

export {
  setFadeFirstDisplay
}