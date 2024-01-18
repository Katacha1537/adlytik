import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import App from './App'
import './index.css'
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <NextUIProvider>
        <NextThemesProvider>
          <App />
        </NextThemesProvider>
      </NextUIProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)