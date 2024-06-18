import { Typography, Box, List, ListItem, Paper } from "@mui/material"
import { styled } from "@mui/material/styles";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XSPLUS_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../../helpers/constants";

/* ---------------------------------- hooks --------------------------------- */
import useBreakpoints from "../../../../../hooks/useMediaQuery";

const CommonBox = styled(Box)(() => ({
  display: 'flex',

  [MEDIA_XS_MODAL_PRODUCT]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px 0',
  },

  [MEDIA_XSPLUS_MODAL_PRODUCT]: {
    padding: '15px 30px',
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    flexDirection: 'row',
    alignItems: 'start',
    gap: 25,
  },
}))

const BaseBoxSide = styled(Box)(() => ({
  display: 'flex',
  gap: '25px',
  width: '100%',

  [MEDIA_MD_MODAL_PRODUCT]: {
    flexDirection: 'column',
  }
}))

const BoxLeftSide = styled(BaseBoxSide)(() => ({
  [MEDIA_MD_MODAL_PRODUCT]: {
    width: 'calc(100% / 3)',
  },
}))

const BoxRightSide = styled(BaseBoxSide)(() => ({
  [MEDIA_MD_MODAL_PRODUCT]: {
    width: 'calc(100% / 3 * 2)',
  }
}))

const BaseList = styled(List)(() => ({
  display: 'flex',
  padding: 0,
  listStyleType: 'none',
  width: '100%',
}))

const OuterList = styled(BaseList)(() => ({
  [MEDIA_XS_MODAL_PRODUCT]: {
    flexDirection: 'column',
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))

const InnerList = styled(BaseList)(() => ({
  [MEDIA_XS_MODAL_PRODUCT]: {
    flexDirection: 'column',
  },
}))

const StyledListItem = styled(ListItem)(() => ({
  minHeight: '75px',
  width: '100%',

}))

const ListItemOuterList = styled(StyledListItem)(() => ({
  width: '100%',
}))

const StyledListItemOuterListNameIndex = styled(StyledListItem)(() => ({
  justifyContent: 'center',
  alignItems: "center"
}))

const StyledPaper = styled(Paper)(() => ({
  padding: "15px 25px",
  width: '100%',
}))

const ColoredPaper = styled(StyledPaper)(() => ({
  color: '#fff',
  borderColor: '#fff',
}))

const PaperPotencialHarm = styled(ColoredPaper)(({ theme }) => ({
  backgroundColor: theme.palette.withCaution.main,
}))

const PaperDanger = styled(ColoredPaper)(({ theme }) => ({
  backgroundColor: theme.palette.dangerous.main,
}))


const Title = styled(Typography)(() => ({
  display: 'inline-block',
  alignSelf: "center",
  fontSize: '16px',
  fontWeight: 700,
  marginBottom: '5px',
  letterSpacing: '0.5px'
}))

const NameIndex = styled(Typography)(() => ({
  fontSize: '30px',
  fontWeight: 700,
}))

const ListItemContent = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isNaturalFoodAddition'
})(({ data, isNaturalFoodAddition, theme }) => ({
  listStyle: data.length > 1 ? "disc" : "none",
  display: isNaturalFoodAddition ? 'block' : 'list-item', // 'block' - чтобы не отображался маркер напротив - "Натуральное"
  padding: 0,
  margin: '0 0 5px 0',
}))


const StyledSpan = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.fullNatural.main,
  color: '#fff',
  padding: '2px 5px',
  borderRadius: '5px',
}))

const ELEVATION = 3;


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

  const breakpoints = useBreakpoints()


  // создать контент элемента списка
  function createContentListItem(title, content) {
    return (
      <>
        <Title variant="h3">{title}</Title>
        <InnerList>{fillDataListItems(content)}</InnerList>
      </>
    )
  }

  // заполнить данными элементами списка
  function fillDataListItems(data) {
    return data.map((item, id) =>
      <ListItemContent
        data={data}
        isNaturalFoodAddition={item.toLowerCase() === 'натуральное' && id === 0}
        key={id}
      >
        {
          item.toLowerCase() === 'натуральное' && id === 0 ?
            <>
              <StyledSpan>
                {item}
              </StyledSpan>
            </>
            :
            <>
              {item}
            </>
        }
      </ListItemContent>)
  }


  return (
    <CommonBox>

      <BoxLeftSide>
        <OuterList>

          {
            names.index
            &&
            <StyledListItemOuterListNameIndex>
              <NameIndex variant="h3" >
                {names.index}
              </NameIndex>
            </StyledListItemOuterListNameIndex>
          }


          {
            names.synonyms.length > 0 &&
            <ListItemOuterList>
              <StyledPaper elevation={ELEVATION}>
                {createContentListItem('Другие названия', names.synonyms)}
              </StyledPaper>
            </ListItemOuterList>
          }


          {
            category.length > 0 &&
            <ListItemOuterList>
              <StyledPaper elevation={ELEVATION}>
                {createContentListItem('Что это', category)}
              </StyledPaper>
            </ListItemOuterList>
          }

          {
            origin.length > 0 &&
            <ListItemOuterList>
              <StyledPaper elevation={ELEVATION}>
                {createContentListItem('Происхождение', origin)}
              </StyledPaper>
            </ListItemOuterList>
          }

          {
            whyUsed.length > 0 && (!breakpoints.XSPlus) &&
            <ListItemOuterList>
              <StyledPaper elevation={ELEVATION}>
                {createContentListItem('Для чего', whyUsed)}
              </StyledPaper>
            </ListItemOuterList>
          }

          {
            whereUsed.length > 0 && ((danger.length > 0 || potencialHarm.length > 0) || (!breakpoints.XSPlus)) &&
            <ListItemOuterList>
              <StyledPaper elevation={ELEVATION}>
                {createContentListItem('Где применяется', whereUsed)}
              </StyledPaper>
            </ListItemOuterList>
          }
        </OuterList>
      </BoxLeftSide>


      {
        <BoxRightSide>
          <OuterList>
            {
              potencialHarm.length > 0 &&
              <ListItemOuterList>
                <PaperPotencialHarm elevation={ELEVATION}>
                  {createContentListItem('Потенциальный вред', potencialHarm)}
                </PaperPotencialHarm>
              </ListItemOuterList>
            }

            {
              danger.length > 0 &&
              <ListItemOuterList>
                <PaperDanger elevation={ELEVATION}>
                  {createContentListItem('Опасность', danger)}
                </PaperDanger>
              </ListItemOuterList>
            }


            {
              whyUsed.length > 0 && (breakpoints.MD) &&
              <ListItemOuterList>
                <StyledPaper elevation={ELEVATION}>
                  {createContentListItem('Для чего', whyUsed)}
                </StyledPaper>
              </ListItemOuterList>
            }

            {
              whereUsed.length > 0 && ((danger.length === 0 && potencialHarm.length === 0 && (breakpoints.MD))) &&
              <ListItemOuterList>
                <StyledPaper elevation={ELEVATION}>
                  {createContentListItem('Где применяется', whereUsed)}
                </StyledPaper>
              </ListItemOuterList>
            }

          </OuterList>
        </BoxRightSide>
      }

    </CommonBox>
  )
}

export default Interpretation