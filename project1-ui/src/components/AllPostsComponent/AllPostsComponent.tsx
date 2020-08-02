import { Post } from '../../models/Post'
import { postGetAllPost } from '../../remote/posts-api/post-get-all-post'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { PostDisplayComponent } from '../PostDisplayComponent/PostDisplayComponent'


export const AllPostsComponent:FunctionComponent<any> = (props) => {

    let [allPosts, changeAllPosts] = useState<Post[]>([])
    useEffect(()=>{

        const getPosts = async ()=>{
            let response = await postGetAllPost()
            changeAllPosts(response)
        }

        if(allPosts.length === 0){
            getPosts()
        }
    })

    let postDisplays = allPosts.map((post)=>{
        // react agressively suggests you give them unqie keys so it can tell them apart
        return <PostDisplayComponent key={'post-key-' + post.postId} post={post}/>
    })

    return(
        <div>
            {postDisplays}
        </div>
    )
}