import React, {useEffect, useState} from 'react'
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import Posts from '../Components/Posts/Posts';
import Form from '../Components/Forms/Form';
import { useDispatch } from 'react-redux';
import {getPosts} from '../actions/posts'
import Pagination from '../Components/Pagination';
const Home = () =>{
    // *this helps us find our currentId for each post
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()
    

    useEffect(()=> {
        dispatch(getPosts())
    },[currentId,dispatch])

    // *<Posts setCurrentId={setCurrentId} /> and <Form currentId={currentId} setCurrentId={setCurrentId} /> this is dealing with prop drilling of the data
        // *this gets sent to the Form.js where we take the props
        // * we will alos utilize this as pops in posts.js as well

    return (
        <Grow in>
                <Container>
                    <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            <Paper elevation={6}>
                                <Pagination  />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home