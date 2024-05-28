import { useDispatch } from "react-redux"
import handlePromiseError from "../helpers/api/handlePromiseError"
import { setCurrentErrorApp } from "../redux/reducers/slices/errorsAppSlice"



function useHandlers() {
  const dispatch = useDispatch()



  return {
    handleError(err) {
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        if (navigator.onLine) {
          dispatch(setCurrentErrorApp({ name: "apiTimeout" }))
          return
        }

        dispatch(setCurrentErrorApp({ name: "noInternetConnection" }))
      }
    },

    pageNotFound(err) {
      handlePromiseError(err, (err) => {

        if (err.status === 404) {
          dispatch(setCurrentErrorApp(err))
          throw new Error(`${err.message} 404`)
        }
      })

    }
  }
}

export default useHandlers