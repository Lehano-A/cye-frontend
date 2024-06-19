import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Skeleton, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconsInforming from './IconsInformingWithTooltip/IconsInformingWithTooltip';
import queryString from 'query-string';
import { DELAY_SKELETON, OPENING_MODAL_PRODUCT, SIZE_ICON_AND_BUTTON_INFORMING } from '../../../helpers/constants';

/* --------------------------------- slices --------------------------------- */
import { setSelectedCard } from '../../../redux/reducers/slices/cardProductSlice';
import { changeVisibleModalProduct } from '../../../redux/reducers/slices/modalProductSlice';
import { resetStatesByDefaultErrorsApp } from '../../../redux/reducers/slices/errorsAppSlice';

/* --------------------------------- selectors -------------------------------- */
import { selectApiFoundProductsAfterSubmit } from '../../../redux/reducers/selectors/searchRequestProductSelectors';
import { selectInputValue } from '../../../redux/reducers/selectors/inputSearchSelectors';

/* --------------------------------- actions -------------------------------- */
import { saveCurrentPathDataBeforeOpeningModalProduct } from '../../../redux/reducers/actions/navigation/navigation';

/* ---------------------------------- hooks --------------------------------- */
import useActionsNavigation from '../../../hooks/useActionsNavigation/useActionsNavigation';


const
  StyledTypography = styled(Typography)`
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
    objectFit: 'contain',
    margin: '15px 0 0'
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


const StyledBoxIconsInforming = styled(Box)(() => {
  return {
    display: 'flex',
    width: SIZE_ICON_AND_BUTTON_INFORMING,
    height: SIZE_ICON_AND_BUTTON_INFORMING,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    padding: '4px'
  }
})


const StyledMainBox = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'stretch',
    position: 'relative',
  }
})



function CardProduct({ dataProduct }) {

  const dispatch = useDispatch()
  const actionsNavigation = useActionsNavigation()
  const params = useParams()

  const inputValue = useSelector(selectInputValue)
  const apiFoundProductsAfterSubmit = useSelector(selectApiFoundProductsAfterSubmit)

  const { title, imagesUrl, featuresComposition } = dataProduct
  const mainImageUrl = imagesUrl[0].mediumUrl

  const [isLoadedImage, setIsLoadedImage] = useState(false)
  const [isDisplayedSkeleton, setIsDisplayedSkeleton] = useState(null)
  const [timerIdSkeleton, setTimerIdSkeleton] = useState(null)


  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsDisplayedSkeleton(true)
    }, DELAY_SKELETON)
    setTimerIdSkeleton(timerId)
  }, [])



  useEffect(() => {
    if (timerIdSkeleton) {
      clearTimeout(timerIdSkeleton)
      setTimerIdSkeleton(false)
    }
  }, [isLoadedImage])



  function handleCardClick() {
    const { searchValue } = apiFoundProductsAfterSubmit.search

    dispatch(resetStatesByDefaultErrorsApp())

    // сохраняем данные выбранной карточки
    dispatch(setSelectedCard({
      data: dataProduct,
      status: 'ok',
      message: null
    }))

    const pathDataBeforeOpeningModalProduct = dispatch(saveCurrentPathDataBeforeOpeningModalProduct({
      dataForSavingLocationState: {
        params: params,
        searchValue: inputValue,
      }
    }))


    const parsedQueryParams = queryString.parse(pathDataBeforeOpeningModalProduct.search)

    actionsNavigation.replacePathname({
      stage: OPENING_MODAL_PRODUCT,
      dataProduct,
      apiFoundProductsAfterSubmit,
      dataForQueryParams: {
        ...params,
        ...parsedQueryParams,
        searchValue
      }
    })

    dispatch(changeVisibleModalProduct(true)) // открывается модальное окно продукта
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
            <StyledBoxIconsInforming>
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
            </StyledBoxIconsInforming>
          }

          <StyledCard variant='searchResult' onClick={handleCardClick}>
            <StyledCardActionArea>

              {
                <StyledBoxCardMedia params={{ isLoadedImage }}>
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
