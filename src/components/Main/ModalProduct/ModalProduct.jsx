import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigationType } from "react-router-dom";
import { Stack, Box } from "@mui/material"
import { styled } from "@mui/material/styles";
import TableNutritionalValue from "./TableNutritionalValue/TableNutritionalValue";
import SwiperSlider from "./SwiperSlider/SwiperSlider";
import FeaturesComposition from "./FeaturesComposition/FeaturesComposition";
import PopperInterpretation from "./PopperInterpretation/PopperInterpretation";
import Composition from "./Composition/Composition";
import NoteToComposition from "./NoteToComposition/NoteToComposition";
import OtherInfo from "./OtherInfo/OtherInfo";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import loglevel from 'loglevel';
import TitleContainer from "./containersModalProduct/TitleContainer";
import StyledBoxAbsoluteCentered from "../../../styled/StyledBoxAbsoluteCentered";
import ModalWindow from "../../ModalWindow/ModalWindow";
import { AFTER_ERROR_APP_HAS_OCCURRED_AND_CLOSING_MODAL_PRODUCT, CLOSING_MODAL_PRODUCT, LOADING, MEDIA_MD_MODAL_PRODUCT, MEDIA_SM_MODAL_PRODUCT, MEDIA_XL_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT, MODAL_PRODUCT, NOT_FOUND } from "../../../helpers/constants";

/* --------------------------------- slices --------------------------------- */
import { changeVisibleModalProduct, setIsFullScreenModalProduct } from "../../../redux/reducers/slices/modalProductSlice";
import { resetStatesByDefaultCardProduct } from "../../../redux/reducers/slices/cardProductSlice";
import { setDataInterpretation, setVisiblePopper } from "../../../redux/reducers/slices/popperInterpretationSlice";
import { resetByDefaultSavedPathDataBeforeOpeningModalProduct } from "../../../redux/reducers/slices/navigationSlice";
import { resetStatesByDefaultErrorsApp } from "../../../redux/reducers/slices/errorsAppSlice";

/* --------------------------------- actions --------------------------------- */
import { resetStatesApp } from "../../../redux/reducers/actions/common/resetStatesApp";

/* ---------------------------------- selectors --------------------------------- */
import { selectArrForShowSearchResultProducts } from "../../../redux/reducers/selectors/boxSearchResultSelectors";

/* ---------------------------------- hooks --------------------------------- */
import useActionsNavigation from "../../../hooks/useActionsNavigation/useActionsNavigation";
import useBreakpoints from "../../../hooks/useMediaQuery";


const StyledBoxSlider = styled(Stack)(() => {
  return {
    alignItems: 'center',
    justifyContent: 'space-between',
    [MEDIA_XS_MODAL_PRODUCT]: {
      width: '300px',
    },

    [MEDIA_SM_MODAL_PRODUCT]: {
      width: '450px',
    },
  }
})


const StyledBoxTitleAndSlider = styled(Stack)(() => {
  return {
    display: 'flex',
    alignItems: 'center',

    [MEDIA_XS_MODAL_PRODUCT]: {
      justifyContent: 'center',
      margin: '15px 0 43px 0',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      justifyContent: 'start',
      margin: 0
    },
  }
})


const StyledCommonBox = styled(Stack)(() => {
  return {
    height: '100%',
  }
})


const StyledTopHalfCommonBox = styled(Stack)(() => {
  return {
    width: '100%',

    [MEDIA_XS_MODAL_PRODUCT]: {
      flexDirection: 'column',
      margin: '0',
      padding: '20px',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '45px 30px 0',
    },

    [MEDIA_XL_MODAL_PRODUCT]: {
      padding: '45px 60px 0',
    },
  }
})


const StyledBottomHalfCommonBox = styled(Stack, {
  shouldForwardProp: (props) => props !== 'isDisplayedNoteComposition'
})((props) => {
  return {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: props.theme.palette.getAlphaColor('primaryTint', 100, 1),

    [MEDIA_XS_MODAL_PRODUCT]: {
      padding: '0 20px',
      margin: `${props.isDisplayedNoteComposition ? '37px 0 0' : '0'}`,
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      margin: `${props.isDisplayedNoteComposition ? '65px 0 0' : '35px 0 0'}`,
    }
  }
})


const WrapperNoteCompositionAndComposition = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '800px',
  }
})


const StyledBoxComposition = styled(Box, { shouldForwardProp: (props) => props !== 'isDisplayedNoteComposition' })(
  (props) => {
    return {
      maxWidth: '500px',

      [MEDIA_XS_MODAL_PRODUCT]: {
        margin: `${props.isDisplayedNoteComposition ? '-20px 0 45px' : '40px 0'}`,
      },

      [MEDIA_MD_MODAL_PRODUCT]: {
        margin: `${props.isDisplayedNoteComposition ? '10px 0 45px' : '40px 0'}`,
      }
    }
  }
)


const log = loglevel.getLogger(MODAL_PRODUCT)


