import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { RoleProvider } from './context/RoleContext'
import { ProviderProvider } from './context/ProviderContext'
import { ToastProvider } from './context/ToastContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AppProvider>
          <RoleProvider>
            <ProviderProvider>
              <App />
            </ProviderProvider>
          </RoleProvider>
        </AppProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
