import express, { Request, Response, NextFunction} from 'express'
import { UserIdInputError } from '../errors/UserIdInputError'
import { User } from '../models/User'
import { authenticationMiddleware } from '../middleware/authentication-middleware'
//import { UnauthorizedEndPointError } from '../errors/UnathorizedEndPointError'
import { getAllUsersService, getUserByIDService, patchUserService } from '../services/user-service'
import { logger } from '../utils/loggers'

export let userRouter = express.Router()

userRouter.use(authenticationMiddleware);

userRouter.get('/', async (req:Request, res:Response, next:NextFunction) => {
    try{
        let allUsers = await getAllUsersService()
        res.json(allUsers)
    }
    catch(e){
        next(e)
    }
})

userRouter.get('/:id', async (req:any, res:Response, next:NextFunction) => {
    let {id} = req.params;
    if(isNaN(+id)){
        next(new UserIdInputError)
    }
    // else if(req.user.role === "user" && req.user.userId !== +id){
    //     next(new UnauthorizedEndPointError)
    // }
    else{
        try{
            let user = await getUserByIDService(+id)
            res.json(user)
        } catch (e){
            next(e)
        }
    }
})

userRouter.patch('/', async (req:Request, res:Response, next:NextFunction) => {
    let id = req.body.userId;
    logger.debug(`Modify User Id ${id} profile`)
    if(isNaN(+id)){
        next(new UserIdInputError)
    }
    else{
        let user: User = {
            userId: id,
            username: req.body.username, 
            password: req.body.password, 
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email,
            role: req.body.role,
            image:req.body.image,
            favoriteFood:req.body.favoriteFood,
            city:req.body.city

        }

        try{
            let updatedUser = await patchUserService(user)
            res.json(updatedUser)
        } catch (e){
            next(e)
        } 
    }
})

 
