import axios from "axios";

const api = axios.create({
    baseURL : 'https://backend-ecommerc2e.onrender.com/api'
})

export default api