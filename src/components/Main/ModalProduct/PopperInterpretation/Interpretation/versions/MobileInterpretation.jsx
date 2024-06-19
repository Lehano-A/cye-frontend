import { styled } from "@mui/material/styles";
import ListItemOfOuterList from "../ListItemOfOuterList/ListItemOfOuterList";
import OuterList from "../../../../../../styled/Interpretation/OuterList";
import { DANGEROUS, DANGEROUS_TYPE_ATTENTION_ICON, ORIGIN, SYNONYMS, WHAT_IS_IT, WHERE_USED, WHY_USED, WITH_CAUTION, WITH_CAUTION_TYPE_ATTENTION_ICON } from "../../../../../../helpers/constants";

const StyledOuterList = styled(OuterList)(() => ({
  paddingBottom: '35px'
}))

function MobileInterpretation({ data }) {
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
      <StyledOuterList>
        {
          names.index &&
          <ListItemOfOuterList
            title=""
            content={names.index}
          />
        }


        {
          danger.length > 0 &&
          <ListItemOfOuterList
            title={DANGEROUS}
            content={danger}
            typeAttentionIcon={DANGEROUS_TYPE_ATTENTION_ICON}
          />
        }


        {
          potencialHarm.length > 0 &&
          <ListItemOfOuterList
            title={WITH_CAUTION}
            content={potencialHarm}
            typeAttentionIcon={WITH_CAUTION_TYPE_ATTENTION_ICON}
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
          whyUsed.length > 0 &&
          <ListItemOfOuterList
            title={WHY_USED}
            content={whyUsed}
          />
        }


        {
          whereUsed.length > 0 &&
          <ListItemOfOuterList
            title={WHERE_USED}
            content={whereUsed}
          />
        }
      </StyledOuterList>
    </>
  )
}

export default MobileInterpretation