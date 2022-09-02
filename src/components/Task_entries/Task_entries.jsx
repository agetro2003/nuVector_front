import { Link, Route, Routes } from "react-router-dom"
import AddTask from "../atomicsTask/AddTask"
import EditTask from "../atomicsTask/EditTask"
import ViewTask from "../atomicsTask/ViewTask"
import cbMenu from "../Navmenu/Navmenu"

function Task_entries(){

    let nm = [
        {links: '/menu/task/addTask', options: 'Add a Task'},
        {links: '/menu/task/viewTask', options: 'Show Task'},
        {links: '/menu/task/editTask', options: 'Edit Task'}
    ]
    return (
        <div>
            <div className="H">
            <h1> Task entries</h1>
           <div>
               {nm.map(cbMenu)}
           </div>
           </div>
<Routes>
    <Route path='/addTask' element={<AddTask/>}/>
    <Route path='/viewTask' element={<ViewTask/>}/>
    <Route path='/editTask' element={<EditTask/>}/>
</Routes>
        </div>
    )
}
export default Task_entries

