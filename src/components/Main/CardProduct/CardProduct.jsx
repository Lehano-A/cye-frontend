import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Skeleton, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconsInforming from './IconInforming/IconInforming';
import { SIZE_ICON_AND_BUTTON_INFORMING } from '../../../utils/constants';

/* --------------------------------- slices --------------------------------- */
import { setSelectedCard } from '../../../redux/reducers/slices/cardProductSlice';
import { changeVisibleModal } from '../../../redux/reducers/slices/modalCardProductSlice';

const StyledTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
`

const StyledBoxImageSkeleton = styled(Box)(() => {
  return {
    width: '100%',
    height: '100%'
  }
})

const StyledBoxCardMedia = styled(Box)(({ params }) => {
  const { isLoadedImage } = params

  return {
    width: isLoadedImage ? '100%' : 0,
    height: isLoadedImage ? '100%' : 0,
  }
})

const StyledCardMedia = styled(CardMedia)(({ params }) => {
  const { isLoadedImage } = params

  return {
    visibility: isLoadedImage ? 'visible' : 'hidden',
    width: isLoadedImage ? '100%' : 0,
    height: isLoadedImage ? '100%' : 0,
  }
})

const StyledCardActionArea = styled(CardActionArea)(() => {
  return {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  }
})

const StyledCard = styled(Card)(() => {
  return {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
})

const StyledIconsInforming = styled(Box)(() => {
  return {
    display: 'flex',
    margin: '3px 0 0 4px',
    width: SIZE_ICON_AND_BUTTON_INFORMING,
    height: SIZE_ICON_AND_BUTTON_INFORMING,
  }
})

const StyledMainBox = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'stretch',
  }
})



function CardProduct({ dataProduct }) {
  const dispatch = useDispatch()

  const { title, imagesUrl, featuresComposition } = dataProduct
  const mainImageUrl = imagesUrl[0].mediumUrl

  const [isLoadedImage, setIsLoadedImage] = useState(false)
  const [isDisplayedSkeleton, setIsDisplayedSkeleton] = useState(null)
  const [timerIdSkeleton, setTimerIdSkeleton] = useState(null)


  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsDisplayedSkeleton(true)
    }, 1000)
    setTimerIdSkeleton(timerId)
  }, [])


  useEffect(() => {
    if (timerIdSkeleton) {
      clearTimeout(timerIdSkeleton)
      setTimerIdSkeleton(null)
    }
  }, [isLoadedImage])


  const handleCardClick = () => {
    dispatch(setSelectedCard(dataProduct)) // сохраняем данные выбранной карточки
    dispatch(changeVisibleModal(true)) // открывается модальное окно продукта
  }


  function handleOnLoad() {
    setIsLoadedImage(true)
  }


  return (
    <>
      <Fade in={true}>
        <StyledMainBox>
          {
            featuresComposition?.length > 0 &&
            <StyledIconsInforming>
              {
                featuresComposition.map((item, id) => {
                  return (
                    <IconsInforming
                      feature={item.feature}
                      key={id}
                    />
                  )
                })
              }
            </StyledIconsInforming>
          }

          <StyledCard variant='searchResult' onClick={handleCardClick}>
            <StyledCardActionArea>

              {<StyledBoxCardMedia params={{ isLoadedImage }}>
                <Fade in={isLoadedImage}>
                  <StyledCardMedia
                    component='img'
                    image={mainImageUrl}
                    onLoad={handleOnLoad}
                    onError={(e) => e.target.style.display = 'none'}
                    params={{ isLoadedImage }}
                  />
                </Fade>
              </StyledBoxCardMedia>
              }

              {
                !isLoadedImage &&
                <StyledBoxImageSkeleton>
                  {
                    isDisplayedSkeleton &&
                    <Fade in={isDisplayedSkeleton}>
                      <Skeleton sx={{ width: '100%', height: '100%' }} />
                    </Fade>
                  }
                </StyledBoxImageSkeleton>
              }


              <CardContent>
                <StyledTypography variant='h2'>
                  {title}
                </StyledTypography>
              </CardContent>

            </StyledCardActionArea>
          </StyledCard>
        </StyledMainBox>
      </Fade>
    </>
  )
}
export default CardProduct
