import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';

import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/App'

import './css/style.scss'

ReactDOM.render(
  <App />,
  document.getElementById('root') // eslint-disable-line no-undef
)

if(module.hot) // eslint-disable-line no-undef  
  module.hot.accept() // eslint-disable-line no-undef  

