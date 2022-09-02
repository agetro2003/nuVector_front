import { useState } from 'react';
import apiDB from '../../../axios/apiDB';
import instance from '../../../axios/instance';
import * as yup from "yup"
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    c: yup.number().required()
}) 

function DeleteProject(){
    const {register, formState:{errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    }); 

    let [mes, setMes] = useState("");
    const fnSend2 = async(data) =>{
        try {
            await instance.post(apiDB.deleteProject+`?code=${data.c}`)
            setMes("Project has been deleted")
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div> 
             <h3>
                 Delete a project
             </h3>
             <form onSubmit={handleSubmit(fnSend2)}>
             <input type='number'{...register("c")} />
                <p>{errors.c?.message}</p>
                <p> {mes} </p>
                <input type='submit'/>
             </form>
         </div>
    )
}

export default DeleteProject