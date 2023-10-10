import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"


function useDelayStartLoadingIndicator(action, dependence, delay) {
  const dispatch = useDispatch()

  const [timerId, setTimerId] = useState(null)

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId)
      setTimerId(null)
    }
  }, [...dependence])



  function createTimer() {
    clearTimeout(timerId)

    const timer = setTimeout(() => {
      dispatch(action())
      setTimerId(null)
    }, delay)

    setTimerId(timer)
    return timer
  }

  return { createTimer }
}


export default useDelayStartLoadingIndicator