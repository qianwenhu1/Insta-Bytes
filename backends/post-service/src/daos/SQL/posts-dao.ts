import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { Post } from "../../models/Post";
import { NewPostInputError } from "../../errors/NewPostInputError";
import { PostDTOtoPostConvertor } from "../../utils/postDTO-to-post-convertor";
import { PostNotFoundError } from "../../errors/PostNotFoundError";
import { logger, errorLogger } from "../../utils/loggers";

export const schema = process.env['LB_SCHEMA'] || 'instabytes_post_service'

export async function getAllPosts():Promise<Post[]>{
    let client:PoolClient;
    try{
        client = await connectionPool.connect()
        let results:QueryResult = await client.query(`select p.post_id, 
        p.user_id , 
        p."image" , 
        p."caption", 
        p."location", 
        p."date"  from ${schema}.posts p`)
        return results.rows.map(PostDTOtoPostConvertor);
    }
    catch(e){
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandeled Error Occured')
    }
    finally{
        client && client.release();
    }
}

export async function getPostsByUserId(id: number):Promise<Post[]>{
    let client:PoolClient;
    try{
        client = await connectionPool.connect()
        let results:QueryResult = await client.query(`select p.post_id, 
        p.user_id , 
        p."image" , 
        p."caption", 
        p."location", 
        p."date"  from ${schema}.posts p
        where p.user_id = $1;`,[id])
        // if(results.rowCount === 0){
        //     throw new Error('No posts')
        // }
        return results.rows.map(PostDTOtoPostConvertor);
    }
    catch(e){
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandeled Error Occured')
    }
    finally{
        client && client.release();
    }
}



export async function getPostById(id: number):Promise<Post>{
    let client:PoolClient;
    try{
        client = await connectionPool.connect()
        let results:QueryResult = await client.query(`select p.post_id, 
        p.user_id , 
        p."image" , 
        p."caption", 
        p."location", 
        p."date"  from ${schema}.posts p
        where p.post_id = $1;`,
        [id])
        if(results.rowCount === 0){
            throw new Error('post Not Found')
        }
        return PostDTOtoPostConvertor(results.rows[0])
    } catch(e){
        if(e.message === 'Post Not Found'){
            throw new PostNotFoundError()
        }
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}

export async function saveNewPost(newPost:Post):Promise<Post>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        await client.query('BEGIN;')

        let results = await client.query(` insert into ${schema}.posts
        ("user_id", "image", "caption", "location", "date")
        values($1,$2,$3,$4,$5) returning "post_id";`, 
        [newPost.userId, newPost.image, newPost.caption, newPost.location, newPost.date])
        
        newPost.postId = results.rows[0].post_id
        await client.query('COMMIT;')
        logger.debug(`Save new post ${newPost}`)
        return newPost

    }catch(e){
        client && client.query('ROLLBACK;')
        if(e.message === 'Role Not Found'){
            throw new NewPostInputError()
        }
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandled Error Occured')
    }finally{
        client && client.release();
    }
}

//Delete Post
export async function deletePost(id: number):Promise<number>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        await client.query('BEGIN;')

        await client.query(`delete from ${schema}.posts p
        where p."post_id" = $1`,
        [id])


        await client.query('COMMIT;')
        //might keep just to verify post is now null
        //console.log(post)
        //returning this id might give an error, we shall see
        return id

    }catch(e){
        client && client.query('ROLLBACK;')
        logger.error(e)
        errorLogger.error(e)
        throw new Error('Unhandled Error Occured')
    }finally{
        client && client.release();
    }
}

//export async function patchPost(post:Post):Promise<Post>{
    //     console.log("in patch")
    //     let client:PoolClient;
    //     try{
    //         client = await connectionPool.connect()
    //         await client.query('BEGIN;')
    
    //         //check if the post to update exists
    //         let postId = await client.query(`select p.post_id from post p 
    //         where p.post_id = $1`, [post.postId])
    
    //         if(postId.rowCount === 0){
    //             throw new Error('Post Not Found.')
    //         }
    //         postId = postId.rows[0].post_id
    //         console.log(postId)
    
    //         if(post.image){
    //             console.log("in the image")
    //             await client.query(`update posts 
    //             set "image" = $1 where post_id = $2;`,[post.image, postId])
    //             //console.log(updateResults.rows[0])
    //         }
    //         if(post.caption){
    //             console.log("in the caption")
    //             await client.query(`update post_reimbursement.posts 
    //             set "caption" = $1 where post_id = $2;`,[post.caption, postId])
    //             //console.log(updateResults.rows[0])
    //         }
    //         if(post.location){
    //             console.log("in the location")
    //             await client.query(`update posts 
    //             set "location" = $1 where post_id = $2;`,[post.location, postId])
    //             //console.log(updateResults.rows[0])
    //         }
    
    //         let results:QueryResult = await client.query(`select p.post_id, 
    //         p.user_id , 
    //         p."image" , 
    //         p."caption", 
    //         p."location", 
    //         p."date"  from posts p
    //         where p.post_id = $1;`,
    //         [postId])
    //         await client.query('COMMIT;')
    //         console.log(results.rows[0])
    //         return PostDTOtoPostConvertor(results.rows[0])
    //     }
    //     catch(e){
    //         client && client.query('ROLLBACK;')
    //         if(e.message === 'Post Not Found'){
    //             throw new PostNotFoundError()
    //         }
    //         if(e.message === 'Role Not Found'){
    //             throw new Error('Rollback Error')
    //         }
    //         console.log(e)
    //         throw new Error('Unhandled Error Occured')
    //     }
    //     finally{
    //         client && client.release()
    //     }
    // }

