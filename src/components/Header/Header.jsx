import React from "react";
import { useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import FormSearchContainer from "../../containers/FormSearchContainer";

/* -------------------------------- selectors ------------------------------- */
import { selectIsLoadingIndicatorBoxSearchResult } from "../../redux/reducers/selectors/boxSearchResultSelectors";


const styleBoxForm = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


function Header() {

  const isFilterDisplayed = useSelector((state) => state.filterCategories.isFilterDisplayed)
  const isLoadingIndicatorBoxSearchResult = useSelector(selectIsLoadingIndicatorBoxSearchResult)

  return (
    <Paper variant='header'>

      <Box
        component="header"
        sx={{
          'backgroundColor': '#eef0f9',
          padding: '120px 0',
          margin: isFilterDisplayed || isLoadingIndicatorBoxSearchResult ? `0 0 80px 0` : `0 0 31px 0`,
        }}
      >

        <Box sx={styleBoxForm}>
          <FormSearchContainer />
        </Box>

      </Box>
    </Paper>
  )
}

export default Header