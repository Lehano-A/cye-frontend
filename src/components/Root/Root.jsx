import React from 'react'
import App from '../App/App'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../themes/default'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CssBaseline } from '@mui/material'
import Header from '../Header/Header'
import ErrorPage from '../../pages/ErrorPages/ErrorPage'
import Main from '../Main/Main'
import '@fontsource/roboto'
import OpenedModalProductPage from '../../pages/OpenedModalProductPage/OpenedModalProductPage'
import SearchProductResultPage from '../../pages/SearchProductResultPage/SearchProductResultPage'
import withErrorPage from '../HOC/withErrorPage'



function Root() {

  const SearchProductResultPageWithErrorPage = withErrorPage(SearchProductResultPage)
  const OpenedModalProductPageWithErrorPage = withErrorPage(OpenedModalProductPage)


  const routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement:
        <>
          <Header />
          <Main />
          <ErrorPage />
        </>
      ,

      children: [
        {
          index: true,
          element: <Main />,
        },


        {
          path: '/search/products/:searchBy/:permalink?/',
          element: <SearchProductResultPageWithErrorPage />,
        },


        {
          path: '/search/products/brand/:permalinkBrand/category/:permalinkCategory/',
          element: <SearchProductResultPageWithErrorPage />,
          children: [
            {
              path: ':permalinkProductTitle/',
              element: <OpenedModalProductPageWithErrorPage />,
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