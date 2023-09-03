import React from "react";
import { Box } from "@mui/material";
import Loading from "../../../../Loading/Loading";

function LoadingInDropList({ handleLoadingInDropList }) {

  return (
    <Box sx={{ display: 'flex', 'justifyContent': 'center' }}>
      <Loading handleLoading={handleLoadingInDropList} size={20} color='primary' />
    </Box>
  )
}

export default LoadingInDropList