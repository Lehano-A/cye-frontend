import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import ListItemOfOuterList from "../ListItemOfOuterList/ListItemOfOuterList";
import OuterList from "../../../../../../styled/Interpretation/OuterList";
import { DANGEROUS_TYPE_ATTENTION_ICON, MEDIA_MD_MODAL_PRODUCT, ORIGIN, SYNONYMS, WHAT_IS_IT, WHERE_USED, WHY_USED, WITH_CAUTION_TYPE_ATTENTION_ICON } from "../../../../../../helpers/constants";


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



function DesktopInterpretation({ data, breakpoints }) {
  const {
    names,
    category,
    whyUsed,
    whereUsed,
    origin,
    potencialHarm,
    danger,
  } = data.interpretation || {}


  return (
    <>
      <BoxLeftSide>
        <OuterList>

          {
            names.index &&
            <ListItemOfOuterList
              title=""
              content={names.index}
            />
          }


          {
            names.synonyms.length > 0 &&
            <ListItemOfOuterList
              title={SYNONYMS}
              content={names.synonyms}
            />
          }


          {
            category.length > 0 &&
            <ListItemOfOuterList
              title={WHAT_IS_IT}
              content={category}
            />
          }


          {
            origin.length > 0 &&
            <ListItemOfOuterList
              title={ORIGIN}
              content={origin}
            />
          }


          {
            whyUsed.length > 0 && (!breakpoints.XSPlus) &&
            <ListItemOfOuterList
              title={WHY_USED}
              content={whyUsed}
            />
          }


          {
            whereUsed.length > 0 && ((danger.length > 0 || potencialHarm.length > 0) || (!breakpoints.XSPlus)) &&
            <ListItemOfOuterList
              title={WHERE_USED}
              content={whereUsed}
            />
          }

        </OuterList>
      </BoxLeftSide>


      <BoxRightSide>
        <OuterList>

          {
            potencialHarm.length > 0 &&
            <ListItemOfOuterList
              title="Потенциальный вред"
              content={potencialHarm}
              typeAttentionIcon={WITH_CAUTION_TYPE_ATTENTION_ICON}
            />
          }

          {
            danger.length > 0 &&
            <ListItemOfOuterList
              title="Опасность"
              content={danger}
              typeAttentionIcon={DANGEROUS_TYPE_ATTENTION_ICON}
            />
          }


          {
            whyUsed.length > 0 && (breakpoints.MD) &&
            <ListItemOfOuterList
              title={WHY_USED}
              content={whyUsed}
            />
          }


          {
            whereUsed.length > 0 && ((danger.length === 0 && potencialHarm.length === 0 && (breakpoints.MD))) &&
            <ListItemOfOuterList
              title={WHERE_USED}
              content={whereUsed}
            />
          }

        </OuterList>
      </BoxRightSide>
    </>
  )
}

export default DesktopInterpretation