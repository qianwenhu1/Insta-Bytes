import { postClient } from "."


export const postDelete = async (userId:number) =>{
    try{
        let response = await postClient.delete(`/posts/${userId}`)
        console.log(response)
        return response.data
    } catch(e){
        console.log(e)
    }
}