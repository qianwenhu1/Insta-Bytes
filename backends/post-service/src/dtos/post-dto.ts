export class PostDTO {
    post_id: number
    user_id: number
    image:string
    caption?:string
    location?:string
    date: bigint
}
