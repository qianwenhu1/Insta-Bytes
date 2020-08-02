import { postClient } from "."


export const postGetAllPost = async () =>{
    try{
        let response = await postClient.get('/posts')
        return response.data
    }catch(e){
        console.log(e);
    }
}