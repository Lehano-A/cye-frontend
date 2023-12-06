import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles"
import { DELAY_SKELETON } from "../../../../../../../utils/constants";

const StyledBoxImage = styled(Box)(() => {

  return {
    width: '64px',
    marginRight: '5px',
    display: 'flex',
    alignItems: 'center',
  }
})


function WithImageOption({ option }) {

  const [isLoadedImage, setIsLoadedImage] = useState(null)
  const [isDisplayedSkeleton, setIsDisplayedSkeleton] = useState(null)
  const [timerIdSkeleton, setTimerIdSkeleton] = useState(null)


  useEffect(() => {
    const timerId = setTimeout(() => {
      clearTimeout(timerIdSkeleton)
      setIsDisplayedSkeleton(true)
    }, DELAY_SKELETON)

    setTimerIdSkeleton(timerId)
  }, [])


  useEffect(() => {
    if (isLoadedImage) {
      clearTimeout(timerIdSkeleton)
      setIsDisplayedSkeleton(false)
    }
  }, [isLoadedImage])



  return (
    <>
      <StyledBoxImage params={{ isLoadedImage }}>
        <img
          src={option.imagesUrl}
          alt=""
          onLoad={() => { setIsLoadedImage(true) }}
          sx={{
            visibility: isLoadedImage ? "visible" : "hidden",
            width: isLoadedImage ? "100%" : "0"
          }}
        />

        {isDisplayedSkeleton && <Skeleton width="64px" height="64px" />}

      </StyledBoxImage>
      <Typography sx={{
        whiteSpace: "nowrap",
        overflow: "hidden", textOverflow: "ellipsis"
      }}>{option.title}</Typography>
    </>
  )
}

export default WithImageOption