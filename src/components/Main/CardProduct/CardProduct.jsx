import React from "react"
import { useDispatch } from "react-redux"
import { changeVisibleModal } from "../../../redux/reducers/modalCardProductSlice"
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material"
import { setSelectedCard } from "../../../redux/reducers/selectedCardProductSlice"
import { styled } from "@mui/material/styles";
import IconsInforming from "./IconInforming/IconInforming"

const StyledTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
`
const styleCardMedia = {
  maxHeight: '250px',
  height: '100%',
  objectFit: 'contain',
}


function CardProduct({ dataProduct }) {

  const { title, imagesUrl, featuresComposition } = dataProduct
  const mainImage = imagesUrl[0].mediumUrl

  const dispatch = useDispatch()

  const handleCardClick = () => {
    dispatch(setSelectedCard(dataProduct)) // сохраняем данные выбранной карточки
    dispatch(changeVisibleModal(true)) // открывается модальное окно продукта
  }

  return (
    <Box>
      {featuresComposition && featuresComposition.length > 0 &&
        <Box sx={{ display: 'flex', margin: '3px 0 0 4px' }}>{
          featuresComposition.map((item, id) => {
            return (
              <IconsInforming
                feature={item.feature}
                key={id}
              />
            )
          })}
        </Box>
      }
      <Card variant="searchResult" onClick={handleCardClick}>
        <CardActionArea>

          <CardMedia component="img" image={mainImage} sx={styleCardMedia} />

          <CardContent>
            <StyledTypography variant="h2">
              {title}
            </StyledTypography>
          </CardContent>

        </CardActionArea>
      </Card>
    </Box>
  )
}

export default CardProduct

