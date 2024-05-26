import React from "react";
import { Stack, Typography, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MEDIA_XS_MODAL_PRODUCT } from "../../utils/constants";


const StyledMainStack = styled(Stack)(() => {
  return {
    alignItems: 'center',

    [MEDIA_XS_MODAL_PRODUCT]: {
      margin: '40px 20px 10px'
    }
  }
})


function NoInternetConnectionError() {

  return (
    <StyledMainStack>

      <Typography
        variant="h6"
        sx={{ textAlign: 'center', fontWeight: '700' }}
      >
        Упс... Похоже отсутствует подключение к интернету 🔌
      </Typography>


      <Typography sx={{ textAlign: 'center', margin: '20px 0 0' }}>
        Проверьте ваше соединение и повторите попытку запроса
      </Typography>

    </StyledMainStack>
  )
}

export default NoInternetConnectionError