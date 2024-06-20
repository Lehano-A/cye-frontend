import React, { useEffect } from "react"
import { Stack, Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setInputValue } from "../../redux/reducers/slices/inputSearchSlice"
import ModalWindow from "../ModalWindow/ModalWindow"
import { MEDIA_XSPLUS_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT, messages } from "../../helpers/constants"


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
    >
      <StyledMainBox>

        <StyledIcon>🥺</StyledIcon>


        <Stack sx={{ alignItems: 'center' }}>
          <Typography variant="body1" sx={{

            textAlign: 'center'
          }}>
            {messages.notFoundPage}
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: "600", marginTop: '30px', textAlign: 'center' }}>
            Давайте попробуем начать с <Link to='/'>главной страницы</Link>
          </Typography>

        </Stack>
      </StyledMainBox>
    </ModalWindow>
  )
}

export default NotFoundPageError