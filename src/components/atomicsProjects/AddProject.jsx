import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import instance from '../../../axios/instance';
import apiDB from '../../../axios/apiDB';
import { useEffect, useState } from 'react';
import "./Atomics.css"

const schema = yup.object().shape({
code: yup.number().required(),
client: yup.string().required(),
name: yup.string().required(), 
description: yup.string(),
active: yup.bool(),
act1: yup.bool(),
act2: yup.bool(),
act3: yup.bool(),
act4: yup.bool(),
act5: yup.bool(),
act6: yup.bool(),
pro1: yup.bool(),
pro2: yup.bool(),
pro3: yup.bool(),
pro4: yup.bool()
})



function AddProject() {
    const {register, formState:{errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    }); 


    const fnSend = async(data) =>{
try {
    let activities = (Number(data.act1).toString() + Number(data.act2).toString() + Number(data.act3).toString() + Number(data.act4).toString() + Number(data.act5).toString() + Number(data.act6).toString() )
    let products = (Number(data.pro1).toString() + Number(data.pro2).toString() + Number(data.pro3).toString() + Number(data.pro4).toString())
    console.log (data.code+" "+ data.client.charAt(0)+" " + data.name +" "+ data.description+" " + activities +" "+ products + " "+data.active)
    await instance.post(apiDB.addProject+`?code=${data.code}&client=${data.client.charAt(0)}&name=${data.name}&description=${data.description}&active=${data.active}&activities=${activities}&products=${products}`)
       alert ("recibido")
} catch (error) {
    
}
     
    }
    


    return (
        <div> 
            <h1> Add project </h1>
            <h3> fill out the form to add a project </h3>



            <form className='F' onSubmit={handleSubmit(fnSend)}>
            
            
                <div> 
<label> Project's code</label>
<input type='number' {...register("code")}/>
<p > {errors.code?.message}</p>    
                </div>
                <div> 
<label> Project's client</label>
<select {...register("client")}>
        <option value="1 BMW">1 BMW</option>
        <option value="2 Volvo"> 2 Volvo</option>
        <option value="3 Ford"> 3 Ford</option>
        <option value="4 nuVector"> 4 nuVector</option>
        <option value="5 Mercedes"> 5 Mercedes</option>
      </select>
<p > {errors.client?.message}</p>    
                </div>
                <div > 
                    <label> Name </label> 
                    <input type='text' {...register("name")}/>
                    <p>{errors.name?.message } </p> 
                </div>
                <div > 
                    <label> Description </label> <br/>
                    <textarea {...register("description")}/>
                    <p>{errors.description?.message } </p> 
                </div>
                <div >
                    <label> Actives </label>
                    <input type='checkbox'  name = "actives" id='actives' {...register('active')}/>
                </div>
                <div  >
                    <label> Activities </label> <br/> 
                    <div className='C'> 
                    <p> Release  <input type='checkbox'  name = "Release" id='Release' {...register('act1')}/> </p>
               
                <p> Support <input type='checkbox' name = "Support" id='Support' {...register('act2')}/> </p>
                
                <p> Development <input type='checkbox'  name = "Development" id='Development'  {...register('act3')}/></p>
                
                <p> Vacation <input type='checkbox' name = "Vacation" id='Vacation'  {...register('act4')}/> </p>
                
                <p> Design <input type='checkbox' name = "Design" id='Design' {...register('act5')}/></p>
                
                <p> Quoting <input type='checkbox' name = "Quoting" id='Quoting'  {...register('act6')}/></p>
                </div>
                </div> 
            <div>
                <label> Products </label>
<div className='C'>
                <p> LoopManager  <input type='checkbox' name = "LoopManager" id='LoopManager'  {...register('pro1')}/> </p>
               
               <p> JobShop <input type='checkbox' name = "JobShop" id='JobShop'  {...register('pro2')}/> </p>
               
               <p> N/A <input type='checkbox' name = "N/A " id='N/A '  {...register('pro3')}/></p>
               
               <p> goLogit <input type='checkbox' name = "goLogit" id='goLogit'  {...register('pro4')}/> </p>
</div>
            </div>
            <input value="Add Product" type='submit'/>

            </form>
        </div>
    )
    
}

export default AddProject;