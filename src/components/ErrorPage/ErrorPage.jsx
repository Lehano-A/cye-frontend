import React from "react"
import { useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material"

function ErrorPage() {
  const error = useRouteError()

  return (
    <Box>
      <Typography variant="h1">Вот это Вы забрели!</Typography>
      <Typography>Такая страница отсутствует :/</Typography>
      <Typography>{`${error.status} ${error.statusText}` || `${error.message}`}</Typography>
    </Box>
  )
}

export default ErrorPage