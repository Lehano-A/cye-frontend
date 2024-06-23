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

        /*
         search/products/text/
         search/products/brand/yashkino
         search/products/category/napitki

         + возможный пермалинк названия продукта (для модала)
         search/products/category/napitki/gazirovannyy-napitok-evervess-kola-1-l
        */

        {
          path: '/search/products/:searchBy/:permalink?/',
          element: <SearchProductResultPageWithHandleErrors />,
          children: [
            {
              path: 'category/:permalinkCategory/:permalinkProductTitle/',
              element: <OpenedModalProductPageWithHandleErrors />,
            },]
        },

        /*
          когда путь имеет в себе пермалинки бренда и категории + возможный пермалинк названия продукта (для модала)
          search/products/brand/evervess/category/napitki/gazirovannyy-napitok-evervess-kola-1-l
        */
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