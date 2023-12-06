import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";



function LoadingIndicator({ size, color, handleLoading = null }) {

  useEffect(() => {
    if (handleLoading) {
      handleLoading(true)

      return () => handleLoading(false)
    }
  }, [])

  return (
    <CircularProgress size={size} sx={{ color: color }} />
  )
}

export default LoadingIndicator