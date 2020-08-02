import { postClient } from "."


export const postGetByUserId = async (userId:number) =>{
    try{
        let response = await postClient.get(`/posts/users/${userId}`)
        return response.data
    }catch(e){
        console.log(e);
    }
}