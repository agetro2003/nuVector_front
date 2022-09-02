import { useEffect, useState } from 'react';
import apiDB from "../../../axios/apiDB";
import instance from "../../../axios/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import DeleteTask from './DeleteTask';

function ViewTask (){

    let [tasks, setTasks] = useState([]);
    let [filter, setFilter] = useState([]);
    let [busqueda, setBusqueda] = useState("");
    let [busqueda2, setBusqueda2] = useState("");
    let [busqueda3, setBusqueda3] = useState("");
    let [busqueda4, setBusqueda4] = useState("");
    let [busqueda5, setBusqueda5] = useState("");
    const getData = async() => {
        try {
         let {data} = await instance.get(apiDB.getTask)
       console.log(data.content)
       setTasks(data.content)
       setFilter(data.content)
        } catch (error) {
            console.log(error)
        }   
       }
       const handleChange=e=>{
        setBusqueda(e.target.value)
        fillFunc(e.target.value)
    }
    const handleChange2=e=>{
        setBusqueda2(e.target.value)
        fillFunc2(e.target.value)
    }
    const handleChange3=e=>{
        setBusqueda3(e.target.value)
        fillFunc2(e.target.value)
    }
    const handleChange4=e=>{
        setBusqueda4(e.target.value)
        fillFunc3(e.target.value)
    }
    const handleChange5=e=>{
        setBusqueda5(e.target.value)
        fillFunc4(e.target.value)
    }
    
    
       const fillFunc = (dataBusqueda) => {
           var result = filter.filter((element)=>{
            if(element.contractor.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
            || element.project.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
            || element.product.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
            || element.activity.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
            ||element.category.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
            ||element.client.toString().toLowerCase().includes(dataBusqueda.toLowerCase())){
                return element
            }
           })
           setTasks(result)
       }

       const fillFunc2 = (dataBusqueda) => {
        var result = tasks.filter((element)=>{
         if(element.contractor.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
         || element.project.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
         || element.product.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
         || element.activity.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
         ||element.category.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
         ||element.client.toString().toLowerCase().includes(dataBusqueda.toLowerCase())){
             return element
         }
        })
        setTasks(result)
    }


    const fillFunc3 = (dataBusqueda) => {
        var result = filter.filter((element)=>{
         if(element.date >= dataBusqueda){
             return element
         }
        })
        setTasks(result)
    }
    const fillFunc4 = (dataBusqueda) => {
        var result = filter.filter((element)=>{
         if(element.date <= dataBusqueda){
             return element
         }
        })
        setTasks(result)
    }


    

       useEffect(()=>{
        getData();
    }, []);

    return (
        <div> 
            <div>
                    <input className='containerInput' value={busqueda}
                    placeholder=" Main filter " onChange={handleChange}/>
                    <button className='btn btn-success' > <FontAwesomeIcon icon={faSearch}/></button>
                </div> 
                <div>
                    <input className='containerInput' value={busqueda2}
                    placeholder="auxiliary filter" onChange={handleChange2}/>
                    <button className='btn btn-success' > <FontAwesomeIcon icon={faSearch}/></button>
                </div> 
                <div>
                    <input className='containerInput' value={busqueda3}
                    placeholder="auxiliary filter" onChange={handleChange3}/>
                    <button className='btn btn-success' > <FontAwesomeIcon icon={faSearch}/></button>
                </div> 
                <div> 
                    <input type='date' value={busqueda4} onChange={handleChange4}/>
                </div>
                <div> 
                    <input type='date' value={busqueda5} onChange={handleChange5}/>
                </div>
             <div className='table-responsive'>
                <table className='table table-sm table-bordered'>
                    <thead>
                        <tr>
                            <th> Entry number</th>
                            <th> Date</th>
                            <th> Duration</th>
                            <th> Description </th>
                            <th> Billable flag</th>
                            <th> Contractor </th>
                            <th> Client </th>
                            <th> Project </th>
                            <th> Activity </th>
                            <th> Category </th>
                            <th> Product </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && 
                        tasks.map((task)=>(
                            <tr key={task.entry_number}>
                                <td>{task.entry_number}</td>
                                <td>{task.date}</td>
                                <td>{task.duration}</td>
                                <td>{task.description}</td>
                                <td>{task.billable_flag.toString()}</td>
                                <td>{task.contractor}</td>
                                <td>{task.client}</td>
                                <td>{task.project}</td>
                                <td>{task.activity}</td>
                                <td>{task.category}</td>
                                <td>{task.product}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div>
                <DeleteTask/>
            </div>
        </div>
    )
}
export default ViewTask