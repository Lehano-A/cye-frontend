import React, { useEffect } from "react"
import { Stack, Box, Icon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setInputValue } from "../../redux/reducers/slices/inputSearchSlice"
import Modal from "../../components/Modal/Modal"
import { MEDIA_XSPLUS_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT, messages } from "../../utils/constants"


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


const StyledIcon = styled(Icon)(() => {
  return {
    fontSize: '110px',
    overflow: 'visible',
    width: '100%',
    height: '100%',
    maxWidth: '125px',
    display: 'flex',
    justifyContent: 'center',

    [MEDIA_XS_MODAL_PRODUCT]: {
      margin: 0
    },

    [MEDIA_XSPLUS_MODAL_PRODUCT]: {
      margin: '0 40px 0 0'
    }
  }
})



function ErrorPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(setInputValue(''))
  }, [])


  function handleCloseModal() {
    navigate('/')
  }


  return (
    <Modal handleCloseModal={handleCloseModal} padding='32px'>
      <StyledMainBox>

        <StyledIcon>
          🥺
        </StyledIcon>


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
    </Modal>
  )
}

export default ErrorPage