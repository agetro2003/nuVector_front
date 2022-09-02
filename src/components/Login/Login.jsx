import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import instance from "../../../axios/instance";
import apiDB from "../../../axios/apiDB";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import './Login.css'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

export default function Login(props){
    const {register, formState:{errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    }); 
let [ver,setVer] = useState("")

const navigate = useNavigate();

    const fnSend = async(data) =>{
        setVer("Cargando")
       try {
           console.log(data.email + data.password)
   let user = await instance.get(apiDB.loginUser+`?email=${data.email}&password=${data.password}`);
 console.log(user)
   let info = (user.data.content)
 if (info.email == data.email){
    setVer("Contraseña correcta")     
    navigate("/menu")
 }else{
     setVer("Contraseña incorrecta")
 }
  
       }catch (error){
         console.log(error)
         setVer("Error en el servidor")
       }
      
    }


    
return (
    <div>

    <h1 className="h"> Fill out the form to Login</h1>
<form  className="form" onSubmit={handleSubmit(fnSend)}>
    <div > 
     <div  className="input" >
         <label> Email </label>
         <input type="email" {...register("email")}/>
         <p> {errors.email?.message}</p>
     </div>
     <div  className="input" > 
     <label> Password </label>
         <input type="password" {...register("password")}/>
         <p> {errors.password?.message}</p>
     </div>
     <input className="submit" type="submit"  value="Login"/>
     </div>
     </form>
     <label>{ver}</label>
    </div>
)
}

