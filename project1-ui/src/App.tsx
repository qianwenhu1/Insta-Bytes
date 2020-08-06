import React, { useState } from 'react';
import './App.css';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent'
import { LoginComponent } from './components/LoginComponent/LoginComponent'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { User } from './models/User';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent'
import { NewUserComponent } from './components/NewUserComponent/NewUserComponent'
import { EditUserComponent } from './components/EditUserComponent/EditUserComponent'
import { ToastContainer } from 'react-toastify'
import { LogoutComponent } from './components/LogoutComponent/LogoutComponent'
import { HomeComponent } from './components/HomeComponent/HomeComponent';
import { NewPostComponent } from './components/NewPostComponent/NewPostComponent';
import { PostsByUserComponent } from './components/PostsByUserComponent/PostsByUserComponent';
// import PlacesAutocomplete, { geocodeByAddress} from "react-places-autocomplete";

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)
  // const [address, setAddress] = React.useState("")
  
  // const handleSelect = async (value:any) => {
  //   const results = await geocodeByAddress(value);
  //   setAddress(value);
  // };
  return (
    <div className="App">
      
      <Router>
        <NavBarComponent user={currentUser}/>
        <Route exact path="/"><Redirect to="/login"/></Route>
        <Route path='/login' render={(props) => (<LoginComponent changeCurrentUser={changeCurrentUser} {...props}/>)}/>
        <Route path='/home' render={(props) => (<HomeComponent user={currentUser} {...props}/>)} />
        <Route exact path='/posts/users/:userId' render={(props) => (<PostsByUserComponent user={currentUser} {...props}/>)} />
        <Route path='/newpost' render={(props) => (<NewPostComponent user={currentUser} {...props}/>)} />
        <Route exact path='/profile/:userId' component={ProfileComponent} user={currentUser}/>
        <Route path='/new' component={NewUserComponent}/>
        <Route exact path='/profile/edit/:userId' render={(props)=>(<EditUserComponent user={currentUser} {...props}/>)} />
        <Route path='/logout' render={(props) => (<LogoutComponent changeCurrentUser={changeCurrentUser} user={currentUser} {...props}/>)}/>
      </Router>
      <ToastContainer position='bottom-right'/>
    </div>
    // return (
    //   <div>
    //     <PlacesAutocomplete
    //       value={address}
    //       onChange={setAddress}
    //       onSelect={handleSelect}
    //     >
    //       {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    //         <div>
    //           <input {...getInputProps({ placeholder: "Type address" })} />
  
    //           <div>
    //             {loading ? <div>...loading</div> : null}
  
    //             {suggestions.map(suggestion => {
    //               const style = {
    //                 backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
    //               };
  
    //               return (
    //                 <div {...getSuggestionItemProps(suggestion, { style })}>
    //                   {suggestion.description}
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         </div>
    //       )}
    //     </PlacesAutocomplete>
    //   </div>
    );
  }

export default App;
