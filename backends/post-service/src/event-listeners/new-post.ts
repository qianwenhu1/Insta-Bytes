import { expressEventEmitter, customExpressEvents } from "../event-listeners"
import {  Post } from "../models/Post"
import { postTopic } from "../messaging"
import { logger, errorLogger } from "../utils/loggers"

expressEventEmitter.on(customExpressEvents.NEW_POST, (newPost:Post)=>{
    setImmediate( async ()=>{
        try{
            newPost.date=null
            let res = await postTopic.publishJSON(newPost)

            console.log(`Pub Sub message id: ${res}`)
            logger.debug(`Pub Sub message id: ${res}`)
        } catch(e) {
            logger.error(e)
            errorLogger.error(e)
        }
    })
})