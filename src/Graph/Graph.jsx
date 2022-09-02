import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'
import apiDB from '../../axios/apiDB';
import instance from '../../axios/instance';
import 'bootstrap/dist/css/bootstrap.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import "./Graph.css"

  const schema = yup.object().shape({
      start: yup.date(),
      end: yup.date(),
      client: yup.string()
  })

const Graph = () => {

    const {register, formState:{errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema)
    }); 

    let [mes, setMes] = useState("")
  let [labels, setLabels] = useState([])
  let [values, setValues] = useState([])
  let [clients, setClients] = useState([])
  let [info, setInfo] = useState([])
  let [fill, setFill] = useState([])

    const getData = async() => {
    try {
         let {data} = await instance.get(apiDB.getGraph)
     console.log(data.content);
      setInfo(data.content.main)
      setFill(data.content.fill)

    } catch (error) {
        console.log(error)
    }
   } 
   
useEffect(()=> {
    getData()
}, [])
   useEffect(()=> {
       let l = [];
       let v = [];
       let c = [];
    for (let i = 0; i < info.length; i++) {

        l.push(`${info[i].code} ${info[i].name}`)
        v.push(parseInt(info[i].duration))
        c.push(info[i].client)
    }
    setLabels(l);
    setValues(v);
    setClients(c);

   // console.log (labels)
   // console.log (values)
   console.log (clients)
   },[info])
   
   ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


   const options = {
       responsive: true,
       plugins:{
           
           title:{
               display: true, 
               text: 'Graph Projects'
           },
       },
   };
   const data = {
       labels,
       datasets:[
           {
               label: 'projects',
               data: values,
               backgroundColor: 'rgba(255, 99, 132, 0.5)',
           },
       ],
   };
   
const fnSend = async (data) => {
    var result = fill.filter((element) => {
        if(element.client.toString().toLowerCase().includes(data.client.toLowerCase()) 
        && element.start >= data.start 
        && element.start <= data.end){
            return element
        }
    })
    let l = []
    let v = []
    for (let i = 0; i < result.length; i++) {
        let val = true
        let i2=0
        while (val && i2<l.length) {
            if ( `${result[i].code} ${result[i].name}` == l[i2]){
                v[i2] = (parseInt (v[i2]) +parseInt(result[i].duration)).toString()
                val = false
            }
            i2++;
        }
        if (val) {
            l.push(`${result[i].code} ${result[i].name}`)
            v.push(result[i].duration)
        }
           
           console.log(l)
            console.log(v)
            setLabels(l)
            setValues(v)
        }
        

    console.log(result);
if(result == [ ]){
    setMes ("filter does not match with any project ")
}
}

   return (
        <div> 
            <div className='H'> 
            <h1>Graph</h1>
             </div>
        <div>
            <div className='Bar'>

           

<p> {mes} </p>
        </div>
        
        <form className='Fill' onSubmit={handleSubmit(fnSend)}> 
           <div>
              <label> Start date </label>
            <input type='date' {...register('start')}/>
            <p> {errors.start?.message}</p> 
           </div>
            <div> 
                <label> End date </label>
            <input type='date' {...register('end')}/>
            <p> {errors.end?.message}</p> 
            </div>
           <div> 
<label> Client </label>
             <select {...register('client')}>
                 <option value=''> Show all </option>
            {clients?.map((option, index) => (
                  <option key={index} value={option}>
            {option}
                  </option>
              ))}
        </select>
        <p> {errors.client?.message} </p>

           </div>
            
       <input type='submit' ></input>
        </form>

        <Bar 
        options={options}
        data = {data}
        />
        </div>
        </div>
    )
}
export default Graph;