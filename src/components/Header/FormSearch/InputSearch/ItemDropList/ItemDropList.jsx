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



const StyledListItem = styled(ListItem)(({ params }) => {
  const { isHistorySubmitDisplayed } = params

  return {
    height: '64px',
    maxWidth: "600px",
    '&.MuiAutocomplete-option': {
      display: "flex",
      justifyContent: isHistorySubmitDisplayed ? 'space-between' : 'flex-start',
    }
  }
})



function ItemDropList({ props, option }) {

  const inputValue = useSelector(selectInputValue)
  const isHistorySubmitDisplayed = useSelector(selectIsHistorySubmitDisplayed)



  return (
    <StyledListItem {...props} params={{ isHistorySubmitDisplayed }}>


      {
        ((inputValue.length >= 2 && !isHistorySubmitDisplayed) && (option.brand || option.categories)) &&
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