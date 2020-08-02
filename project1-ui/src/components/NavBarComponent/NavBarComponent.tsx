import React, { FunctionComponent } from 'react';
import { AppBar, Toolbar, Button, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link, RouteComponentProps} from 'react-router-dom';
import { User } from '../../models/User';
import MenuIcon from '@material-ui/icons/Menu';

interface NavProps extends RouteComponentProps{
  user:User | null
};

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'black'
    },
  }));
  

export const NavBarComponent:FunctionComponent<any> = (props)=>{
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    let button = []
    console.log(props.user)
    if(props.user != null){
      button.push(<Button color="inherit"><Link to='/logout'>Logout</Link></Button>)
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    let menuItems = []
    
    if(props.user){
      menuItems.push(<MenuItem onClick={handleClose}><Link to='/home'>Home</Link></MenuItem>,
      <MenuItem onClick={handleClose}><Link to={`/profile/${(props.user)?props.user.userId : '0' }`}>Profile</Link></MenuItem>,
      <MenuItem onClick={handleClose}><Link to={`/posts/users/${(props.user)?props.user.userId : '0' }`}>My Posts</Link></MenuItem>,
      <MenuItem onClick={handleClose}><Link to='/newpost'>Create Posts</Link></MenuItem>
      )
    }
    else{
      menuItems.push(<MenuItem onClick={handleClose}><Link to='/login'>Login</Link></MenuItem>)
    }

    return(
        <nav>
        <AppBar position='static' style={{ background: '#4dd0e1' }}>
            <Toolbar>
            <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {menuItems}
                    </Menu>
          <Typography variant="h5" className={classes.title}>
            instaBytes
          </Typography>
          {button}
        </Toolbar>
        </AppBar>
        </nav>
    )
}