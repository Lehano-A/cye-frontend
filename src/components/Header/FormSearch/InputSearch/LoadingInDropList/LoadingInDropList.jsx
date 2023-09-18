import React from "react";
import { Box } from "@mui/material";
import LoadingIndicator from "../../../../LoadingIndicator/LoadingIndicator";

const styleMainBox = {
  display: 'flex',
  'justifyContent': 'center',
}


function LoadingInDropList({ handleLoadingInDropList }) {

  return (
    <Box sx={styleMainBox}>
      <LoadingIndicator
        handleLoading={handleLoadingInDropList}
        size={20}
        color='primary'
      />
    </Box>
  )
}

export default LoadingInDropList