import { PubSub } from '@google-cloud/pubsub'

const pubSubClient = new PubSub()

export const userTopic = pubSubClient.topic('projects/pacific-destiny-281218/topics/user-service')

export const userSubscription = pubSubClient.subscription('projects/pacific-destiny-281218/subscriptions/user-service-subscription')