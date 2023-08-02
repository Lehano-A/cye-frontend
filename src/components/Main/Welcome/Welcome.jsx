import React from "react";
import { Container, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledList = styled(List)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
`
const StyledListItem = styled(ListItem)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 150px;
  width: 350px;
  padding-top: 0;
  margin-bottom: 80px;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: ${(props) => props.bgcolor} ;
    z-index: -1;
  }
`

const styleTitle = {
  fontSize: '22px',
  marginTop: '30px'
}

const styleDescription = {
  marginTop: '20px',
  textAlign: 'center',
}


function Welcome() {
  return (
    <Container>
      <StyledList>

        <StyledListItem bgcolor="rgba(0, 255, 208, 0.05)">
          <Typography variant='h2' sx={styleTitle}>Наша задача</Typography>
          <Typography variant='body2' sx={styleDescription}>
            объяснить <strong>человеческим языком</strong>, что скрывается за составом продуктов
          </Typography>
        </StyledListItem>


        <StyledListItem bgcolor="rgba(0, 72, 255, 0.05)">
          <Typography variant='h2' sx={styleTitle}>Понимание</Typography>
          <Typography variant='body2' sx={styleDescription}>
            сложно переоценить насколько важно понимать, что кушаем <strong>мы и наши дети</strong>
          </Typography>
        </StyledListItem>


        <StyledListItem bgcolor="rgba(250, 0, 94, 0.05)">
          <Typography variant='h2' sx={styleTitle}>Здоровье</Typography>
          <Typography variant='body2' sx={styleDescription}>
            употребляемые в пищу продукты напрямую влияют на <strong>состояние здоровья</strong> человека
          </Typography>
        </StyledListItem>


        <StyledListItem id="list-item" bgcolor="rgba(255, 106, 0, 0.05)">
          <Typography variant='h2' sx={styleTitle}>Качество</Typography>
          <Typography variant='body2' sx={styleDescription}>
            <strong>состав продукта</strong> - это первое, на что необходимо обратить внимание во время похода в магазин
          </Typography>
        </StyledListItem>


        <StyledListItem id="list-item" bgcolor="rgba(187, 0, 255, 0.05)">
          <Typography variant='h2' sx={styleTitle}>Иллюзия</Typography>
          <Typography variant='body2' sx={styleDescription}>
            маркетинг и реклама могут <strong>создавать впечатление</strong>, что продукт безопасен для употребления, но это далеко не всегда так
          </Typography>
        </StyledListItem>


        <StyledListItem id="list-item" bgcolor="rgba(4, 255, 0, 0.05)">
          <Typography variant='h2' sx={styleTitle}>Выбор</Typography>
          <Typography variant='body2' sx={styleDescription}>
            только в наших руках находится выбор между вредным и <strong>натуральным</strong>
          </Typography>
        </StyledListItem>

      </StyledList>
    </Container>
  )
}

export default Welcome