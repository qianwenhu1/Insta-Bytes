import { userClient } from "."

export const getAllUser = async () =>{

    try{
        let response = await userClient.get(`/users`)
        return response.data
    }
    catch(e){
        console.log(e)
    }
}