import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import instance from "../../../axios/instance";
import apiDB from "../../../axios/apiDB";
import './Register.css'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    valpass: yup.string().required().oneOf([yup.ref('password')], "the password confirmation does not match"),
    username: yup.string().min(4).max(16)
})

export default function Register(){
    const {register, formState:{errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    }); 

    const fnSend = async(data) =>{
        try {
           await instance.post(apiDB.registerUser+`?email=${data.email}&username=${data.username}&password=${data.password}`)
        alert("registro exitoso");   
        } catch (error) {
            console.log(error)
        }
      
    }
return (
    <div>

    <h1  className="h"> Register</h1>
<form className="form" onSubmit={handleSubmit(fnSend)}>
<div> 
     <div className="input">
         <label> Email </label>
         <input type="email" {...register("email")}/>
         <p> {errors.email?.message}</p>
     </div>
     <div className="input"> 
     <label> Password </label>
         <input type="password" {...register("password")}/>
         <p> {errors.password?.message}</p>
     </div>
     <div className="input">
         <label> Confirm password </label>
         <input type="password" {...register("valpass")}/>
         <p>{errors.valpass?.message}</p>
     </div>
     <div className="input">
         <label> Username </label>
         <input type="text" {...register("username")}/>
         <p>{errors.username?.message}</p>
     </div>
     </div> 
     <input className="submit" type="submit" value="Register"/>
     </form>
    </div>
)
}