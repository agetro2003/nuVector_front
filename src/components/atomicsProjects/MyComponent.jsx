import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import apiDB from '../../../axios/apiDB';
import instance from '../../../axios/instance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import * as yup from "yup"
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteProject from './DeleteProject';
const schema = yup.object().shape({
    code: yup.number().required(),

}) 


function MyComponent() {
    const {register, formState:{errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    }); 
let [projects, setProjects] = useState([]);
let [filter, setFilter] = useState([]);
let [busqueda, setBusqueda] = useState("");
let [act, setact] = useState([]);
let [pro, setpro] = useState([]);

    const getData = async() => {
     try {
          let {data} = await instance.get(apiDB.getProjects)
    console.log(data.content)
    setProjects(data.content)
    setFilter(data.content)
     } catch (error) {
         console.log(error)
     }
        
    }

const handleChange=e=>{
    setBusqueda(e.target.value)
    fillFunc(e.target.value)
}

const fillFunc =(dataBusqueda) => {
var result = filter.filter((element)=>{
    if(element.name.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
    || element.code.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
    || element.active.toString().toLowerCase().includes(dataBusqueda.toLowerCase())
    || element.client.toString().toLowerCase().includes(dataBusqueda.toLowerCase())){
        return element;
    }
})
setProjects(result);
}

    useEffect(()=>{
        getData();
    }, [])


    let AP = {}
const fnSend = async(data) =>{
    try {
        
        AP = await instance.get(apiDB.getPA+`?project=${data.code}`)
        setact(AP.data.content.activities);
        setpro(AP.data.content.products);
        console.log(act)
        console.log(pro)
    } catch (error) {
        console.log(error)
    }
}


return (

    <div >
        <h1>Welcome to Projects</h1>
       <div className='V'>  

      
        <div>
              <div >
                    <input className='containerInput' value={busqueda}
                    placeholder="fill by code, name, client or state" onChange={handleChange}/>
                    <button className='btn btn-success' > <FontAwesomeIcon icon={faSearch}/></button>
                </div>
                <div className='table-responsive'>
                <table className='table table-sm table-bordered'>
                    <thead>
                        <tr>
                            <th> Code</th>
                            <th> Name</th>
                            <th> Description</th>
                            <th> Active</th>
                            <th> Client</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects && 
                        projects.map((project)=>(
                            <tr key={project.code}>
                                <td>{project.code}</td>
                                <td>{project.name}</td>
                                <td>{project.description}</td>
                                <td>{project.active.toString()}</td>
                                <td>{project.client}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>

        <div>
        <form onSubmit={handleSubmit(fnSend)}>
            <div>
                <label> Add the code of a project to see the activities and products </label>
                <input type='number'{...register("code")} />
                <p>{errors.code?.message}</p>
                <input type='submit'
                value='Click to see activities and products'/>
            </div>
        </form>        

        <div className='table-responsive'>
                <table className='table table-sm table-bordered'>
                    <thead>
                        <tr>
                            <th> Activity's code</th>
                            <th> Activity's name</th>
                            <th> Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {act && 
                        act.map((activity)=>(
                            <tr key={activity.code}>
                                <td>{activity.code}</td>
                                <td>{activity.description}</td>
                                <td>{activity.active.toString()}</td>
                              
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <div className='table-responsive'>
                <table className='table table-sm table-bordered'>
                    <thead>
                        <tr>
                            <th> Product's code</th>
                            <th> Product's name</th>
                            <th> Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pro && 
                        pro.map((product)=>(
                            <tr key={product.code}>
                                <td>{product.code}</td>
                                <td>{product.description}</td>
                                <td>{product.active.toString()}</td>
                              
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <DeleteProject/>
         </div>
         </div>
    </div>
)}
export default MyComponent;