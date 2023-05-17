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
  font-size: 15px;
`
const styleCardMedia = {
  maxHeight: '250px',
  height: '100%',
  objectFit: 'contain',
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
      onClick={handleCardClick}
    >
      <CardActionArea>
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