import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import fetchStockPrice from '../StockData/FetchStockPrices'; 

import memories from '../images/memories.png';
// import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';


const Navbar = () =>{
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log('this is the user from navbar.js',user)

    const dispatch = useDispatch();
    // *we utilize this to deal with the change in our URL from '/auth' to '/'
      //* this will also help give us our google user icon as well in the navBar 
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
      dispatch({ type: 'LOGOUT' });
  
      history.push('/');
      // history.push('/auth');
  
      setUser(null);
    };

    // *this allows us to get our userId from authetentication
      // *in addition, this will allow our logout button to pop up so we don't have to refresh
    useEffect(() => {
        // *we are checking if the token exists
        const token = user?.token;
        
        setUser(JSON.parse(localStorage.getItem('profile')));
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
      }, [location]);




    
    
    return(
      <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories; we are good up until 1:51:50</Typography>
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
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    
    </AppBar>
    )
  }
  
  export default Navbar