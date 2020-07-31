import { HttpError } from './HttpError'

export class NewPostInputError extends HttpError{
    constructor(){
        super(400, "Missing Post Arguments.")
    }
}