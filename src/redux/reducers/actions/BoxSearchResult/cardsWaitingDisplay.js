import { setIsCardsReadyForDisplay } from "../../slices/boxSearchResultSlice";


const cardsReadyForDisplay = () => (dispatch) => {
  dispatch(setIsCardsReadyForDisplay(true))
}

const cardsNotReadyForDisplay = () => (dispatch) => {
  dispatch(setIsCardsReadyForDisplay(false))
}


export {
  cardsReadyForDisplay,
  cardsNotReadyForDisplay,
}