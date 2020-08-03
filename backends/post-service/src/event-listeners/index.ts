import { EventEmitter } from 'events'

export const expressEventEmitter = new EventEmitter()

export const customExpressEvents = {
    NEW_POST: 'NEW_POST'
}