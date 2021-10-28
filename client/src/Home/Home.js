import React, {useEffect, useState} from 'react'
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Posts from '../Components/Posts/Posts';
import Form from '../Components/Forms/Form';
import {getPosts} from '../actions/posts'
import { getPostsBySearch } from '../actions/posts';
import Pagination from '../Components/Pagination';
import useStyles from './styles';
// *this gives us floating bubbles in tags
import ChipInput from 'material-ui-chip-input';
// *this will provide us an idea of where our current location is 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () =>{
    const classes = useStyles();
    // *this helps us find our currentId for each post
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch()
    // *this is where we get our page info from
    const query = useQuery();
    const history = useHistory();
    // *this is going to read our url and see if we have a page parameter in it; if so it will poopulate the variable
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    console.log('this is the search in Home.js',search)
    const [tags, setTags] = useState([]);



  

    const searchPost = () => {

      console.log('this is the search in searchPost',search)
      if (search.trim() || tags ) {
        console.log('this is the search in searchPost',search)
        console.log('these are the tags in searchPost in Home.js',tags)
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        history.push('/');
      }
    };

    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        searchPost();
      }
    };
    const currentValue = () =>{
      // const poops = e.target.value

      // console.log('this is the e.target.value in home.js',e.target.value)
    }



    // const searchPost = () => {
    //   if (search.trim() || tags) {
    //     dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
    //     //   *we are pushing this to a specific url
        
    //     history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    //     } else {
    //       history.push('/');
    //     }
    //   };



    const handleAddChip = (tag) => setTags([...tags, tag]);
      console.log('these are our tags in home.js',tags)
    //   *this allows us to delete our tags that we put in the tags serach bar
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    // *<Posts setCurrentId={setCurrentId} /> and <Form currentId={currentId} setCurrentId={setCurrentId} /> this is dealing with prop drilling of the data
        // *this gets sent to the Form.js where we take the props
        // * we will alos utilize this as pops in posts.js as well
    // *<Grid item xs={12} sm={6} md={9}>; this allows us to adjust to mobile
    // *TextField; this will be utilized as our search 
    return (
      <Grow in>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                <ChipInput
                  style={{ margin: '10px 0' }}
                  value={tags}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                  label="Search Tags"
                  variant="outlined"
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {(!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    );
  };

export default Home