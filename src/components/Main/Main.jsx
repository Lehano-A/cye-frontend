import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles"
import Welcome from "./ModalProduct/Welcome/Welcome";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

/* -------------------------------- selectors ------------------------------- */
import { selectWasFirstSubmit } from "../../redux/reducers/selectors/inputSearchSelectors";
import { useLocation } from "react-router-dom";


const StyledBoxLoadingIndicator = styled(Box)(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    margin: "80px 0 0 0",
  }
})



function Main({ ErrorComponent }) {

  const wasFirstSubmit = useSelector(selectWasFirstSubmit)
  const isLoadingBoxSearchResult = useSelector((state) => state.boxSearchResult.isLoadingIndicator)
  const location = useLocation()


  return (
    ErrorComponent && location.pathname === '/' ?
      <ErrorComponent />

      :

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