import React from "react";
import { useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import FormSearchContainer from "../../containers/FormSearchContainer";
import logo from '../../images/logo/logo.svg'


/* -------------------------------- selectors ------------------------------- */
import { selectIsLoadingIndicatorBoxSearchResult } from "../../redux/reducers/selectors/boxSearchResultSelectors";
import { selectIsFilterDisplayed } from "../../redux/reducers/selectors/filterCategoriesSelectors";


const styleBoxForm = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


function Header() {

  const isFilterDisplayed = useSelector(selectIsFilterDisplayed)
  const isLoadingIndicatorBoxSearchResult = useSelector(selectIsLoadingIndicatorBoxSearchResult)


  return (

    <Paper variant="header">
      <Box
        component="header"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: "center",
          minHeight: "240px",
          'backgroundColor': '#eef0f9',
          padding: '0 0 80px',
          margin: isFilterDisplayed || isLoadingIndicatorBoxSearchResult ? `0 0 80px 0` : `0 0 31px 0`,
        }}
      >


        <Box sx={{ position: 'relative', height: "60px", display: "flex", flexDirection: "column", alignItems: "center", margin: "30px 0 50px " }}>

          <Box sx={{ width: "150px" }}>
            <img src={logo} sx={{ opacity: '100%' }} alt="Логотип сайта" />
          </Box>

        </Box>

        <Box sx={styleBoxForm}>
          <FormSearchContainer />
        </Box>

      </Box>
    </Paper>
  )
}

export default Header