import axios from 'axios'

let baseURL = process.env['LB_USER_SERVICE_HOST'] || 'http://localhost:2006'


export const userServiceClient = axios.create({
    baseURL,
    headers:{
        'Content-Type': 'application/json',
    },
})