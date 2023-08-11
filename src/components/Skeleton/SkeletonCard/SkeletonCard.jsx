import React from "react";
import { Skeleton } from "@mui/material";

function SkeletonCard() {
  return (
    <>
      <Skeleton sx={{ marginBottom: '5px', bgcolor: 'grey.200' }} variant="circular" width={20} height={20} />
      <Skeleton sx={{ marginBottom: '5px', bgcolor: 'grey.200' }} variant="rectangular" width={210} height={150} />
      <Skeleton sx={{ marginBottom: '5px', bgcolor: 'grey.200' }} variant="text" width={210} height={10} />
      <Skeleton sx={{ bgcolor: 'grey.200' }} variant="text" width={160} height={10} />
    </>
  )
}

export default SkeletonCard