
import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";

function Loading({ size, color, handleLoading }) {

  useEffect(() => {
    if (handleLoading) {
      handleLoading(true)

      return () => handleLoading(false)
    }
  }, [])

  return (<CircularProgress size={size} color={color} />)
}

export default Loading