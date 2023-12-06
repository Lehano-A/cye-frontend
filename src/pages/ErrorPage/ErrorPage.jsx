import React, { useEffect } from "react"
import { Box, Icon, Typography } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { messages } from "../../utils/constants"
import { setInputValue } from "../../redux/reducers/slices/inputSearchSlice"
import queryString from "query-string"



function ErrorPage() {

  const dispatch = useDispatch()
  const location = useLocation()


  useEffect(() => {
    if (location.search) {
      const parsedQueryParams = queryString.parse(location.search)
      const { searchValue = null } = parsedQueryParams

      if (searchValue) {
        dispatch(setInputValue(searchValue))
        return
      }
    }
    dispatch(setInputValue(''))
  }, [])


  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>

      <Icon sx={{ fontSize: "100px", width: '100%', height: '100%', maxWidth: '125px', marginRight: '40px' }}>
        🥺
      </Icon>


      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

        <Typography variant="body1">
          {messages.notFoundPage}
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: "600", marginTop: '30px' }}>
          Давайте попробуем начать с <Link to='/'>главной страницы</Link>
        </Typography>

      </Box>
    </Box>
  )
}

export default ErrorPage