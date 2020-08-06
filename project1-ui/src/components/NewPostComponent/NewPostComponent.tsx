import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField, Grid, Box, makeStyles, Paper, Typography } from '@material-ui/core'
import { toast } from 'react-toastify'
import { Post } from '../../models/Post'
import { postSavePost } from '../../remote/posts-api/post-save-post'
import PlacesAutocomplete from 'react-places-autocomplete'

const useStyles = makeStyles((theme) => ({
    paper:{
        width: theme.spacing(60),
        height: theme.spacing(70)
    },
}));


export const NewPostComponent:FunctionComponent<any> = (props) => {
    const classes = useStyles();

    let userId = props.user.userId
    let [image, changeImage] = useState(null)
    let [caption, changeCaption] = useState(null)
    let [location, changeLocation] = useState(null)
    let [date, changeDate] = useState(null)

    const updateCaption = (e:any) => {
        e.preventDefault()
        changeCaption(e.currentTarget.value)
    }

    // const updateLocation = (e:any) => {
    //     e.preventDefault()
    //     changeLocation(e.currentTarget.value)
    // }
    const updateLocation = async (value:any) => {
        changeLocation(value);
    }

    const updateDate= (e:any) => {
        e.preventDefault()
        changeDate(e.currentTarget.value)
    }

    const updateImage = (e:any) => {
        let file = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
            console.log(reader.result)
            changeImage(reader.result)
        }
    }

    const submitPost = async (e:SyntheticEvent)=>{
        e.preventDefault()
        if(!userId){
            toast.error('Please login to make a post')
        }
        else{
            if(image && userId){
                let newPost:Post = {
                    postId:0,
                    userId,
                    image,
                    caption,
                    location,
                    date
                }
                console.log('new post component')
                console.log(newPost)
                let res = await postSavePost(newPost) 
                console.log(res)
                toast.success('Created')
                props.history.push('/home')
            }
            else{
                toast.error('Please Fill Out All Post Information')
            }
            
        }
    }

    const goBack = async (e:any) => {
        props.history.push('/home')
    }     

    return(
        <div>
            <Grid container direction="column" justify="flex-start" alignItems="center">
            
            <Box m={1} pt={2}>
            <Paper className={classes.paper} elevation={10}>
            <form onSubmit={submitPost}>
                <Box m={2} pt={2}>
                <Typography variant='h4'>Make a Post</Typography>
                </Box>
                <Grid container direction="column" alignItems="center">
                <Grid item xs={3}>
                {/* <label htmlFor='file'>Picture: </label> */}
                <Box m={1} pt={1}>
                <input type='file' name='file' accept='image/*' onChange={updateImage}/>
                </Box>
                {/* <img src={image}/> */}
                </Grid>
                {/* </Grid>
                <Grid container direction="column" alignItems="flex-end"> */}
                <Grid item xs={8}>
                <Box m={1} pt={1}>
                {/* <TextField id="standard-basic" label="Caption" value={caption} onChange={updateCaption}/> */}
                <TextField id="outlined-basic" label="Caption" variant="outlined" value={caption} onChange={updateCaption}/>
                </Box>
                </Grid> 
                <Grid item xs={8}>
                {/* <Box m={1} pt={1}>
                <TextField id="standard-basic" label="Location" value={location} onChange={updateLocation}/>
                </Box> */}
                <Box m={1} >
                <PlacesAutocomplete
                value={location}
                onChange={changeLocation}
                onSelect={updateLocation}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                    <TextField {...getInputProps({ placeholder: "Location" })} />
        
                    <div>
                        {loading ? <div>...loading</div> : null}
        
                        {suggestions.map(suggestion => {
                        const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                        };
        
                        return (
                            <div {...getSuggestionItemProps(suggestion, { style })}>
                            {suggestion.description}
                            </div>
                        );
                        })}
                    </div>
                    </div>
                )}
                </PlacesAutocomplete>
                </Box>
                </Grid>
                </Grid>
                
                <Grid item xs={12}>
                <Box m = {2} pt= {2} pr={2}>
                <Button variant="contained" onClick={goBack} style={{margin: "6px"}}>Cancel</Button>
                <Button variant="contained" type="submit" style={{margin: "6px", background: '#4dd0e1'}}>Submit</Button>
                </Box>
                </Grid>
                
            </form>
            </Paper>
            </Box>
            </Grid>
        </div>
    )
}