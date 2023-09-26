import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Box } from '@mui/material';
import Zoom from 'react-img-hover-zoom';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './styles.css';

function SwiperSlider({ images }) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  return (
    <>
      <Box>
        <Swiper
          // onSlideChange={(e) => { console.log('e', e); console.log('slide change') }}
          // onSwiper={(swiper) => console.log('swiper', swiper)}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          style={{ width: images.length === 1 ? '100%' : '25%' }}
        >
          {images.map((item, id) => {
            return <SwiperSlide key={id}>
              <Zoom
                img={item.largeUrl}
                zoomScale={2}
                width={350}
                height={400}
                className=""
                style={{ display: 'block', backgroundSize: 'cover' }} // обязательный проп. Иначе выдаёт ошибку.
              />
            </SwiperSlide>
          })}
        </Swiper>
      </Box>


      {
        images.length >= 2 && // если изображение >= 2, тогда отобразить плашку с изображениями

        <Box sx={{ maxWidth: '400px', width: '100%', }}>
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {images.map((item, id) => {
              return <SwiperSlide key={id}>
                <img src={item.smallUrl} alt="Изображение выбранного продукта" />
              </SwiperSlide>
            })}
          </Swiper>
        </Box>
      }
    </>

  )
}

export default SwiperSlider;