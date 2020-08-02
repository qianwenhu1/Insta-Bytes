import { FunctionComponent, SyntheticEvent } from 'react';
import {Link} from 'react-router-dom'
import React from 'react';
import { Box, Button } from '@material-ui/core';




export const HomeComponent:FunctionComponent<any> = (props) => {
    const loginSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        props.history.push(`/profile/${(props.user)?props.user.userId : '0' }`)         
    }

    return(
        <div>
            <Link to='/newpost'>Make a post</Link>
            <form autoComplete="off" onSubmit={loginSubmit}>
                
                    <Box m={1} pt={1}>
                        <Button type="submit" variant="contained"  style={{ background: '#4dd0e1' }}>Profile</Button>
                    </Box>
            </form>
        </div>
    );
}