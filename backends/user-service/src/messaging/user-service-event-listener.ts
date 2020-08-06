import { userSubscription } from ".";



userSubscription.on('message', (message)=>{
    
    try{
        let parsedData = JSON.parse(Buffer.from(message.data, 'base64').toString())
        console.log(parsedData);
        message.ack()
    }catch(e){
        message.nack()
    }
})