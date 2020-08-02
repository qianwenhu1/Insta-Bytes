import React, { FunctionComponent } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Post } from '../../models/Post';
import { Card, Avatar, CardHeader, IconButton, CardMedia, CardContent, Grid, Box, CardActions } from '@material-ui/core';
import { User } from '../../models/User';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface IPostDisplayProps{
    post:Post
}


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       '& > *': {
//         margin: theme.spacing(5),
//         width: theme.spacing(40),
//         height: theme.spacing(30),
//       },
//     },
//     paper:{
//         backgroundColor:'white'
//         // width: 300,
//         // margin:'auto'
//     },
//     // media: {
//     //   height: 550,
//     //   width: '100%'
//     // }
//   }),
// );

const useStyles = makeStyles((theme) => ({
  root1: {
    maxWidth: 400,
  },
  root: {
          display: 'flex',
          flexWrap: 'wrap',
          '& > *': {
            margin: theme.spacing(5),
            width: theme.spacing(70),
            height: theme.spacing(52),
          },
        style: { justifyContent:'center' }
        },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    width: '100%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  header:{
    background: '#4dd0e1'
  },
  buttons:{
    background: '#4dd0e1'
  },
}));


export const PostDisplayComponent:FunctionComponent<IPostDisplayProps> = (props)=>{
    let classes = useStyles()

    // let date = new Date(tostring({props.post.date}))
    //console.log(typeof(`{props.post.date}`))
    let oldDate = Number(props.post.date)
    let date = new Date(oldDate)
    console.log(date)

    // let date = formatDate(({props.post.date}) => ({
      
    // })

    return(
        
          <Grid container direction="column" alignItems="center" justify="center">
            <div className={classes.root}>
          <Grid item xs={8} justify="center">
            {/* <Box m={1} pt={8}> */}
            <Card className={classes.root1}>
            <CardHeader className={classes.header}
            avatar={
              <Avatar/>
            }
              title={props.post.location}
              subheader = {props.post.date}
          />
          <CardMedia
            className={classes.media}
            image={props.post?.image}
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
            {props.post.caption}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          </CardActions>
            {/* <Typography variant='body1'>
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
                </Typography> */}
                {/* <img src={props.post?.image}/> */}
            </Card>
            {/* </Box> */}
            </Grid>
            </div>
            </Grid>
        
    )
}