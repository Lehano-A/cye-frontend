import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles"
import LoadingIndicator from "../../../LoadingIndicator/LoadingIndicator";
import { useLocation, useParams } from "react-router-dom";
import createReqConfigSearchProduct from "../../../../utils/containers/FormSearchContainer/createConfigReqSearchProduct";
import createOptionForPagination from "../../../../utils/containers/FormSearchContainer/createOptionForPagination";

/* --------------------------------- slices --------------------------------- */
import { setIsPressedButtonPagination } from "../../../../redux/reducers/slices/paginationSlice";
import { resetByDefaultButtonsFilter } from "../../../../redux/reducers/slices/filterCategoriesSlice";

/* -------------------------------- selectors ------------------------------- */
import { selectPaginationData } from "../../../../redux/reducers/selectors/paginationSelectors";
import { selectApiFoundProductsAfterSubmit } from "../../../../redux/reducers/selectors/searchRequestProductSelectors";

/* -------------------------------- hooks ------------------------------- */
import useSendingReqToApi from "../../../../hooks/useSendingReqToApi";


const StyledButton = styled(Button)(({ theme }) => {
  return {
    width: '150px',
    height: '60px',
    backgroundColor: theme.palette.fullNatural.light,
    color: theme.palette.fullNatural.main,
    fontWeight: 700,
    transition: 'background-color 0.25s ease',
    '&:hover': {
      backgroundColor: theme.palette.getAlphaColor('fullNatural', 'light', 0.2)
    }
  }
})



function ButtonPagination() {

  const dispatch = useDispatch()
  const sendReqToApi = useSendingReqToApi()
  const params = useParams()
  const location = useLocation()

  const paginationData = useSelector(selectPaginationData)
  const isPressedButtonPagination = useSelector((state) => state.pagination.isPressedButtonPagination)
  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)


  function handleOnClick() {
    const { search } = apiFoundProductsAfterSubmit
    const { searchBy } = search

    dispatch(setIsPressedButtonPagination(true))
    dispatch(resetByDefaultButtonsFilter())

    const dataForOption = createOptionForPagination(
      apiFoundProductsAfterSubmit,
      paginationData,
      location,
      params
    )

    const { apiMethod, searchData } = createReqConfigSearchProduct(
      { ...dataForOption, page: paginationData.page },
    )

    sendReqToApi.findProductForPagination(apiMethod, searchData, searchBy)
  }



  return (
    <StyledButton
      onClick={handleOnClick}
      disabled={isPressedButtonPagination}
    >
      {
        isPressedButtonPagination ?
          <LoadingIndicator
            color={(theme) => { return theme.palette.fullNatural.main }}
          />
          :
          "Показать ещё"
      }
    </StyledButton>
  )
}

export default ButtonPagination