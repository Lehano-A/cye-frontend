import React from "react";
import { Icon, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Link } from "react-router-dom";



function NotFoundProduct({ message }) {

  return (
    <Box sx={{ whiteSpace: 'pre-wrap', display: 'flex', maxWidth: '85%', alignItems: 'center', height: '30vh' }}>

      <Icon sx={{ display: 'flex', alignItems: 'center', fontSize: '100px', width: '100%', height: '100%', maxWidth: '125px', maxHeight: '125px', marginRight: '40px' }}>
        🕵️
      </Icon>

      <Stack>
        <Typography variant="body1" sx={{ fontWeight: "500" }}>
          {message}
        </Typography>

        <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: "600", marginTop: '20px', }}>
          Попробуйте осуществить поиск, указав название продукта в поле поиска, на <Link to='/'>главной странице</Link>
        </Typography>
      </Stack>

    </Box>
  )
}


export default NotFoundProduct