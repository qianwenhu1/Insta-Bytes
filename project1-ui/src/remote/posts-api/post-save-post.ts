import { Post } from "../../models/Post"
import { postClient } from "."


export const postSavePost = async (newPost:Post) => {

    try{
        let response = await postClient.post('/posts/create', newPost)
        console.log('in post-save-post')
        console.log(response)
        console.log(response.data)
        return response.data
    } catch(e){
        console.log(e)
    }
}