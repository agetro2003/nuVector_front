import Login from './components/Login/Login'
import Register from './components/Register/Register'
import nuVector from '/nuVector.png'
import {Link, Route, Routes} from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'


function App() {
 useEffect(()=>{
  document.body.classList.add('background');
 }, []);

  return (
    <div> 
   <div className='header'>
     <div >
         <img  src={nuVector} alt='logo_nuVector'/>
     </div>
   <h1 className='welcome'> 
     Welcome
   </h1>
    <div className='buttons'> 
  
      <button> <Link to="/login">Login</Link></button>
      <button> <Link to="/register">Register</Link></button>
           
    </div>
    </div>
<div className='forms'> 
  <Routes>
  <Route  path="/login" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
 
  </Routes>

</div>
   </div>
   
  )
}

export default App
