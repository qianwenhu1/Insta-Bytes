import axios from 'axios'
//import { lbBaseUrl } from '../../environment'

export const postClient = axios.create({
    baseURL:'http://app-service.innaconnection.com/post-service',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})