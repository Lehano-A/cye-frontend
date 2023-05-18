import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal, Box, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { changeVisibleModal } from "../../redux/reducers/modalCardProductSlice";
import styled from "styled-components";
import { setSelectedCard } from "../../redux/reducers/selectedCardProductSlice";
import TableNutritionalValue from "./TableNutritionalValue/TableNutritionalValue";
import { setValueInterpretation } from "../../redux/reducers/popperInterpretationSlice";
import PopperInterpretation from "./PopperInterpretation/PopperInterpretation";
import Ingredient from "./Ingredient/Ingredient";

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


const titleProps = {
  variant: 'h4',
  mb: '50px',
  fontSize: '16px',
  fontWeight: 700,
}

function ModalProduct() {

  const dispatch = useDispatch()
  const isVisibleModal = useSelector(state => state.modalCardProduct.visible)
  const product = useSelector(state => state.selectedCardProduct.selectedCard)
  const isVisiblePopper = useSelector(state => state.popperInterpretation.visible)
  const interpretationValue = useSelector(state => state.popperInterpretation.value)

  const { title, image, composition, nutritionalValue } = product
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
    <>
      <Modal disableEnforceFocus={true} open={isVisibleModal} onClose={handleCloseModal} slotProps={styleSlotProps}>
        <Box sx={styleMainBox}>

          <IconButton onClick={handleCloseModal} sx={styleButtonClose}>
            <CloseIcon sx={styleIcon} />
          </IconButton>

          <Box sx={styleCommonBox}>
            <StyledImage src={image} />

            <Box>
              <Typography {...titleProps}>
                {title}
              </Typography>

              <Box>
                <Typography
                  variant="h6"
                  fontSize="16px"
                  fontWeight={700}
                >
                  Состав
                </Typography>

                {composition.map((item, id) => {
                  return (
                    <Ingredient key={id} item={item} setRefSelectedIngredient={setRefSelectedIngredient} />
                  )
                })}

              </Box>

              <TableNutritionalValue data={nutritionalValue} />
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
    </>
  )
}

export default ModalProduct