import { Response, NextFunction} from "express";
import jwt from 'jsonwebtoken'


export const JWTVerifyMiddleware = (req: any, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization?.split(' ').pop()//turn the string Bearer token -> token
        if(token){
            req.user = jwt.verify(token, 'SecretKey')
        }
        next()
    } catch (e) {
        console.log(e);
        next(e)
    }
}