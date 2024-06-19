import { ListItem, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BaseList from "../../../../../../styled/Interpretation/BaseLIst";
import { MEDIA_XS_MODAL_PRODUCT } from "../../../../../../helpers/constants";


const Title = styled(Typography)(() => ({
  display: 'inline-block',
  alignSelf: "center",
  fontSize: '16px',
  fontWeight: 700,
  marginBottom: '5px',
  letterSpacing: '0.5px'
}))


const InnerList = styled(BaseList)(() => ({
  [MEDIA_XS_MODAL_PRODUCT]: {
    flexDirection: 'column',
  },
}))


const ListItemContent = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isNaturalFoodAddition'
})(({ data, isNaturalFoodAddition, theme }) => ({
  listStyle: data.length > 1 ? "disc" : "none",
  display: isNaturalFoodAddition ? 'block' : 'list-item', // 'block' - чтобы не отображался маркер напротив - "Натуральное"
  padding: 0,
  margin: '0 0 5px 0',
}))


const StyledListItem = styled(ListItem)(() => ({
  minHeight: '75px',
  width: '100%',
}))


const ListItemOuterList = styled(StyledListItem)(() => ({
  width: '100%',
}))


const StyledSpan = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.fullNatural.main,
  color: '#fff',
  padding: '2px 5px',
  borderRadius: '5px',
}))


const StyledPaper = styled(Paper, { shouldForwardProp: (prop) => prop !== 'typeAttentionIcon' })(({ typeAttentionIcon, theme }) => ({
  padding: "15px 25px",
  width: '100%',
  backgroundColor: typeAttentionIcon ? theme.palette[typeAttentionIcon].main : 'none',
  color: typeAttentionIcon ? theme.palette[typeAttentionIcon].contrastText : 'initial',
  borderColor: typeAttentionIcon ? '#fff' : 'initial',
}))


const StyledListItemOfOuterListNameIndex = styled(StyledListItem)(() => ({
  justifyContent: 'center',
  alignItems: "center"
}))


const NameIndex = styled(Typography)(() => ({
  fontSize: '30px',
  fontWeight: 700,
}))


const ELEVATION = 3;



function ListItemOfOuterList({
  title,
  content,
  typeAttentionIcon = null
}) {


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
    title === '' ?
      <StyledListItemOfOuterListNameIndex>
        <NameIndex variant="h3" >
          {content}
        </NameIndex>
      </StyledListItemOfOuterListNameIndex>

      :

      <ListItemOuterList>
        <StyledPaper typeAttentionIcon={typeAttentionIcon} elevation={ELEVATION}>
          {createContentListItem(title, content)}
        </StyledPaper>
      </ListItemOuterList>
  )
}

export default ListItemOfOuterList