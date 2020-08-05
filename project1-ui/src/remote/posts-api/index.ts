import axios from 'axios'
import { lbBaseUrl } from '../../environment'

export const postClient = axios.create({
    baseURL:'http://localhost:8070/post-service',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})