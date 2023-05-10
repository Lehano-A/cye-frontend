import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import { ThemeProvider } from '@mui/material/styles'
import theme from './themes/default'
import { Provider } from 'react-redux'
import store from './redux/store'
import '@fontsource/roboto';


const root = ReactDOM.createRoot(document.getElementById('root'))


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App>
        </App>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

