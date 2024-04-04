import { Box } from "@mui/material";
import React, { useRef } from "react";
import { styled } from "@mui/material/styles";

const StyledImage = styled('img')(() => {
  return {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: '0.1s ease',
  }
})



function ZoomImage({ uriImage, width = 0, height = 0 }) {

  const imageRef = useRef()



  function handleMouseMove(e) {
    const geometry = e.target.getBoundingClientRect()
    const x = (e.clientX - geometry.left) / geometry.width * width
    const y = (e.clientY - geometry.top) / geometry.height * height

    requestAnimationFrame(() => {
      imageRef.current.style.transformOrigin = `${x}px ${y}px`
    })
  }


  function handleMouseEnter(e) {
    const geometry = e.target.getBoundingClientRect()
    const x = e.clientX - geometry.x
    const y = e.clientY - geometry.y

    requestAnimationFrame(() => {
      imageRef.current.style.transformOrigin = `${x}px ${y}px`
      imageRef.current.style.transform = `scale(2)`
    })
  }


  function handleMouseLeave() {
    requestAnimationFrame(() => { imageRef.current.style.transform = 'scale(1)'; });
  }



  return (
    <Box
      sx={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onMouseLeave={handleMouseLeave}
    >
      <StyledImage
        src={uriImage}
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
      />
    </Box>
  )
}

export default ZoomImage