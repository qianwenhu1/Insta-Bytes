import { logger, errorLogger } from "../../utils/loggers";
import { userServiceClient } from ".";


export const userServiceGetUserById = async (userId:number, token:string) => {
    try{
        let res = await userServiceClient.get(`/users/${userId}`, {
            headers:{
                'Authorization': token
            }
        })
        return res.data
    }catch(e){
        logger.error(e)
        errorLogger.error(e)
    }
}