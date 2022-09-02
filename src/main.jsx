import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Browser, Routes, Route} from "react-router-dom"
import App from './App'
import Menu from './components/Menu/Menu'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Browser>
    <Routes>
    <Route path="/menu/*" element ={<Menu/>}/>
    <Route path="/*" element ={ <App />}/>
    </Routes>
  
    </Browser>
    
  </React.StrictMode>
)
