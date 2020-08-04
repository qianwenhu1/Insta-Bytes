import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Post } from '../../models/Post';
import { postDelete } from '../../remote/posts-api/post-delete';
import { toast } from 'react-toastify';
import { Card, CardContent, CardActions, IconButton, CardMedia, CardHeader, Avatar, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// interface IPostDisplayProps{
//     post:Post
// }


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
//     }
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
  paper:{
    backgroundColor:'white' 
}
}));




export const PostByUserDisplayComponent:FunctionComponent<any> = (props)=>{
    let classes = useStyles()
    let oldDate = Number(props.post.date)
    let dateObject = new Date(oldDate)
    const humanDateFormat = dateObject.toLocaleString("en-US", {timeZoneName: "short"})

    const [clicks, changeClick] = useState(0)
    const [favorite, changeFavorite] = useState(<FavoriteBorderIcon color="secondary"/>)

    const updateFavorite = (event:any) => {
      event.preventDefault()
      changeClick(clicks+1) 
      if (clicks%2 == 1){
        changeFavorite(<FavoriteIcon color="secondary" />)
      }
      else{
        changeFavorite(<FavoriteBorderIcon color="secondary"/>)
      }
    }

    const deleteSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        let res = await postDelete(props.post.postId)
        console.log(res)
        toast.success('Deleted')
        props.history.push(`/home`)
        //props.history.push(`/posts/users/${props.post.userId}`)
        //<Redirect to=`/posts/users/${props.post.userId}`/>
    }

    return(
          <Grid container direction="column" alignItems="center" justify="center">
            <div className={classes.root}>
            <Grid item xs={8} justify="center">
            {/* <form autoComplete="off" onSubmit={deleteSubmit}>
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
                    <Button type= 'submit' variant='contained' color='inherit'>Delete</Button>
                </Paper>
            </form> */}
            <Card className={classes.root1}>
            <CardHeader className={classes.header}
            avatar={
              <Avatar/>
            }
              title={props.post.location}
              subheader = {humanDateFormat}
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
          <IconButton onClick={updateFavorite}>
            {favorite}
          </IconButton>
          <IconButton onClick = {deleteSubmit}>
            <DeleteIcon/>
          </IconButton>
          </CardActions>
            </Card>
          </Grid>
          </div>
          </Grid>
    )
}