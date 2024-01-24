import React, { useMemo, useRef } from "react";
import Zoom from 'react-img-hover-zoom';



function ZoomImage({ urlImage, width = 0, height = 0 }) {

  const ref = useRef()

  const memoSizeMainImage = useMemo(() => {
    if (ref.current) {
      ref.current.imageRef.current.style.height = `${height}px`
      ref.current.imageRef.current.style.width = `${width}px`
    }

    return {
      height,
      width
    }
  }, [width, height])



  return (
    <Zoom
      ref={ref}
      img={urlImage}
      zoomScale={2}
      width={memoSizeMainImage.width} // only number
      height={memoSizeMainImage.height} // only number
      style={{
        backgroundSize: 'contain',
      }}
    />
  )
}

export default ZoomImage