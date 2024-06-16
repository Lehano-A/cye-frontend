import { Typography, Box, List, ListItem, Paper } from "@mui/material"
import { styled } from "@mui/material/styles";
import { MEDIA_SM_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../../helpers/constants";

const CommonBox = styled(Box)(() => ({
  display: 'flex',
  padding: '15px',
  gap: 25,

  [MEDIA_XS_MODAL_PRODUCT]: {
    flexDirection: 'column'
  },
  [MEDIA_SM_MODAL_PRODUCT]: {
    flexDirection: 'row'
  },
}))


const StyledListItem = styled(ListItem)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  minHeight: '75px'
}))

const StyledListItemNameIndex = styled(StyledListItem)(() => ({
  justifyContent: 'center',
  alignItems: "center"
}))


const PaperListItem = styled(Paper)(() => ({
  width: '100%',
  padding: "15px 25px",
}))

const NameIndex = styled(Typography)(() => ({
  display: 'block',
  fontSize: '30px',
  fontWeight: 700,
}))


const PaperListItemPotencialHarm = styled(PaperListItem)(({ theme }) => ({
  backgroundColor: theme.palette.withCaution.main,
  color: '#fff',
  borderColor: '#fff'
}))



const PaperListItemDanger = styled(PaperListItem)(({ theme }) => ({
  backgroundColor: theme.palette.dangerous.main,
  color: '#fff',
  borderColor: '#fff'
}))


const Title = styled(Typography)(() => ({
  display: 'inline-block',
  alignSelf: "center",
  fontSize: '16px',
  fontWeight: 700,
  marginBottom: '5px',
  letterSpacing: '0.5px'
}))

const TextListItem = styled(ListItem)(({ data }) => ({
  listStyle: data.length > 1 ? "disc" : "none",
  display: 'list-item',
  fontSize: "14px",
  padding: 0,
}))

const StyledList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  listStyleType: 'none',
  justifyContent: 'space-between'
}))


const BoxLeftSide = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% / 3)',
  gap: '25px',
}))

const BoxRightSide = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% / 3 * 2)',
  gap: '25px',
}))

const elevation = 5;


function Interpretation({ data }) {

  const {
    names,
    category,
    whyUsed,
    whereUsed,
    origin,
    potencialHarm,
    danger,
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
    <CommonBox >

      <BoxLeftSide hasDangerElement={danger.length}>
        <StyledList>

          {
            names.index
            &&
            <StyledListItemNameIndex>
              <NameIndex variant="h3" >
                {names.index}
              </NameIndex>
            </StyledListItemNameIndex>
          }


          {
            names.synonyms.length > 0 &&
            <StyledListItem>
              <PaperListItem elevation={elevation}>
                {createContentListItem('Другие названия', names.synonyms)}
              </PaperListItem>
            </StyledListItem>
          }


          {
            category.length > 0 &&
            <StyledListItem>
              <PaperListItem elevation={elevation}>
                {createContentListItem('Что это', category)}
              </PaperListItem>
            </StyledListItem>
          }

          {
            (whereUsed.length > 0 && (danger.length > 0 || potencialHarm.length > 0)) &&
            <StyledListItem>
              <PaperListItem elevation={elevation}>
                {createContentListItem('Где применяется', whereUsed)}
              </PaperListItem>
            </StyledListItem>
          }

          {
            origin.length > 0 &&
            <StyledListItem>
              <PaperListItem elevation={elevation}>
                {createContentListItem('Происхождение', origin)}
              </PaperListItem>
            </StyledListItem>
          }


        </StyledList>
      </BoxLeftSide>


      {
        <BoxRightSide>
          <StyledList>
            {
              potencialHarm.length > 0 &&
              <StyledListItem>
                <PaperListItemPotencialHarm elevation={elevation}>
                  {createContentListItem('Потенциальный вред', potencialHarm)}
                </PaperListItemPotencialHarm>
              </StyledListItem>
            }

            {
              danger.length > 0 &&
              <StyledListItem>
                <PaperListItemDanger elevation={elevation}>
                  {createContentListItem('Опасность', danger)}
                </PaperListItemDanger>
              </StyledListItem>
            }


            {
              whyUsed.length > 0 &&
              <StyledListItem>
                <PaperListItem elevation={elevation}>
                  {createContentListItem('Для чего', whyUsed)}
                </PaperListItem>
              </StyledListItem>
            }

            {
              (whereUsed.length > 0 && (danger.length === 0 && potencialHarm.length === 0)) &&
              <StyledListItem>
                <PaperListItem elevation={elevation}>
                  {createContentListItem('Где применяется', whereUsed)}
                </PaperListItem>
              </StyledListItem>
            }

          </StyledList>
        </BoxRightSide>
      }

    </CommonBox>
  )
}

export default Interpretation