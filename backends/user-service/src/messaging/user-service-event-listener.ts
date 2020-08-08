import { userSubscription } from ".";
import { logger } from "../utils/loggers";
// import { Message } from "@google-cloud/pubsub";



function onMessage(message){
    try{
        let parsedData = JSON.parse(Buffer.from(message.data, 'base64').toString())
        logger.debug(`Received New Post: ${parsedData}`);
        message.ack()
    }
    catch(e){
        message.nack()
    }
}
    
userSubscription.on('message', onMessage)