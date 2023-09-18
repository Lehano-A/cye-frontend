import { useDispatch } from "react-redux"


function useSaveTimerId() {

  const dispatch = useDispatch()

  function saveTimerId(action, timerId) {
    dispatch(action(timerId))
    return
  }

  return { saveTimerId }
}

export default useSaveTimerId