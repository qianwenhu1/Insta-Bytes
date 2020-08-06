import React, { FunctionComponent, SyntheticEvent, useState } from 'react'
import { Button, TextField, Grid, Box, makeStyles, Typography, Paper } from '@material-ui/core'
import { User } from '../../models/User'
import { userUpdateUser } from '../../remote/users-api/user-update-user'
import { RouteComponentProps } from 'react-router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import PlacesAutocomplete, { geocodeByAddress} from "react-places-autocomplete";

interface IUserDisplayProps extends RouteComponentProps{
    user:User
}

const useStyles = makeStyles((theme) => ({
    paper:{
        width: theme.spacing(43),
        height: theme.spacing(100)
    },
}));


export const EditUserComponent:FunctionComponent<any> = (props) => {
    const classes = useStyles();
    let currUserId = props.user.userId
    
    let [username, changeUsername] = useState('')
    let [password, changePassword] = useState('')
    let [confirmPassword, changeConfirmPassword] = useState('')
    let [firstName, changeFirstName] = useState('')
    let [lastName, changeLastName] = useState('')
    let [favoriteFood, changeFavoriteFood] = useState('')
    let [city, changeCity] = useState('')
    let [email, changeEmail] = useState('')
    let [image, changeImage] = useState(null)
    //let [address, setAddress] = React.useState("")
  
    const updateCity = async (value:any) => {
        changeCity(value);
    }

    const updateUsername = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeUsername(e.currentTarget.value)
        }
        else{
            changeUsername(props.user.username)
        }
    }

    const updatePassword = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changePassword(e.currentTarget.value)
        }
        else{
            changePassword(props.user.password)
        }
    }

    const updateConfirmPassword= (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeConfirmPassword(e.currentTarget.value)
        }
        else{
            changeConfirmPassword(props.user.password)
        }
    }

    const updateFirstName = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeFirstName(e.currentTarget.value)
        }
        else{
            changeFirstName(props.user.firstName)
        }
    }

    const updateLastName = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeLastName(e.currentTarget.value)
        }
        else{
            changeLastName(props.user.lastName)
        }
    }

    const updateFavoriteFood = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeFavoriteFood(e.currentTarget.value)
        }
        else{
            changeFavoriteFood(props.user.favoriteFood)
        }
    }

    // const updateCity = (e:any) => {
    //     e.preventDefault()
    //     if(e.currentTarget.value !== undefined){
    //         changeCity(e.currentTarget.value)
    //     }
    //     else{
    //         changeCity(props.user.city)
    //     }
    // }

    const updateEmail = (e:any) => {
        e.preventDefault()
        if(e.currentTarget.value !== undefined){
            changeEmail(e.currentTarget.value)
        }
        else{
            changeEmail(props.user.email)
        }
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

    const updateUser = async (e:SyntheticEvent)=>{
        e.preventDefault()
        if(password !== confirmPassword){
           toast.error('Passwords Do Not Match')
        }
        else{
            let updateUser:User = {
                userId:currUserId,
                username,
                password,
                firstName,
                lastName,
                email,
                favoriteFood,
                city,
                role:{
                    roleId:3,
                    role:"user"
                },
                image}

        console.log('update user component')
        console.log(updateUser)
        let res = await userUpdateUser(updateUser) 
        console.log(res)
        props.history.push(`/profile/${res.userId}`)
        }
        
    }

    const goBack = async (e:any) => {
        props.history.push(`/profile/${props.user.userId}`)
    }
        
    return(
        <div>
            <Grid container direction="column" justify="flex-start" alignItems="center">
            <Box m={1} pt={2}>
            <Paper className={classes.paper} elevation={10}>

                    
            {/* <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                <input {...getInputProps({ placeholder: "Type address" })} />
    
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
            </PlacesAutocomplete> */}
            <form onSubmit={updateUser}>
                
                <Box m={2} pt={2}>
                <Typography variant='h4'>Edit Info</Typography>
                </Box>
                <label htmlFor='file'>Profile Picture: </label>
                <input type='file' name='file' accept='image/*' onChange={updateImage}/>
                <Box m={1} pt={1}>
                <TextField id="standard-basic" label="Username" value={username} onChange={updateUsername}/>
                <TextField id="standard-basic" type="password" label="Password" value={password} onChange={updatePassword}/>
                <TextField id="standard-basic" type="password" label="Confirm Password" value={confirmPassword} onChange={updateConfirmPassword}/>
                {/* </Box> */}
                {/* <Box m={1} pt={2}> */}
                <TextField id="standard-basic" label="First Name" value={firstName} onChange={updateFirstName}/>
                <TextField id="standard-basic" label="Last Name" value={lastName} onChange={updateLastName}/>              
                <TextField id="standard-basic" type="email" label="Email" value={email} onChange={updateEmail}/>
                {/* </Box> 
                <Box m={1} pt={2}> */}
                <TextField id="standard-basic" label="Favorite Food" value={favoriteFood} onChange={updateFavoriteFood}/>   
                {/* <TextField id="standard-basic" label="City" value={city} onChange={updateCity}/> */}
                </Box>
                
                {/* <img src={image}/> */}
                <Box m={1} >
                <PlacesAutocomplete
                value={city}
                onChange={changeCity}
                onSelect={updateCity}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                    <TextField {...getInputProps({ placeholder: "City" })} />
        
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
                <Grid item xs={12}>
                <Box m = {2} pt= {2} pr={2}>

                <Button variant="contained" onClick={goBack} style={{margin: "6px"}}>Cancel</Button>

                <Button variant="contained" type="submit" style={{margin: "6px", background: '#4dd0e1' }}>Submit</Button>
    
                </Box>
                </Grid>
            </form>
            </Paper>
            </Box>
            </Grid>
            {/* < ToastContainer/> */}
        </div>
    )
}