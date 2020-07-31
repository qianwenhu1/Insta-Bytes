import { expressEventEmitter, customExpressEvents } from "../event-listeners"
import { User } from "../models/Post"
import { userTopic } from "../messaging"

expressEventEmitter.on(customExpressEvents.NEW_POST, (newPost:Post)=>{
    setImmediate( async ()=>{
        try{
            let res = await userTopic.publishJSON(newPost)
            console.log(res)
        } catch(e) {
            console.log(e)
        }
    })
})