import { Response, NextFunction } from "express"


export function authorizationMiddleware(roles:string[]){
    return(req:any, res:Response, next:NextFunction) => {
        let allowed = false
        for(const role of roles){
            if(req.user.role === role){
                allowed = true
                next()
            }
        }
        if(!allowed){
            res.status(401).send('The incoming token has expired')
        }
    }
}