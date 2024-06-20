import React from "react";
import { Dialog, DialogActions, GlobalStyles, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../helpers/constants";

/* -------------------------------- selector -------------------------------- */
import { selectUserDevice } from "../../redux/reducers/selectors/checkUserDeviceSelectors";


// если модал интерпретации открыт и разрешение .MDPlus, тогда наложим фон поверх модала продукта
function overlayBGToModalProduct(isVisiblePopperInterpretation, breakpoints) {

  if (isVisiblePopperInterpretation && breakpoints.MDPlus) {
    return {
      '&::after': {
        display: 'block',
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999999 - 1, // "9999999" - индекс модала продукта
      }
    }
  }
  return {}
}



function centerContent(centeredContent) {
  return centeredContent ? {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } : {}
}


const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) =>
    prop !== 'padding' &&
    prop !== 'widthModal' &&
    prop !== 'heightModal' &&
    prop !== 'isVisiblePopperInterpretation' &&
    prop !== 'withoutPaddingScroll' &&
    prop !== 'maxWidth' &&
    prop !== 'breakpoints' &&
    prop !== 'centeredContent'
})(({ padding, widthModal, heightModal, isVisiblePopperInterpretation, withoutPaddingScroll, maxWidth, breakpoints, centeredContent }) => {



  return {
    // если определять свойства здесь (на верхнем уровне), то это будет относится к backdrop
    '.MuiPaper-root.MuiDialog-paper': {
      padding: padding,
      ...overlayBGToModalProduct(isVisiblePopperInterpretation, breakpoints),
      ...centerContent(centeredContent),

      [MEDIA_MD_MODAL_PRODUCT]: {
        marginLeft: withoutPaddingScroll && '17px', // если открывается модал интерпретации, то 17px прибавляется справа из-за наличия скролла, в связи с чем модал не стоит по центру; - это свойство призвано центрировать модал интерпретации
      }
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      '.MuiPaper-root.MuiDialog-paper': {
        'overflowY': 'hidden',
        maxWidth: maxWidth ? maxWidth : 'calc(100% - 64px)',
        width: widthModal ? widthModal : '700px',
        height: heightModal && heightModal,
      },
    },
  }
})


const StyledDialogActions = styled(DialogActions, {
  shouldForwardProp: (prop) => prop !== 'positionButtonClose' && prop !== 'userDevice'
})((props) => {

  const { positionButtonClose, userDevice } = props

  return {
    zIndex: 10,
    padding: 0,

    [MEDIA_XS_MODAL_PRODUCT]: {
      position: positionButtonClose ? positionButtonClose : 'absolute',
      top: '6px',
      right: userDevice === 'desktop' ? '22px' : '6px',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      position: 'absolute',
      top: '6px',
      right: '6px',
    }
  }
})


const StyledButtonClose = styled(IconButton)(() => {
  return {
    backgroundColor: 'transparent',
    padding: '5px', // область вокруг кнопки визуализируемая при ховере
  }
})


const styleIcon = (theme) => {
  return {
    color: theme.palette.primary.light,
  }
}



function ModalWindow(props) {
  const {
    children,
    handleCloseModal: callbackHandleClose,
    positionButtonClose,
    padding = 0,
    widthModal,
    heightModal,
    maxWidth,
    setVisible,
    isVisiblePopperInterpretation = false,
    withoutPaddingScroll = false,
    hideBackdrop = false,
    breakpoints,
    scroll = 'body',
    centeredContent = false
  } = props

  const dispatch = useDispatch()

  const isFullScreenModalProduct = useSelector((state) => state.modalProduct.isFullScreenModalProduct)
  const userDevice = useSelector(selectUserDevice)
  const bodyGlobalStyle = <GlobalStyles styles={{ body: { padding: 0, overflow: 'hidden' } }} /> // необходим, иначе на маленьких разрешениях компонентом MUI вносится ненужное инлайновое 'padding-right: 17px' в элемент <body>


  function handleClose() {
    setVisible && dispatch(setVisible(false))

    if (callbackHandleClose) {
      callbackHandleClose()
    }
  }



  return (
    <StyledDialog
      disableAutoFocus
      disableRestoreFocus
      hideBackdrop={hideBackdrop}
      padding={padding}
      widthModal={widthModal}
      heightModal={heightModal}
      maxWidth={maxWidth}
      isVisiblePopperInterpretation={isVisiblePopperInterpretation}
      scroll={scroll}
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={true}
      fullScreen={isFullScreenModalProduct ? true : false}
      withoutPaddingScroll={withoutPaddingScroll}
      breakpoints={breakpoints}
      centeredContent={centeredContent}
    >

      {bodyGlobalStyle}
      {children}

      <StyledDialogActions
        positionButtonClose={positionButtonClose}
        userDevice={userDevice}
      >
        <StyledButtonClose color="primary" onClick={handleClose}>

          <CloseIcon sx={styleIcon} />

        </StyledButtonClose>
      </StyledDialogActions>

    </StyledDialog>
  )
}

export default ModalWindow