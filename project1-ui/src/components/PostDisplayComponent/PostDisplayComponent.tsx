import React, { FunctionComponent, useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Post } from '../../models/Post';
import { Card, Avatar, CardHeader, IconButton, CardMedia, CardContent, Grid, Box, CardActions } from '@material-ui/core';
import { User } from '../../models/User';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { postGetUserByUserId } from '../../remote/posts-api/post-get-user-by-userId';

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


    let oldDate = Number(props.post.date)
    let dateObject = new Date(oldDate)
    const humanDateFormat = dateObject.toLocaleString("en-US", {timeZoneName: "short"})
    const [clicks, changeClick] = useState(0)
    const [favorite, changeFavorite] = useState(<FavoriteBorderIcon color="secondary"/>)
    const [userMadePost, changeUserMadePost] = useState<User>(null)
    useEffect(()=>{

        const getUser = async ()=>{
            let response = await postGetUserByUserId(props.post.userId)
            changeUserMadePost(response)
        }

        if(userMadePost == null){
          getUser()
        }
    })
    const updateFavorite = (event:any) => {
      event.preventDefault()
      changeClick(clicks+1) 
      if (clicks%2 == 0){
        changeFavorite(<FavoriteIcon color="secondary" />)
      }
      else{
        changeFavorite(<FavoriteBorderIcon color="secondary"/>)
      }
    }

    return(
        
          <Grid container direction="column" alignItems="center" justify="center">
            <div className={classes.root}>
          <Grid item xs={8} justify="center">
            {/* <Box m={1} pt={8}> */}
            <Card className={classes.root1}>
            <CardHeader className={classes.header}
            avatar={
              <Avatar src={userMadePost?.image}/>
            }
              title={props.post.location}
              subheader = {humanDateFormat}
          />
          <CardMedia
            className={classes.media}
            image={props.post?.image}
          />

          <CardActions>
            <Box>
              <Typography variant="body2" color="textPrimary" component="p" >{userMadePost?.username}: </Typography>
                 
            </Box>
            <Box >
                <Typography variant="body2" color="textSecondary" component="p" >{props.post.caption} </Typography>
            </Box>
          </CardActions>
          
          
          <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites"> */}
          <IconButton onClick={updateFavorite}>
            {favorite}
          </IconButton>
          {/* </IconButton> */}
          </CardActions>
            </Card>
            {/* </Box> */}
            </Grid>
            </div>
            </Grid>
        
    )
}