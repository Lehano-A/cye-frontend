import React from "react";
import Zoom from 'react-img-hover-zoom';

function ZoomImage({ urlImage }) {

  return (
    <>
      <Zoom
        img={urlImage}
        zoomScale={2}
        width={350}
        height={450}
        style={{
          backgroundSize: 'contain',
        }}
      />
    </>
  )
}

export default ZoomImage