import apiDB from '../../../axios/apiDB';
import instance from '../../../axios/instance';
import * as yup from "yup"
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';

const schema = yup.object().shape({
    e: yup.number().required()
}) 
function DeleteTask() {
    const {register, formState:{errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    }); 
    let [mes, setMes] = useState("");
    const fnSend2 = async(data) =>{
        try {
            await instance.post(apiDB.deleteTask+`?entry=${data.e}`)
            setMes("Task has been deleted")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div> 
             <h3>
                 Delete a Task
             </h3>
             <form onSubmit={handleSubmit(fnSend2)}>
             <input type='number'{...register("e")} />
                <p>{errors.e?.message}</p>
                <p> {mes} </p>
                <input value="Delete" type='submit'/>
             </form>
         </div>
    )
}
export default DeleteTask;