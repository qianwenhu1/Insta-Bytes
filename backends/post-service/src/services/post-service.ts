import { Post } from "../models/Post"
import { bucketBaseUrl } from "../daos/Cloud-Storage"
import { saveNewPost, getAllPosts, getPostById, deletePost, getPostsByUserId } from "../daos/SQL/posts-dao"
import { savePostPicture } from "../daos/Cloud-Storage/user-posts";
import { logger, errorLogger } from "../utils/loggers";

export async function getAllPostsService():Promise<Post[]>{
    return await getAllPosts()
}

export async function getPostByUserIDService(id:number):Promise<Post[]>{
    return await getPostsByUserId(id)
}

export async function getPostByIDService(id:number):Promise<Post>{
    return await getPostById(id)
}

export async function saveNewPostService(newPost:Post):Promise<Post>{
    try{

    let base64Image = newPost.image
    let [dataType, imageBase64Data] = base64Image.split(';base64,')
    let contentType = dataType.split('/').pop()

    if(newPost.image){
        newPost.image = `${bucketBaseUrl}/posts/${newPost.userId}/${newPost.date}/new_post.${contentType}`
    }

    let savedUser = await saveNewPost(newPost)

    await savePostPicture(contentType, imageBase64Data, `posts/${newPost.userId}/${newPost.date}/new_post.${contentType}`)
    // expressEventEmitter.emit(customExpressEvents.NEW_USER, newUser)
    return savedUser
} catch(e){
    // logger.error(e)
    // errorLogger.error(e)
    logger.error(e)
    errorLogger.error(e)
    throw e
}

}

export async function deletePostService(id:number):Promise<number>{
    return await deletePost(id)
}
