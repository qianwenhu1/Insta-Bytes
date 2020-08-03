import express, { Request, Response, NextFunction} from 'express'
import { PostIdInputError } from '../errors/PostIdInputError';
import { Post } from '../models/Post';
import { NewPostInputError } from '../errors/NewPostInputError';
import { getAllPostsService, getPostByIDService, saveNewPostService, deletePostService, getPostByUserIDService } from '../services/post-service';

export let postRouter = express.Router()

//Is this needed?
//postRouter.use(authenticationMiddleware);

postRouter.get('/', async (req:Request, res:Response, next:NextFunction) => {
    try{
        let allPosts = await getAllPostsService()
        res.json(allPosts)
    }
    catch(e){
        next(e)
    }
})

postRouter.get('/users/:id', async (req:any, res:Response, next:NextFunction) => {
    let {id} = req.params;
    if(isNaN(+id)){
        next(new PostIdInputError)
    }
    else{
        try{
            let post = await getPostByUserIDService(+id)
            res.json(post)
        } catch (e){
            next(e)
        }
    }
})


postRouter.get('/:id', async (req:any, res:Response, next:NextFunction) => {
    let {id} = req.params;
    if(isNaN(+id)){
        next(new PostIdInputError)
    }
    // else if(req.user.role === "user" && req.user.userId !== +id){
    //     next(new UnauthorizedEndPointError)
    // }
    else{
        try{
            let post = await getPostByIDService(+id)
            res.json(post)
        } catch (e){
            next(e)
        }
    }
})

postRouter.post('/create', async (req:Request, res:Response, next:NextFunction) => {
    
    let {
        userId,
        image,
        caption,
        location} = req.body;
        if(!userId|| !image){
            next(new NewPostInputError)
        }
        else{
            let newPost: Post={
                postId: 0,
                userId,
                image,
                caption,
                location,
                date: BigInt(Date.now())}
            try{
                let savedPost = await saveNewPostService(newPost)
                res.status(201).send("Created")
                res.json(savedPost)
            } catch (e){
                next(e)
            }   
        }
})

postRouter.delete('/:id', async (req:any, res:Response, next:NextFunction) => {
    let {id} = req.params;
    if(isNaN(+id)){
        next(new PostIdInputError)
    }
    else{
        try{
            await deletePostService(+id)
            res.json(req.postId)
        } catch (e){
            next(e)
        }
    }
})

//postRouter.patch('/', async (req:Request, res:Response, next:NextFunction) => {
    //     let id = req.body.userId;
    //     console.log(req.body);
    //     console.log(id)
    //     if(isNaN(+id)){
    //         next(new PostIdInputError)
    //     }
    //     else{
    //         let post: Post = {
    //             postId: id,
    //             userId: req.body.userId,
    //             image: req.body.image,
    //             caption: req.body.caption,
    //             location: req.body.location,
    //             date: req.body.date
    //         }
    //         console.log("in the router, just set the post")
    //         console.log(post.postId)
    //         console.log(post.userId)
    //         try{
    //             let updatedPost = await patchUserService(post)
    //             res.json(updatedPost)
    //         } catch (e){
    //             next(e)
    //         } 
    //     }
    // })