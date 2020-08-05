import { postClient } from "."


export const postGetUserByUserId = async (userId:number) =>{
    try{
        let response = await postClient.get(`/posts/user/made/${userId}`)
        return response.data
    }catch(e){
        console.log(e);
    }
}