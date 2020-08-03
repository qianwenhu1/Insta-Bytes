import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/loggers";

export function loggingMiddleware(req:Request,res:Response,next:NextFunction){
    logger.debug( ` ${req.method} Request from ${req.ip} to ${req.path} `)
    next()
}