function ModalProduct({ ErrorComponent }) {

  const location = useLocation()
  const navigationType = useNavigationType()
  const dispatch = useDispatch()
  const actionsNavigation = useActionsNavigation()
  const breakpoints = useBreakpoints()

  const selectedCard = useSelector(state => state.cardProduct.selectedCard)
  const isVisiblePopper = useSelector(state => state.popperInterpretation.visible)
  const dataInterpretation = useSelector(state => state.popperInterpretation.value)
  const savedPathDataBeforeOpeningModalProduct = useSelector(state => state.navigation.savedPathDataBeforeOpeningModalProduct)
  const arrForShowSearchResultProducts = useSelector(selectArrForShowSearchResultProducts)
  const [refSelectedIngredient, setRefSelectedIngredient] = useState(null)
  const [sizeMainImage, setSizeMainImage] = useState({
    height: null,
    width: null
  })

  const { data, status } = selectedCard || {}
  const { title, imagesUrl, featuresComposition, company, otherInfo, nutritionalValue, noteToComposition, composition } = data || {}


  useEffect(() => {
    if (!refSelectedIngredient) {
      dispatch(setDataInterpretation(''))
    }
  }, [dispatch, isVisiblePopper, refSelectedIngredient])



  useEffect(() => {
    identifyBreakpoint()
  }, [
    breakpoints.XS,
    breakpoints.MD,
    breakpoints.MDPlus,
    breakpoints.XL
  ])



  function identifyBreakpoint() {
    if (breakpoints.XL) {
      dispatch(setIsFullScreenModalProduct(false))
      updateSizeMainImage(350, 450)
    } else

      if (breakpoints.MDPlus) {
        dispatch(setIsFullScreenModalProduct(false))
        updateSizeMainImage(350, 450)
      } else

        if (breakpoints.MD) {
          dispatch(setIsFullScreenModalProduct(true))
          updateSizeMainImage(350, 450)
        } else

          if (breakpoints.XS) {
            dispatch(setIsFullScreenModalProduct(true))
            updateSizeMainImage(250, 350)
          }
  }



  function updateSizeMainImage(width, height) {
    setSizeMainImage({
      width,
      height,
    })
  }


  function handleCloseModal() {
    log.debug(`
    Произошёл вызов: handleCloseModal
    Что будем делать: закрывать модальное окно продукта

    navigationType: ${navigationType}
    location: `, location)

    if (isVisiblePopper) {
      dispatch(setVisiblePopper(false))
      return
    }

    dispatch(changeVisibleModalProduct(false)) // закрывает модальное окно продукта
    dispatch(resetStatesByDefaultCardProduct())
    dispatch(resetByDefaultSavedPathDataBeforeOpeningModalProduct())

    // если возникла ошибка таймаута ответа от сервера, отсутствие соединения с интернетом или какая-то другая при открытом модале продукта
    if (ErrorComponent) {
      dispatch(resetStatesByDefaultErrorsApp())

      if (arrForShowSearchResultProducts.length === 0) { // если не было ничего найдено для бэкграунда (за модалом)
        dispatch(resetStatesApp()) // тогда сбрасываем все стэйти
        actionsNavigation.pushPathInHistory({ // и переходим на главную страницу
          stage: AFTER_ERROR_APP_HAS_OCCURRED_AND_CLOSING_MODAL_PRODUCT,
          pathData: {
            pathname: "/"
          }
        })
      }
    } else

      if (selectedCard.status === NOT_FOUND && arrForShowSearchResultProducts.length === 0) {

        actionsNavigation.replacePathname({
          stage: CLOSING_MODAL_PRODUCT,
          notFoundModalAndBGProducts: true
        })
      }

      else {

        actionsNavigation.replacePathname({
          stage: CLOSING_MODAL_PRODUCT,
          savedPathDataBeforeOpeningModalProduct
        })
      }
  }

  return (
    <>
      <ModalWindow
        widthModal='1100px'
        heightModal={!data && '100%'}
        handleCloseModal={handleCloseModal}
        positionButtonClose={data && 'fixed'}
        isVisiblePopperInterpretation={isVisiblePopper}
        breakpoints={breakpoints}
        scroll={breakpoints.MDPlus ? 'body' : 'paper'}
      >

        {
          ErrorComponent ?
            <StyledBoxAbsoluteCentered>
              <ErrorComponent />
            </StyledBoxAbsoluteCentered>

            :

            data ?
              <>
                <StyledCommonBox>

                  <StyledTopHalfCommonBox>
                    <StyledBoxTitleAndSlider>

                      <TitleContainer title={title} />

                      <StyledBoxSlider>
                        <SwiperSlider
                          images={imagesUrl}
                          height={sizeMainImage.height}
                          width={sizeMainImage.width}
                        />
                      </StyledBoxSlider>
                    </StyledBoxTitleAndSlider>


                    <Stack sx={{ alignItems: 'center' }}>
                      <FeaturesComposition data={featuresComposition} />
                      <OtherInfo data={{ company: company, otherInfo: otherInfo }} />
                      {nutritionalValue && <TableNutritionalValue data={nutritionalValue} />}
                    </Stack>
                  </StyledTopHalfCommonBox>


                  <StyledBottomHalfCommonBox isDisplayedNoteComposition={noteToComposition}>
                    <WrapperNoteCompositionAndComposition>

                      {
                        noteToComposition && <NoteToComposition data={noteToComposition} />
                      }

                      <StyledBoxComposition
                        isDisplayedNoteComposition={noteToComposition}
                      >
                        <Composition
                          data={composition}
                          setRefSelectedIngredient={setRefSelectedIngredient}
                        />
                      </StyledBoxComposition>
                    </WrapperNoteCompositionAndComposition>
                  </StyledBottomHalfCommonBox>
                </StyledCommonBox>

                {
                  isVisiblePopper &&
                  <PopperInterpretation
                    dataInterpretation={dataInterpretation}
                  />
                }
              </>


              :


              <>
                {
                  status === LOADING &&
                  <StyledBoxAbsoluteCentered>
                    <LoadingIndicator />
                  </StyledBoxAbsoluteCentered>
                }
              </>
        }
      </ModalWindow >
    </>
  )
}

export default ModalProduct