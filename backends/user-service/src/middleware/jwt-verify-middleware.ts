import { Response, NextFunction} from "express";
import jwt from 'jsonwebtoken'
import { logger, errorLogger } from "../utils/loggers";


export const JWTVerifyMiddleware = (req: any, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization?.split(' ').pop()//turn the string Bearer token -> token
        if(token){
            req.user = jwt.verify(token, 'SecretKey')
        }
        next()
    } catch (e) {
        logger.error(e)
        errorLogger.error(e)
        next(e)
    }
}