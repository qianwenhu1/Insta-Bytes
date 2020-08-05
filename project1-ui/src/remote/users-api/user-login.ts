import { userClient } from "."
import { postClient } from "../posts-api"


export const userLogin = async (username:string, password:string) => {
    let credentials = {
        username, 
        password
    }
    try{
        let response = await userClient.post('/login', credentials)
        console.log(response)
        userClient.defaults.headers.common['Authorization'] = response.headers.authorization
        postClient.defaults.headers.common['Authorization'] = response.headers.authorization
        document.cookie = `token=${response.headers.authorization}`
        return response.data
    } catch(e){
        console.log(e)
    }
}