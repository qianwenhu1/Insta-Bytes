import React, { FunctionComponent } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Post } from '../../models/Post';

interface IPostDisplayProps{
    post:Post
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(5),
        width: theme.spacing(40),
        height: theme.spacing(30),
      },
    },
    paper:{
        backgroundColor:'white'
        // width: 300,
        // margin:'auto'
    },
    // media: {
    //   height: 550,
    //   width: '100%'
    // }
  }),
);




export const PostDisplayComponent:FunctionComponent<IPostDisplayProps> = (props)=>{
    let classes = useStyles()
    return(
        <div className={classes.root}>
            <Paper className={classes.paper}elevation={4}>
            <Typography variant='body1'>
                   User Id : {props.post.userId}
                </Typography>
                <Typography variant='body1'>
                   Caption : {props.post.caption}
                </Typography>
                <Typography variant='body1'>
                   Location : {props.post.location}
                </Typography>
                <Typography variant='body1'>
                   Date : {props.post.date}
                </Typography>
                <img src={props.post?.image}/>
            </Paper>
        </div>
    )
}