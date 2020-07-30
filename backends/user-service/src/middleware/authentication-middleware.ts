import { Response, NextFunction } from "express";

export function authenticationMiddleware(req:any, res:Response, next:NextFunction){
    if(!req.user) {
        res.status(401).send("Please Login")
    }
    else{
        console.log(`user ${req.user.username} has a role of ${req.user.role}`);
        next()
    }
}