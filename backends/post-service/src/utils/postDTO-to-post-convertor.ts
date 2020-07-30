import { PostDTO } from "../dtos/post-dto";
import { Post } from "../models/Post";

export function PostDTOtoPostConvertor(pdto:PostDTO):Post{
    return {
        postId:pdto.post_id,
        userId:pdto.user_id,
        image:pdto.image,
        caption:pdto.caption,
        location:pdto.location,
        date:pdto.date
    }
}