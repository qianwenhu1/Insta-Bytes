import { expressEventEmitter, customExpressEvents } from "../event-listeners"
import { User } from "../models/User"
import { userTopic } from "../messaging"
import { logger, errorLogger } from "../utils/loggers"

expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User)=>{
    setImmediate( async ()=>{
        try{
            let res = await userTopic.publishJSON(newUser)
            logger.debug(`Pub Sub message id: ${res}`)
        } catch(e) {
            logger.error(e)
            errorLogger.error(e)
        }
    })
})