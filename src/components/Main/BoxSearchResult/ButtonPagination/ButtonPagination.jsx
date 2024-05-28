import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles"
import LoadingIndicator from "../../../LoadingIndicator/LoadingIndicator";
import { useLocation, useParams } from "react-router-dom";
import createReqConfigSearchProduct from "../../../../helpers/containers/FormSearchContainer/createConfigReqSearchProduct";
import createOptionForPagination from "../../../../helpers/containers/FormSearchContainer/createOptionForPagination";
import { MEDIA_SM_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../helpers/constants";

/* --------------------------------- slices --------------------------------- */
import { setIsPressedButtonPagination } from "../../../../redux/reducers/slices/paginationSlice";
import { resetByDefaultButtonsFilter } from "../../../../redux/reducers/slices/filterCategoriesSlice";
import { resetStatesByDefaultErrorsApp } from "../../../../redux/reducers/slices/errorsAppSlice";

/* -------------------------------- selectors ------------------------------- */
import { selectPaginationData } from "../../../../redux/reducers/selectors/paginationSelectors";
import { selectApiFoundProductsAfterSubmit } from "../../../../redux/reducers/selectors/searchRequestProductSelectors";

/* -------------------------------- hooks ------------------------------- */
import useSendingReqToApi from "../../../../hooks/useSendingReqToApi";



const CommonBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))

const StyledButton = styled(Button)(({ theme }) => {
  return {
    backgroundColor: theme.palette.fullNatural.light,
    color: theme.palette.fullNatural.main,
    fontWeight: 700,
    transition: 'background-color 0.25s ease',
    '&:hover': {
      backgroundColor: theme.palette.getAlphaColor('fullNatural', 'light', 0.2)
    },

    [MEDIA_XS_MODAL_PRODUCT]: {
      width: '130px',
      height: '50px'
    },

    [MEDIA_SM_MODAL_PRODUCT]: {
      width: '150px',
      height: '60px',
    }
  }
})



function ButtonPagination({ ErrorComponent }) {

  const dispatch = useDispatch()
  const sendReqToApi = useSendingReqToApi()
  const params = useParams()
  const location = useLocation()

  const paginationData = useSelector(selectPaginationData)
  const isPressedButtonPagination = useSelector((state) => state.pagination.isPressedButtonPagination)
  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)
  const arrForShowSearchResultProducts = useSelector((state => state.boxSearchResult.arrForShowSearchResultProducts))
  const isVisibleModalProduct = useSelector((state => state.modalProduct.isVisibleModalProduct))


  function handleOnClick() {
    const { search } = apiFoundProductsAfterSubmit
    const { searchBy } = search

    dispatch(setIsPressedButtonPagination(true))
    dispatch(resetByDefaultButtonsFilter())
    dispatch(resetStatesByDefaultErrorsApp())

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
    <CommonBox>
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


      {
        ErrorComponent && arrForShowSearchResultProducts.length > 0 && !isVisibleModalProduct &&
        <ErrorComponent />
      }

    </CommonBox>
  )
}

export default ButtonPagination

