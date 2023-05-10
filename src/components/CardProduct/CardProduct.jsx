import React from "react"
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material"
import hrutka from './../../images/hrutka.webp'

const CardProduct = (props) => {

  const { title } = props

  return (
    <Card
      elevation={3}
      sx={{ width: '200px' }}
    >
      <CardActionArea >
        <CardMedia
          component="img"
          image={hrutka}
          sx={{ height: '200px', objectFit: 'contain', marginTop: '15px' }}
        />

        <CardContent>
          <Typography variant="h2" fontSize="16px" fontWeight="700">
            {title}
          </Typography>
        </CardContent>

      </CardActionArea>
    </Card>
  )
}

export default CardProduct