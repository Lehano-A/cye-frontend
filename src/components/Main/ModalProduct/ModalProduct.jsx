import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Dialog, DialogActions, Box, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";
import TableNutritionalValue from "./TableNutritionalValue/TableNutritionalValue";
import SwiperSlider from "./SwiperSlider/SwiperSlider";
import FeaturesComposition from "./FeaturesComposition/FeaturesComposition";
import PopperInterpretation from "./PopperInterpretation/PopperInterpretation";
import Composition from "./Composition/Composition";
import NoteToComposition from "./NoteToComposition/NoteToComposition";
import OtherInfo from "./OtherInfo/OtherInfo";


/* --------------------------------- slices --------------------------------- */
import { changeVisibleModal } from "../../../redux/reducers/slices/modalCardProductSlice";
import { setSelectedCard } from "../../../redux/reducers/slices/cardProductSlice";
import { setValueInterpretation } from "../../../redux/reducers/slices/popperInterpretationSlice";


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

const styleTitleProduct = {
  marginBottom: '35px',
}

const styleSlotProps = {
  backdrop: {
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      pointerEvents: 'none'
    }
  }
}

const titleProps = {
  variant: 'h4',
  marginBottom: '10px',
  fontSize: '16px',
  fontWeight: 700,
}

const StyledMainBox = styled(Box)(() => {
  return {
    position: 'relative',
    display: 'flex',
    bgcolor: 'background.paper',
    borderRadius: 3,
    margin: '40px auto 0',
  }
})

const StyledCommonBox = styled(Box)(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: 5,
  }
})

const StyledTopHalfCommonBox = styled(Box)(() => {
  return {
    display: 'flex',
    'flexDirection': 'column',
    padding: '0 110px 0 110px'
  }
})

const StyledBoxSliderAndOtherInfo = styled(Box)(() => {
  return {
    display: 'flex',
  }
})

const StyledBoxTitleAndSlider = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: ' 0 100px 70px 0',
  }
})

const StyledBoxTitle = styled(Box)(() => {
  return {
    maxWidth: '420px'
  }
})

const StyledBoxSlider = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '420px',
  }
})

const StyledBoxNoteToComposition = styled(Box)(({ theme }) => {
  return {
    position: 'relative',
    top: '-140px',
    left: '-270px',
    backgroundColor: theme.palette.getAlphaColor('primaryTint', '200', 1),
    padding: '20px 20px 20px 25px',
    maxWidth: '440px',
    display: 'inline-flex',
    flexDirection: 'column',
    borderRadius: '15px',
    margin: '0 0 0 100px'
  }
})

const StyledCommonBoxComposition = styled(Box)(({ theme }) => {
  return {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.getAlphaColor('primaryTint', 100, 1),
    padding: '100px 0 0 0px ',
    margin: '50px 0 0',
    alignItems: 'center',
  }
})

const StyledButtonClose = styled(IconButton)(() => {
  return {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'transparent',
  }
})



function ModalProduct() {

  const dispatch = useDispatch()
  const isVisibleModal = useSelector(state => state.modalCardProduct.visible)
  const selectedCard = useSelector(state => state.cardProduct.selectedCard)
  const isVisiblePopper = useSelector(state => state.popperInterpretation.visible)
  const interpretationValue = useSelector(state => state.popperInterpretation.value)

  const { title, imagesUrl, composition, noteToComposition, nutritionalValue, company, otherInfo, featuresComposition } = selectedCard

  const [refSelectedIngredient, setRefSelectedIngredient] = useState(null)


  useEffect(() => {
    if (!refSelectedIngredient) {
      dispatch(setValueInterpretation(''))
    }
  }, [dispatch, isVisiblePopper, refSelectedIngredient])


  const handleCloseModal = () => {
    dispatch(setSelectedCard(null))     // сбрасываем стэйт выбранной карточки
    dispatch(changeVisibleModal(false)) // закрывает модальное окно продукта
  }


  return (
    <Dialog
      disableAutoFocus
      disableRestoreFocus
      maxWidth={'xl'}
      scroll="body"
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      open={isVisibleModal}
      slotProps={styleSlotProps}
    >

      <DialogActions>
        <StyledButtonClose color="primary" onClick={handleCloseModal}>
          <CloseIcon sx={styleIcon} />
        </StyledButtonClose>
      </DialogActions>



      <StyledMainBox>
        <StyledCommonBox>
          <StyledTopHalfCommonBox>
            <StyledBoxSliderAndOtherInfo>
              <StyledBoxTitleAndSlider>

                <StyledBoxTitle>
                  <Typography
                    {...titleProps}
                    id="modal-title"
                    sx={styleTitleProduct}
                  >
                    {title}
                  </Typography>
                </StyledBoxTitle>


                <StyledBoxSlider>
                  <SwiperSlider images={imagesUrl} />
                </StyledBoxSlider>
              </StyledBoxTitleAndSlider>


              <Box>
                <FeaturesComposition data={featuresComposition} />
                <OtherInfo data={{ company, otherInfo }} />
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
              <Box sx={{ position: 'relative', top: '-70px', }}>
                <Composition
                  data={composition}
                  setRefSelectedIngredient={setRefSelectedIngredient}
                />
              </Box>
            </Box>
          </StyledCommonBoxComposition>

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


