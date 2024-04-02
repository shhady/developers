import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '../components/context/themeContext.jsx'
import { AuthProvider } from '../components/context/userContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
 
  
     <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
     </ThemeProvider>
  

   </AuthProvider>
  // </React.StrictMode>,
)
