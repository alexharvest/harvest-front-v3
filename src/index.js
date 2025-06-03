import React from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/ReactToastify.css'
import '@fontsource/roboto-mono'
import '@fontsource/roboto-mono/500.css'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
