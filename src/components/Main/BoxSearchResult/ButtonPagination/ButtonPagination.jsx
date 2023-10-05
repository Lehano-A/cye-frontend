import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles"
import api from "../../../../api/api";
import LoadingIndicator from "../../../LoadingIndicator/LoadingIndicator";

/* --------------------------------- slices --------------------------------- */
import { setPaginationData } from "../../../../redux/reducers/slices/buttonPaginationSlice";

import { setIsDisplayedButtonPagination } from "../../../../redux/reducers/slices/buttonPaginationSlice";

import { setApiFoundProductsAfterSubmit } from "../../../../redux/reducers/slices/searchRequestProductSlice";

import { resetDefaultButtonsFilter } from "../../../../redux/reducers/slices/filterCategoriesSlice";

import { setArrForShowSearchResultProducts } from "../../../../redux/reducers/slices/boxSearchResultSlice";


/* -------------------------------- selectors ------------------------------- */
import { selectPaginationData } from "../../../../redux/reducers/selectors/buttonPaginationSelectors";

import { selectApiFoundProductsAfterSubmit } from "../../../../redux/reducers/selectors/searchRequestProductSelectors";

import { selectSavedInputValueAfterSubmit } from "../../../../redux/reducers/selectors/inputSearchSelectors";


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
  const paginationData = useSelector(selectPaginationData)
  const [isPressedButton, setIsPressedButton] = useState(null)

  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)
  const savedInputValueAfterSubmit = useSelector(selectSavedInputValueAfterSubmit)



  function saveDataAndUpdateStateAfterResApi(response) {
    const { page, totalPages } = paginationData
    const { searchBy, pagination, result } = response
    
    const concatProducts = apiFoundProductsAfterSubmit.result.concat(result)

    dispatch(setApiFoundProductsAfterSubmit({
      searchBy: searchBy,
      pagination: pagination,
      result: concatProducts,
    }))
    dispatch(setArrForShowSearchResultProducts(concatProducts))
    dispatch(setPaginationData(pagination))

    if (totalPages - page === 1) {
      dispatch(setIsDisplayedButtonPagination(false))
    }
  }



  function sendReqPagination(method, newDataPaginationToServer) {
    const { searchBy } = apiFoundProductsAfterSubmit

    api[method](newDataPaginationToServer)
      .then((response) => {
        saveDataAndUpdateStateAfterResApi(response)
      })
      .catch(() => {
        throw new Error(`
      searchBy: ${searchBy}
      Возникла ошибка во время поиска продукта при нажатии кнопки "Показать ещё"
      `)
      })
      .finally(() => { setIsPressedButton(false) })
  }



  function handleOnClick() {
    const { searchBy } = apiFoundProductsAfterSubmit

    setIsPressedButton(true)
    dispatch(resetDefaultButtonsFilter())

    const newDataForPaginationToServer = {
      searchBy: searchBy,
      value: savedInputValueAfterSubmit,
      pagination: paginationData,
    }

    if (searchBy === 'brands') {
      sendReqPagination('findProductByBrand', newDataForPaginationToServer) // бренд
      return
    }

    if (searchBy === 'categories') {
      sendReqPagination('findProductByCategory', newDataForPaginationToServer) // категория
      return
    }

    sendReqPagination('findProductBySubmit', newDataForPaginationToServer) // всё остальное
  }




  return (
    <StyledButton onClick={handleOnClick}>
      {isPressedButton ? <LoadingIndicator color={(theme) => { return theme.palette.fullNatural.main }} /> : "Показать ещё"}
    </StyledButton>
  )
}

export default ButtonPagination