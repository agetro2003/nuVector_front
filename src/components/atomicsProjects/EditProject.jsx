import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import instance from '../../../axios/instance';
import apiDB from '../../../axios/apiDB';
import { useEffect, useState } from 'react';



let schema = yup.object().shape({
    code: yup.number().required(),
    client: yup.string().required(),
    name: yup.string().required(), 
    description: yup.string(),
    active: yup.bool()
})

function EditProject (){
   

    const {register, formState:{errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    });

    let [info, setInfo] = useState({})
    let [p,setp] = useState([ ]);


    const fnSend = async(data) =>{
        try {
            console.log (data.code+" "+ data.client.charAt(0)+" " + data.name +" "+ data.description+" "+data.active)
            await instance.post(apiDB.editProject+`?code=${data.code}&client=${data.client.charAt(0)}&name=${data.name}&description=${data.description}&active=${data.active}`)
               alert ("Editado correctamente")
        } catch (error) {
            console.log(error)
        }
             
            }
    

            const getData = async() => {
                try {
                     let {data} = await instance.get(apiDB.getData)
               setInfo(data.content)
               console.log(data.content);
                } catch (error) {
                    console.log(error)
                }
                   
               }


useEffect (()=>{ 
 getData()
},[])
useEffect (()=>{ 
   setp(info.projects)
   console.log(p)
   },[info])

 
            return (
                <div> 
                    <h1> Edit project </h1>
                    <h3> Complete the code's box with the project's code and fill out the form to edit a project </h3>
        
        
        
                    <form className='F' onSubmit={handleSubmit(fnSend)}>
                    
                    
                    <div> 
        <label> Project's code</label>
        <select {...register("code")}>
              {p?.map((option, index) => (
        <option key={index} value={option.code}>
          {option.name}
        </option>
      ))}

        </select>
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
                        <div> 
                            <label> Name </label> 
                            <input type='text' {...register("name")}/>
                            <p>{errors.name?.message } </p> 
                        </div>
                        <div> 
                            <label> Description </label> <br/>
                            <textarea {...register("description")}/>
                            <p>{errors.description?.message } </p> 
                        </div>
                        <div>
                            <label> Actives </label>
                            <input  type='checkbox'  name = "actives" id='actives' {...register('active')}/>
                        </div>
                     
                           
                    <input value="Edit" type='submit'/>
        
                    </form>
                </div>
            )
        
        }
        
        export default EditProject;