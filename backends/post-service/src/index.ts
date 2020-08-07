import express, { Request, Response } from 'express'
import { JWTVerifyMiddleware } from './middleware/jwt-verify-middleware'
import { loggingMiddleware } from './middleware/logging-middleware'
import { corsFilter } from './middleware/cors-filter'
import { postRouter } from './routers/post-router'
import { logger, errorLogger } from './utils/loggers'
import './event-listeners/new-post'

const basePath = process.env['LB_BASE_PATH'] || ''

const app = express()

app.use(express.json({limit:'50mb'}))

app.use(loggingMiddleware);
app.use(corsFilter);
app.use(JWTVerifyMiddleware)

const basePathRouter = express.Router()

app.use(basePath, basePathRouter)

basePathRouter.use('/posts', postRouter);


app.get('/health', (req:Request,res:Response)=>{
    res.sendStatus(200)
})

// app.post('/create', async (req:Request, res:Response, next:NextFunction) => {
//     let {
//         userId,
//         image,
//         caption,
//         location,
//         date} = req.body;
        
//         if(!userId|| !image || !date){
//             next(new NewPostInputError)
//         }
//         else{
//             console.log("in the else")
//             let newPost: Post = {
//                 postId: 0,
//                 userId,
//                 image,
//                 caption,
//                 location,
//                 date}
//             try{
//                 let savedPost = await saveNewPost(newPost)
//                 res.status(201).send("Created")
//                 res.json(savedPost)
//             } catch (e){
//                 next(e)
//             }   
//         }
// })

app.use((err, req, res, next) => {
    if(err.statusCode){
        logger.debug(err)
        res.status(err.statusCode).send(err.message)
    }
    else{
        logger.error(err)
        errorLogger.error(err)  //print out to both location
        res.status(500).send("something went wrong")
    }
})

// app.listen(2007, ()=>{
app.listen(2007, ()=>{
    logger.info('Server has started');
})