import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Box, Skeleton } from '@mui/material';
import ZoomImage from './ZoomImage/ZoomImage';
import { DELAY_SKELETON } from '../../../../utils/constants';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';



function SwiperSlider({ images, width, height, }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [boxStatesLoadedInCarousel, setBoxStatesLoadedInCarousel] = useState([])
  const [isLoadedInCarousel, setIsLoadedInCarousel] = useState({})


  const [boxResolvedPromises, setBoxResolvedPromises] = useState([])
  const [boxWaitSort, setBoxWaitSort] = useState([])
  const [boxMainImagesNotForDisplay, setBoxMainImagesNotForDisplay] = useState([])
  const [mainImagesForShow, setMainImagesForShow] = useState(new Array(images.length).fill({ isLoaded: false }))

  const [isDisplayedSkeleton, setIsDisplayedSkeleton] = useState(null)
  const [timerIdSkeleton, setTimerIdSkeleton] = useState(null)


  useEffect(() => {
    if (timerIdSkeleton) {
      clearTimeout(timerIdSkeleton)
      setTimerIdSkeleton(false)
    }
  }, [isLoadedInCarousel])



  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsDisplayedSkeleton(true)
    }, DELAY_SKELETON)
    setTimerIdSkeleton(timerId)
  }, [])



  // создание массива объектов url изображений
  useEffect(() => {
    const newArrImages = images.map((item, id) => {
      return {
        url: item.largeUrl,
        isLoaded: false,
        id: id
      }
    })

    setBoxMainImagesNotForDisplay(newArrImages)
  }, [])



  // создание промисов
  useEffect(() => {
    async function createImage() {
      boxMainImagesNotForDisplay.forEach((item) => {
        const promise = new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `${item.url}`;

          const onLoad = () => {
            item.isLoaded = true
            resolve(item)

            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
          }


          const onError = () => {
            reject()

            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
          }

          img.addEventListener('load', onLoad);
          img.addEventListener('error', onError);
        })

        promise.then((res) => {
          setBoxResolvedPromises((prev) => { return [...prev, res] })
        })
          .catch(() => { throw new Error(`Произошла ошибка во время загрузки изображения`) })
      })
    }

    createImage()
  }, [boxMainImagesNotForDisplay])



  // обработка разрешенных промисов
  useEffect(() => {

    if (boxResolvedPromises.length > 0) {
      const { id } = boxResolvedPromises[0]

      // если разрешенный промис с id === 0, тогда добавляем в массив отображения на своё место
      if (id === 0) {
        const newStateForShow = [...mainImagesForShow]
        newStateForShow[0] = boxResolvedPromises[0]

        setMainImagesForShow(newStateForShow)
      }

      setBoxWaitSort((prev) => { return [...prev, ...boxResolvedPromises] })
      return
    }
  }, [boxResolvedPromises])



  // сортировка разрешённых промисов с id > 0
  useEffect(() => {
    if (boxWaitSort.length > 0) {

      const imageForShow = [...mainImagesForShow]

      for (let image of boxWaitSort) {
        const { id } = image
        /*
          добавляем объект с изображением в массив отображения на своё место
          промежуточно может выглядеть так:
          [
            {isLoaded: false},
            {url: "...", isLoaded: true, id: "..."},
            {isLoaded: false},
            {url: "...", isLoaded: true, id: "..."},
          ]
        */
        imageForShow[id] = image
      }

      setMainImagesForShow(imageForShow) // обновляем стэйт отображения изображений
      setBoxWaitSort([]) // очищаем стэйт
    }
  }, [boxWaitSort])



  useEffect(() => {
    if (boxStatesLoadedInCarousel.length > 0) {
      const box = {}

      for (let el of boxStatesLoadedInCarousel) {
        const data = Object.entries(el)
        data.forEach((item) => {
          box[item[0]] = item[1]
        })
      }

      setIsLoadedInCarousel((prev) => { return { ...prev, ...box } })
      setBoxStatesLoadedInCarousel([])
    }
  }, [boxStatesLoadedInCarousel])



  return (
    <>
      <Swiper
        // onSlideChange={(e) => { console.log('e', e); console.log('slide change') }}
        // onSwiper={(swiper) => console.log('swiper', swiper)}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        style={{ width: '100%' }}
      >

        {
          mainImagesForShow.length > 0 &&
          mainImagesForShow.map((item, id) => {

            return (
              <SwiperSlide key={id}>
                {
                  item.isLoaded &&
                  <ZoomImage
                    urlImage={item.url}
                    width={width}
                    height={height}
                  />
                }

                {
                  (!item.isLoaded) &&
                  <Skeleton
                    width={`${width}px`}
                    height={`${height}px`}
                    sx={{
                      visibility: isDisplayedSkeleton ? 'visible' : 'hidden',
                    }}
                  />
                }
              </SwiperSlide>
            )
          })
        }
      </Swiper>


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
            {
              images.map((item, id) => {
                return <SwiperSlide key={id}>
                  {
                    <img
                      style={{
                        visibility: isLoadedInCarousel[id] ? 'visible' : 'hidden',
                        width: isLoadedInCarousel[id] ? `${width / 4}px` : 0,
                        height: `${height / 4}px`
                      }}
                      src={item.smallUrl}
                      alt="Изображение выбранного продукта"
                      onLoad={() => {
                        const imgState = {}
                        imgState[id] = true

                        setBoxStatesLoadedInCarousel((prev) => { return [...prev, imgState] })
                      }}
                    />
                  }


                  {
                    (!isLoadedInCarousel[id] && isDisplayedSkeleton) && <Skeleton
                      width={`${width / 4}px`}
                      height={`${height / 4}px`}
                    />
                  }
                </SwiperSlide>
              })
            }


          </Swiper>
        </Box>
      }
    </>
  )
}

export default SwiperSlider;








