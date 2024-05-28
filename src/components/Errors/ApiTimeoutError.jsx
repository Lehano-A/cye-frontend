import React from "react";
import { Stack, Typography, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MEDIA_XS_MODAL_PRODUCT } from "../../helpers/constants";


const StyledMainStack = styled(Stack)(() => {
  return {
    alignItems: 'center',

    [MEDIA_XS_MODAL_PRODUCT]: {
      margin: '40px 20px 10px'
    }
  }
})



function ApiTimeoutError() {

  return (
    <StyledMainStack>

      <Typography
        variant="h6"
        sx={{ textAlign: 'center', fontWeight: '700' }}
      >
        Ой-ёй... сервер должен был ответить быстро 😕
      </Typography>


      <Typography sx={{ textAlign: 'center', margin: '20px 0 0' }}>
        Но к сожалению, от него не удалось получить ответ.
      </Typography>
      <Typography sx={{ textAlign: 'center', }}>
        Бригада техников, вероятнее всего, уже занимается проблемой.
      </Typography>

      <Typography sx={{ textAlign: 'center', margin: '20px 0 0' }}>
        Попробуйте сделать запрос немного позже 🙏
      </Typography>

    </StyledMainStack>
  )
}

export default ApiTimeoutError