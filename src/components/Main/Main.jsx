import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles"
import Welcome from "./ModalProduct/Welcome/Welcome";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

/* -------------------------------- selectors ------------------------------- */
import { selectWasFirstSubmit } from "../../redux/reducers/selectors/inputSearchSelectors";


const StyledBoxLoadingIndicator = styled(Box)(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    margin: "80px 0 0 0",
  }
})



function Main() {

  const wasFirstSubmit = useSelector(selectWasFirstSubmit)
  const isLoadingBoxSearchResult = useSelector((state) => state.boxSearchResult.isLoadingIndicator)


  return (
    <>
      {!wasFirstSubmit && <Welcome />}

      {
        isLoadingBoxSearchResult &&
        <StyledBoxLoadingIndicator>
          <LoadingIndicator />
        </StyledBoxLoadingIndicator>
      }
    </>
  )
}

export default Main