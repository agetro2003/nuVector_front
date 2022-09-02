import {Link, Route, Routes} from 'react-router-dom'
import cbMenu from '../Navmenu/Navmenu'
import Projects from '../Projects/Projects'
import Task_entries from '../Task_entries/Task_entries'
import Graph from '../../Graph/Graph'
import "./Menu.css"
function Menu(){ 
    let nm = [
        {links: '/menu/projects', options: 'Projects'}, 
        {links: '/menu/task', options: 'Task entries'},
        {links: '/menu/graph', options: 'Graph'},
        {links: '/', options: 'Log out'}
    ] 

    return (

        <div className='container'> 
            <div className='nav'> 
                {nm.map(cbMenu)}
            </div>
        <div> 
            <Routes>
                <Route path='/projects/*' element={<Projects/>}/>
                <Route path='/task/*' element={<Task_entries/>}/>
                <Route path='/graph/*' element={<Graph/>}/>
            </Routes>
        </div>
        </div>
        
    )

}
export default Menu