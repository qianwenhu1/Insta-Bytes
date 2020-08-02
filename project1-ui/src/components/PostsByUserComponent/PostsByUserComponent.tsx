import { Post } from '../../models/Post'
import { FunctionComponent, useState, useEffect } from 'react'
import { postGetByUserId } from '../../remote/posts-api/post-get-by-userId'
import { PostByUserDisplayComponent } from '../PostByUserDisplayComponent/PostByUserDisplayComponent'
import React from 'react'
import { Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'


export const PostsByUserComponent:FunctionComponent<any> = (props) => {

    let [allPosts, changeAllPosts] = useState<Post[]>([])
    useEffect(()=>{

        const getPosts = async ()=>{
            let response = await postGetByUserId(props.user.userId)
            changeAllPosts(response)
        }

        if(allPosts.length === 0){
            getPosts()
        }
    })

    let postDisplays = allPosts.map((post)=>{
        // react agressively suggests you give them unqie keys so it can tell them apart
        return <PostByUserDisplayComponent key={'post-key-' + post.postId} post={post} {...props}/>
        
    })
    
    console.log(typeof(postDisplays))
    console.log(postDisplays.length)

    if(postDisplays.length === 0){
        return(
            <div>
                <h2> You have no posts to display :(</h2>
                <Typography>Click <Link to='/newpost'>here</Link> to make a post.</Typography>
            </div>
        )
    }
    else{
        return(
            <div>
                {postDisplays}
            </div>
        )
    }
}