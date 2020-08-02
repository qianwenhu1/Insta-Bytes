import { FunctionComponent, SyntheticEvent } from 'react';
import {Link} from 'react-router-dom'
import React from 'react';
import { Box, Button } from '@material-ui/core';
import { AllPostsComponent } from '../AllPostsComponent/AllPostsComponent';
import AddCircleIcon from '@material-ui/icons/AddCircle';



export const HomeComponent:FunctionComponent<any> = (props) => {
    const ProfileSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        props.history.push(`/profile/${(props.user)?props.user.userId : '0' }`)         
    }
    const MyPostSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        props.history.push(`/posts/users/${props.user.userId}`)         
    }
    return(
        <div>
            {/* <Link to='/newpost'>Make a post</Link> */}
            <h2>Share your bites! <Link to='/newpost'><AddCircleIcon style={{fill:'#4dd0e1'}}/></Link></h2>
            {/* <form autoComplete="off" onSubmit={ProfileSubmit}>
                <Box m={1} pt={1}>
                    <Button type="submit" variant="contained"  style={{ background: '#4dd0e1' }}>Profile</Button>
                </Box>
            </form>
            <form autoComplete="off" onSubmit={MyPostSubmit}>
                <Box m={1} pt={1}>
                    <Button type="submit" variant="contained"  style={{ background: '#4dd0e1' }}>My Posts</Button>
                </Box>
            </form> */}
            <AllPostsComponent/>
        </div>
    );
}