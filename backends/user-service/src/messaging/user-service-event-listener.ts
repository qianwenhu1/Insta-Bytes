import { userSubscription } from ".";
import { logger } from "../utils/loggers";
// import { Message } from "@google-cloud/pubsub";

function onMessage(message){
    try{
        let parsedData = JSON.parse(Buffer.from(message.data, 'base64').toString())
        logger.debug(`Received New Post: ${parsedData}`);
        message.ack()
    }catch(e){
        message.nack()
    }
}
userSubscription.on('message', onMessage)
// userSubscription.on('message', (message)=>{
    
//     try{
//         console.log(Message.attributes)
//         let parsedData = JSON.parse(Buffer.from(message.data, 'base64').toString())
//         console.log(parsedData);
//         message.ack()
//     }catch(e){
//         message.nack()
//     }
// })