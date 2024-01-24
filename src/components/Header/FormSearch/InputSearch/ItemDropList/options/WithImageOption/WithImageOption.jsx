import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"
import { DELAY_SKELETON } from "../../../../../../../utils/constants";


const StyledBoxImage = styled(Box)(() => {
  return {
    maxWidth: '64px',
    minwidth: '52px',
    width: '100%',
    marginRight: '5px',
    display: 'flex',
    alignItems: 'center',
  }
})



function WithImageOption({ option }) {

  const theme = useTheme()

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
          style={{
            visibility: isLoadedImage ? "visible" : "hidden",
          }}
        />

        {isDisplayedSkeleton && <Skeleton width="64px" height="64px" />}

      </StyledBoxImage>
      <Typography sx={theme.customStyles.Autocomplete.textOption} >{option.title}</Typography>
    </>
  )
}

export default WithImageOption

