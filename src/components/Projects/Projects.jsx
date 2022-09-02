import { Route, Routes } from "react-router-dom"
import AddProject from "../atomicsProjects/AddProject"
import EditProject from "../atomicsProjects/EditProject"
import MyComponent from "../atomicsProjects/MyComponent"
import cbMenu from "../Navmenu/Navmenu"
import './Projects.css'
 
function Projects() {
let nm = [
    {links: '/menu/projects/addProject', options: 'Add a project'},
    {links: '/menu/projects/showProjects', options: 'Watch projects'},
    {links: '/menu/projects/editProject', options: 'edits projects'}
]
    return(
        
        <div>
            <div className="H">
           <h1> Projects </h1>
        <div> 
            {nm.map(cbMenu)}
        </div> 
            </div>
        
        <div> 
            <Routes>
<Route path="/addProject" element={<AddProject/>}/>
<Route path="/showProjects" element={<MyComponent/>}/>
<Route path="/editProject" element={<EditProject/>}/>
            </Routes>
        </div>
        </div>
    )
}
export default Projects