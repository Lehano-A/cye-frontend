import { useDispatch, useSelector } from "react-redux";
import { setInputValue, setInputValueAfterSubmit } from "../redux/reducers/slices/inputSearchSlice";
import { setApiFoundProductsAfterSubmit } from "../redux/reducers/slices/searchRequestProductSlice";
import { setArrForShowSearchResultProducts, setSearchValueWithoutResult } from "../redux/reducers/slices/boxSearchResultSlice";
import { resetByDefaultButtonsFilter } from "../redux/reducers/slices/filterCategoriesSlice";
import { setSelectedCard } from "../redux/reducers/slices/cardProductSlice";
import { changeVisibleModalProduct } from "../redux/reducers/slices/modalProductSlice";
import updateStatePagination from "../redux/reducers/actions/pagination/updateStatePagination";
import { setIsDisplayedButtonPagination, setPaginationData } from "../redux/reducers/slices/paginationSlice";
import useActionsNavigation from "./useActionsNavigation/useActionsNavigation";
import { selectPaginationData } from "../redux/reducers/selectors/paginationSelectors";
import { selectApiFoundProductsAfterSubmit } from "../redux/reducers/selectors/searchRequestProductSelectors";
import { updateStatesWhenPageOpenedByLink } from "../redux/reducers/actions/navigation/navigation";
import { AFTER_RES_FROM_API, MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK, OPENING_MODAL_PRODUCT_BY_LINK } from "../helpers/constants";
import { setCurrentErrorApp } from "../redux/reducers/slices/errorsAppSlice";



function useSaveDataAndUpdateState() {

  const dispatch = useDispatch()
  const actionsNavigation = useActionsNavigation()

  const paginationData = useSelector(selectPaginationData)
  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)


  return {
    /* ----------------------------------------------------------------------- */


    // после получения ответа (когда пользователь осуществил стандартный поиск продукта)
    afterResApi({ response, stage = null }) {
      const { search, result, pagination } = response
      const { searchValue } = search;

      if (stage === MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK) {
        dispatch(setInputValue(searchValue))
      }

      dispatch(setApiFoundProductsAfterSubmit(response))
      dispatch(setArrForShowSearchResultProducts(result))
      dispatch(resetByDefaultButtonsFilter()) // сброс кнопок фильтра по дефолту
      dispatch(setInputValueAfterSubmit(response.search.searchValue))

      // если перешли по ссылке на модал продукта
      if (response?.search?.foundProductForModal) {

        const { data, status, message } = response.search.foundProductForModal
        dispatch(setSelectedCard({
          data,
          status,
          message,
        }))
        dispatch(changeVisibleModalProduct(true))
      }

      if (result.length === 0) {
        dispatch(setSearchValueWithoutResult(response.search.searchValue))
      }

      dispatch(updateStatePagination(pagination))
    },


    /* ----------------------------------------------------------------------- */


    // после получения ответа для пагинации (когда пользователь нажал на кнопку пагинации)
    afterResApiForPagination(response) {
      const { page, totalPages } = paginationData
      const { pagination, result } = response

      const concatProducts = apiFoundProductsAfterSubmit.result.concat(result)

      const newState = { ...apiFoundProductsAfterSubmit }
      newState.result = concatProducts

      dispatch(setApiFoundProductsAfterSubmit(newState))
      dispatch(setArrForShowSearchResultProducts(concatProducts))
      dispatch(setPaginationData(pagination))

      if (totalPages - page === 1) {
        dispatch(setIsDisplayedButtonPagination(false))
      }


      actionsNavigation.pushPathInHistory({
        stage: AFTER_RES_FROM_API,
        dataForSavingLocationState: response,
      })
    },


    /* ----------------------------------------------------------------------- */


    afterResApiForModalProductOpenedByLink(response, pathDataBeforeOpeningModalProduct) {

      const { search, pagination } = response
      const { foundProductForModal } = search

      if (foundProductForModal.status === 'notFound') {
        dispatch(setCurrentErrorApp({
          name: foundProductForModal.status,
          message: foundProductForModal.message
        }))
      }

      dispatch(setSelectedCard({
        data: foundProductForModal.data,
        status: foundProductForModal.status,
        message: foundProductForModal.message
      }))

      dispatch(updateStatesWhenPageOpenedByLink(response, {
        settings: {
          stage: OPENING_MODAL_PRODUCT_BY_LINK,
          dataForSavingInStore: {
            searchValue: search.searchValue
          }
        }
      }))

      actionsNavigation.replacePathname({
        stage: OPENING_MODAL_PRODUCT_BY_LINK,
        dataForPathname: { search },
        dataForQueryParams: {
          search,
          pagination,
        },
        dataForSavingLocationState: {
          foundProductForModal,
          pathDataBeforeOpeningModalProduct,
        },
      })
    }
  }
}

export default useSaveDataAndUpdateState