import React from "react";
import { Icon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { Link } from "react-router-dom";
import { MEDIA_XSPLUS_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../utils/constants";


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
    display: 'flex',
    justifyContent: 'center',
    fontSize: '110px',

    width: '100%',
    height: '100%',
    maxWidth: '125px',
    overflow: 'visible',

    [MEDIA_XS_MODAL_PRODUCT]: {
      margin: 0
    },

    [MEDIA_XSPLUS_MODAL_PRODUCT]: {
      margin: '0 0px 0 0'
    }
  }
})



function NotFoundProduct({ message }) {

  return (
    <StyledMainBox>

      <StyledIcon>
        🕵️
      </StyledIcon>

      <Stack>
        <Typography variant="body1" sx={{ fontWeight: "500", textAlign: 'center' }}>
          {message}
        </Typography>

        <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "600", marginTop: '20px', textAlign: 'center' }}>
          Попробуйте осуществить поиск, указав название этого продукта в поле поиска, на <Link to='/'>главной странице</Link>
        </Typography>
      </Stack>

    </StyledMainBox>
  )
}


export default NotFoundProduct