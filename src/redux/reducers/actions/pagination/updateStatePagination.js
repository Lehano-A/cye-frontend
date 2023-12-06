import { setIsDisplayedButtonPagination, setPaginationData } from "../../slices/paginationSlice"


const updateStatePagination = (pagination) => (dispatch) => {

  const { page, totalPages } = pagination

  totalPages - page > 0 ? dispatch(setIsDisplayedButtonPagination(true)) : dispatch(setIsDisplayedButtonPagination(false))

  dispatch(setPaginationData(pagination))
}



export default updateStatePagination