import React, {useState,useEffect} from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import useStyles from './styles'
import FileBase from 'react-file-base64';
import { createPortfolio,updatePortfolio } from "../../../actions/portfolio";
import { useHistory } from 'react-router-dom';

const PortfolioInputForm = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        userId: '',
        Assets:[],
        Ownership:[],
        DateCreated:''
    });

    // console.log('this is the currentId in portfolioInputForm',currentId)
    // *this allows us to get our id# that we want to update our post
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    // console.log('this is post in Form.js',post)
    const classes = useStyles()
    const history = useHistory();
    const dispatch = useDispatch()
    // * this allows us to get our user
    const user = JSON.parse(localStorage.getItem('profile'));

    // console.log('this is user in PortfolioInputFrom.js',user)
    useEffect(() => {
        if (post) setPostData(post);
      }, [post]);

      
    const clear = () =>{
        setCurrentId(null)
        setPostData({ userId: '',assets:[],ownership:[],dateCreated:''});
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log('this is the currentID in handlesubmit', currentId)
        if (!currentId) {
            dispatch(createPortfolio({ ...postData, name: user?.result?.name }, history));
            
        } else {
            dispatch(updatePortfolio(currentId, { ...postData, name: user?.result?.name }));
        }
        clear()
    }

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create an investment portfolio.
            </Typography>
          </Paper>
        );
      }
        

// *value for   <TextField name="creator"/>; the value is going to be stored in the state aka postData.creator
    // *this means the data from the post will be stored in the post data object in the state and each object key will be a speicific text field

// * how do we change the value of the onChange?
    // *we jsut need to update one part of the object's state
    // *1st we need to spread the post data aka ...postData;  if we don't do this we will just rewrite teh e.target.value
// *<FileBase/>; this allows us to upload files
     
    return (
        <Paper className={classes.paper} elevation={7}>
            <form autoComplete='off' noValidate={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${post.assets}"` : 'Add a stock'}</Typography>
                <TextField name="assets" variant="outlined" label="Symbol"  value ={postData.assets} onChange={(e)=> setPostData({...postData,assets:e.target.value})}/>
                <TextField name="ownership" variant="outlined" label="% of Portfolio"  value={postData.ownership} onChange={(e) => setPostData({ ...postData, ownership: e.target.value })} />
                
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant = 'contained' color='secondary' size ='small' onClick={clear} fullWidth>Clear</Button>
            </form>            
        </Paper>
    
    )

}

export default PortfolioInputForm