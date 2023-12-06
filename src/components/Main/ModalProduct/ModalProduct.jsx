import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigationType } from "react-router-dom";
import { Stack, Dialog, DialogActions, Box, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
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
import { CLOSING_MODAL_PRODUCT, LOADING, MODAL_PRODUCT, NOT_FOUND } from "../../../utils/constants";

/* --------------------------------- slices --------------------------------- */
import { changeVisibleModalProduct } from "../../../redux/reducers/slices/modalProductSlice";
import { resetStatesByDefaultCardProduct } from "../../../redux/reducers/slices/cardProductSlice";
import { setValueInterpretation } from "../../../redux/reducers/slices/popperInterpretationSlice";
import { resetByDefaultSavedPathDataBeforeOpeningModalProduct } from "../../../redux/reducers/slices/navigationSlice";

/* ---------------------------------- selectors --------------------------------- */
import { selectArrForShowSearchResultProducts } from "../../../redux/reducers/selectors/boxSearchResultSelectors";


/* ---------------------------------- hooks --------------------------------- */
import useActionsNavigation from "../../../hooks/useActionsNavigation/useActionsNavigation";



/*
  Особенности, которые нужно учитывать:
    Для backdrop установлено правило pointer-events: none, чтобы была возможность
    прокручивать страницу, если курсор находится вне модального окна, т.е. на backdrop.
    Но при этом ещё и отключилась возможность закрывать модальное окно при нажатии на backdrop.
    Поэтому было произведено делегирование события клика на родительский общий контейнер,
    с последующим сравнением элементов, где произошёл клик: на кнопке закрытия или на backdrop.
*/

const styleIcon = (theme) => {
  return {
    color: theme.palette.primary.light,
  }
}

const styleSlotProps = {
  backdrop: {
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      pointerEvents: 'none'
    }
  }
}

const StyledBoxTitle = styled(Box)(() => {
  return {
    maxWidth: '420px',
  }
})

const StyledBoxSlider = styled(Stack)(() => {
  return {
    alignItems: 'center',
    width: '420px',
  }
})

const StyledMainBox = styled(Box)(({ settings }) => {
  const { status } = settings

  return {
    position: 'relative',
    backgroundColor: 'background.paper',
    borderRadius: 3,
    margin: `${status === NOT_FOUND ? '0 auto' : '40px auto 0'}`
    ,
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
    padding: '0 110px 0 110px'
  }
})

const StyledBoxSliderAndOtherInfo = styled(Box)(() => {
  return {
    display: 'flex',

  }
})

const StyledBoxTitleAndSlider = styled(Stack)(() => {
  return {
    alignItems: 'center',
    margin: ' 0 100px 70px 0',
    display: 'flex'
  }
})

const StyledBoxNoteToComposition = styled(Stack)(({ theme }) => {
  return {
    position: 'relative',
    top: '-140px',
    left: '-270px',
    backgroundColor: theme.palette.getAlphaColor('primaryTint', '200', 1),
    padding: '20px 20px 20px 25px',
    maxWidth: '440px',
    borderRadius: '15px',
    margin: '0 0 0 100px'
  }
})

const StyledCommonBoxComposition = styled(Stack)(({ theme }) => {
  return {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.palette.getAlphaColor('primaryTint', 100, 1),
    padding: '100px 0 0 0px ',
    margin: '50px 0 0',
    alignItems: 'center',
  }
})

const StyledBoxComposition = styled(Box)(() => {
  return {
    position: 'relative', top: '-90px',
  }
})

const StyledButtonClose = styled(IconButton)(() => {
  return {
    backgroundColor: 'transparent',
  }
})

const log = loglevel.getLogger(MODAL_PRODUCT)



function ModalProduct() {

  const location = useLocation()
  const navigationType = useNavigationType()
  const dispatch = useDispatch()
  const actionsNavigation = useActionsNavigation()

  const selectedCard = useSelector(state => state.cardProduct.selectedCard)
  const isVisiblePopper = useSelector(state => state.popperInterpretation.visible)
  const interpretationValue = useSelector(state => state.popperInterpretation.value)
  const savedPathDataBeforeOpeningModalProduct = useSelector(state => state.navigation.savedPathDataBeforeOpeningModalProduct)
  const arrForShowSearchResultProducts = useSelector(selectArrForShowSearchResultProducts)
  const [refSelectedIngredient, setRefSelectedIngredient] = useState(null)


  const { data, status, message } = selectedCard || {}
  const { title, imagesUrl, featuresComposition, company, otherInfo, nutritionalValue, noteToComposition, composition } = data || {}


  useEffect(() => {
    if (!refSelectedIngredient) {
      dispatch(setValueInterpretation(''))
    }
  }, [dispatch, isVisiblePopper, refSelectedIngredient])


  function handleCloseModal() {
    log.debug(`
    Произошёл вызов: handleCloseModal
    Что будем делать: закрывать модальное окно продукта

    navigationType: ${navigationType}
    location: `, location)

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
    <Dialog
      disableAutoFocus
      disableRestoreFocus
      maxWidth={'xl'}
      scroll="body"
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      //open={isVisibleModal}
      open={true}
      slotProps={styleSlotProps}
    >

      <DialogActions sx={{ position: 'absolute', zIndex: 10, top: '15px', right: '15px' }}>
        <StyledButtonClose color="primary" onClick={handleCloseModal}>

          <CloseIcon sx={styleIcon} />

        </StyledButtonClose>
      </DialogActions>


      <StyledMainBox settings={{ status }}>
        <StyledCommonBox>
          {
            data && (<>
              <StyledTopHalfCommonBox>
                <StyledBoxSliderAndOtherInfo>
                  <StyledBoxTitleAndSlider>

                    <StyledBoxTitle>
                      <TitleContainer
                        title={title}
                      />
                    </StyledBoxTitle>


                    <StyledBoxSlider>
                      <SwiperSlider images={imagesUrl} />
                    </StyledBoxSlider>
                  </StyledBoxTitleAndSlider>


                  <Box>
                    <FeaturesComposition data={featuresComposition} />
                    <OtherInfo data={{ company: company, otherInfo: otherInfo }} />
                    {nutritionalValue && <TableNutritionalValue data={nutritionalValue} />}
                  </Box>

                </StyledBoxSliderAndOtherInfo>
              </StyledTopHalfCommonBox>




              <StyledCommonBoxComposition>

                {
                  noteToComposition &&
                  <StyledBoxNoteToComposition>
                    <NoteToComposition data={noteToComposition} />
                  </StyledBoxNoteToComposition>
                }


                <Box sx={{ maxWidth: '500px' }}>
                  <StyledBoxComposition>
                    <Composition
                      data={composition}
                      setRefSelectedIngredient={setRefSelectedIngredient}
                    />
                  </StyledBoxComposition>
                </Box>
              </StyledCommonBoxComposition>

            </>)}



          {
            status === NOT_FOUND && <Box sx={{
              width: "800px", height: "50%", display: "flex",
              justifyContent: "center", alignItems: "center"
            }}><NotFoundProduct message={message} status={status} /></Box>
          }


          {
            status === LOADING && <Box sx={{ width: "1100px", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <LoadingIndicator />
            </Box>
          }

        </StyledCommonBox>


        {refSelectedIngredient && (
          <PopperInterpretation
            refIngredient={refSelectedIngredient}
            interpretationValue={interpretationValue}
          />
        )}

      </StyledMainBox>

    </Dialog>
  )
}

export default ModalProduct


