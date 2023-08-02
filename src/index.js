import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import { ThemeProvider } from '@mui/material/styles'
import theme from './themes/default'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import ErrorPage from './components/ErrorPage/ErrorPage'
import store from './redux/store'
import '@fontsource/roboto'

const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/* <RouterProvider router={router} /> */}
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
)

