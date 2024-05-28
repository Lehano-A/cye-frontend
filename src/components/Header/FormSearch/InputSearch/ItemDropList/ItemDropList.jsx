import React from "react";
import { useSelector } from "react-redux";
import { ListItem } from "@mui/material";
import { styled } from "@mui/material/styles"
import ButtonDeleteFromHistorySubmit from "./ButtonDeleteFromHistorySubmit/ButtonDeleteFromHistorySubmit";
import HistorySubmitOption from "./options/HistorySubmitOption/HistorySubmitOption";
import WithImageOption from "./options/WithImageOption/WithImageOption";
import BrandAndCategoryOption from "./options/BrandAndCategoryOption/BrandAndCategoryOption";

/* -------------------------------- selectors ------------------------------- */
import {
  selectInputValue,
  selectIsHistorySubmitDisplayed,
} from "../../../../../redux/reducers/selectors/inputSearchSelectors";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XSPLUS_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../../helpers/constants";


const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => (prop !== 'isHistorySubmitDisplayed')
})(({ isHistorySubmitDisplayed }) => {

  return {
    maxWidth: "600px",
    overflow: 'hidden',
    display: '-webkit-box',
    'WebkitBoxOrient': 'vertical',
    wordBreak: 'break-word',

    '&.MuiAutocomplete-option': {
      display: "flex",
      justifyContent: isHistorySubmitDisplayed ? 'space-between' : 'flex-start',
    },

    [MEDIA_XS_MODAL_PRODUCT]: {
      height: '90px',
    },

    [MEDIA_XSPLUS_MODAL_PRODUCT]: {
      height: '75px',
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      height: '64px',
    }
  }
})



function ItemDropList({ props, option }) {

  const inputValue = useSelector(selectInputValue)
  const isHistorySubmitDisplayed = useSelector(selectIsHistorySubmitDisplayed)


  return (
    <StyledListItem  {...props} isHistorySubmitDisplayed={isHistorySubmitDisplayed}>

      {
        ((inputValue.length >= 2 && !isHistorySubmitDisplayed) && (option.brand || option.category)) &&
        <BrandAndCategoryOption option={option} />
      }


      {
        (inputValue.length >= 2 && !isHistorySubmitDisplayed) && option.imagesUrl && (
          <WithImageOption option={option} />
        )
      }


      {
        isHistorySubmitDisplayed &&
        <>
          <HistorySubmitOption option={option} />
          <ButtonDeleteFromHistorySubmit option={option} />
        </>
      }

    </StyledListItem>
  )
}

export default ItemDropList