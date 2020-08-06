import { PubSub } from '@google-cloud/pubsub'

const pubSubClient = new PubSub()

export const postTopic = pubSubClient.topic('projects/pacific-destiny-281218/topics/post-service')