import { HttpError } from './HttpError'

export class PostIdInputError extends HttpError{
    constructor(){
        super(400, "Id must be a number")
    }
}