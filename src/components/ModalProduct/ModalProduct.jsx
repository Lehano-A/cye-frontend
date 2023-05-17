import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal, Box, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { changeVisibleModal } from "../../redux/reducers/modalCardProductSlice";
import styled from "styled-components";
import { setSelectedCard } from "../../redux/reducers/selectedCardProductSlice";
import TableNutritionalValue from "./TableNutritionalValue/TableNutritionalValue";

const StyledImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
  margin-right: 30px;
`
const styleCommonBox = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const styleMainBox = {
  display: 'flex',
  justifyContent: 'center',
  maxWidth: 900,
  width: '100%',
  height: 700,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 3,
  padding: '80px 60px 0 30px'
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
  }
}

const styleSlotProps = {
  backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }
}



function ModalProduct() {

  const dispatch = useDispatch()
  const isVisible = useSelector(state => state.modalCardProduct.visible)
  const product = useSelector(state => state.selectedCardProduct.selectedCard)

  const { title, image, composition, nutritionalValue } = product


  const handleClose = () => {
    dispatch(setSelectedCard(null))     // сбрасываем стэйт выбранной карточки
    dispatch(changeVisibleModal(false)) // закрывает модальное окно продукта
  }


  return (
    <Modal open={isVisible} onClose={handleClose} slotProps={styleSlotProps}>
      <Box sx={styleMainBox}>

        <IconButton onClick={handleClose} sx={styleButtonClose}>
          <CloseIcon sx={styleIcon} />
        </IconButton>

        <Box sx={styleCommonBox}>

          <StyledImage src={image} />

          <Box>
            <Typography variant="h3" mb="50px" fontSize="18px" fontWeight={700}>{title}</Typography>

            <Box>
              <Typography variant="h6" fontSize="16px" fontWeight={700}>Состав</Typography>
              <Typography variant="body2">{composition}</Typography>
            </Box>

            <TableNutritionalValue data={nutritionalValue} />
          </Box>

        </Box>

      </Box>
    </Modal>
  )
}

export default ModalProduct