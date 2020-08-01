import {Storage} from '@google-cloud/storage'

export const bucketName = 'insta-bytes-bucket'

export const bucketBaseUrl = `https://storage.googleapis.com/${bucketName}`

export const imageBucket = new Storage().bucket(bucketName)