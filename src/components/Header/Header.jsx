import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import FormSearchContainer from "../../containers/FormSearchContainer";
import logo from '../../images/logo/logo.svg'

/* -------------------------------- selectors ------------------------------- */
import { selectIsLoadingIndicatorBoxSearchResult } from "../../redux/reducers/selectors/boxSearchResultSelectors";
import { selectIsFilterDisplayed } from "../../redux/reducers/selectors/filterCategoriesSelectors";

/* --------------------------------- actions --------------------------------- */
import { resetStatesApp } from "../../redux/reducers/actions/common/resetStatesApp";


const styleBoxForm = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}



function Header() {

  const dispatch = useDispatch()

  const isFilterDisplayed = useSelector(selectIsFilterDisplayed)
  const isLoadingIndicatorBoxSearchResult = useSelector(selectIsLoadingIndicatorBoxSearchResult)
  const pageWithError = useSelector((state) => state.navigation.pageWithError)


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
          margin: isFilterDisplayed || isLoadingIndicatorBoxSearchResult || pageWithError.status ? `0 0 80px 0` : `0 0 31px 0`,
        }}
      >

        <Box sx={{ position: 'relative', height: "60px", display: "flex", flexDirection: "column", alignItems: "center", margin: "30px 0 50px " }}>

          <Box sx={{ width: "150px" }}>
            <Link
              to="/"
              state={{ inputValue: "" }}
              onClick={() => { dispatch(resetStatesApp()) }}
            >
              <img src={logo} sx={{ opacity: '100%' }} alt="Логотип сайта" />
            </Link>
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