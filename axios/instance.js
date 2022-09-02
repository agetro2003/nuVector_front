import axios from "axios"
let url = 'https://elaborate-manatee-69b8aa.netlify.app/api/';
//http://localhost:8888
const instance = axios.create({baseURL: 'https://elaborate-manatee-69b8aa.netlify.app/api/',timeout: 10000});

export default instance