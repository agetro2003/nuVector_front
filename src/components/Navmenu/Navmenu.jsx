import { Link } from "react-router-dom";
import "./Navmenu.css"
const cbMenu = (nm) => (
   
        <button className="button"> <Link key = {nm.options} to={nm.links}>  {nm.options} </Link> </button>

        

    
)

export default cbMenu;