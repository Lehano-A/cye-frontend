import React from "react";
import { Dialog, DialogActions, GlobalStyles, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../helpers/constants";

/* -------------------------------- selector -------------------------------- */
import { selectUserDevice } from "../../redux/reducers/selectors/checkUserDeviceSelectors";


const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'widthModal' && prop !== 'heightModal'
})(({ padding, widthModal, heightModal }) => {
  return {

    '.MuiPaper-root.MuiDialog-paper': {
      padding: padding,
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      '.MuiPaper-root.MuiDialog-paper': {
        maxWidth: 'calc(100% - 64px)',
        width: widthModal ? widthModal : '700px',
        height: heightModal && heightModal
      },

    },
  }
})

const StyledDialogActions = styled(DialogActions, {
  shouldForwardProp: (prop) => prop !== 'position' && prop !== 'userDevice'
})((props) => {

  const { position, userDevice } = props

  return {
    zIndex: 10,
    padding: 0,

    [MEDIA_XS_MODAL_PRODUCT]: {
      position: position ? position : 'absolute',
      top: '4px',
      right: userDevice === 'desktop' ? '18px' : '2px',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      position: 'absolute',
      top: '4px',
      right: '4px',
    }
  }
})


const StyledButtonClose = styled(IconButton)(() => {
  return {
    backgroundColor: 'transparent',
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
    isVisible,
    setVisible,
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
      padding={padding}
      widthModal={widthModal}
      heightModal={heightModal}
      maxWidth='xl'
      scroll="body"
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={isVisible}
      fullScreen={isFullScreenModalProduct ? true : false}
    >

      {bodyGlobalStyle}

      <StyledDialogActions
        position={positionButtonClose}
        userDevice={userDevice}
      >
        <StyledButtonClose color="primary" onClick={handleClose}>

          <CloseIcon sx={styleIcon} />

        </StyledButtonClose>
      </StyledDialogActions>

      {children}

    </StyledDialog>
  )
}

export default ModalWindow