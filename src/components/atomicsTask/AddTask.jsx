import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import instance from '../../../axios/instance';
import apiDB from '../../../axios/apiDB';
import { useEffect, useState } from 'react';

const schema =  yup.object().shape({
    contractor: yup.number().required(),
    date: yup.string().required(),
    duration: yup.number().required(),
    billable: yup.boolean().required(),
    project: yup.number().required(),
    product: yup.number().required(),
    activity: yup.number().required(),
    category: yup.number().required(),
    description: yup.string().required()

})

function AddTask() {
    const {register, formState:{errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    }); 
    let [info, setInfo] = useState({})
let [contractor, setContrator] = useState([ ]);
let [project, setProject] = useState([ ]);
let [product, setProduct] = useState([ ]);
let [activity, setActivity] = useState([ ]);
let [category, setCategory] = useState([ ]);


    const getData = async() => {
        try {
             let {data} = await instance.get(apiDB.getData)
       setInfo(data.content)
       console.log(data.content);
        } catch (error) {
            console.log(error)
        }
       }

const fnSend = async(data) => {
console.log(JSON.stringify(data))
    await instance.post(apiDB.addTask+`?contractor=${data.contractor}&date=${data.date}&duration=${data.duration}&billable=${data.billable}&project=${data.project}&product=${data.product}&activity=${data.activity}&category=${data.category}&description=${data.description}`)
alert("recibido")
}
       useEffect (()=>{ 
        getData()
       },[])
       useEffect (()=>{ 
        setActivity(info.activities);
        setCategory(info.categories);
        setContrator(info.contractors)
        setProduct(info.products);
        setProject(info.projects)
        
        },[info])



    return (
        <div>
            <h1> Add task</h1>
      <form className='F' onSubmit={handleSubmit(fnSend)}>
          <div>
              <label> Contractor  </label>
          <select {...register("contractor")}>
              {contractor?.map((option, index) => (
                  <option key={index} value= {option.code}>
            {option.name}
                  </option>
              ))}
          </select>
          <p> {errors.contractor?.message}</p>
          </div>
            <div>
          <label> Project  </label>
          <select {...register("project")}>
              {project?.map((option, index) => (
                  <option key={index} value= {option.code}>
            {option.name}
                  </option>
              ))}
          </select>
          <p> {errors.project?.message}</p>
            </div> 
            <div>
          <label> Category  </label>
          <select {...register("category")}>
              {category?.map((option, index) => (
                  <option key={index} value= {option.code}>
            {option.description} 
                  </option>
              ))}
          </select>
          <p> {errors.category?.message}</p>
            </div> 
            <div>
          <label> Product  </label>
          <select {...register("product")}>
              {product?.map((option, index) => (
                  <option key={index} value= {option.code}>
            {option.description}
                  </option>
              ))}
          </select>
          <p> {errors.product?.message}</p>
            </div> 
            <div>
          <label> Activity </label>
          <select {...register("activity")}>
              {activity?.map((option, index) => (
                  <option key={index} value= {option.code}>
            {option.description}
                  </option>
              ))}
          </select>
          <p> {errors.activity?.message}</p>
            </div> 
<div>
   <label> Date </label>
   <input type='date' {...register("date")} />
   <p> {errors.date?.message}</p>
</div>
<div>
    <label> Duration (days) </label>
    <input type="number" {...register("duration")} />
    <p> {errors.duration?.message}</p>
</div>            
<div>
    <label> Billable </label>
    <input type='checkbox' name='billabe' id='billable' {...register("billable")} />
    <p> {errors.billable?.message}</p>
</div>       
<div> 
                    <label> Description </label> <br/>
                    <textarea {...register("description")}/>
                    <p>{errors.description?.message } </p> 
                </div>
                <input type='submit' value='Add'/>
      </form>  
      </div>
        
        
    )
}

export default AddTask;