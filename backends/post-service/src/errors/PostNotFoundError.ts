import { HttpError } from './HttpError'

export class PostNotFoundError extends HttpError{
    constructor(){
        super(404, 'That Post Does Not Exist')
    }
}