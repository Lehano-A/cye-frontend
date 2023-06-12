import React from "react"
import { useDispatch } from "react-redux"
import { changeVisibleModal } from "../../../redux/reducers/modalCardProductSlice"
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, SvgIcon } from "@mui/material"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import { setSelectedCard } from "../../../redux/reducers/selectedCardProductSlice"
import { styled } from "@mui/material/styles";
import { ReactComponent as IconNatural } from "../../../images/icons/cardProduct/natural.svg"

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

const styleBoxIconCard = {
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '5px 5px 0 0',
}

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.light,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main,
  },
}));



function CardProduct(props) {

  const { title, image, dataProduct } = props
  const { isFullNatural } = dataProduct

  const dispatch = useDispatch()

  const handleCardClick = () => {
    dispatch(setSelectedCard(dataProduct)) // сохраняем данные выбранной карточки
    dispatch(changeVisibleModal(true)) // открывается модальное окно продукта
  }


  return (
    <Card variant="searchResult" onClick={handleCardClick}>

      <CardActionArea>

        {isFullNatural
          &&
          <Box sx={styleBoxIconCard}>
            <StyledTooltip
              describeChild
              title="Полностью натуральный продукт"
              placement="right"
              arrow
              disableTouchListener
              disableInteractive
            >
              <SvgIcon color="success" component={IconNatural} inheritViewBox />
            </StyledTooltip>
          </Box>
        }

        <CardMedia component="img" image={image} sx={styleCardMedia} />

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