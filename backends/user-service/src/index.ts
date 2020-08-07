import express, { Request, Response, NextFunction } from 'express'
import { userRouter } from './routers/user-router'
import { loggingMiddleware } from './middleware/logging-middleware'
import { BadCredentialsError } from './errors/BadCredentialsError'
import { getUsernameAndPassword } from './daos/SQL/users-dao'
import { corsFilter } from './middleware/cors-filter'
import { NewUserInputError } from './errors/NewUserInputError'
import { User } from './models/User'
import { saveNewUserService } from './services/user-service'
import './event-listeners/new-user'
import './messaging/index'
import { NoUserToLogoutError } from './errors/NoUserToLogoutError'
import jwt from 'jsonwebtoken'
import { JWTVerifyMiddleware } from './middleware/jwt-verify-middleware'
import { logger, errorLogger } from './utils/loggers'

const basePath = process.env['LB_BASE_PATH'] || ''

const app = express()

app.use(express.json({limit:'50mb'}))

app.use(loggingMiddleware);
app.use(corsFilter);
app.use(JWTVerifyMiddleware)

const basePathRouter = express.Router()

app.use(basePath, basePathRouter)

basePathRouter.use('/users', userRouter);


app.get('/health', (req:Request,res:Response)=>{
    res.sendStatus(200)
})

basePathRouter.post('/signUp', async (req:Request, res:Response, next:NextFunction) => {
    let {username,
        password,
        firstName,
        lastName,
        email, 
        image,
        favoriteFood,
        city} = req.body;
        
        if(!username|| !password || !firstName || !lastName || !email || !image || !favoriteFood || !city){
            next(new NewUserInputError)
        }
        else{
            let newUser: User = {
                userId: 0,
                username,
                password,
                firstName,
                lastName,
                email,
                role: null, 
                image,
                favoriteFood,
                city}
            try{
                let savedUser = await saveNewUserService(newUser)
                res.status(201).send("Created")
                res.json(savedUser)
            } catch (e){
                next(e)
            }   
        }
})

basePathRouter.post('/login', async (req:any, res:Response, next:NextFunction) =>{
    let username = req.body.username
    let password = req.body.password

    if(!username || !password){
        next(new BadCredentialsError())
    } else {
        try{
            let user = await getUsernameAndPassword(username, password)
            let token = jwt.sign(user, 'SecretKey', {expiresIn: '1h'})//THE SECRET should be in an env var
            res.header('Authorization', `Bearer ${token}`)
            req.user = user
            res.json(user)
        }
        catch(e){
            next(e)
        }
    }
})

basePathRouter.delete('/logout', async (req:any, res:Response, next:NextFunction) => {
    if (!req.user){
        next(new NoUserToLogoutError())
    }
    else {
        try{
            req.user = null
            res.json(req.user)
        }
        catch(e){
            next(e)
        }
    }
})

//app.use(authenticationMiddleware);

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

app.listen(2006, ()=>{
    logger.info('Server has started');
})

