import { FunctionComponent } from 'react';
import {Link} from 'react-router-dom'
import React from 'react';




export const HomeComponent:FunctionComponent<any> = (props) => {
    
    return(
        <Link to='/newpost'>Make a post</Link>
    )
}