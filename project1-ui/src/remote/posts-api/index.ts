import axios from 'axios'
import { lbBaseUrl } from '../../environment'

export const postClient = axios.create({
    baseURL:'http://localhost:2007',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})