import { useState } from "react"
import { useDispatch } from "react-redux"

function useDelayStartLoadingIndicator(action, delay) {
  const dispatch = useDispatch()
  
  const [timerId, setTimerId] = useState(null)


  function createTimer() {
    clearTimeout(timerId)

    const timer = setTimeout(() => {
      dispatch(action())
    }, delay)

    setTimerId(timer)
    return timer
  }

  return { createTimer }
}


export default useDelayStartLoadingIndicator