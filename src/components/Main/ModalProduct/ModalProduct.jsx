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
import NotFoundProduct from "./NotFoundProduct/NotFoundProduct";
import TitleContainer from "./containersModalProduct/TitleContainer";
import { CLOSING_MODAL_PRODUCT, LOADING, MEDIA_MD_MODAL_PRODUCT, MEDIA_SM_MODAL_PRODUCT, MEDIA_XL_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT, MODAL_PRODUCT, NOT_FOUND } from "../../../utils/constants";

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
import Modal from "../../Modal/Modal";


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
      margin: '0 0 70px 0',
    },
  }
})


const StyledCommonBox = styled(Stack)(() => {
  return {
    justifyContent: 'space-between',
    gap: 5,
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


const StyledBottomHalfCommonBox = styled(Stack)(({ theme }) => {
  return {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.getAlphaColor('primaryTint', 100, 1),
    margin: '50px 0 0',

    [MEDIA_XS_MODAL_PRODUCT]: {
      padding: '0 20px',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      padding: '100px 0 0 0px ',
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

    width: 'max-content',
    backgroundColor: theme.palette.getAlphaColor('primaryTint', '200', 1),
    padding: '20px 20px 20px 25px',
    borderRadius: '15px',

    [MEDIA_XS_MODAL_PRODUCT]: {
      top: '-65px',
      left: 0,
      maxWidth: '280px',
      margin: '38px 0 0 0',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      top: '-140px',
      left: '-70px',
      alignSelf: 'start',
      maxWidth: '440px',
      margin: '0',
    }
  }
})


const StyledBoxComposition = styled(Box)(() => {
  return {
    position: 'relative',
    maxWidth: '500px',

    [MEDIA_XS_MODAL_PRODUCT]: {
      top: '-15px',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      top: '-90px',
    }
  }
})


const StyledBoxLoadingIndicator = styled(Box)(() => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
})


const log = loglevel.getLogger(MODAL_PRODUCT)



function ModalProduct() {

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

  const { data, status, message } = selectedCard || {}
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

    dispatch(changeVisibleModalProduct(false))
    dispatch(resetStatesByDefaultCardProduct())
    dispatch(changeVisibleModalProduct(false)) // закрывает модальное окно продукта

    dispatch(resetByDefaultSavedPathDataBeforeOpeningModalProduct())

    if (selectedCard.status === NOT_FOUND && arrForShowSearchResultProducts.length === 0) {

      actionsNavigation.replacePathname({
        stage: CLOSING_MODAL_PRODUCT,
        notFoundModalAndBGProducts: true
      })
    } else {

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
        heightModal={status === LOADING && '100%'}
        handleCloseModal={handleCloseModal}
        positionButtonClose={data && 'fixed'}
      >

        {
          data && (
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



              <StyledBottomHalfCommonBox>
                <WrapperNoteCompositionAndComposition>
                  {
                    noteToComposition &&
                    <StyledBoxNoteToComposition>
                      <NoteToComposition data={noteToComposition} />
                    </StyledBoxNoteToComposition>
                  }

                  <StyledBoxComposition>
                    <Composition
                      data={composition}
                      setRefSelectedIngredient={setRefSelectedIngredient}
                    />
                  </StyledBoxComposition>
                </WrapperNoteCompositionAndComposition>
              </StyledBottomHalfCommonBox>
            </StyledCommonBox>
          )
        }


        {
          status === LOADING &&
          <StyledBoxLoadingIndicator>
            <LoadingIndicator />
          </StyledBoxLoadingIndicator>
        }


        {
          refSelectedIngredient && (
            <PopperInterpretation
              refIngredient={refSelectedIngredient}
              interpretationValue={interpretationValue}
            />
          )
        }

      </Modal>


      {
        status === NOT_FOUND &&
        <Modal handleCloseModal={handleCloseModal} padding='32px'>
          <NotFoundProduct message={message} status={status} />
        </Modal>
      }

    </>
  )
}

export default ModalProduct


