import { Typography, Box, List, ListItem } from "@mui/material"
import { styled } from "@mui/material/styles";
import { MEDIA_SM_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../../helpers/constants";

const CommonBox = styled(Box)(() => ({
  display: 'flex',
  padding: '15px 25px 15px 15px',
  gap: 25,

  [MEDIA_XS_MODAL_PRODUCT]: {
    flexDirection: 'column'
  },
  [MEDIA_SM_MODAL_PRODUCT]: {
    flexDirection: 'row'
  },
}))

const BoxMainInfo = styled(Box)(() => ({}))
const BoxDangerousInfo = styled(Box)(() => ({}))

const StyledListItem = styled(ListItem)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  padding: "15px 25px",
}))

const StyledListItemDanger = styled(StyledListItem)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
  borderRadius: "15px"

}))

const Title = styled(Typography)(() => ({
  display: 'inline-block',
  alignSelf: "center",
  fontSize: '16px',
  fontWeight: 700,
  borderBottom: '1px solid black',
  marginBottom: "5px"
}))

const TextListItem = styled(ListItem)(({ data }) => ({
  listStyle: data.length > 1 ? "disc" : "none",
  display: 'list-item',
  fontSize: "14px",
  padding: 0,

}))

const StyledList = styled(List)(() => ({
  padding: 0,
  listStyleType: 'none'
}))



function Interpretation({ data }) {

  const {
    category,
    whyUsed,
    whereUsed,
    origin,
    possibleConsequences,
    danger,
    withCaution,
    allergy,
  } = data.interpretation || {}


  // создать контент элемента списка
  function createContentListItem(title, content) {
    return (
      <Box>
        <Title variant="h3">{title}</Title>
        <StyledList>{fillDataListItems(content)}</StyledList>
      </Box>
    )
  }


  // заполнить данными элементами списка
  function fillDataListItems(data) {
    return data.map((item, id) => <TextListItem data={data} key={id}>{item}</TextListItem>)
  }


  return (
    <CommonBox>
      <BoxMainInfo>
        <StyledList>

          {
            category.length > 0 &&
            <StyledListItem>
              {createContentListItem('Что это', category)}
            </StyledListItem>
          }

          {
            whyUsed.length > 0 &&
            <StyledListItem>
              {createContentListItem('Для чего', whyUsed)}
            </StyledListItem>
          }

          {
            whereUsed.length > 0 &&
            <StyledListItem>
              {createContentListItem('Где применяется', whereUsed)}
            </StyledListItem>
          }

          {
            origin.length > 0 &&
            <StyledListItem>
              {createContentListItem('Происхождение', origin)}
            </StyledListItem>
          }

        </StyledList>
      </BoxMainInfo>

      <BoxDangerousInfo>
        <StyledList>
          {
            possibleConsequences.length > 0 &&
            <StyledListItem>
              {createContentListItem('Возможные последствия', possibleConsequences)}
            </StyledListItem>
          }

          {
            danger.length > 0 &&
            <StyledListItemDanger>
              {createContentListItem('Опасность', danger)}
            </StyledListItemDanger>
          }

          {
            withCaution.length > 0 &&
            <StyledListItem>
              {createContentListItem('С осторожностью', withCaution)}
            </StyledListItem>
          }

          {
            allergy.length > 0 &&
            <StyledListItem>
              {createContentListItem('Аллергия', allergy)}
            </StyledListItem>
          }

        </StyledList>
      </BoxDangerousInfo>

    </CommonBox>
  )
}

export default Interpretation