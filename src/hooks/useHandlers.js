import { useDispatch } from "react-redux"
import { setPageWithError } from "../redux/reducers/slices/navigationSlice"
import handlePromiseError from "../utils/api/handlePromiseError"



function useHandlers() {
  const dispatch = useDispatch()

  return {
    pageNotFound(err) {

      handlePromiseError(err, (err) => {

        if (err.status === 404) {
          dispatch(setPageWithError(err))
          throw new Error(`${err.message} 404`)
        }
      })

    }
  }
}

export default useHandlers