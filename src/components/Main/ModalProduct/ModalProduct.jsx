import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Dialog, DialogActions, Box, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { changeVisibleModal } from "../../../redux/reducers/modalCardProductSlice";
import { styled } from "@mui/material/styles";
import { setSelectedCard } from "../../../redux/reducers/selectedCardProductSlice";
import TableNutritionalValue from "./TableNutritionalValue/TableNutritionalValue";
import { setValueInterpretation } from "../../../redux/reducers/popperInterpretationSlice";
import SwiperSlider from "./SwiperSlider/SwiperSlider";
import FeaturesComposition from "./FeaturesComposition/FeaturesComposition";

import PopperInterpretation from "./PopperInterpretation/PopperInterpretation";
import Composition from "./Composition/Composition";
import NoteToComposition from "./NoteToComposition/NoteToComposition";
import Company from "./Company/Company";
import OtherInfo from "./OtherInfo/OtherInfo";
import HelpFromUser from "../HelpFromUser/HelpFromUser";

/*
  Особенности, которые нужно учитывать:
    Для backdrop установлено правило pointer-events: none, чтобы была возможность
    прокручивать страницу, если курсор находится вне модального окна, т.е. на backdrop.
    Но при этом ещё и отключилась возможность закрывать модальное окно при нажатии на backdrop.
    Поэтому было произведено делегирование события клика на родительский общий контейнер,
    с последующим сравнением элементов, где произошёл клик: на кнопке закрытия или на backdrop.
*/


const styleCommonBox = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: 5,

}

const styleMainBox = {
  position: 'relative',
  display: 'flex',
  bgcolor: 'background.paper',
  borderRadius: 3,
  padding: '20px 0px 40px 0px',
  margin: '40px auto',
}

const styleIcon = (theme) => {
  return {
    color: theme.palette.primary.light,
  }
}

const styleSlotProps = {
  backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.1)', pointerEvents: 'none' } }
}

const titleProps = {
  variant: 'h4',
  marginBottom: '10px',
  fontSize: '16px',
  fontWeight: 700,
}

const StyledButtonClose = styled(IconButton)(() => {
  return {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'transparent',
  }
})

const StyledBoxComposition = styled(Box)(() => {
  return {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#eef0f9',
    padding: '35px 0',
    alignItems: 'center',
  }
})



function ModalProduct() {

  const dispatch = useDispatch()
  const isVisibleModal = useSelector(state => state.modalCardProduct.visible)
  const product = useSelector(state => state.selectedCardProduct.selectedCard)
  const isVisiblePopper = useSelector(state => state.popperInterpretation.visible)
  const interpretationValue = useSelector(state => state.popperInterpretation.value)

  const { title, imagesUrl, composition, noteToComposition, nutritionalValue, company, otherInfo, featuresComposition } = product

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
    <Dialog disableAutoFocus disableRestoreFocus maxWidth={'xl'} scroll="body" onClose={handleCloseModal} aria-labelledby="modal-title" open={isVisibleModal} slotProps={styleSlotProps}>

      <DialogActions>
        <StyledButtonClose color="primary" onClick={handleCloseModal}>
          <CloseIcon sx={styleIcon} />
        </StyledButtonClose>
      </DialogActions>

      <Box sx={styleMainBox}>
        <Box sx={styleCommonBox}>

          <Box sx={{
            display: 'flex',
            padding: '0 100px 0 60px',
          }}>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: '30px',
            }}>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '500px', width: '100%' }}>
                <SwiperSlider images={imagesUrl} />
              </Box>
              
              <HelpFromUser />
            </Box>


            <Box sx={{ marginLeft: '50px' }}>
              <Typography id="modal-title" sx={{ marginBottom: '35px' }} {...titleProps}>
                {title}
              </Typography>

              <FeaturesComposition data={featuresComposition} />
            </Box>
          </Box>



          <StyledBoxComposition>
            <Box sx={{ maxWidth: '500px' }}>
              <Box sx={{ marginBottom: '35px' }}>
                <Composition
                  data={composition}
                  setRefSelectedIngredient={setRefSelectedIngredient}
                />
              </Box>

              <Box>
                {noteToComposition && <NoteToComposition data={noteToComposition} />}
              </Box>
            </Box>
          </StyledBoxComposition>


          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5, maxWidth: '500px', margin: '0 auto' }}>

            {nutritionalValue && <TableNutritionalValue data={nutritionalValue} />}

            <Company data={company} />
            <OtherInfo data={otherInfo} />

          </Box>


        </Box>

        {refSelectedIngredient && (
          <PopperInterpretation
            refIngredient={refSelectedIngredient}
            interpretationValue={interpretationValue}
          />
        )}

      </Box>

    </Dialog>
  )
}

export default ModalProduct


