import express, { Request, Response, NextFunction} from 'express'
import { getAllPosts, getPostById } from '../daos/SQL/posts-dao';
import { PostIdInputError } from '../errors/PostIdInputError';
import { Post } from '../models/post';
import { patchUserService } from '../services/user-service';

export let postRouter = express.Router()

//Is this needed?
//postRouter.use(authenticationMiddleware);

postRouter.get('/', async (req:Request, res:Response, next:NextFunction) => {
    try{
        let allPosts = await getAllPosts()
        res.json(allPosts)
    }
    catch(e){
        next(e)
    }
})

postRouter.get('/:id', async (req:any, res:Response, next:NextFunction) => {
    let {id} = req.params;
    if(isNaN(+id)){
        next(new PostIdInputError)
    }
    /*else if(req.user.role === "user" && req.user.userId !== +id){
        next(new UnauthorizedEndPointError)
    }*/
    else{
        try{
            let post = await getPostById(+id)
            res.json(post)
        } catch (e){
            next(e)
        }
    }
})

postRouter.patch('/', async (req:Request, res:Response, next:NextFunction) => {
    let id = req.body.userId;
    console.log(req.body);
    console.log(id)
    if(isNaN(+id)){
        next(new PostIdInputError)
    }
    else{
        let post: Post = {
            postId: id,
            userId: req.body.userId,
            image: req.body.image,
            caption: req.body.caption,
            location: req.body.location,
            date: req.body.date
        }
        console.log("in the router, just set the post")
        console.log(post.postId)
        console.log(post.userId)
        try{
            let updatedPost = await patchUserService(post)
            res.json(updatedPost)
        } catch (e){
            next(e)
        } 
    }
})