import { imageBucket } from "."
import { logger, errorLogger } from "../../utils/loggers"


export async function saveProfilePicture(contentType:string, imageBase64Data:string, fileName:string){
    try{

        let newImage = imageBucket.file(fileName)

        await newImage.save(Buffer.from(imageBase64Data, 'base64'),{
           metadata:{
               contentType
           } 
        })
        logger.debug('post file save')
    } catch(e){
        logger.error(e)
        errorLogger.error(e)
        throw e
    }

}