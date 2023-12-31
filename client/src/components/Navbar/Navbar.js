import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button, ButtonBase } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';


const Navbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
  
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   
    


    const logout = () => {
      localStorage.clear();
      navigate('/login-auth');
      setUser(null);
    };


    useEffect(() => {
      const token = user?.token;
      console.log("nav-result = ",user?.result);

      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const handleSignin = () => {
      navigate('/login-auth');
    }

    

   

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>


      <Toolbar className={classes.toolbar}>
      {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
    
            
                <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              
             
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button onClick={handleSignin} variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>

    </AppBar>
  )
}

export default Navbar