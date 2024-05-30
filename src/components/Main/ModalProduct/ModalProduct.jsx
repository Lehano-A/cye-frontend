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
import Modal from "../../Modal/Modal";
import { AFTER_ERROR_APP_HAS_OCCURRED_AND_CLOSING_MODAL_PRODUCT, CLOSING_MODAL_PRODUCT, LOADING, MEDIA_MD_MODAL_PRODUCT, MEDIA_SM_MODAL_PRODUCT, MEDIA_XL_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT, MODAL_PRODUCT, NOT_FOUND } from "../../../helpers/constants";

/* --------------------------------- slices --------------------------------- */
import { changeVisibleModalProduct, setIsFullScreenModalProduct } from "../../../redux/reducers/slices/modalProductSlice";
import { resetStatesByDefaultCardProduct } from "../../../redux/reducers/slices/cardProductSlice";
import { setValueInterpretation } from "../../../redux/reducers/slices/popperInterpretationSlice";
import { resetByDefaultSavedPathDataBeforeOpeningModalProduct } from "../../../redux/reducers/slices/navigationSlice";

/* ---------------------------------- selectors --------------------------------- */
import { selectArrForShowSearchResultProducts } from "../../../redux/reducers/selectors/boxSearchResultSelectors";

/* ---------------------------------- hooks --------------------------------- */
import useActionsNavigation from "../../../hooks/useActionsNavigation/useActionsNavigation";
import useBreakpoints from "../../../hooks/useMediaQuery";
import { resetStatesByDefaultErrorsApp } from "../../../redux/reducers/slices/errorsAppSlice";
import { resetStatesApp } from "../../../redux/reducers/actions/common/resetStatesApp";


const StyledBoxTitle = styled(Box)(() => {
  return {
    display: 'flex',
    wordBreak: 'break-word',
    margin: '0 0 10px 0',

    [MEDIA_XS_MODAL_PRODUCT]: {
      display: 'flex',
      width: '90%',
      justifyContent: 'center',
    },
  }
})


const StyledBoxSlider = styled(Stack)(() => {
  return {
    alignItems: 'center',

    [MEDIA_XS_MODAL_PRODUCT]: {
      width: '300px',
    },

    [MEDIA_SM_MODAL_PRODUCT]: {
      width: '450px',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      width: '450px',
    },

    [MEDIA_XL_MODAL_PRODUCT]: {
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
      margin: '0 0 50px 0',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
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


const StyledBoxNoteToComposition = styled(Stack)(({ theme }) => {
  return {
    position: 'relative',
    backgroundColor: theme.palette.getAlphaColor('primaryTint', '200', 1),
    padding: '20px 20px 20px 25px',
    borderRadius: '15px',

    [MEDIA_XS_MODAL_PRODUCT]: {
      top: '-75px',
      left: 0,
      minWidth: '280px',
      maxWidth: '500px',
      width: '100%',
      margin: '38px 0 0 0',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      top: '-40px',
      left: '-70px',
      maxWidth: '440px',
      width: 'max-content',
      alignSelf: 'start',
      margin: '0',
    }
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


const StyledBoxLoadingIndicator = styled(StyledBoxAbsoluteCentered)(() => { })
const StyledBoxError = styled(StyledBoxAbsoluteCentered)(() => ({ width: '100%' }))

const log = loglevel.getLogger(MODAL_PRODUCT)


function ModalProduct({ ErrorComponent }) {

  const location = useLocation()
  const navigationType = useNavigationType()
  const dispatch = useDispatch()
  const actionsNavigation = useActionsNavigation()
  const breakpoints = useBreakpoints()

  const selectedCard = useSelector(state => state.cardProduct.selectedCard)
  const isVisiblePopper = useSelector(state => state.popperInterpretation.visible)
  const interpretationValue = useSelector(state => state.popperInterpretation.value)
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
      dispatch(setValueInterpretation(''))
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
    }

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
      <Modal
        widthModal='1100px'
        heightModal='100%'
        handleCloseModal={handleCloseModal}
        positionButtonClose={data && 'fixed'}
      >

        {
          ErrorComponent ?
            <StyledBoxError>
              <ErrorComponent />
            </StyledBoxError>

            :

            data ?
              <>
                <StyledCommonBox>

                  <StyledTopHalfCommonBox>
                    <StyledBoxTitleAndSlider>

                      <StyledBoxTitle>
                        <TitleContainer title={title} />
                      </StyledBoxTitle>

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
                        noteToComposition &&
                        <StyledBoxNoteToComposition>
                          <NoteToComposition data={noteToComposition} />
                        </StyledBoxNoteToComposition>
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
                  refSelectedIngredient &&
                  <PopperInterpretation
                    refIngredient={refSelectedIngredient}
                    interpretationValue={interpretationValue}
                  />
                }
              </>


              :


              <>
                {
                  status === LOADING &&
                  <StyledBoxLoadingIndicator>
                    <LoadingIndicator />
                  </StyledBoxLoadingIndicator>
                }
              </>
        }
      </Modal>
    </>
  )
}

export default ModalProduct