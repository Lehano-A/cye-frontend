import React, { useEffect } from "react"
import { Stack, Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setInputValue } from "../../redux/reducers/slices/inputSearchSlice"
import ModalWindow from "../ModalWindow/ModalWindow"
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XSPLUS_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT, messages } from "../../helpers/constants"


const StyledMainBox = styled(Box)(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [MEDIA_XS_MODAL_PRODUCT]: {
      flexDirection: 'column',
    },

    [MEDIA_XSPLUS_MODAL_PRODUCT]: {
      flexDirection: 'row',
    },
  }
})


const StyledIcon = styled('span')(() => {
  return {
    fontSize: '110px',

    [MEDIA_XS_MODAL_PRODUCT]: {
      margin: 0
    },

    [MEDIA_XSPLUS_MODAL_PRODUCT]: {
      margin: '0 40px 0 0'
    }
  }
})


const BoxText = styled(Stack)(() => ({
  alignItems: 'center'
}))


const MessageText = styled(Typography)(() => ({
  textAlign: 'center'
}))


const TextWithLink = styled(Typography)(() => ({
  fontWeight: "600",
  marginTop: '30px',
  textAlign: 'center',
}))


const Span = styled('span')(() => ({
  [MEDIA_XS_MODAL_PRODUCT]: {
    display: 'block'
  },
  [MEDIA_MD_MODAL_PRODUCT]: {
    display: 'inline'
  },
}))



function NotFoundPageError() {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(setInputValue(''))
  }, [])


  function handleCloseModal() {
    navigate('/')
  }

  return (
    <ModalWindow
      handleCloseModal={handleCloseModal}
      padding='32px'
      scroll='paper'
      centeredContent={true}
    >
      <StyledMainBox>

        <StyledIcon>🥺</StyledIcon>


        <BoxText>
          <MessageText variant="body1">
            {messages.notFoundPage}
          </MessageText>

          <TextWithLink variant="body1">
            Давайте попробуем начать
            <Span>с <Link to='/'>главной страницы</Link></Span>
          </TextWithLink>

        </BoxText>
      </StyledMainBox>
    </ModalWindow>
  )
}

export default NotFoundPageError