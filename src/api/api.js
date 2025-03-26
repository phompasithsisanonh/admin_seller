import axios from "axios";

const api = axios.create({
    baseURL : 'https://backendecommerc2e-production.up.railway.app/api'
})

export default api