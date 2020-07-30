import { HttpError } from './HttpError'

//We may not need this error
export class PostInputError extends HttpError{
    constructor(){
        super(400, 'Please Fill out all Post Fields')
    }
}