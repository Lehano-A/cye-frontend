import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal, Box, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { changeVisibleModal } from "../../redux/reducers/modalCardProductSlice";
import styled from "styled-components";
import { setSelectedCard } from "../../redux/reducers/selectedCardProductSlice";
import TableNutritionalValue from "./TableNutritionalValue/TableNutritionalValue";
import { setValueInterpretation } from "../../redux/reducers/popperInterpretationSlice";
import PopperInterpretation from "./PopperInterpretation/PopperInterpretation";
import Composition from "./Composition/Composition";
import NoteToComposition from "./NoteToComposition/NoteToComposition";
import Company from "./Company/Company";
import OtherInfo from "./OtherInfo/OtherInfo";

/*
  Особенности, которые нужно учитывать:
    Для backdrop установлено правило pointer-events: none, чтобы была возможность
    прокручивать страницу, если курсор находится вне модального окна, т.е. на backdrop.
    Но при этом ещё и отключилась возможность закрывать модальное окно при нажатии на backdrop.
    Поэтому было произведено делегирование события клика на родительский общий контейнер,
    с последующим сравнением элементов, где произошёл клик: на кнопке закрытия или на backdrop.
*/

const StyledImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
  margin-right: 30px;
`
const styleCommonBox = {
  display: 'flex',
  justifyContent: 'space-between',
}

const styleMainBox = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: '900px',
  bgcolor: 'background.paper',
  borderRadius: 3,
  padding: '80px 60px 40px 30px',
  margin: '40px auto',
}

const styleButtonClose = {
  position: 'absolute',
  top: 15,
  right: 15,
  backgroundColor: 'transparent'
}

const styleIcon = (theme) => {
  return {
    color: theme.palette.primary.light,
    pointerEvents: 'none'
  }
}

const styleSlotProps = {
  backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.1)', pointerEvents: 'none' } }
}

const titleProps = {
  variant: 'h4',
  marginBottom: '50px',
  fontSize: '16px',
  fontWeight: 700,
}



function ModalProduct() {

  const dispatch = useDispatch()
  const isVisibleModal = useSelector(state => state.modalCardProduct.visible)
  const product = useSelector(state => state.selectedCardProduct.selectedCard)
  const isVisiblePopper = useSelector(state => state.popperInterpretation.visible)
  const interpretationValue = useSelector(state => state.popperInterpretation.value)

  const { title, image, composition, noteToComposition, nutritionalValue, company, otherInfo } = product
  const [refSelectedIngredient, setRefSelectedIngredient] = useState(null)
  const refBackdrop = useRef(null)
  const refButtonCloseModal = useRef(null)


  useEffect(() => {
    if (!refSelectedIngredient) {
      dispatch(setValueInterpretation(''))
    }
  }, [dispatch, isVisiblePopper, refSelectedIngredient])


  const handleCloseModal = (e) => {
    if (e.target === refBackdrop.current || e.target === refButtonCloseModal.current) {

      dispatch(setSelectedCard(null))     // сбрасываем стэйт выбранной карточки
      dispatch(changeVisibleModal(false)) // закрывает модальное окно продукта
    }
  }


  return (
    <Modal ref={refBackdrop} onClick={handleCloseModal} aria-labelledby="modal-title" sx={{ overflowY: 'scroll' }} disableEnforceFocus={true} open={isVisibleModal} slotProps={styleSlotProps}>

      <Box sx={styleMainBox}>

        <IconButton ref={refButtonCloseModal} sx={styleButtonClose}>
          <CloseIcon sx={styleIcon} />
        </IconButton>

        <Box sx={styleCommonBox}>
          <StyledImage src={image} />

          <Box sx={{ maxWidth: '600px' }}>
            <Typography id="modal-title" {...titleProps}>
              {title}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

              <Composition
                data={composition}
                setRefSelectedIngredient={setRefSelectedIngredient}
              />

              {noteToComposition && <NoteToComposition data={noteToComposition} />}

              <TableNutritionalValue data={nutritionalValue} />
              <Company data={company} />
              <OtherInfo data={otherInfo} />

            </Box>
          </Box>
        </Box>

        {refSelectedIngredient && (
          <PopperInterpretation
            refIngredient={refSelectedIngredient}
            interpretationValue={interpretationValue}
          />
        )}
      </Box>

    </Modal>
  )
}

export default ModalProduct


