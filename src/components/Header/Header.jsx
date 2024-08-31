import React from "react";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Paper, Stack } from "@mui/material"
import FormSearchContainer from "../../containers/FormSearchContainer";
import logo from '../../images/logo/logo.svg'

/* --------------------------------- actions --------------------------------- */
import { resetStatesApp } from "../../redux/reducers/actions/common/resetStatesApp";


const Search = styled('search')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
}))


function Header() {

  const dispatch = useDispatch()


  return (
    <Paper variant="header">
      <Stack
        component="header"
        sx={{
          alignItems: "center",
          minHeight: "250px",
          'backgroundColor': '#eef0f9',
        }}
      >

        <Stack sx={{ position: 'relative', height: '60px', alignItems: 'center', maxWidth: '1280px', width: '100%' }}>

          <Box sx={{ width: "150px", margin: '30px 0 50px' }}>
            <Link
              to="/"
              state={{ inputValue: "" }}
              onClick={() => { dispatch(resetStatesApp()) }}
            >
              <img src={logo} alt="Логотип сайта" />
            </Link>
          </Box>

          <Search>
            <FormSearchContainer />
          </Search>

        </Stack>
      </Stack>
    </Paper>
  )
}

export default Header