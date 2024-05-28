import React from 'react'
import App from '../App/App'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../themes/default'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CssBaseline } from '@mui/material'
import Header from '../Header/Header'
import NotFoundPageError from '../Errors/NotFoundPageError'
import Main from '../Main/Main'
import '@fontsource/roboto'
import OpenedModalProductPage from '../../pages/OpenedModalProductPage/OpenedModalProductPage'
import SearchProductResultPage from '../../pages/SearchProductResultPage/SearchProductResultPage'
import withHandleErrors from '../HOC/withHandleErrors'



function Root() {
  const MainWithHandleErrors = withHandleErrors(Main)
  const SearchProductResultPageWithHandleErrors = withHandleErrors(SearchProductResultPage)
  const OpenedModalProductPageWithHandleErrors = withHandleErrors(OpenedModalProductPage)


  const routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement:
        <>
          <Header />
          <Main />
          <NotFoundPageError />
        </>
      ,

      children: [
        {
          index: true,
          element: <MainWithHandleErrors />,
        },


        {
          path: '/search/products/:searchBy/:permalink?/',
          element: <SearchProductResultPageWithHandleErrors />,
        },


        {
          path: '/search/products/brand/:permalinkBrand/category/:permalinkCategory/',
          element: <SearchProductResultPageWithHandleErrors />,
          children: [
            {
              path: ':permalinkProductTitle/',
              element: <OpenedModalProductPageWithHandleErrors />,
            },]
        },
      ]
    }
  ]
  );



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}

export default Root