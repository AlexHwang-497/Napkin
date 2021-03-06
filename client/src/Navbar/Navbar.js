import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Divider,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Box,
} from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import CustomizedDialogs from '../Components/Portfolio/Dialog'
import memories from '../images/memories.png'

import napkin from '../images/napkin.jpg'

import napkinsIcon from '../images/../images/1831700.png'
import portfolioIcon from '../images/../images/stockMarket.png'
import memoriesText from '../images/memoriesText.png'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import NoteTwoToneIcon from '@material-ui/icons/NoteTwoTone'
import BorderColorTwoToneIcon from '@material-ui/icons//BorderColorTwoTone'

import useStyles from './styles'
import CreatePortfolio from '../Components/Portfolio/Dialog'

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const dispatch = useDispatch()

  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })

    history.push('/auth')
    setUser(null)
  }

  useEffect(() => {
    // *we are checking if the token exists
    const token = user?.token

    setUser(JSON.parse(localStorage.getItem('profile')))
    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
  }, [location])

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      style={{ background: '#091F3C' }}
    >
      <Link to="/" className={classes.brandContainer}>
        <Box>
          <Typography>
            <img
              className={classes.image}
              src={napkinsIcon}
              alt="icon"
              height="55px"
            />
            <img
              className={classes.image}
              src={portfolioIcon}
              alt="icon"
              height="55px"
            />
          </Typography>
        </Box>
        <Box
          className={classes.titleBox}
          component="form"
          // sx={{'& > :not(style)': { m: 5, width: '25ch' },}}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h3" style={{ color: '#fff' }}>
            Napkin
          </Typography>
          <Typography variant="body2" style={{ color: '#fff' }}>
            The Back of the Napkin Portofolio/Asset Management Tool for Better
            Investment Decisions
          </Typography>
        </Box>
      </Link>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
