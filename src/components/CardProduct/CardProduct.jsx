import React from "react"
import { useDispatch } from "react-redux"
import { changeVisibleModal } from "../../redux/reducers/modalCardProductSlice"
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material"
import { setSelectedCard } from "../../redux/reducers/selectedCardProductSlice"
import styled from "styled-components"

const StyledTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 700;
`
const styleCard = {
  width: '200px'
}

const styleCardMedia = {
  height: '200px',
  objectFit: 'contain',
  marginTop: '15px'
}


function CardProduct(props) {

  const { title, image, product } = props;

  const dispatch = useDispatch()


  const handleCardClick = () => {
    dispatch(setSelectedCard(product)) // сохраняем данные выбранной карточки
    dispatch(changeVisibleModal(true)) // открывается модальное окно продукта
  }

  return (
    <Card
      sx={styleCard}
      onClick={handleCardClick}
    >
      <CardActionArea >
        <CardMedia
          component="img"
          image={image}
          sx={styleCardMedia}
        />

        <CardContent>
          <StyledTypography variant="h2">
            {title}
          </StyledTypography>
        </CardContent>

      </CardActionArea>
    </Card>
  )
}

export default CardProduct