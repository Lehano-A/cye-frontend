import React from 'react'
import { createRoot } from 'react-dom/client'

import store from './redux/store'

import Root from './components/Root/Root'
import { Provider } from 'react-redux'


const root = createRoot(document.getElementById('root'))


root.render(
  <Provider store={store}>
    <Root />
  </Provider>
)